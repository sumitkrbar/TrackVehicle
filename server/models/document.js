import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    owner : {
        type: String,
        required: true
    },
    phone:{
        type: Number,
    },
    vehicleNumber:{
        type: String,
        required: true,
    },
    cf:{
        type: Date,
    },
    np:{
        type: Date,
    },
    auth:{
        type: Date,
    },
    remarks:{
        type: String,
    }
},{timestamps: true});

const Document = mongoose.model('Document', documentSchema);
export default Document;