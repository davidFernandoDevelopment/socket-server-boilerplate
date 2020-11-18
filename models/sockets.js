class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        // ON CONNETION
        this.io.on("connection", socket => {
            // ESCUCHAR EVENTO: MENSAJE-TO-SERVER
            socket.on("MENSAJE-TO-SERVER", data => {
                console.log(data);
                this.io.emit("MENSAJE-FROM-SERVER", data);
            })
        })
    }
}

module.exports = Sockets;