import logo from './logo.svg';
import './App.css';
import {Card} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import {useState, useRef, useEffect} from 'react'
import AddUser from './User.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";


var user_obj=[];

var request_obj=[];

function App() {


  const [view, setView]=useState(false)
  const jsonData = useRef(null);
  const [search, setSearch]  = useState(false);
  let filterdCards;
  console.log("rendering")
  
  function setUser(){
    setView("User");
  }

  function setResource(){
    setView("Resource");
  }

  function setRequest(){
    setView("Request");
  }

  function getFilteredData(searchText){
    console.log("search key is ", searchText, jsonData.current);
      var temp = [];
      let details = jsonData.current;
    if(details!=null){
      console.log("details length ", details.length);
    for(let i = 0;i<details.length;i++){
      temp.push(details[i]);
      // if(details[i]['tag'] == )
    }
    
  }
    console.log("temp is", temp);
    

     filterdCards=temp.filter(
      resource=>{
        // console.log("###### ", resource['title'])
        return(resource['title'].toLowerCase().includes(searchText.toLowerCase()));
      }
    );
     let resouceList = filterdCards;
     user_obj=[];
     request_obj=[];
     for(let i  = 0;i<resouceList.length;i++){
    if(resouceList[i]['tag']=="user"){
      let obj = {title:resouceList[i]['title'], 
                 subtitle:resouceList[i]['link'], 
                 text:resouceList[i]['description'],
                 image:resouceList[i]['icon_url']};
      user_obj.push(obj);
    }
    else if(resouceList[i]['tag']=="request"){
      let obj = {title:resouceList[i]['title'], 
                 subtitle:resouceList[i]['link'], 
                 text:resouceList[i]['description'],
                 image:resouceList[i]['icon_url']};
      request_obj.push(obj);
    }
    
  }
     

  }

  useEffect(()=>{
    console.log("inside use effect");
    return ()=>{
      
      
      // console.log("json current is ", jsonData.current, " ", search);
      const fetchJsonData = fetch('https://media-content.ccbp.in/website/react-assignment/resources.json');
      fetchJsonData.then(response=>{
        return response.json();
      }).then(resouceList => {
    jsonData.current = resouceList;
    console.log("json data is ", jsonData);
    user_obj = [];
    request_obj = [];
  for(let i  = 0;i<resouceList.length;i++){
    if(resouceList[i]['tag']=="user"){
      let obj = {title:resouceList[i]['title'], 
                 subtitle:resouceList[i]['link'], 
                 text:resouceList[i]['description'],
                 image:resouceList[i]['icon_url']};
      user_obj.push(obj);
    }
    else if(resouceList[i]['tag']=="request"){
      let obj = {title:resouceList[i]['title'], 
                 subtitle:resouceList[i]['link'], 
                 text:resouceList[i]['description'],
                 image:resouceList[i]['icon_url']};
      request_obj.push(obj);
    }
    
  }
  
});
      console.log("user obj is ", user_obj, "request obj is ", request_obj);
      // setView("Resource");
      setSearch(true);
    }


  })

  // console.log("hello world")
  //  function fetchJsonData(){
  //   const response =  fetch('https://media-content.ccbp.in/website/react-assignment/resources.json');
  //   const resoucrces =  response.json();
  //   return resoucrces;
  // }
    
  return (

    <div className="App">
        <div>
           {search && <Search getFilteredData={getFilteredData}/>}
          <Button variant="primary" className="request_button" onClick={setRequest}>Request</Button>
          <Button variant="primary" className="resource_button" onClick={setResource}>Resource</Button>
          <Button variant="primary" onClick={setUser}>User</Button>
        </div>
        {view=="User" && <User userList={user_obj}/>}
        {view==="Resource" &&  user_obj.length>0 && request_obj.length>0 && <Resource userList={user_obj} requestList={request_obj}/>}
        {view=="Request" && <Request requestList={request_obj}/>}

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
