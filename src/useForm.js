import {useState} from 'react';

function addNewData({form}){
	 const [status, setStatus] = useState("");
     const [message, setMessage] = useState("");
     const handleSubmit=(e)=>{
     	if(form){
     		e.preventDefault();
      		setStatus("loading");
      		setMessage("");

      		const finalFormEndPoint = form.action;
      		fetch(finalFormEndPoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          return response.json();
        })
        .then(() => {
          setMessage("We'll be in touch soon.");
          setStatus("success");
        })
        .catch((err) => {
          setMessage(err.toString());
          setStatus("error");
        });

     	}
     }
     return { handleSubmit, status, message };
}