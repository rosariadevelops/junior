import * as io from "socket.io-client";
/* import {
    chatMessages,
    addNewMessage,
    allOnlineUsers,
    addToOnlineUsers,
    removeFromOnlineUsers,
} from "./actions"; */

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }
};
