const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    avatar: {type: String}
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    catch(err) {
        next(err)
    }
    
});

userSchema.methods.comparePassword = async function (candidatePassword){
    return bcrypt.compare(candidatePassword,this.password);
}

const User = mongoose.model("User",userSchema);

module.exports = User;