import { Box, Button, Card, Divider, Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../common/AuthProvider";
import RateAppointment from "./RateAppointment";
import Modal from 'react-modal';

export default function Appointment(){

    const customStyles = {
        content: {
          position: "absolute",
                    border: "2px solid #000",
                    boxShadow: "2px solid black",
                    height: 350,
                    width: 300,
                    margin: "auto",
                    // padding: "2%",
                    color: "black",
        },
      };

    const{auth}=useContext(AuthContext);

    const endpoint="users/"+auth.email+"/appointments";
    const headers={ 'Authorization': 'Bearer '+auth.token };

    const[getAllSpeciality, setGetAllSpeciality]=useState([]);
    const[isModal, setIsModal]=useState(false);
    const[rateAppointment, setRateAppointment]=useState([]);
    const[loading, setLoading]=useState(true);

    useEffect(()=>{
        const time =setTimeout(()=>{axios.get("http://localhost:8080/"+endpoint, {headers})
        .then((response)=> {
            setGetAllSpeciality(response.data);
            setLoading(false);
        })},3000);
        return()=>clearTimeout(time);

    },[endpoint,headers]);

    const handleRatingSubmit=(rate)=>{
        setIsModal(!isModal);
        setRateAppointment(rate);
    }

    return(
        <>
            {auth.statusCode===200 ? 
            <div>
                {loading && <div><Typography variant="h6">Loading... Checking your appointment</Typography></div> }
            {!loading && getAllSpeciality.map((keys,index)=>(
                <Box key={index} style={{textAlign:'start'}}>
                    <Typography>Dr.{keys.doctorName}</Typography>
                    <Typography>Date: {keys.appointmentDate}</Typography>
                    <Typography>symptoms: {keys.symptoms}</Typography>
                    <Typography>priorMedicalHistory: {keys.priorMedicalHistory}</Typography>
                    <Card key={index}>
                        <Button type="submit" variant="contained" color="primary" size="small" onClick={()=>{handleRatingSubmit(keys)}}>RATE APPOINTMENT</Button>
                    </Card><br></br>
                    <Modal isOpen={isModal} onRequestClose={()=>setIsModal(!isModal)} style={customStyles} key={index}>
                        <Card>
                            <div>
                                <RateAppointment rate={rateAppointment} />
                            </div>
                        </Card>
                    </Modal>
                    <Divider /><br></br><br></br>
                </Box>
            ))}
            </div>: <div><Typography variant="h5">Login to see appointment</Typography></div>}
        </>
    )
}