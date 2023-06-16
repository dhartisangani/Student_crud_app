import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AddnewStudent } from "../../Types/Type";
import StudentForm from "../../Common/Student/StudentForm";
import instance from "../../Services/AxiosInterCeptors";
import { API_BASE_URL, UPDATE_STUDENT } from "../../Configs/AppConfig";

const EditStudent = () => {
  const [loading, setLoading] = useState(false);
  const { _id } = useParams<{ _id: string }>();
  const [studentData, setStudentData] = useState<AddnewStudent>({
    studentid: "",
    imgUrl: "",
    fullname: "",
    birthdate: "",
    gender: "",
    standard: "",
    fathername: "",
    Fatheroccupation: "",
    mothername: "",
    email: "",
    phone: 0,
    nationality: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await instance.get(`${API_BASE_URL}/${_id}`);
        const json = await response.data;
        setStudentData(json);
      } catch (error) {
        console.error("eroor");
      }
    };

    fetchStudentData();
  }, [_id]);

  const handleSubmit = async (values: AddnewStudent) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.put(
        `${UPDATE_STUDENT}${_id}`,
        values,
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
      setLoading(false);
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
