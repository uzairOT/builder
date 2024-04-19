import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import socketIOClient from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://192.168.0.104:8080';

// const socket = socketIOClient(SOCKET_SERVER_URL);
const useSocket = () => {

    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(()=> {
        
        // newSocket.on('connection', ()=> {
        //     console.log('Connected to server');
        //     setIsConnected(true);
        // });

        // newSocket.on('disconnect', () => {
        //     console.log('Disconnected from server');
        //     setIsConnected(false);
        // });
        const newSocket = socketIOClient(SOCKET_SERVER_URL);
        console.log('Connected to server');
        setIsConnected(true);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
            setIsConnected(false);
        }
    }, []);

    const emit = (event, data) => {
        if(socket){
            console.log('socket emit event: ', event, ' data : ', data);
            socket.emit(event, data, (response) => {
              console.log('Server response:', response);
            });
          }
    }
    const on = (event, callback) => {
        if(socket){
            socket.on(event, callback);
        }
    };

    return{
        socket,
        isConnected,
        emit,
        on
    }
}
export default useSocket;