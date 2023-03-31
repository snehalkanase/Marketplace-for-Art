const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email:{
        type:String,
        required: true,
        max: 50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    profilePicture:{
        type:String,
        default:"",
    },
    coverPicture:{
        type:String,
        default:"",
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[] 
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    desc:{
        type:String, 
        max:200,
    },
    wishlist:{
        type:Array,
        default:[]
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

},
{ timestamp:true  }
);

//JWT token
UserSchema.methods.generateToken = function() {
    return jwt.sign({ id:this._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };
  

const User = mongoose.model("User", UserSchema);

module.exports = User;
