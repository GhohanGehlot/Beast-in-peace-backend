import express from 'express';

const app = express();

app.get('/' , (req , res) => {
    res.send("Hey the server is working !!");
})

app.listen(3000);


