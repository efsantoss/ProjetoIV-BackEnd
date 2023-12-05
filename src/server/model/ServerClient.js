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
        return new Promise((resolve, reject) => {
            try {
                if (this.connected) {
                    const data = {
                        quantity: quantity,
                        address: address
                    };

                    // Send data to the server
                    this.#client.write(JSON.stringify(data));

                    // Listen for the server's response
                    this.#client.once('data', (data) => {
                        const response = JSON.parse(data.toString()).response;
                        resolve(response === 'true');
                    });

                } else {
                    console.log('Client is not connected to the server.');
                    resolve(false);
                }
            } catch (error) {
                reject(new ApolloError(error, "S_SS_01"));
            }
        });
    }

}

module.exports = ServerClient;