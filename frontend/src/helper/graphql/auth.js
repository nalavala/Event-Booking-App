export const getLoginQuery = (email, password) => {
    let query = {
        query: `query Login ($email : String!, $password : String!) {
                login(email : $email, password : $password) {
                    userId 
                    email 
                    token 
                    tokenExpiration
                }
            }`,
        variables: {
            email,
            password
        }
    };
    return query;
};


export const getCreateUserQuery = (email, password) => {
    let query = {
        query: `
            mutation CreateUser($email : String!, $password : String!){
              createUser(userInput : {email: $email,password: $password}) {
                _id
              }
            }`,
        variables: {
            email,
            password
        }
    }

    return query;
};

