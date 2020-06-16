const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')


//* create Schema for registration criteria. 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  list: [{ type: mongoose.Schema.ObjectId, ref: 'Track' }]
})

//* stop password being available in json
userSchema
  .set('toJSON', {
    transform(doc, json) {
      delete json.password
      delete json.email
      return json
    }
  })



//* use bcrypt to compare login password 
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}



//* create a virtual password confirmation rather than a hardcoded one. 
userSchema
  .virtual('passwordConfirmation')
  .set(function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

//* before validation create a conditional statement to reject registration if passwords dont match
userSchema
  .pre('validate', function (next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

//* before saving create a conditional statement that checks if the password has been modified. If it has encrypt it to make the password secure. 
userSchema
  .pre('save', function (next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

userSchema.plugin(uniqueValidator)

//* export for usage by controllers. 
module.exports = mongoose.model('User', userSchema)