const mongoose = require('mongoose');

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
    createdAt: {
        default: new Date()
    }
});

module.exports.User = mongoose.model("User", UserSchema);

module.exports.getUserById = (id, callback) => {
    this.User.findById(id, callback);
}

module.exports.login = user => {

}

module.exports.logout = () => {
    
}

