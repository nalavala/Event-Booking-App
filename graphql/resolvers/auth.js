const bcrypt = require('bcryptjs');
const User = require('../../models/user');

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
}
