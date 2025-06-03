import express from"express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config ();


    //middleware

    app.use(express.json());
    app.use(express.urlencoded({ extended : true}));
    app.use(cookieParser());

    const corsOptions = {
        origin : ["http://localhost:5121"],
        credentials : true,
    };

    app.use(cors(corsOptions));

const PORT = process.env.PORT ||  5001;
const MONGO_URI =" mongodb+srv://aryan61865:V5RsXbrICLcam116@cluster0.zdvoghe.mongodb.net/";
app.listen(PORT,() =>{
    console.log(`server is runnig o port ${PORT}`);
});
