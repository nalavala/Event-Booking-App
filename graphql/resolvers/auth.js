const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const {errorConstants} = require('./../error/error-contants')


module.exports = {
    createUser: async (args) => {
        try {
            // check for existing user
            let existingUser = await User.findOne({email: args.userInput.email});
            if (existingUser) {
                throw new Error(errorConstants.USER_ALREADY_EXISTS)
            }
            // Create hash for password
            let passwordHash = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: passwordHash
            });

            let createdUser = await user.save();
            return {...createdUser._doc, password: null};
        } catch (e) {
            throw e;
        }

    },
    // Object destructing
    login: async ({email, password}) => {
        //1. validate
        const user = await User.findOne({email: email});
        if (!user) {
            throw new Error(errorConstants.INVALID_CREDENTIALS);
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            throw new Error(errorConstants.INVALID_CREDENTIALS);
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
