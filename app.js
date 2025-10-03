import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/mongoose-connect.js';
import {userModel} from './models/users.model.js'


dotenv.config();



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true}));


app.get('/' , (req , res) => {
    res.send("Hey the server is working !!");
})

app.post('/create-user' , async (req ,res) => {
    try {
        const user = await userModel.create({
        name : "Hi",
        email: "go@12.co",
        password : "123",
        isAdmin: true
     })

         user.save()
         res.json("User Created")
    } catch (error) {
        console.log(error.message);
    }
})




const startServer = async () => {
    await connectDb();
    app.listen(process.env.PORT || 3000 , () => {
    console.log(`your server is connected at ${process.env.PORT}`);
});
}

startServer();




