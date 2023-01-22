import './App.css';
import React from 'react';
import CardComponent from './Components/Card.js'
import Button from 'react-bootstrap/Button';
import {useState, useRef, useEffect} from 'react'
import { useNavigate} from "react-router-dom";
import TopBar from './Components/TopBar.js'
import Search from './Components/Search.js'

var user_obj=[];

var request_obj=[];

function pushToUserOrRequest(resouceList){
	user_obj=[];
     request_obj=[];
     for(let i  = 0;i<resouceList.length;i++){
	   		if(resouceList[i]['tag']==="user"){
		      let obj = {title:resouceList[i]['title'], 
		                 subtitle:resouceList[i]['category'], 
		                 text:resouceList[i]['description'],
		                 link: resouceList[i]['link'],
		                 image:resouceList[i]['icon_url']};
		      user_obj.push(obj);
	    }
	    else if(resouceList[i]['tag']==="request"){
	      let obj = {title:resouceList[i]['title'], 
	                 subtitle:resouceList[i]['category'], 
	                 text:resouceList[i]['description'],
	                 link: resouceList[i]['link'],
	                 image:resouceList[i]['icon_url']};
	      request_obj.push(obj);
	    }
	}
}

function Home() {

  
  const [view, setView]=useState("Resource")
  const jsonData = useRef(null);
  const [search, setSearch]  = useState(false);
  const isItemPage = false;

  const [posts, setPosts] = useState([]);
  const [postsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  let filterdCards;

  
 function getFilteredData(searchText){
      var temp = [];
      let details = jsonData.current;
    if(details!=null){
    for(let i = 0;i<details.length;i++){
      temp.push(details[i]);
    }
    
  }
    filterdCards=temp.filter(
      resource=>{
        return(resource['title'].toLowerCase().includes(searchText.toLowerCase()));
      }
    );
     let resouceList = filterdCards;
     pushToUserOrRequest(resouceList);
   }

  useEffect(()=>{
    return ()=>{
      
      const fetchJsonData = fetch('https://media-content.ccbp.in/website/react-assignment/resources.json');
      fetchJsonData.then(response=>{
        return response.json();
      }).then(resouceList => {
    jsonData.current = resouceList;
    pushToUserOrRequest(resouceList);
	  if(view === "User")setPosts(user_obj);
	  else if(view==="Request")setPosts(request_obj);
	  else {
	    setPosts(user_obj+request_obj);
	  }
  
});
     setSearch(true);
    }


  })

   const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (

    <div className="App">
        <div className="top">
           
           <TopBar view={view} itemPage={isItemPage}/>
           
           	<div className="tabs">
	           	  <Button variant="primary" className={view==="Resource"?"tab-item active-tab":"tab-item"} onClick={()=>setView("Resource")}>Resource</Button>
		          <Button variant="primary" className={view==="Request"?"tab-item active-tab":"tab-item"} onClick={()=>setView("Request")}>Request</Button>
		          <Button variant="primary" className={view==="User"?"tab-item active-tab":"tab-item"} onClick={()=>setView("User")}>User</Button>
          	</div>
          	{search && <Search getFilteredData={getFilteredData}/>}
        </div>
        {view=="User" && <User userList={user_obj}/>}
        {view==="Resource" &&  user_obj.length>0 && request_obj.length>0 && <Resource userList={user_obj} requestList={request_obj}/>}
        {view=="Request" && <Request requestList={request_obj}/>}
          
      
    </div>

  );
}

const renderCard = (card)=>{
    return(
      <CardComponent card={card}/>
    )
  }

function User(props){
  
  return(
    <div className="card-list">
      {props.userList.map(renderCard)}
    </div>
  );
}

function Resource(props){
  const user_obj1=props.userList;
  const request_obj1= props.requestList;

 return(
  <div className="card-list">
    {user_obj1 && user_obj1.map(renderCard)}
    {request_obj1 && request_obj1.map(renderCard)}
    </div>
  );
}

function Request(props){
  return(
  <div className="card-list">
    {props.requestList.map(renderCard)}
    </div>
  );
}

export default Home;