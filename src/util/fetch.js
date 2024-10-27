import { useContext, useEffect, useState } from "react"
import axios from "axios";
import AuthContext from "../common/AuthProvider";

let baseUrl="http://localhost:8080/";

export const useGetAllData =(probs)=>{
    
    const[getAllSpeciality,setgetAllSpeciality]=useState([]);
    const[getSpeciality,setgetSpeciality]=useState([]);

    useEffect(()=>{
        axios.get(baseUrl+probs)
        .then((response)=> {setgetAllSpeciality(response.data);
        });
        axios.get(baseUrl+"doctors/speciality")
        .then((response)=> {setgetSpeciality(response.data);
        });
    },[probs])

    return{
        getAllSpeciality,
        getSpeciality,
    };
};

// export const PostLogin=({user, pass})=>{

//     const { setAuth }=useContext(AuthContext);

//     const[success, setSuccess]=useState(0);
//     const[error, setError]=useState(0);
    
//     axios.post(baseUrl+"auth/login",{},{
//         auth: {
//             username: user,
//             password: pass
//       }
//     }).then((response)=>{
//         console.log("postlogin",response)
//         const name=response?.data?.firstName;
//         const statusCode=response?.status;
//         const email=response?.data?.emailAddress;
//         setSuccess(statusCode);
//         const token= response?.data?.accessToken;
//         setAuth({name, email, statusCode, token})
//     }).catch((err)=>{
//         setError(err?.status);
//     });
//     return{
//         success,
//         error
//     }
// }

// export const PostUrl=(endpoint, payload)=>{
//     const{auth}=useContext(AuthContext);
//     const headers={ 'Authorization': 'Bearer '+auth.token};
//     const[status, setStatus]=useState(0);
//     const[error, setError]=useState(0);

//     axios.post(baseUrl+endpoint,{payload},{headers})
//     .then((response)=>{
//         // const code=response?.status;
//         setStatus(response?.status);
//     }).catch((err)=>{
//         // const ecode=err?.status;
//         setError(err?.status);
//     });

//     return{
//         status,
//         error,
//     };
// }

export default useGetAllData;