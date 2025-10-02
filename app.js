import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/' , (req , res) => {
    res.send("Hey the server is working !!");
})

app.listen(process.env.PORT || 3000 , (req , res) => {
    console.log(`your server is connected at ${process.env.PORT}`);
});


