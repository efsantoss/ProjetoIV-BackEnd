const { ApolloError } = require('apollo-server');

class ServerClient {
    #net = require('net');

    #PORT = 12345;
    #ADDRESS = '127.0.0.1';
    #client = new this.#net.Socket();

    connected = false;

    constructor() {
        this.#connectToServer
    }

    #connectToServer() {
        try {
            this.#client.connect(
                this.#PORT, this.#ADDRESS, () => {
                    connected = true;
                    console.log('Connected to the server');
                }
            )

            this.#client.on('error', (error) => {
                throw new ApolloError(error, "S_CS_02");
            });
        } catch (error) {
            throw new ApolloError(error, "S_CS_01");
        }
    }

    sendToServer(quantity, address) {
        try {
            if (this.#client.writable) {
                const data = {
                    quantity: quantity,
                    address: address
                };
    
                this.#client.write(JSON.stringify(data));
            } else {
                console.log('Client is not connected to the server.');
            }
        } catch (error) {
            throw new ApolloError(error, "S_SS_01");
        }
    }

}

module.exports = ServerClient;