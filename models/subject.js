import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const subject = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,

	},
	code: {
		type: String,
		required: true,

	},
	department: {
		type: Schema.Types.Mixed,
		required: false,
		ref: 'department'

	},
	subject_depended: {
		type: Schema.Types.Mixed,
		ref: 'subject',
		required: false
	},
	doctor: {
		type: Schema.Types.Mixed,
		required: false,
		ref: 'user'

	},
}, { timestamps: true });

export default mongoose.model('subject', subject);