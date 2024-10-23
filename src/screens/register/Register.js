import { FormControl, FormHelperText, Input, InputLabel, Typography} from "@material-ui/core";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
export default function Register(){

 
    const[ferror,setFerror]=useState('');
    const[lerror,setLerror]=useState('');
    const[cError, setCerror]=useState('');
    const[emailError, setEmailError]=useState('');
    const[passError, setPassError]=useState('');
    const[success, setSuccess]=useState(false);
    const[error, setError]=useState(false);

    const[postData, setPostData]=useState({
        firstName:'',
        lastName:'',
        dob:"2024-01-10",
        mobile:"",
        password:"",
        emailId:""
    })

    const handleValue =(e)=>{
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value
    });
    }

    const handleSubmit=(e)=>{
        let count=0;
        if (!postData.firstName) {
            setFerror('Please fill out this field');
        } else {
            setFerror('');
            count++;
        }
        if (!postData.lastName) {
            setLerror('Please fill out this field');
        } else {
            setLerror('');
            count++;
        }
        if (!postData.mobile) {
            setCerror('Please fill out this field');
        } else {
            setCerror('');
            count++;
        }
        if (!postData.emailId) {
            setEmailError('Please fill out this field');
        } else {
            setEmailError('');
            count++;
        }
        if (!postData.password) {
            setPassError('Please fill out this field');
        } else {
            setPassError('');
            count++;
        }
        e.preventDefault();
        if(count===5)
            axios.post('http://localhost:8080/users/register',postData)
            .then((response)=>{ 
                const code=response?.status;
                if (code===200)
                    setSuccess(true);
            }).catch((err)=>{
                setError(true);
            });

    }

    return(
        <>
            <div>
            <FormControl>
                <InputLabel htmlFor="firstname">First name</InputLabel>
                <Input id="fname" type="text" name="firstName" value= {postData.firstName} onChange={handleValue} />
                {ferror && <FormHelperText style={{color:'red'}}>{ferror}</FormHelperText>}
            </FormControl><br></br>
            <FormControl>
                <InputLabel htmlFor="lastname">Last name</InputLabel>
                <Input id="lname" type="text" name="lastName" value={postData.lastName} onChange={handleValue} />
                {lerror && <FormHelperText style={{color:'red'}}>{lerror}</FormHelperText>}
            </FormControl><br></br>
            <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" type="email" name="emailId" value= {postData.emailId} onChange={handleValue} />
                {emailError && <FormHelperText style={{color:'red'}}>{emailError}</FormHelperText>}
            </FormControl><br></br>
            <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" name="password" value={postData.password} onChange={handleValue} />
                {passError && <FormHelperText style={{color:'red'}}>{passError}</FormHelperText>}
            </FormControl><br></br>
            <FormControl>
                <InputLabel htmlFor="contact">Contact Number</InputLabel>
                <Input id="contact" type="text" name="mobile" value={postData.mobile} onChange={handleValue} />
                {cError && <FormHelperText style={{color:'red'}}>{cError}</FormHelperText>}
            </FormControl><br></br><br></br>
                <Button variant="contained" color="primary" onClick={handleSubmit}>REGISTER</Button><br></br>
                {success && <Typography variant="body1" color="primary">Registration successful!!! Please go to login page</Typography>}
                {error && <Typography variant="body1" color="error">Something went wrong!!! Please try again</Typography>}
            </div>
        </>
    )
}