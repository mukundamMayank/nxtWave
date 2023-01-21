import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRef, useState } from "react";
import AddNewData from "./UseForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const FORM_ENDPOINT = "https://media-content.ccbp.in/website/react-assignment/add_resource.json"

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function AddUser() {
	// console.log("add user page opened");
    // let cnt = 0;
    let flag = 0;

	const formElement = useRef(null);

	const [title, setTitle] = useState("");
	const [tag, setTag] = useState("");
	const [link, setLink]=useState("");
	const [iconUrl, setIconUrl] = useState("");
	const [description, setDescription] = useState("");
	const [cnt, setCnt]=useState(0);

	const handleSubmit= ()=>{
		fetch(FORM_ENDPOINT).then(
				function(res){
					if(res.status == "200"){
						console.log("suceess")
						toast.success('Success Notification !', {
            				position: toast.POSITION.BOTTOM_CENTER,
            				className:'toast-message'
        				});
					}
					else {
						console.log("api call failed");
					}
				}
			)
    }

    const enableSubmit=()=>{
    	console.log(cnt);
    	if(cnt>=4){
    		let btn = document.querySelector('button[type="submit"]')
    		btn.disabled = false;
    	}
    }
	// const {handleSubstatus, message}=AddNewData({form: formElement.current});


	

  return (
  	<div>
  	<form className='form-group'>
            <label className='m-2 form-label'>Title </label>
            <br/>
            <input className='m-2 form-control' type="text" name="email" value={title} 
            onChange={
            			(e) => {
            				// if(e.target.value.includes('@')
            				// 	|| e.target.value.includes('#')
            				// 	|| e.target.value.includes('&')
            				// 	|| e.target.value.includes('$')){
            				// 	if(cnt>0){
            				// 		setCnt(cnt-1)
            		  // 			}
            				// }
            				// else{
            				// setCnt(cnt+1)
            				// setTitle(e.target.value);
            				// console.log(cnt);
            			 //   }
            			 setCnt(cnt+1);
            			 setTitle(e.target.value);
            			 console.log(cnt);
            			}

            		}/>
            <br/>
            <label className='m-2 form-label'>Link </label>
            <br/>
            <input className='m-2 form-control' type="url" name="link" value={link} 
            onChange={
            	(e) => {
            		if(isValidHttpUrl(e.target.value)){
            			setLink(e.target.value);
            			setCnt(cnt+1)
            			console.log(cnt);
            		}
            		else {
            			if(cnt>0){
            			setCnt(cnt-1)
            		  }
            		}

            	}
            }/>
            <br/>  
            <label className='m-2 form-label'>Icon Url </label>
            <br/>
            <input className='m-2 form-control' type="url" name="icon_url" value={iconUrl} 
            onChange={
            	(e) => {
            		if(isValidHttpUrl(e.target.value)){
            			setIconUrl(e.target.value);
            			setCnt(cnt+1)
            			console.log(cnt);
            		}
            		else {
            			if(cnt>0){
            			setCnt(cnt-1)
            		  }
            		}
            	}
            }/>
            <br/> 
             <label className='m-2 form-label'>Tag </label>
            <br/>
            <input className='m-2 form-control' type="text" name="tag" value={tag} 
            onChange={
            			(e) => {
            				if(e.target.value == "user" || e.target.value == "request"){
            					setCnt(cnt+1)
            					flag=1;
            					console.log(cnt);
            				}
            				else {
            					if(flag == 1){
            						if(cnt>0){
            						flag =0;
            						setCnt(cnt-1)
            					 }
            					}
            				}
            				setTag(e.target.value);
            			}

            		}/>
            <br/>  

            <label className='m-2 form-label'>Description </label>
            <br/>
            <input className='m-2 form-control' type="text" name="description" value={description} 
            onChange={
            			(e) => {
            				
            				setDescription(e.target.value);
            				setCnt(cnt+1)
            				console.log(cnt);
            			}

            		} onkeyup={enableSubmit}/>
            <br/>    
        </form>
        
        	<button onClick={handleSubmit}>
        		Submit
        	</button>
        	</div>
        
    // <Form
    // 	action={FORM_ENDPOINT}
    // 	method="GET"
    // 	ref={formElement}
    // 	// onSubmit={handleSubmit}
    // >
    //   <fieldset>
    //     <Form.Group className="mb-3">
    //       <Form.Label htmlFor="input title">INPUT TITLE</Form.Label>
    //       <Form.Control id="input title" placeholder="Enter title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
    //     </Form.Group>
    //     <Form.Group className="mb-3">
    //       <Form.Label htmlFor="link">LINK</Form.Label>
    //       <Form.Control id="link" type="url" placeholder="Enter link" />
    //     </Form.Group>
    //     <Form.Group className="mb-3">
    //       <Form.Label htmlFor="icon url">ICON URL</Form.Label>
    //       <Form.Control id="icon url" type="url" placeholder="Enter icon url" />
    //     </Form.Group>
    //     <Form.Group className="mb-3">
    //       <Form.Label htmlFor="tag">TAG</Form.Label>
    //       <Form.Control id="tag" type="text" placeholder="Enter tag" />
    //     </Form.Group>
    //     <Form.Group className="mb-3">
    //       <Form.Label htmlFor="description">DESCRIPTION</Form.Label>
    //       <Form.Control id="description" type="text" placeholder="Enter description" />
    //     </Form.Group>
    //     <Button onClick={handleSubmit}>Submit</Button>
    //   </fieldset>
    // </Form>
  );
}

export default AddUser;