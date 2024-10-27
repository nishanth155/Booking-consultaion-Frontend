import { useContext, useState } from "react";
import {Button, FormControl, Input, InputLabel, MenuItem, Paper, Select, Typography } from "@material-ui/core";
import AuthContext from "../../common/AuthProvider";
import axios from "axios";
 
export default function BookAppointment({booking,baseurl}){

    const timeSlot=["12AM-1AM","1AM-2AM","2AM-3AM","3AM-4AM","4AM-5AM","5AM-6AM","6AM-7AM","7AM-8AM","8AM-9AM","9AM-10AM","10AM-11AM",
        "11AM-12PM","12PM-1PM","1PM-2PM","2PM-3PM","3PM-4PM","4PM-5PM","5PM-6PM","6PM-7PM","7PM-8PM","8PM-9PM","9PM-10PM","10PM-11PM",
        "11PM-12AM"];

    const{auth}=useContext(AuthContext);

    const endpoint="appointments";
    const headers={ 'Authorization': 'Bearer '+auth.token};

    const[booked, setBooked] = useState(0);
    const[status, setStatus] = useState(0);

    const[fillPost, setFillPost]=useState({
        appointmentDate:'2024-11-01',
        timeSlot: '',
        priorMedicalHistory: '',
        symptoms: ''
    });

    const handleValue =(e)=>{
        const { name, value } = e.target;
        setFillPost({
            ...fillPost,
            [name]: value
    });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingPost={
            doctorId: booking.id,
            doctorName: booking.firstName+" "+booking.lastName,
            userId: auth.email,
            userName: auth.name,
            userEmailId: auth.email,
            timeSlot: fillPost.timeSlot,
            appointmentDate: fillPost.appointmentDate,
            createdDate: '',
            symptoms: fillPost.symptoms,
            priorMedicalHistory: fillPost.priorMedicalHistory
        };

        axios.post("http://localhost:8080/"+endpoint,bookingPost,{headers})
        .then((response)=>{
            setStatus(response?.status);
        }).catch((err)=>{
            setBooked(err?.status);
        });
    };
    if(booked===400)
        alert("This slot is not unavailable...Please try another slot")

    return(
        <>
            {auth.statusCode===200 ?
            <div>
                <header style={{textAlign:'center', backgroundColor:'purple', fontSize:'25px', color:'white'}}>Book Appointment</header><br></br><br></br>
                <Paper>
                    <FormControl>
                        <Input id="docName" type="text" name="doctorName" value={"Dr."+booking.firstName+" "+booking.lastName} disabled/>
                    </FormControl>
                    <br></br><br></br>
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justifyContent="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                format="dd/MM/yyyy"
                                name="appointmentDate"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={selectedDate}
                                onChange={handleDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }} />
                        </Grid>
                    </MuiPickersUtilsProvider> */}
                    <FormControl>
                        <Input id="medical" type="Date" name="appointmentDate" value={fillPost.appointmentDate} onChange={handleValue} />
                    </FormControl>
                    <br></br><br></br>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="time-slot-label">Select Time Slot</InputLabel>
                        <Select
                            labelId="time-slot-label"
                            id="time-slot"
                            name="timeSlot"
                            value={fillPost.timeSlot}
                            onChange={handleValue}
                            label="Select Time Slot"
                        >
                            {timeSlot.map((slot, index) => (
                            <MenuItem key={index} value={slot}>
                                {slot}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="MedicalHistory">Medical History</InputLabel>
                        <Input id="medical" type="text" name="priorMedicalHistory" value={fillPost.priorMedicalHistory} onChange={handleValue} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="symptoms">Symptoms</InputLabel>
                        <Input id="symptoms" type="text" name="symptoms" value={fillPost.symptoms} onChange={handleValue} />
                    </FormControl><br></br><br></br>
                    {status!==200 && <><Button type="submit" color="primary" variant="contained" onClick={handleSubmit} style={{ margin: '10px' }}>BOOK APPOINTMENT</Button><br></br></>}
                    {status===200 && <Typography variant="h6" color="primary">The appointment is booked!!!</Typography>}
                </Paper>
            </div> : <div><Typography variant="h5">Login to see Booking Appointment</Typography></div>}
        </>
    )
}