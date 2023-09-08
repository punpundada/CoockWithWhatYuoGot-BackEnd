
const userSignup =(req,res)=>{
    res.json({'message':'Hello from apis'}).sendStatus(200);
};

const userLogin = (req,res)=>{
    res.json({'message':'User Login'}).sendStatus(200)
}

module.exports={userSignup,userLogin}