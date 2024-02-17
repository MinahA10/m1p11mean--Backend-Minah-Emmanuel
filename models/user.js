const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    contact: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
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
