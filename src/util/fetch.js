import { useEffect, useState } from "react"
import axios from "axios";

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

// export const PostLogin=(user, pass)=>{

//     const[datas, setDatas]=useState([]);
//     // var datas=[];
//     console.log("postlogin",datas)
    
//     axios.post(baseUrl+"auth/login",{},{
//         auth: {
//             username: user,
//             password: pass
//       }
//     }).then((response)=>{const res= response;
//         setDatas(res)
//     });
//     return{
//         datas
//     }
// }

export default useGetAllData;