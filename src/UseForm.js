import {useState} from 'react';

function AddNewData({form}){

	 const [status, setStatus] = useState("");
     const [message, setMessage] = useState("");
     const handleSubmit=(e)=>{
      console.log("################")
     	if(form){

        console.log("form is = ", form)
        let newdata = {
          title:"Mayank"
        } 
     		e.preventDefault();
      		setStatus("loading");
      		setMessage("");

      		const finalFormEndPoint = form.action;
      		fetch(finalFormEndPoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newdata)
      }).then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          return response.json();
        })
        .then(() => {
          setMessage("Item successfully added");
          setStatus("success");
        })
        .catch((err) => {
          setMessage(err.toString());
          setStatus("error");
        });

     	}
     }
     return { status, message };
}

export default AddNewData;