import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Card} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import {useState, useRef, useEffect} from 'react'
import AddUser from './User.js';
import Home from './Home.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pagination from './Pagination.js';


var user_obj=[];

var request_obj=[];

function App() {

  return(
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addItem" element={<AddUser/>}/>
      </Routes>
      </BrowserRouter>

);

//   const [view, setView]=useState("Resource")
//   const jsonData = useRef(null);
//   const [search, setSearch]  = useState(false);
//   const [addItem, setAddItem] =useState(false);

//   const [posts, setPosts] = useState([]);
//   const [postsPerPage] = useState(6);
//   const [currentPage, setCurrentPage] = useState(1);

//   let filterdCards;
//   console.log("rendering")

//   let allSessionsCount = user_obj.length+request_obj.length;
//   // const [sessionsPerPage, setSessionsPerPage] = useState(6);
//   // const [currentPage, setCurrentPage] = useState(1);
  
//   function setUser(){
//     setView("User");

//   }

//   function setResource(){
//     setView("Resource");
//   }

//   function setRequest(){
//     setView("Request");
//   }

//   function setAddItemButton(){
//     setAddItem(true);
//   }

//   function getFilteredData(searchText){
//     console.log("search key is ", searchText, jsonData.current);
//       var temp = [];
//       let details = jsonData.current;
//     if(details!=null){
//       console.log("details length ", details.length);
//     for(let i = 0;i<details.length;i++){
//       temp.push(details[i]);
//       // if(details[i]['tag'] == )
//     }
    
//   }
//     console.log("temp is", temp);
    

//      filterdCards=temp.filter(
//       resource=>{
//         // console.log("###### ", resource['title'])
//         return(resource['title'].toLowerCase().includes(searchText.toLowerCase()));
//       }
//     );
//      let resouceList = filterdCards;
//      user_obj=[];
//      request_obj=[];
//      for(let i  = 0;i<resouceList.length;i++){
//     if(resouceList[i]['tag']=="user"){
//       let obj = {title:resouceList[i]['title'], 
//                  subtitle:resouceList[i]['link'], 
//                  text:resouceList[i]['description'],
//                  image:resouceList[i]['icon_url']};
//       user_obj.push(obj);
//     }
//     else if(resouceList[i]['tag']=="request"){
//       let obj = {title:resouceList[i]['title'], 
//                  subtitle:resouceList[i]['link'], 
//                  text:resouceList[i]['description'],
//                  image:resouceList[i]['icon_url']};
//       request_obj.push(obj);
//     }
    
//   }
     

//   }

//   useEffect(()=>{
//     console.log("inside use effect");
//     return ()=>{
      
      
//       // console.log("json current is ", jsonData.current, " ", search);
//       const fetchJsonData = fetch('https://media-content.ccbp.in/website/react-assignment/resources.json');
//       fetchJsonData.then(response=>{
//         return response.json();
//       }).then(resouceList => {
//     jsonData.current = resouceList;
//     console.log("json data is ", jsonData);
//     user_obj = [];
//     request_obj = [];
//   for(let i  = 0;i<resouceList.length;i++){
//     if(resouceList[i]['tag']=="user"){
//       let obj = {title:resouceList[i]['title'], 
//                  subtitle:resouceList[i]['link'], 
//                  text:resouceList[i]['description'],
//                  image:resouceList[i]['icon_url']};
//       user_obj.push(obj);
//     }
//     else if(resouceList[i]['tag']=="request"){
//       let obj = {title:resouceList[i]['title'], 
//                  subtitle:resouceList[i]['link'], 
//                  text:resouceList[i]['description'],
//                  image:resouceList[i]['icon_url']};
//       request_obj.push(obj);
//     }
    
//   }
//   if(view == "User")setPosts(user_obj);
//   else if(view=="Request")setPosts(request_obj);
//   else {
//     setPosts(user_obj+request_obj);
//   }
  
// });
//       console.log("user obj is ", user_obj, "request obj is ", request_obj);
//       // setView("Resource");
//       setSearch(true);
//     }


//   })

//    const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   return (

//     <div className="App">
//         <div>
//           <Button variant="primary" className="addItemButton" onClick={setAddItemButton}>Add Item</Button>
//            {search && <Search getFilteredData={getFilteredData}/>}
//            {addItem && <AddUser/>}
//           <Button variant="primary" className="request_button" onClick={setRequest}>Request</Button>
//           <Button variant="primary" className="resource_button" onClick={setResource}>Resource</Button>
//           <Button variant="primary" onClick={setUser}>User</Button>
//         </div>
//         {view=="User" && <User userList={user_obj}/>}
//         {view==="Resource" &&  user_obj.length>0 && request_obj.length>0 && <Resource userList={user_obj} requestList={request_obj}/>}
//         {view=="Request" && <Request requestList={request_obj}/>}
          
      
//     </div>

//   );
}

const renderCard = (card)=>{
    return(
      <Card className="card">
      <Card.Body>
        <Card.Title>{card.title}</Card.Title>
        <Card.Img variant="top" src={card.image} className="card_image"/>
        <Card.Subtitle>{card.subtitle}</Card.Subtitle>
        <Card.Text>
          {card.text}
        </Card.Text>
      </Card.Body>
    </Card>
    )
  }

function User(props){
  // console.log(user_obj)
  
  return(
    <div className="test">
      {props.userList.map(renderCard)}
    </div>
  );
}

function Resource(props){
  console.log("props is ", props );
  const user_obj1=props.userList;
  const request_obj1= props.requestList;
  return(
  <div>
    {user_obj1 && user_obj1.map(renderCard)}
    {request_obj1 &&request_obj1.map(renderCard)}
    </div>
  );
}

function Request(props){
  return(
  <div>
    {props.requestList.map(renderCard)}
    </div>
  );
}

function Search(props){
  
  // let details = props.details;
  // // console.log("deatil ss", details.details);
  const [searchText, setSearchText]=useState('');
  //   var temp = [];
  //   if(details && details.details){
  //     console.log("details length ", details.details.length);
  //   for(let i = 0;i<details.details.length;i++){
  //     temp.push(details.details[i]);
  //   }
    
  // }
  //   console.log("temp is", temp);
    

  //   const filterdCards=temp.filter(
  //     resource=>{
  //       // console.log("###### ", resource['title'])
  //       return(resource['title'].toLowerCase().includes(searchText.toLowerCase()));
  //     }
  //   );
  
  function searchList() {
    // return (
    //     <SearchList filterdCards={filterdCards} />
      
    // );
    props.getFilteredData(searchText);
  }

  const handleClick= e=>{
    
    setSearchText(e.target.value);
    console.log("serac  text is ", searchText);
  }

  return(
  <div class="search">
    <p>This is the search</p>
    <input type="search" onChange={handleClick}/>
    {searchList()}
  </div>
  )
}

function SearchList({ filterdCards }) {
  console.log('filterdCards ', filterdCards)
  const filtered = filterdCards.map(card =>  {
    console.log("card titile is ", card.title);
    <Card style={{ width: '18rem', border: `2px solid black`}}>
    <Card.Body>
      <Card.Title>card.title</Card.Title>
    </Card.Body>
    </Card>
  }); 
  return (
    <div>
      {filtered}
    </div>
  );
}

export default App;
