// SERVIDOR DE EXPRESS
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;

        // HTTP - SERVER: SERVIDOR DE SOCKETS
        this.server = http.createServer(this.app);

        // CONFIGURACION DE SOCKET SERVER
        this.io = socketio(this.server, {/* Configuraciones: mantener latencia, etc */ });
    }
    execute() {
        //INICIALIZAR MIDDLEWARES
        this.middleware();

        // INICIALIZAR SOCKETS
        this.configurarSockets();

        // INICIALIZAR SERVER
        this.server.listen(this.PORT, () => {
            console.log(`Server running at port ${this.PORT}`)
        });
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    middleware() {
        // DESPLEGAR EL DIRECTORIO PUBLICA
        this.app.use(express.static(path.resolve(__dirname, "../public")))
        this.app.use(cors())
    }
}

module.exports = Server;