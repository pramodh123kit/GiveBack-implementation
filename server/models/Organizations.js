const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    registrationDoc: {
        type: String,
        required: true,
    },
    permit: {
        type: String,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    type: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    forWho: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
