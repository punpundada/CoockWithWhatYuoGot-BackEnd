const express = require('express')
const dotenv = require('dotenv').config();
const cors = require('cors');
const userRouter = require('./routes/UserRoute');

const app = express();
const port = process.env.PORT || 9002;
app.use(cors());
app.use(express.json())


app.use('/api/user',userRouter)


app.listen(port , ()=>{
    console.log(`\nListning on http://localhost:${port}`);  
});