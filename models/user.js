const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: Number
    },
    contact: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model("users", UserSchema);

module.exports = User;


module.exports.getUserById = (id) => {
    return this.User.findById(id);
}

module.exports.login = async (email, password) => {
    let check = null;
    const user = await User.findOne({email: email});
    if(user){
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(isPasswordMatch){
            check = user;
        }
    }
    return check;
}
