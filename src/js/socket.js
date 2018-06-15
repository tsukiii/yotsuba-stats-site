import io from 'socket.io-client';
import config from '../js/config';

const socket = io(config.apiURL);
socket.connect(config.apiURL);

socket.on('connect', () => {
});

export default { socket };
