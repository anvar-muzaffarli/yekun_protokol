import mongoose from "mongoose";

export const connectDatabase = () => {
    let DB_URI = "";

    if (process.env.NODE_ENV === "DEVELOPMENT") {
        DB_URI = process.env.DB_LOCAL_URI || "mongodb+srv://anvarkhalid:anvar123@cluster0.fg2os4f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    } else if (process.env.NODE_ENV === "PRODUCTION") {
        DB_URI = process.env.DB_URI;
    } else {
        // Default value if NODE_ENV is not set
        DB_URI = "mongodb+srv://anvarkhalid:anvar123@cluster0.fg2os4f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    }

    console.log("DB_URI:", DB_URI); // Add this line for debugging

    mongoose.connect(DB_URI).then(()=> {
        console.log(`Connection established!`);
    }).catch(error => {
        console.error("Connection error:", error);
    });
};
