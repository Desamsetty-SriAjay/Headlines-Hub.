import express from 'express'
import cors from 'cors'
import router from './routes/news.js'
import connectDB from './config/mongoDB.js';
import notesRouter from './routes/notes.js';
const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/news', router);
app.use('/api/notes', notesRouter);
connectDB();




app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})