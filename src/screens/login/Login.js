import { Box, FormControl, FormHelperText, Input, InputLabel, Typography} from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../common/AuthProvider";
export default function Login(){

    const{ setAuth }=useContext(AuthContext);

    const[username, setUsername]=useState('test13@gmail.com');
    const[password, setPassword]=useState('12345678');
    const[emailError, setEmailError]=useState('');
    const[passError, setPassError]=useState('');
    const[isSuccess,setIsSuccess]=useState(false);
    const[errorCode, setErrorCode]=useState(0);

    const handleSubmit=(e)=>{
        if (!username) {
            setEmailError('Please fill out this field');
        } else {
            setEmailError('');
        }
        if (!password) {
            setPassError('Please fill out this field');
        } else {
            setPassError('');
        }
        e.preventDefault();
        axios.post('http://localhost:8080/auth/login',{},{
            auth: {
                username: username,
                password: password
          }
        }
        )
        .then((response)=>{
            const name=response?.data?.firstName;
            const statusCode=response?.status;
            const email=response?.data?.emailAddress;
            if(statusCode===200){
                setIsSuccess(!isSuccess);
            }
            const token= response?.data?.accessToken;
            setAuth({name, email, statusCode, token})
        }).catch((err)=>{
            setErrorCode(err?.status);
        });
    }
        // if(isSuccess)
        // {
        //     alert("Login Successful!!!")
        // }

    return(
        <>
            <div>
                <Box>
                    <FormControl>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" type="email" value= {username} onChange={e=>setUsername(e.target.value)}/>
                        {emailError && <FormHelperText style={{color:'red'}}>{emailError}</FormHelperText>}
                    </FormControl><br></br>
                    <FormControl >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                        {passError && <FormHelperText style={{color:'red'}}>{passError}</FormHelperText>}
                    </FormControl><br></br><br></br>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>LOGIN</Button><br></br><br></br>
                    {!emailError && !passError && errorCode===401 && <Typography variant='body1' color="error">Your account is not Registered</Typography>}
                    {errorCode===500 && <Typography variant='body1' color="error">Something went wrong!!!</Typography>}
                </Box>
            </div>
        </>
    )

}