import Button from '@material-ui/core/Button';
import '../header/Header.css';
import { useContext, useState } from 'react';
import Logo from '../../assets/logo.jpeg';
import Modal from 'react-modal';
import { Card, Tab, Tabs } from '@material-ui/core';
import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';
import AuthContext from '../AuthProvider';

export default function Header({checkLogin, checkLogout}){
    const customStyles = {
        content: {
            position: "absolute",
            border: "2px solid #000",
            boxShadow: "2px solid black",
            height: 400,
            width: 350,
            margin: "auto",
            padding: "2%",
            color: "black",
        },
      };

    const[tabValue, setTabValue]=useState(0);
    const{ auth, setAuth }=useContext(AuthContext);


    const openModal = () => checkLogout(true);
    const closeModal = () => checkLogout(false);
    if(auth.statusCode===200){
        checkLogout(false)
    }

    const handleLogout =()=>{
        setAuth({name:'',email:'', statusCode:'',token:''})
    };

    const handleTab=(e, newValue)=>setTabValue(newValue);
    return(
        <>
            <header className='head_page'>
                <div className='flex_set'>
                    <div className='img_div'>
                        <img src={Logo} alt='doctor_logo' className='logo_img' />
                        <label>Doctor Finder</label>
                    </div>
                    <div className='img_div'> 
                        {auth.statusCode===200 ? <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button> :
                        <Button variant="contained" color="primary"  onClick={openModal}>Login</Button>}
                    </div>
                </div>
            </header>
            <Modal isOpen={checkLogin} onRequestClose={closeModal} style={customStyles} id='modal_page'>
                <Card>
                    <Tabs value={tabValue} onChange={handleTab} >
                        <Tab label="LOGIN" />
                        <Tab label="REGISTER" />
                    </Tabs>
                    <div id='tab_div'>
                        {tabValue===0 && <Login />}
                        {tabValue===1 && <Register />}
                    </div>
                </Card>
            </Modal>
        </>
  );
}