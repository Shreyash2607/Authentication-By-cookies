const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth,checkUser} = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Shreyash:Shreyash123@cluster0.1t8zl.mongodb.net/Test?retryWrites=true&w=majority';
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port),() => {console.log('server started sucessfully')})
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth ,(req, res) => res.render('smoothies'));
app.use(authRoutes);

//cookies
// app.get('/set-cookies',(req,res)=>{
//   //res.setHeader('set-Cookie','newUser=true');
//   res.cookie('newUser',false);
//   res.cookie('isEmployee',true,{maxAge:1000*60*60,httpOnly:true});
//   res.send("You got the cookies");
// });

// app.get('/read-cookies',(req,res)=>{
//     const cookies = req.cookies;
//     console.log(cookies);
//     res.json(cookies);
// });