import { WS_API } from '@/config';
import { io } from 'socket.io-client';

const get_socketio = (query) => {
    // console.log({ device, token, a, b, direction });
    return io(`${WS_API}`, {
        transports: ['websocket'],
        query
    })
}

export default get_socketio