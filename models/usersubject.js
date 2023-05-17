import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const usersubject = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    inrollstudent: {
        bsonType: "array",
        items: {
            bsonType: "int",
            description: "must be an integer"
        },


    }
}, { timestamps: true });

export default mongoose.model('usersubject', usersubject);