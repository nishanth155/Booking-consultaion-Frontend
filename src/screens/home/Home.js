import { Tab, Tabs, Box, Card } from "@material-ui/core";
import Header from "../../common/header/Header";
import '../home/Home.css';
import DoctorList from "../doctorList/DoctorList";
import Appointment from "../appointment/Appointment";
import { useState } from "react";

export default function Home({baseUrl}){
    const customStyles = {
        content: {
          position: "absolute",
                    border: "2px solid #000",
                    boxShadow: "2px solid black",
                    height: 150,
                    width: 300,
                    margin: "auto",
                    padding: "2%",
                    color: "black",
        },
      };

    const[login,logout]=useState(false);
    const[tabValue, setTabValue]=useState(0);
    const handleTab=(e, newValue)=>setTabValue(newValue);
    return(
        <>
            <Header checkLogin={login} checkLogout={logout}/>
            <Box className="box_tab" style={{customStyles}}>
                <Card >
                    <Tabs value={tabValue} onChange={handleTab}>
                        <Tab label="DOCTORS"  className="tab_label"/>
                        <Tab label="APPOINMENTS" className="tab_label"/>
                    </Tabs>
                    <div id='tab_div'>
                        {tabValue===0 && <DoctorList />}
                        {tabValue===1 && <Appointment />}
                    </div>
                </Card>
            </Box>
        </>
    );
}