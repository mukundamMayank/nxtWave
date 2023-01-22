import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate} from "react-router-dom";

function TopBar(props){
	const navigate = useNavigate();
	const [ optn, setOptn ] = useState(false);
	return(
		<div>
		<div className="navigationButtons">
			<div className="nxtWavelogo">
		  		<img src = "assets/nxtWave.png" style={{width:"80px" ,height:"80px"}} onClick={()=>navigate("/home")}/>
		  	</div>
		  	<div>
	      		{props.itemPage && <button disabled={!(props.view==="User")} className="addItemButton" onClick={()=>navigate("/addItem")}>Add Item</button>}
	      		
		  	
			    <div className="profile">
		    		<img src="assets/profile-img.jpeg" alt="profile pic" onClick={() => {setOptn(prev => !prev)}} />
		    		{optn && <div className="options">
		    			<div className="list">
		    				<div className="list-item" onClick={()=>navigate("/")}>Logout</div>
		    			</div>
		    		</div>}
			    </div>
		    </div>
         </div>
         </div>
	);
}

export default TopBar;