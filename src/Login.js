import { useNavigate} from "react-router-dom";
import { useState } from "react";

function Login(){
	const navigate = useNavigate();
	const [login, setLogin]=useState(false);
	const [pwd, setPwd] = useState(false);
	return(
		<div>
		<h1 className="app-title">Welcome to resource App</h1>
		<div className="login">
			<div className="title">Login</div>
			<form className="login-form">
				<label>Username</label>
				<input type = "text" name="title" placeholder="Enter Username" onChange={
					()=>{
						setLogin(true);
					}
				}/>

				<label>Password</label>
				<input type = "Password" name="pwd" placeholder="Enter Password" onChange={
					()=>{
						setPwd(true);	
					}
				}/>

				
				<button disabled={!(login && pwd)} onClick={()=>navigate("/nxtWave/home")}>Submit</button>
			</form>
			
		</div>
		</div>
	);
}
export default Login;