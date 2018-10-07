const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

const pg = require('pg');


//COORS stuff
let allowCORS = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
}
app.use(allowCORS);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     
  extended: true
}));


//dummy data
let sellerSubmissions = [
  {
    'postid' : 1,
    'amount': 50, 
    'currency': "CAD",
    'location':"Atlanta",
    'notes': "yes",
    'valueInUSD': 33.72,
    'selleremail': "steven@email.com",
    'sellername': 'steven'
    
   
  },
  {
    'postid' : 2,
    'amount': 100,
    'currency': "GBP",
    'location': "Boston",
    'notes': "hello",
    'valueInUSD': 112.94,
    'selleremail': "user@email.com",
    'sellername': 'user'
  }
];


app.get('/tester', (req, res)=>{
  res.send("from server, with love");
})

//seller submissions and buyer searches

// app.post("/submissions", (req, res)=>{
  // sellerSubmissions.push(req.body);
  // res.end();
// })

app.get("/isloggedin", verifyToken, (req, res)=> {
  let payload ;
  try{
     payload = jwt.verify(req.token, signature)
  }catch(error){ 
  }
if(payload){
  res.send("yes")
}else{
  res.send("not logged in")
}  
})



app.get("/posts", (req, res)=>{
  res.send(sellerSubmissions);
})

app.post("/submissions", verifyToken, (req, res)=> {
  let payload ;
  try{
     payload = jwt.verify(req.token, signature)
  }catch(error){ 
  }
if(payload){
  sellerSubmissions.push(req.body);
  console.log(sellerSubmissions);
  res.end();
}else{
  res.send(404, "str")
} 
})

app.get('/submissions',  verifyToken, (req, res)=> {
  let payload ;
  try{
     payload = jwt.verify(req.token, signature)
  }catch(error){ 
  }
if(payload){
  res.send(sellerSubmissions);
}else{
  res.sendStatus(403)
}
  // console.log(payload);
  
})

//// Auth 

let users = [
  { 
  userid: 1,
  firstname: 'Steven',
  lastname: 'lastname',
  email: 'steven@email.com',
  password: 'password'
  },
  {
  userid: 2,
  firstname: 'user',
  lastname: 'lastname',
  email: 'user@email.com',
  password: 'password2'
  }
]

let makeNewUserID = () =>{
  return users.length + 1
}
//add new user
app.post('/addnewuser', (req, res) =>{
  users.push({userid:makeNewUserID(), firstname:req.body.firstname, lastname:req.body.lastname , email:req.body.email, password:req.body.password})
  console.log(users);
})

//login page does a post request here
app.post("/api/login", (req, res) => {
  let user = users.find(user =>(req.body.email === user.email))
  if (req.body.email === user.email && req.body.password === user.password){
  jwt.sign({email: user.email, firstname: user.firstname, lastname: user.firstname, userid: user.userid}, signature, {expiresIn: '2 days'}, (err, token)=> {
    res.json({
      token, email: user.email, firstname: user.firstname, lastname: user.firstname, userid: user.userid
    });
  });
}else {
  res.send(404, "str")
}

});
 
function verifyToken(req, res, next){
  let bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined'){
    let bearer = bearerHeader.split(' ');
    let bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }else{
    res.sendStatus(403);
  }
}

app.listen(3006)
