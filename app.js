import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/mongoose-connect.js';
import {userModel} from './models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';



dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cookieParser());

const JWT_SECRET = process.env.SECRET;

app.get('/' , (req , res) => {
    res.send("Hey the server is working !!");
})


app.post('/register' ,  (req ,res) => {
  try {
        const { name , email , password} = req.body;
            bcrypt.genSalt(10 ,  function(err , salt) {
            bcrypt.hash(password , salt , async function(err , hash){
            const user =  await userModel.create({
                name : name,
                email : email,
                password: hash,
            });

            const token = jwt.sign( {
                userId : user._id,
                email : user.email
            } , JWT_SECRET);

            res.cookie("token", token );
            
            })

          
        })

        

        res.status(201).send("User Created Successfully"  );
        

  } catch (error) {
        console.log(error.message);
  }
    
});


app.post('/login' , async (req , res) => {
    try {
        const { email , password } =req.body;

       const user = await userModel.findOne({email});

       if(!user) {
        res.redirect('/register');
        return;  
       } 

       bcrypt.compare( password , user.password , function(err , result) {
       try {
         if(!result){
           console.log("Somehting went wrong")
         }
         else{
            const token = jwt.sign( {
                userId : user._id,
                email : user.email
            } , JWT_SECRET);

            res.cookie("token", token ).send("User logged In");
            
         }
       } catch (error) {
        console.log(error.message)
       }
      });

      

     
      
    

    } catch (error) {
        console.log(error.message)
    }
})




const startServer = async () => {
    await connectDb();
    app.listen(process.env.PORT || 3000 , () => {
    console.log(`your server is connected at ${process.env.PORT}`);
});
}

startServer();




