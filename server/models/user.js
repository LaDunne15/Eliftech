import mongoose, { Schema } from 'mongoose';

const schema = new mongoose.Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    fullname: String,
    email: String,
    dateOfBirth: Date,
    sourceOfInformation: {
        type: String,
        enum: ['social_media', 'friends', 'myself']
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', schema);
