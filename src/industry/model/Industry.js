// Criação do objeto Industria

class Industry {
    email
    cnpj
    phone

    constructor(email, cnpj, phone) {
        this.email = email;
        this.cnpj = cnpj;
        this.phone = phone;
    }
}

module.exports = Industry;