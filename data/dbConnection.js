import mongoose from "mongoose";


const dbConnect = () => {

    mongoose.connect(process.env.MONGO_URI, { dbName: "Assignment" })
        .then(() => {
            console.log("Database Connected");
        })
        .catch((error) => {
            console.error(error);
        });

};

export default dbConnect;