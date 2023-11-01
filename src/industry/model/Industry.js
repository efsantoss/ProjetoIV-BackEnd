// Criação do objeto Industria

class Industry {
    email
    cnpj
    phone
    password

    constructor(email, cnpj, phone, password) {
        this.email = email;
        this.cnpj = cnpj;
        this.phone = phone;
        this.password = password;
    }
}

module.exports = Industry;