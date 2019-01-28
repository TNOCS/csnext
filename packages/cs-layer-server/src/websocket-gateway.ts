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
    constructor() {
        console.log('---------- init default web socket gateway -------------');
    }

    @WebSocketServer() public server: any;
    wsClients: Client[] = [];
    afterInit() {
        console.log('------ init -------');
        this.server.emit('testing', { do: 'stuff' });
    }

    handleConnection(client: Client) {
        Logger.log(`New connection from: ${client.id}`);
        this.wsClients.push(client);
    }

    handleDisconnect(client) {
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
        for (let c of this.wsClients) {
            (c as any).emit(event, broadCastMessage);
        }
    }

    @SubscribeMessage('my-event')
    onChgEvent(client: any, payload: any) {
        this.broadcast('my-event', payload);
    }
}
