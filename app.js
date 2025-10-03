import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/mongoose-connect.js';


dotenv.config();
connectDb();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true}));


app.get('/' , (req , res) => {
    res.send("Hey the server is working !!");
})


app.listen(process.env.PORT || 3000 , () => {
    console.log(`your server is connected at ${process.env.PORT}`);
});


