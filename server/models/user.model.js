import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
})

userSchema.set('toJSON', {
  transform(_doc, json) {
    delete json.password
    return json
  },
  virtuals: true,
})

userSchema
  .virtual('passwordConfirmation')
  .set(function (fieldValue) {
    this._passwordConfirmation = fieldValue
  })

userSchema
  .pre('validate', function (next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'Passwords do not match')
    }
    next()
  })

userSchema
  .pre('save', function (next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12))
    }
    next()
  })

userSchema.methods.validatePassword = function (plainTextPassword) {
  return bcrypt.compareSync(plainTextPassword, this.password)
}

export default mongoose.model('User', userSchema)