import express from 'express'; 
import cors from 'cors';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './router/userRouter';
import eventRouter from './router/eventRouter';
const app:express.Application=express();
//cors
app.use(cors());
//cofiguration of express to recieve form data
app.use(express.json());
//configure dotEnv
dotEnv.config({path:'./.env'});
const hostName:string|undefined =process.env.HOST_NAME;
const port:string|undefined =process.env.PORT;
//connect to mongodb
let dbURL:string|undefined=process.env.MONGO_DB_LOCAL;
console.log(dbURL)
if(dbURL){
mongoose.connect(dbURL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
    
}).then((res)=>{
    console.log('connected to db')
}).catch((error)=>{
    console.error(error);
    process.exit(1);

});
}

app.get('/',(req:express.Request,res:express.Response)=>{
    res.status(200).send(`<h2>wlcom</h2>`);

});
//router config
app.use('/users',userRouter);
app.use('/events',eventRouter);
if(port && hostName){
    app.listen(Number(port),hostName,()=>{
         console.log(`server at http://${hostName}:${port}`);
    });
}