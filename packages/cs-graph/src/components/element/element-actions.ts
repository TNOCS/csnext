import { IMenu } from '@csnext/cs-core';
import { FilterGraphElement, GraphElement } from '@csnext/cs-data';
import { DocDatasource } from '../..';

export class ElementActions {
  public static getElementActions(element: GraphElement, source: DocDatasource, beforeAction?: (m: IMenu, e: GraphElement)=> void, afterAction?: (m: IMenu, e: GraphElement)=>void) : IMenu[] {    
    let menuItems: IMenu[] = [];

    const callBefore = async (m) => {
        if (beforeAction) { await beforeAction(m, element);}
    }

    const callAfter = async (m) => {
        if (afterAction) { await afterAction(m, element);}
    }

    let showContextMenu = false;
    menuItems.push({
      title: 'duplicate',
      icon: 'mdi-plus-circle-multiple-outline',
      action: async (i) => {
        callBefore(i);
        const name = await $cs.triggerInputDialog($cs.Translate('RENAME'), 'enter new name', `${element.properties?.name} - copy`);
        await source.duplicateNode(element, name);
        callAfter(i);
      },
    });
    menuItems.push({
      title: 'add to visualisation',
      icon: 'mdi-playlist-plus',
      action: async (i: IMenu) => {
        callBefore(i);
        i.items = [];
        // showContextMenu = false;
        let presets = source.getClassElements('graph_preset', true);
        presets.forEach((p) => {
          i.items!.push({
            title: p.properties?.name,
            icon: p._featureType?.icon,
            action: async () => {
              FilterGraphElement.addElementRule(p as FilterGraphElement, element);
              callAfter(i);
              // alert(`add to ${p.properties.name}`)
            },
          });
        });
        console.log(presets);
       
        // const name = await $cs.triggerInputDialog($cs.Translate('RENAME'), 'enter new name', `${element.properties?.name} - copy`);
        // await source.duplicateNode(element, name);
        //
      },
    });
    menuItems.push({
      title: 'link to',
      icon: 'mdi-playlist-plus',
      action: async (i: IMenu) => {
        callBefore(i);
        i.items = [];
        // showContextMenu = false;
        let targets = source.getClassElements('indicator', true);
        targets.forEach((p) => {
          i.items!.push({
            title: p.properties?.name,
            icon: p._featureType?.icon,
            action: async () => {
                callAfter(i);
              //   this.linkToTarget(p, 'supports');
              // FilterGraphElement.addElementRule(p as FilterGraphElement, element);
              // alert(`add to ${p.properties.name}`)
            },
          });
        });
        console.log(targets);
    
        // const name = await $cs.triggerInputDialog($cs.Translate('RENAME'), 'enter new name', `${element.properties?.name} - copy`);
        // await source.duplicateNode(element, name);
        //
      },
    });
    menuItems.push({
      title: 'rename',
      icon: 'mdi-form-textbox',
      action: async (i) => {
        callBefore(i);
        showContextMenu = false;
        const name = await $cs.triggerInputDialog($cs.Translate('RENAME'), 'enter new name', element.properties?.name);
        element.properties = { ...element.properties, ...{ name } };
        await source.saveNode(element);
        callAfter(i);
        // this.itemUpdated();
      },
    });
    menuItems.push({
      title: 'delete',
      icon: 'mdi-delete',
      color: '#eb4034',
      action: async (i) => {
        callBefore(i);
        showContextMenu = false;
        await source.removeNode(element);
        callAfter(i);
      },
    });

    return menuItems;

  }

  //   public async linkToTarget(target: GraphElement, type: string) {
  //     if (source && target.id && element.id)
  //     {
  //       const edge = {
  //         fromId: element.id,
  //         toId: target.id,
  //         classId: 'LINKED_TO',
  //         properties: {
  //           "relation_type": type
  //         }
  //       } as GraphElement
  //       try {
  //         await source.addNewEdge(edge);
  //       } catch (e) {
  //         console.error(e);
  //       }

  //     }
}
