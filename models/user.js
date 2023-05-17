import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
username:{
    type:String,
    required:true,
    unique:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
number_id:{
    type:String,
    required:true,
    unique:true,
},
usertype:{
    type:String,
    required:true,
},

}, { timestamps: true });

export default mongoose.model('user', user);