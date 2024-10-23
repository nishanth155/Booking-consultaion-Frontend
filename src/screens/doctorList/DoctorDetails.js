import { Box, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

export default function DoctorDetails({detailDoc}){

    return(
        <>
        <header style={{textAlign:'center', backgroundColor:'purple', fontSize:'25px'}}>Doctor Detail</header>
            <Box>
                <Typography variant="h6">Dr.{detailDoc.firstName} {detailDoc.lastName}</Typography>
                <Typography>Total Experience:{detailDoc.totalYearsOfExp} years</Typography>
                <Typography>Speciality: {detailDoc.speciality}</Typography>
                <Typography>Date of Birth: {detailDoc.dob}</Typography>
                <Typography>City: {detailDoc.address.city}</Typography>
                <Typography>Email: {detailDoc.emailId}</Typography>
                <Typography>Mobile: {detailDoc.mobile}</Typography>
                <Typography>Rating: <Rating defaultValue={detailDoc.rating}readOnly size="small"/></Typography>
            </Box>
        </>
    );
}