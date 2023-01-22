import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { useNavigate} from "react-router-dom";
import TopBar from './Components/TopBar.js'

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
    const navigate = useNavigate();

	const formElement = useRef(null);

	const [title, setTitle] = useState("");
	const [tag, setTag] = useState("");
	const [link, setLink]=useState("");
	const [iconUrl, setIconUrl] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");

	const [cnt, setCnt]=useState(0);

	const [isValidTitle, setIsValidTitle] = useState(false);
	const [isValidTag, setIsValidTag] = useState(false);
	const [isValidLink, setIsValidLink] = useState(false);
	const [isValidIconUrl, setIsValidIconUrl] = useState(false);
	const [isValidDescription, setIsValidDescription] = useState(false);
	const [isValidCategory, setIsValidCategory] = useState(false);

	const [isItemPage, setIsItemPage] = useState(false);

	
	const handleSubmit= ()=>{
		fetch(FORM_ENDPOINT).then(
				function(res){
					if(res.status == "200"){
						toast.success('Server hit Correctly', {
            				position: toast.POSITION.BOTTOM_CENTER,
            				className:'toast-message-success'
        				});
					}
					else {
						toast.error('Server hit Wrongly',{
							position: toast.POSITION.BOTTOM_CENTER,
            				className:'toast-message-error'
						})
					}
				}
			)
    }

    
	return (
  	<div class="addItemPage">
  		<div className="top">
  			<TopBar itemPage={isItemPage}/>
  		</div>
  		<div className="container">
	  		<div className="left">
	  			<div className="back-button">
	  				<i className="fa fa-angle-left" aria-hidden="true" onClick={()=>navigate(-1)}></i>
	  				<div className="back-label">Users</div>
	  			</div>

	  		
	  			<div className="title">Item Details</div>
	  			<form className='form-group'>
	  				<div className="form-control-group">
		            	<label className='m-2 form-label'>Title </label>
		            	<input className='m-2 form-control' type="text" name="title" value={title} 
		            		onChange={
		            			(e) => {
	            				if(e.target.value.includes('@')
	            					|| e.target.value.includes('#')
	            					|| e.target.value.includes('&')
	            					|| e.target.value.includes('$')){
	            					
									setIsValidTitle(false);
	            				}else {
									setIsValidTitle(true);
								}
	            				
	            			 setTitle(e.target.value);
	            			}

	            			}/>
	            	</div>
	            	<div className="form-control-group">
			            <label className='m-2 form-label'>Link </label>
			            <input className='m-2 form-control' type="url" name="link" value={link} 
			            onChange={
			            	(e) => {
								setLink(e.target.value);
			            		if(isValidHttpUrl(e.target.value)){
			            			setIsValidLink(true);
			            			
			            		}
			            		else {
			            			setIsValidLink(false);
			            		}
			            	}
			            }/>
			        </div>
			        <div className="form-control-group">
			            <label className='m-2 form-label'>Icon Url </label>
			            <input className='m-2 form-control' type="url" name="icon_url" value={iconUrl} 
			            onChange={
			            	(e) => {
								setIconUrl(e.target.value);
			            		if(isValidHttpUrl(e.target.value)){
									setIsValidIconUrl(true);
			            			
			            		}
			            		else {
			            			
									setIsValidIconUrl(false);
			            		}
			            	}
			            }/>
		            </div>
		            <div className="form-control-group">
		            	<label className='m-2 form-label'>Category </label>
		            	<input className='m-2 form-control' type="text" name="category" value={category} 
		            		onChange={
		            			(e) => {
									setCategory(e.target.value);
									setIsValidCategory(true);
							 
	            			}

	            			}/>
	            	</div>
		            <div className="form-control-group">
			         	<label className='m-2 form-label'>Tag </label>
			         	<select className="form-control" onChange={
	            			(e) => {
	            				if(e.target.value == "user" || e.target.value == "request"){
	            					
									setIsValidTag(true);
	            				}
	            				else {
	            					
									setIsValidTag(false);
	            				}
	            				setTag(e.target.value);
	            			}

	            		}>
	            			<option></option>
			         		<option value="user">User</option>
			         		<option value="request">Request</option>
			         		<option value="others">Others</option>
			         	</select>
	            	</div>
	            	<div className="form-control-group">
			            <label className='m-2 form-label'>Description </label>
			            <textarea className='m-2 form-control' type="text" name="description" value={description} 
			            onChange={
			            			(e) => {
			            				setDescription(e.target.value);
			            				// setCnt(cnt+1)
			            				
										setIsValidDescription(true);
			            			}
								} ></textarea>
			            		
		            </div>
	        	</form>
	        	<div className="submit-btn">
		        	<button disabled={
						!(isValidTitle && isValidLink && isValidIconUrl && isValidCategory && isValidTag && isValidDescription)
					} onClick={handleSubmit}>
		        		CREATE
		        	</button>
		        	<ToastContainer />
		        </div>
				
			</div>
			<div className="right">
				<div className="office-image">
					<img src="https://i.pinimg.com/originals/e0/e1/f4/e0e1f416e981a5e475024533c5689893.jpg"/>
				</div>
			</div>
    	</div>
    </div>
   );
}

export default AddUser;