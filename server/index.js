import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import daleRouts from './routes/daleRouts.js'
 dotenv.config();
 const app=express();
app.use(cors());
app.use(express.json({limit:'50mb'}))

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dale',daleRouts);
app.get('/',async(req,res)=>{
     res.send('hello from aman')  
})
const Startserver=async()=>{
       try {
          connectDB(process.env.MONGODB_URL)
          app.listen(8080, ()=>console.log('server has started on port http://localhost:8080'))
       } catch (err) {
          console.log(err);    
       }
       
}
Startserver();