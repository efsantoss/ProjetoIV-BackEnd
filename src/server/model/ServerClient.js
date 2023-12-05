const net = require('net');

const PORT = 12345;
const ADDRESS = '127.0.0.1';

class ServerClient {
    #client;
    #connected;

    constructor() {
        this.#client = new net.Socket();
        this.#connected = false;

        this.#connect();
    }

    #connect() {
        this.#client.connect(PORT, ADDRESS, () => {
            this.#connected = true;
            console.log('Connected to the server');
        });

        this.#client.on('data', (data) => {
            const response = data.toString();
        });

        this.#client.on('close', () => {
            this.#connected = false;
            console.log('Connection closed');
        });
    }

    sendToServer(historyEntry) {
        return new Promise((resolve, reject) => {
            if (this.#connected) {
                const data = JSON.stringify(historyEntry);
                this.#client.write(data + "\n");

                // You may want to modify this based on your server's response
                this.#client.once('data', (data) => {
                    const response = data.toString().replace("\n", "").trim();
                    const isSuccess = response === "true";
                    
                    resolve(isSuccess);
                });
            } else {
                reject(new Error('Client is not connected to the server.'));
            }
        });
    }
}

module.exports = ServerClient;
