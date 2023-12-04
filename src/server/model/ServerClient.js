class ServerClient {

     #net = require('net');

     #PORT = 12345;
     #ADDRESS = '127.0.0.1';
     #client = new this.#net.Socket();

    constructor() {
        this.#connectToServer
    }

    #connectToServer() {
        try {
            this.#client.connect(
                this.#PORT, this.#ADDRESS, () => {
                    console.log('Connected to the server');
                }
            )
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    }

}