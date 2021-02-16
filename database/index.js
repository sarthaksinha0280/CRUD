const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true})); //middelware use to take data from frontend to backend


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"picture",
    socketPath:'/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock',
});


//get data from database
app.get("/api/get",(request,response)=>{
    const sqlSelect = "SELECT * FROM film";
    db.query(sqlSelect,(error,result) => {
     // console.log(result);
     response.send(result);
    })
})


//delete data from database
app.delete('/api/delete/:movie',(request,response) => {
  const name = request.params.movie;  //here we use params to get data from link
  console.log(name);
  //const data="dfc";
  const sqlDelete = "DELETE FROM film WHERE movie = ?";
  db.query(sqlDelete,name,(error,result)=>{
      if(error){
          console.log(error);
      }
      else{
          console.log(result);
      }
  });
});

//insert data in database
app.post("/api/insert",(request,response)=>{
    const Movie = request.body.movie; //same name as frontend name
    const Review =  request.body.review; 
    const sqlInsert="INSERT INTO film (movie,review) VALUES (?,?)"; 
    db.query(sqlInsert,[Movie,Review], (error,result) => {
        if(error){
            response.send({error:error});
        }
        if(result){
            response.send(result);
        }
    }); 
});


//update database
app.put("/api/update/:review",(request,response)=>{
     const review = request.params.review;
     const data = request.body.data;
    const sqlUpdate ="UPDATE film SET review=? WHERE review =?";
    db.query(sqlUpdate,[data,review],(error,result)=>{
     if(error){
      console.log(error);
     }
    });
});


app.listen(3001,() => {
  console.log("running on port 3001");
});
