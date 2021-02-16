import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Container, Row, Form, FormGroup, FormControl, FormLabel, Button, Table} from 'react-bootstrap';
import './App.css';
function App() {
  const [Movie, setMovie] = useState("");
  const [Review, setReview] = useState("");
  const [MovieReviewList, setMovieReviewList] = useState([]);
  const [UpdateReview, setUpdateReview] = useState("");

  const [Msg, setMsg] = useState("");
 
  useEffect(()=>{
      Axios.get("http://localhost:3001/api/get").then((response)=>{
        console.log(response.data);
        setMovieReviewList(response.data);
      })
  },[])
 //insert
  const submitReview = () => {
   Axios.post("http://localhost:3001/api/insert",{
     movie:Movie,
     review:Review
   });
   //then(() => {
    setMovieReviewList([
      ...MovieReviewList,
       { movie: Movie, review: Review },
      ]);
   //});
  };

//update database
const updateReview=(review)=>{
Axios.put(`http://localhost:3001/api/update/${review}`,{
  data:UpdateReview,
}).then(()=>{
console.log("data update");
});
}

  //delete
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  return (
    <div className="App"> 
    {Msg}
      <h1>APP</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="movie" onChange={(e)=>{setMovie(e.target.value)}}/>
        <label>Review:</label>
        <input type="text" name="review" onChange={(e)=>{setReview(e.target.value)}}/> 
        <button className="button" onClick={submitReview}>Submit</button>
      </div>
      <br></br>
      <hr></hr>
      <h2>Lists</h2>
      {MovieReviewList.map((val)=>{
      
      return (
         
         <div className="card">
           <h3 key={val.id}> MovieName:{val.movie}</h3>
           <br></br>
           <h6>{val.review}</h6>
           
           <button id="delete" onClick={()=>{deleteReview(val.movie)}}>Delete</button>
           <input type="text" id="updateInput" onChange={(e)=>{setUpdateReview(e.target.value)}} />
           <button className="update" onClick={()=>{updateReview(val.review)}}>Update</button>
        </div>

      );


      })}
    </div>
  );
}

export default App;
