import { Divider, FormControl, Typography, InputLabel, Select, MenuItem, Box, Button, Card } from "@material-ui/core";
import Modal from 'react-modal';
import {Rating } from "@material-ui/lab"
import { useState } from "react";
import DoctorDetails from "./DoctorDetails";
import BookAppointment from "./BookAppointment";
import { useGetAllData } from "../../util/fetch";

export default function DoctorList(){


    const customStyles = {
        content: {
            position: "absolute",
            // border: "2px solid #000",
            // boxShadow: "2px solid black",
            height: 450,
            width: 350,
            margin: "auto",
            // padding: "2%",
            color: "black",
        },
      };

    const[select,setSelect]=useState("");
    const[isModal, setIsModal]=useState(false);
    const[isView, setIsView]=useState(false);
    let endpoint;
    const[bookAppointment, setbookAppointment]=useState([]);
    const[listDetail, setListDetail]=useState([]);

    const handleBookAppointment=(appointment)=>{
        setIsModal(!isModal);
        setbookAppointment(appointment);
    };

    const handleViewDetail=(detail)=>{
        setIsView(!isModal);
        setListDetail(detail);
    };

    const handleSelect=(e)=>{
        setSelect(e.target.value);
    };

    if(select)
        endpoint="doctors?speciality="+select;
    else
        endpoint="doctors"

    const{getAllSpeciality, getSpeciality}=useGetAllData(endpoint);
    
    return(
    <>
    <div >
        <Box>
            <FormControl style={{width: '500px'}}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">Select Speciality</InputLabel>
                <Select value={select} onClick={handleSelect}>
                    <MenuItem value=''>None</MenuItem>
                    {getSpeciality.map((key, index)=>(<MenuItem value={key}key={index}>{key}</MenuItem>))}
                </Select>
            </FormControl>
        </Box>
        <br></br>
    {getAllSpeciality.map((list, index)=>(
        <Box key={index} style={{textAlign: 'start'}}>
            <Card key={index} style={{paddingLeft:'2%'}}>
                <Typography variant="h6">Doctor Name: {list.firstName}</Typography>
                <br></br>
                <Typography variant="body1">Speciality: {list.speciality}</Typography>
                <Typography variant="body1">Rating: <Rating defaultValue={list.rating}readOnly size="small"/></Typography>
                <Button type="button" variant="contained" color="primary" size="small" onClick={()=>{handleBookAppointment(list)}}>BookAppointment</Button>
                <Button type="button" variant="contained" color="secondary" size="small" onClick={()=>{handleViewDetail(list)}}>View Details</Button>
                <br></br><br></br>
            </Card>
            <Modal isOpen={isModal} onRequestClose={()=>setIsModal(!isModal)} style={customStyles} key={index}>
                <Card>
                        <BookAppointment booking={bookAppointment} />
                </Card>
            </Modal>
            <Modal isOpen={isView} onRequestClose={()=>setIsView(!isView)} style={customStyles} key={index}>
                <Card>
                        <DoctorDetails key={index} detailDoc={listDetail}/>
                </Card>
            </Modal>
            <Divider />
        </Box>
    ))}
    </div>
    </>)
}