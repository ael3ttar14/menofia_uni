import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const file = new Schema({
    filename: String,
    originalname: String,
    mimetype: String,
    path: String,
    size: Number,
    uploadDate: { type: Date, default: Date.now },
});

const File = mongoose.model('File', file);

export default File;