import { Box, Button, Paper, Typography } from "@material-ui/core";
import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../common/AuthProvider";
import RateAppointment from "./RateAppointment";
import Modal from 'react-modal';

export default function Appointment(){

    

    const customStyles = {
        content: {
        boxShadow: "2px solid black",
        height: 350,
        width: 500,
        margin: "auto",
        color: "black",
        },
      };

    const{auth}=useContext(AuthContext);

    const endpoint="users/"+auth.email+"/appointments";
    const url="http://localhost:8080/"+endpoint;
    const headers={ 'Authorization': 'Bearer '+auth.token };

    const[getAllSpeciality, setGetAllSpeciality]=useState([]);
    const[isModal, setIsModal]=useState(false);
    const[rateAppointment, setRateAppointment]=useState([]);
    const[loading, setLoading]=useState(true);    

    function getAppointment(url, headers){
        axios.get(url,{headers})
        .then((response)=> {
            setGetAllSpeciality(response.data);
            setLoading(false);
        })
    }

    if(loading)
        getAppointment(url, headers);

    const handleRatingSubmit=(rate)=>{
        setIsModal(!isModal);
        setRateAppointment(rate);
    }

    return(
        <>
            {auth.statusCode===200 ? 
            <div>
            {loading && <div style={{ padding:'17%'}}><Typography variant="h4">Loading... Checking your appointment</Typography></div>}
            {!loading && getAllSpeciality.length===0 ? <div style={{ padding:'17%'}}><Typography variant="h4">Your appointment has not been booked</Typography></div>
            : getAllSpeciality.map((keys,index)=>(
                <Box key={index} style={{textAlign:'start', marginLeft:'1%', marginRight:'1%'}}>
                    <Paper key={index} style={{paddingLeft:'2%', paddingBottom:'1%'}}>
                    <Typography>Dr.{keys.doctorName}</Typography>
                    <Typography>Date: {keys.appointmentDate}</Typography>
                    <Typography>symptoms: {keys.symptoms}</Typography>
                    <Typography>priorMedicalHistory: {keys.priorMedicalHistory}</Typography>
                    <Button type="submit" variant="contained" color="primary" size="small" onClick={()=>{handleRatingSubmit(keys)}}>RATE APPOINTMENT</Button>
                    </Paper>
                    <br></br>
                    <Modal isOpen={isModal} onRequestClose={()=>setIsModal(!isModal)} style={customStyles} key={index}>
                        <RateAppointment rate={rateAppointment} />
                    </Modal>
                    
                </Box>
            ))}
            </div>: <div style={{padding:'2%'}}><Typography variant="h5">Login to see appointment</Typography></div>}
        </>
    )
}