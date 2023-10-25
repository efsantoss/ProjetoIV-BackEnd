// funções relaciona a industria

const {database, ref, set} = require('../../firebase/firebase');
const Industry = require('../model/Industry')

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
        saveIndustry: async (_, { industry }) => {
            const { email, cnpj, phone } = industry;
            const newIndustry = new Industry(
              email,
              cnpj, 
              phone
            );

            try {
                set(ref(database, 'industries/' + newIndustry.cnpj), {
                    email: newIndustry.email,
                    cnpj: newIndustry.cnpj,
                    phone: newIndustry.phone
                  });

                console.log('Data saved successfully');

                return newIndustry;
            } catch (error) {
                console.error('Data could not be saved.', error);
                
                return error;
            }
        }
    }

};

module.exports = industryResolvers;