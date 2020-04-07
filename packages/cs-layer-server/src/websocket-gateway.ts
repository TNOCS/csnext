import {
    SubscribeMessage,
    WebSocketGateway,
    WsResponse,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Client, Server } from 'socket.io';

@WebSocketGateway()
export class DefaultWebSocketGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    @WebSocketServer() public server: Server;
    public wsClients: Client[] = [];

    constructor() {
        Logger.log('---------- init default web socket gateway -------------');
    }

    public afterInit() {
        Logger.log('------ init -------');
    }

    public handleConnection(client: Client) {
        Logger.log(`New connection from: ${client.id}`);
        this.wsClients.push(client);
    }

    public handleDisconnect(client) {
        for (let i = 0; i < this.wsClients.length; i++) {
            if (this.wsClients[i].id === client.id) {
                this.wsClients.splice(i, 1);
                break;
            }
        }
        this.broadcast('disconnect', {});
    }

    private broadcast(event, message: any) {
        const broadCastMessage = JSON.stringify(message);
        for (const c of this.wsClients) {
            (c as any).emit(event, broadCastMessage);
        }
    }
}
