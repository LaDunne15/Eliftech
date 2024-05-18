import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: String,
    description: String,
    eventDate: Date,
    organizer: String
});

export default mongoose.model('Event', schema);
