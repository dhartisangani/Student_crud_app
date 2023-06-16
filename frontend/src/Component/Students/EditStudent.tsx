import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AddnewStudent } from "../../Types/Type";
import StudentForm from "../../Common/Student/StudentForm";

const EditStudent = () => {
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<AddnewStudent>({
    studentid: "",
    imgUrl: "",
    fullname: "",
    birthdate: 0,
    gender: "",
    standard: "",
    fathername: "",
    Fatheroccupation: "",
    mothername: "",
    email: "",
    phone: 0,
    nationality: "",
  });
  const { studentId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStudentData = async () => {
      // Fetch the student data using the studentId
      // Set the retrieved data into studentData state
    };

    fetchStudentData();
  }, [studentId]);

  const handleSubmit = async (values: AddnewStudent) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/school/student/edit",
        {
          studentId,
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = response.data;
      console.log(data);

      setLoading(false);
      console.log("Submitted form:", values);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container spacing={1} mb={5} mt={5}>
      <Grid item xs={12} md={12} sm={12} m={5} justifyContent={"center"}>
        <Typography variant="h5" gutterBottom>
          Edit Student Details
        </Typography>
        <StudentForm initialValues={studentData} onSubmit={handleSubmit} />
      </Grid>
    </Grid>
  );
};

export default EditStudent;
