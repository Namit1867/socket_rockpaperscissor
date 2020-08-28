import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()


export class AppgatewayGateway implements OnGatewayConnection , OnGatewayInit , OnGatewayDisconnect{
  
  private logger:Logger = new Logger('AppgatewayGateway')

  @WebSocketServer() wss: Server;
  
  handleConnection(client: Socket):void {
    this.logger.log(`${client.id} connected`)
  }
  
  afterInit(server: Server):void {
    this.logger.log(`${server}initialised`)
  }
  
  handleDisconnect(client: Socket):void {
    this.logger.log(`${client.id} disconnected`);
  }
  
  @SubscribeMessage('chat')
  handleMessage(client: Socket, data: string):void {
    this.wss.emit('chat',data);
  }
}
