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
    let flag = 0;

	const formElement = useRef(null);

	const [title, setTitle] = useState("");
	const [tag, setTag] = useState("");
	const [link, setLink]=useState("");
	const [iconUrl, setIconUrl] = useState("");
	const [description, setDescription] = useState("");

	const [cnt, setCnt]=useState(0);

	const [isValidTitle, setIsValidTitle] = useState(false);
	const [isValidTag, setIsValidTag] = useState(false);
	const [isValidLink, setIsValidLink] = useState(false);
	const [isValidIconUrl, setIsValidIconUrl] = useState(false);
	const [isValidDescription, setIsValidDescription] = useState(false);

	

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
            <input className='m-2 form-control' type="text" name="title" value={title} 
            onChange={
            			(e) => {
							console.log("---------------------")
							console.log(e.target.value)
            				if(e.target.value.includes('@')
            					|| e.target.value.includes('#')
            					|| e.target.value.includes('&')
            					|| e.target.value.includes('$')){
            					// if(cnt>0){
            					// 	setCnt(cnt-1)
            		  			// }
								setIsValidTitle(false);
            				}else {
								setIsValidTitle(true);
							}
            				// else{
            				// setCnt(cnt+1)
            				// setTitle(e.target.value);
            				// console.log(cnt);
            			 //   }
            			//  setCnt(cnt+1);
            			 setTitle(e.target.value);
						 //  console.log(cnt);
            			}

            		}/>
            <br/>
            <label className='m-2 form-label'>Link </label>
            <br/>
            <input className='m-2 form-control' type="url" name="link" value={link} 
            onChange={
            	(e) => {
					setLink(e.target.value);
            		if(isValidHttpUrl(e.target.value)){
            			setIsValidLink(true);
            			// setCnt(cnt+1)
            			// console.log(cnt);
            		}
            		else {
            			// if(cnt>0){
            			// setCnt(cnt-1)
            		//   }
					setIsValidLink(false);
            		}
            	}
            }/>
            <br/>  
            <label className='m-2 form-label'>Icon Url </label>
            <br/>
            <input className='m-2 form-control' type="url" name="icon_url" value={iconUrl} 
            onChange={
            	(e) => {
					setIconUrl(e.target.value);
            		if(isValidHttpUrl(e.target.value)){
						setIsValidIconUrl(true);
            			// setCnt(cnt+1)
            			// console.log(cnt);
            		}
            		else {
            			// if(cnt>0){
            			// 		setCnt(cnt-1)
            			// }
						setIsValidIconUrl(false);
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
            					// setCnt(cnt+1)
            					// flag=1;
            					// console.log(cnt);
								setIsValidTag(true);
            				}
            				else {
            					// if(flag == 1){
            					// 	if(cnt>0){
            					// 	flag =0;
            					// 	setCnt(cnt-1)
            					//  }
            					// }
								setIsValidTag(false);
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
            				// setCnt(cnt+1)
            				// console.log(cnt);
							setIsValidDescription(true);
            			}
					} />
            		{/* // } onkeyup={enableSubmit}/> */}
            <br/>    
        </form>
        
        	<button disabled={
				!(isValidTitle && isValidLink && isValidIconUrl && isValidTag && isValidDescription)
			} onClick={handleSubmit}>
        		Submit
        	</button>
			<ToastContainer />
        	</div>
       );
}

export default AddUser;