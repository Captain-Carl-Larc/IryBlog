const mongoose = require('mongoose')

const connectDb = async (mongoDbUri) => {
    try {
        const connection = await mongoose.connect(mongoDbUri)
        console.log(`connected to DB successfully .`)
    } catch (error) {
        console.error(`could not connect to DB : ${error.message} `)
    }
}

module.exports = connectDb