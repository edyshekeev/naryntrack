import { WS_API } from '@/config';
import { io, Socket } from 'socket.io-client';

const get_socketio = (query: any): Socket => {
    // console.log({ device, token, a, b, direction });
    return io(`${WS_API}`, {
        transports: ['websocket'],
        query: query
    })
}

export default get_socketio