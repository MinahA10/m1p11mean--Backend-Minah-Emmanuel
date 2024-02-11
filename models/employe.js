const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  contact: { type: String, required: [true, 'User phone number required']},
  password: { type: String, required: true , default: '123456' },
  photo: { type: Buffer },
  speciality: {type: Array,default: []},
  appointments: {ype: Array, default: []}
});

employeSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

employeSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const Employe = mongoose.model('employes', employeSchema);

module.exports = Employe;
