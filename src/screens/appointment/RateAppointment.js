import React ,{ useContext, useState } from "react"
import AuthContext from "../../common/AuthProvider"
import { Box, Button, FormControl, TextField, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import axios from "axios";

export default function RateAppointment({rate}){

    const{ auth }=useContext(AuthContext);
    const endpoint='/ratings';
    const headers={ 'Authorization': 'Bearer '+auth.token};

    const[rateFill, setRateFill]=useState(0);
    const[cmt, setCmt]=useState('');
    const[success,setSuccess]=useState('');
    const[ratingError, setRatingError]=useState(false);

    const handleSubmitRating=(e)=>{
        e.preventDefault();

        const ratePost={
        appointmentId:rate.appointmentId,
        doctorId:rate.doctorId,
        rating:rateFill,
        comments:cmt
    }

    if(rateFill===0)
    {
        setRatingError(!ratingError);
    }
    else
    {
        setRatingError(false);
        console.log(ratePost);
        axios.post("http://localhost:8080"+endpoint, ratePost ,{headers})
        .then((response)=> {console.log("rate:",response.data)
            setSuccess(response?.status);
        });
    }
}

    return(
        <>
        <header style={{textAlign:'center', backgroundColor:'purple', fontSize:'25px'}}>Rate an Appointment</header><br></br>
            <div>
                <Box>
                    <FormControl>
                        <TextField
                        name="cmt"
                        label="Comments"
                        value={cmt}
                        multiline
                        onChange={(e)=>{setCmt(e.target.value)}}
                        rows={4}
                        />
                    </FormControl><br></br><br></br>
                    <FormControl>
                        <Typography>Rating: <Rating name="rating" value={rateFill} size="small" onChange={(event,newValue)=>{setRateFill(newValue);}} /></Typography>
                    </FormControl><br></br><br></br>
                    {ratingError && <Typography color="error">Select a Rating</Typography>}
                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmitRating}>RATE APPOINTMENT</Button>
                    <br></br><br></br>
                    {success===200 && <Typography variant="body1" color="initial">Thank you for your rating</Typography>}
                </Box>
            </div>
        </>
    )
}