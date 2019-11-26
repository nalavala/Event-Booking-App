const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');


module.exports = {
    createUser: (args) => {
        return User
            .findOne({email: args.userInput.email})
            .then(user => {
                if (user) {
                    throw new Error('user existss already.')
                }
                return bcrypt.hash(args.userInput.password, 12);
            })
            .then(hashedPassword => {
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                })
                return user.save();
            })
            .then(result => {
                console.log(result);
                return {...result._doc, password: null}
            })
            .catch(err => {
                return err;
            })
    },
    // Object destructing
    login: async ({email, password}) => {
        //1. validate
        const user = await User.findOne({email: email});
        if (!user) {
            throw Error("user doesn't exists");
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            throw Error("Invalid Credentials i.e incorrect password");
        }

        //2. generate token
        const token = await jwt.sign(
            {userId: user.id, email: user.email},
            "My secret key"
        );
        var authData = {
            userId : user.id,
            email : user.email,
            token : token,
            tokenExpiration : 1
        }

        return authData;

    }
}
