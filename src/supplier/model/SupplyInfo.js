class SupplyInfo {
    id
    address
    quantity
    document

    constructor(id, address, quantity, document) {
        this.id = id;
        this.address = address;
        this.quantity = quantity;
        this.document = document;
    }
}

module.exports = SupplyInfo;