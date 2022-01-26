import { Injectable, Module, Logger, Inject } from '@nestjs/common';
import { BaseElementProperties, GraphDatasource, GraphElement, IGraphElementAction } from '@csnext/cs-data';
import { IDatabase } from './databases/database';
import { guidGenerator, idGenerator } from '@csnext/cs-core';
import { LocalStorage } from './databases/local';
import { DefaultWebSocketGateway } from '../websocket-gateway';
import { NestServer } from '../export';

@Injectable()
export class GraphService {
  public db?: IDatabase;
  public database = process.env.DATABASE || 'local';
  public source?: GraphDatasource;
  public filesPath?: string;
  private storeWithIntervalData: { node: any; edges: any[] }[] = [];
  private storeWithIntervalInterval?: NodeJS.Timeout;

  public socket?: DefaultWebSocketGateway;

  public async init(databaseName?: string, folder?: string) {
    Logger.log('Initalizing Graph Data Source', 'GraphService');
    this.source = new GraphDatasource();

    // load data model
    switch (this.database) {
      case 'local':
        this.source.title = 'local';
        Logger.log('Initializing LocalStorage');
        this.db = new LocalStorage(databaseName, folder);
        break;
    }

    if (this.db) {
      try {
        await this.db.init(this.source);
      } catch (e) {
        Logger.error(e);
      }
    }
  }

  public async loadDatabase() {}

  async save(element: GraphElement, agentId?: string) : Promise<GraphElement | undefined> {
    if (!this.db) { return Promise.reject(); }
    if (!element.classId) {
      element.classId = 'node'
    }
    if (!element.type) { element.type = 'node'}
    if (!element.id) {
      element.id = `${element.classId}-${idGenerator()}`;
    }

    try {
      await this.source.addElement(element);

      let result = await this.db.store(
        {
          type: (element.type === 'node') ? 'n' : 'e',
          document: element.properties,
          id: element.id,
          class: element.classId,
        },
        agentId ?? 'unknown',
        new Date().getTime()
      );

      if (this.socket?.server) {          
        this.socket.server.emit("graphelement",{
          action: 'update',
          elements: [GraphElement.getFlat(element)]            
        } as IGraphElementAction);
      }
      this.source.triggerUpdateGraph(element);

      return Promise.resolve(element);
    } catch {
      return Promise.reject();
    }
  }

  store(body: any, type: string, id?: string, agentId?: string): Promise<GraphElement | undefined> {
    return new Promise(async (resolve, reject) => {
      // make sure we use entity, instead of wiki path

      let r = body.properties ?? body;
      if (this.db && this.source) {
        let result = { result: 'error' };

        if (!body.hasOwnProperty('id')) {
          body.id = id;
        }
        if (!body.id) {
          body.id = guidGenerator();
        }

        const element = {
          id: body.id,
          classId: type,
          properties: r,
        } as GraphElement;

        await this.source.addNode(element);

        result = await this.db.store(
          {
            type: 'n',
            document: r,
            id: body.id,
            class: type,
          },
          agentId ?? 'unknown',
          new Date().getTime()
        );

        this.sendSocketUpdateForElement(element);
        resolve(element);
      }
    });
  }

  public sendSocketUpdateForElement(element: GraphElement<BaseElementProperties>) {
    this.sendSocketUpdateForElements([element]);
  }

  public sendSocketUpdateForElements(elements: GraphElement<BaseElementProperties>[]) {
    if (this.socket?.server) {          
      this.socket.server.emit("graphelement",{
        action: 'update',
        elements: elements.map(e => GraphElement.getFlat(e))   
      } as IGraphElementAction);
    }
  }

  public removeMultiple(body: any[]) {
    return new Promise(async (resolve, reject) => {
      if (this.db && this.source && body && Array.isArray(body) && body.length > 0) {
        try {
          for (const el of body) {
            if (el.id) {
              switch (el.type.toLowerCase()) {
                case 'n':
                  await this.source.removeNodeById(el.id);
                  break;
                case 'e':
                  await this.source.removeEdgeById(el.id);
                  break;
              }
            }
          }
          await this.db.removeMultiple(body.map(b => b.id));
        } catch {
          Logger.warn(`Remove multiple failed`);
          reject();
        }
        resolve({ result: 'ok' });
      }
      reject();
    });
  }

  public storeMultiple(body: any[], agentId?: string) {
    return new Promise(async (resolve, reject) => {
      if (this.db && this.source && body && Array.isArray(body) && body.length > 0) {
        const allElements = [];
        for (const el of body) {
          if (agentId && !el.document?.created_by) {
            el.document.created_by = agentId;
          }
          if (!el.document?.created_time) {
            el.document.created_time = new Date().getTime();
          }
          switch (el.type.toLowerCase()) {
            case 'n':
              await this.source.addNode(
                {
                  id: el.id,
                  classId: el.class,
                  properties: el.document,
                },
                el.class,
                true
              );
              break;
            case 'e':
              await this.source.addEdge({
                id: el.id,
                toId: el.to,
                fromId: el.from,
                classId: el.class,
                properties: el.document,
              });
              break;
          }
          allElements.push(el);
        }
        // fs.writeFileSync('log-' + new Date().getTime() + '.json', JSON.stringify(body));
        await this.db.storeMultiple(body, agentId, new Date().getTime()); // storemultiple(body);
        this.sendSocketUpdateForElements(allElements);
        resolve({ result: 'ok' });
      }
      reject();
    });
  }

  public storeWithInterval(body: any[], intervalMillis: number, agentId?: string) {
    return new Promise(async (resolve, reject) => {
      if (this.db && this.source && body && Array.isArray(body) && body.length > 0) {
        for (const el of body) {
          if (agentId && !el.document?.created_by) {
            el.document.created_by = agentId;
          }
          if (!el.document?.created_time) {
            el.document.created_time = new Date().getTime();
          }
          if (el.type.toLowerCase() === 'n') {
            let edges = body.filter((elm) => elm.type.toLowerCase() === 'e' && (elm.from === el.id || elm.to === el.id));
            this.storeWithIntervalData.push({ node: el, edges: edges });
          }
        }
        // fs.writeFileSync('log-' + new Date().getTime() + '.json', JSON.stringify(body));
        // await this.db.storeMultiple(body, agentId, new Date().getTime()); // storemultiple(body);
        if (!!this.storeWithIntervalInterval) {
          clearInterval(this.storeWithIntervalInterval);
          this.storeWithIntervalInterval = undefined;
          this.storeWithIntervalData.length = 0;
        }
        this.storeWithIntervalInterval = setInterval(async () => {
          let storeData = this.storeWithIntervalData.shift();
          if (storeData) {
            Logger.log(`Storing node ${storeData.node.id}`, 'GraphService');
            await this.source.addNode(
              { id: storeData.node.id, classId: storeData.node.class, properties: storeData.node.document },
              storeData.node.class,
              true
            );
            for (const edge of storeData.edges) {
              await this.source.addEdge({ id: edge.id, toId: edge.to, fromId: edge.from, classId: edge.class, properties: edge.document });
            }
            await this.db.storeMultiple([storeData.node, ...storeData.edges], agentId, new Date().getTime());
            this.source.triggerUpdateGraph();
          } else {
            clearInterval(this.storeWithIntervalInterval);
            this.storeWithIntervalInterval = undefined;
            Logger.log('Stopped storing elements on interval', 'GraphService');
          }
        }, intervalMillis);
        Logger.log(`Start storing elements on interval of ${intervalMillis}ms`, 'GraphService');
        resolve({ result: 'ok' });
      }
      reject();
    });
  }

  public static setupDB( databaseName?: string, folder?: string, socket?: DefaultWebSocketGateway): Promise<GraphService> {
    return new Promise(async (resolve, reject) => {
      let graphService = new GraphService();
      graphService.init(databaseName, folder)
        .then((e) => {
          resolve(graphService);
        })
        .catch((e) => {
          reject();
        });
    });
  }

  public initSocket(socket?: DefaultWebSocketGateway) {
    if (socket) {
      this.socket = socket;
      Logger.log('Socket initialized', 'graph-service');
    }
  }


  public async persist(): Promise<void> {
    if (!this.db) return;
    return this.db.persist();
  }
}
