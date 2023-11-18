// Criação do objeto Fornecedor

class Supplier {
    email
    document
    phone
    password

    constructor(email, document, phone, password) {
        this.email = email;
        this.document = document;
        this.phone = phone;
        this.password = password;
    }
}

module.exports = Supplier;