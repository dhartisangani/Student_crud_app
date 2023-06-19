const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    imgUrl: {
        type: String,
        required: true
    },
    studentid: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    }, 
    birthdate: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    standard: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: true
    },
    Fatheroccupation: {
        type: String,
        required: true
    },
    mothername: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
})

StudentSchema.index({ fullname: 'text' });


module.exports = mongoose.model('student', StudentSchema)

// Ex. for send req using url
// {
//     "studentid": "ab12",
//     "fullname": "varsani dharti g.",
//     "imgUrl": "https://cdn.shopify.com/s/files/1/0053/2792/products/1921_Poet_Walnut_Remix_242_00_v01.jpg?v=1678104815",
//     "birthdate": "05/10/2000",
//     "gender": "female",
//     "standard": "12 std",
//     "fathername": "gautambhai d. varsani",
//     "Fatheroccupation": "business",
//     "mothername": "bhavnaben g. varsani",
//     "email": "dharti@123gmail.com",
//     "phone": "9658321254", 
//     "nationality": "indian"
//   }