const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 12;

const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        favourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Film" }],
    },
    {
        timestamps: true
    }
);
userSchema.methods.comparePassword = function(_password) {
     return bcrypt.compareSync(_password, this.password);
   }
   userSchema.pre('save', async function (next) {
     // Only run this function if the password was actully modified
     if (!this.isModified('password')) return next();
     try {
       const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
       this.password = await bcrypt.hash(this.password,salt);
       return next();
     } catch(err) {
       return next(err);
     }
   });
const User = mongoose.model("User", userSchema);
module.exports = User;