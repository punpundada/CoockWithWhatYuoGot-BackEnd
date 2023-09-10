const { default: mongoose } = require("mongoose");


const dbConnection = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log(
            `Database Connected`,
            connect.connection.host,
            connect.connection.name
        );
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = dbConnection;