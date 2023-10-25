// funções relaciona a industria

const db = require('../../firebase/firebase');
const Industry = require('../model/Industry');

const industryResolvers = {
    Query: {
        getIndustry: async (_, { id }) => {
          // Implement logic to fetch industry data based on the provided ID
          // Replace the following placeholder code with the actual logic
          return {
            email: 'example@example.com',
            cnpj: 1234567890,
            phone: 1234567890,
          };
        },
      },

    Mutation: {
        saveIndustry: async(_, { industry }) => {
        { industry }
        let {email, cnpj, phone } = industry;

        let newIndustry = new Industry(
            email = email,
            cnpj = cnpj,
            phone = phone
        );

        const reference = db.ref('industries');
        const newIndustryRef = reference.push()
            
        newIndustryRef.set(newIndustry, (error) => {
            if (error) {
                return error;
            } else {
                return true;
            }
        });
        }
    }
};

module.exports = industryResolvers;