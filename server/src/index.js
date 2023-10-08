const express = require("express")
const dotenv = require('dotenv')
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const UserRouter = require("./routes/UserRouter")
const FilmRouter = require("./routes/FilmRouter")
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  })
);

// routes
app.use('/user',UserRouter);
app.use('/film',FilmRouter);



mongoose.connect(`${process.env.MONGO_DB}`)
     .then(() =>{
          console.log('Connect MongDB success!')
     })
     .catch((err) =>{
          console.log((err))
     })

app.listen(port, () =>{
     console.log(port)
})