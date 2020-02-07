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
import { Client } from 'socket.io';

@WebSocketGateway()
export class DefaultWebSocketGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    @WebSocketServer() public server: any;
    public wsClients: Client[] = [];

    constructor() {
        Logger.log('---------- init default web socket gateway -------------');
    }

    public afterInit() {
        Logger.log('------ init -------');
        this.server.emit('testing', { do: 'stuff' });
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

    @SubscribeMessage('my-event')
    public onChgEvent(client: any, payload: any) {
        this.broadcast('my-event', payload);
    }

    private broadcast(event, message: any) {
        const broadCastMessage = JSON.stringify(message);
        for (const c of this.wsClients) {
            (c as any).emit(event, broadCastMessage);
        }
    }
}
