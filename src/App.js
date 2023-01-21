import logo from './logo.svg';
import './App.css';
// import User from './User.js';
// import BasicExample from './Card.js'
import {Card} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import {useState, useRef} from 'react'
import AddUser from './User.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";


var user_obj=[];

// var resource_obj=[

//   ];
var request_obj=[];

function App() {

  const [view, setView]=useState("Request")
  const jsonData = useRef(null);
  
  function setUser(){
    setView("User");
  }

  function setResource(){
    setView("Resource");
  }

  function setRequest(){
    setView("Request");
  }

  console.log("hello world")
  async function fetchJsonData(){
    const response = await fetch('https://media-content.ccbp.in/website/react-assignment/resources.json');
    const resoucrces = await response.json();
    return resoucrces;
  }
  fetchJsonData().then(resouceList => {
  // for(let i = 0;i<resouceList.length;i++){
  //   console.log(resouceList[i]['tag'])
  // }
    // var jsonDataString = JSON.stringify(resouceList);
    // var jsonData = JSON.parse(jsonDataString);
    // console.log("json data is ", typeof(jsonData));
    jsonData.current = resouceList;
    console.log("json data is ", jsonData);
  for(let i  = 0;i<resouceList.length;i++){
    if(resouceList[i]['tag']=="user"){
      // let obj = Object.push(user_obj, {title:resouceList[i]['title']});
      let obj = {title:resouceList[i]['title'], 
                 subtitle:resouceList[i]['link'], 
                 text:resouceList[i]['description'],
                 image:resouceList[i]['icon_url']};
      user_obj.push(obj);
      // console.log(user_obj);
    }
    else if(resouceList[i]['tag']=="request"){
      let obj = {title:resouceList[i]['title'], 
                 subtitle:resouceList[i]['link'], 
                 text:resouceList[i]['description'],
                 image:resouceList[i]['icon_url']};
      request_obj.push(obj);
      // console.log(obj);

    }
    
  }
  
});
  return (

    <div className="App">
       <Search details={jsonData.current}/>
        <div>
          <Button variant="primary" className="request_button" onClick={setRequest}>Request</Button>
          <Button variant="primary" className="resource_button" onClick={setResource}>Resource</Button>
          <Button variant="primary" onClick={setUser}>User</Button>
        </div>
        {view=="User" && <User/>}
        {view=="Resource" && <Resource/>}
        {view=="Request" && <Request/>}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Resource/>}/>
            <Route path="addItem" element={<AddUser/>}/>
          </Routes>
      </BrowserRouter>
    </div>

  );
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

function User(){
  // console.log(user_obj)

  

  return(
    <div className="test">
      {user_obj.map(renderCard)}
    </div>
  );
}

function Resource(){
  return(
  <div>
    {user_obj.map(renderCard)}
    {request_obj.map(renderCard)}
    </div>
  );
}

function Request(){
  return(
  <div>
    {request_obj.map(renderCard)}
    </div>
  );
}

function Search(details){
  console.log("deatil ss", details);
  const [searchText, setSearchText]=useState('mar');
    var temp = [];
    if(details.length>0){
    for(let i = 0;i<details.details.length;i++){
      temp.push(details.details[i]);
    }
  }
    console.log("temp is", temp);
    

    const filterdCards=temp.filter(
      resource=>{
        // console.log("###### ", resource['title'])
        return(resource['title'].toLowerCase().includes(searchText.toLowerCase()));
      }
    );
  
  function searchList() {
    return (
        <SearchList filterdCards={filterdCards} />
      
    );
  }

  const handleClick= e=>{
    
    setSearchText(e.target.value);
    console.log("serac  text is ", searchText, temp.length);
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
