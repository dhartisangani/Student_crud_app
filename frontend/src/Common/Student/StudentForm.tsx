import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddnewStudent } from "../../Types/Type";
import { MenuItem } from "@material-ui/core";

interface StudentFormProps {
  initialValues: AddnewStudent;
  onSubmit: (values: AddnewStudent) => void;
}

const validationSchema = Yup.object().shape({
  studentid: Yup.string().required("Student ID is required"),
  fullname: Yup.string().required("Full Name is required"),
  birthdate: Yup.string().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  standard: Yup.string().required("Standard is required"),
  fathername: Yup.string().required("Father's Name is required"),
  Fatheroccupation: Yup.string().required("Father's Occupation is required"),
  mothername: Yup.string().required("Mother's Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Invalid email format Ex. yourname@gmail.com"
    ),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]+$/, "Phone number should contain only digits")
    .min(10, "Phone number should be 10 digits long")
    .max(10, "Phone number should be 10 digits long"),
  nationality: Yup.string().required("Nationality is required"),
});

const StudentForm: React.FC<StudentFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    console.log(file);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  // enctype="multipart/form-data"
  // <form onSubmit={formik.handleSubmit} encType="multipart/form-data">

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <Grid container spacing={1} mb={5} mt={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            margin="dense"
            size="small"
            label="Student ID"
            name="studentid"
            type="text"
            value={formik.values.studentid}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.studentid && formik.errors.studentid)}
            helperText={
              formik.touched.studentid && formik.errors.studentid
                ? String(formik.errors.studentid)
                : ""
            }
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            margin="dense"
            name="imgUrl"
            type="file"
            // value={formik.values.imgUrl}
            onChange={handleFileChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.imgUrl && formik.errors.imgUrl)}
            helperText={
              formik.touched.imgUrl && formik.errors.imgUrl
                ? String(formik.errors.imgUrl)
                : ""
            }
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "7%", marginTop: 10 }}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            label="Full Name"
            name="fullname"
            type="text"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.fullname && formik.errors.fullname)}
            helperText={
              formik.touched.fullname && formik.errors.fullname
                ? String(formik.errors.fullname)
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            margin="dense"
            size="small"
            // label="Date of Birth"
            name="birthdate"
            type="date"
            value={formik.values.birthdate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.birthdate && !!formik.errors.birthdate}
            helperText={
              formik.touched.birthdate && formik.errors.birthdate
                ? String(formik.errors.birthdate)
                : ""
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            label="Standard"
            name="standard"
            type="text"
            value={formik.values.standard}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.standard && formik.errors.standard)}
            helperText={
              formik.touched.standard && formik.errors.standard
                ? String(formik.errors.standard)
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            label="Gender"
            name="gender"
            type="text"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.gender && formik.errors.gender)}
            helperText={
              formik.touched.gender && formik.errors.gender
                ? String(formik.errors.gender)
                : ""
            }
            select
          >
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="male">Male</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            label="Father's Name"
            name="fathername"
            type="text"
            value={formik.values.fathername}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.fathername && formik.errors.fathername)}
            helperText={
              formik.touched.fathername && formik.errors.fathername
                ? String(formik.errors.fathername)
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            label="Father's Occupation"
            name="Fatheroccupation"
            type="text"
            value={formik.values.Fatheroccupation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              !!(
                formik.touched.Fatheroccupation &&
                formik.errors.Fatheroccupation
              )
            }
            helperText={
              formik.touched.Fatheroccupation && formik.errors.Fatheroccupation
                ? String(formik.errors.Fatheroccupation)
                : ""
            }
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            label="Mother's Name"
            name="mothername"
            type="text"
            value={formik.values.mothername}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.mothername && formik.errors.mothername)}
            helperText={
              formik.touched.mothername && formik.errors.mothername
                ? String(formik.errors.mothername)
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            label="Email"
            name="email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.email && formik.errors.email)}
            helperText={
              formik.touched.email && formik.errors.email
                ? String(formik.errors.email)
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            label="Mobile No."
            name="phone"
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={!!(formik.touched.phone && formik.errors.phone)}
            helperText={
              formik.touched.phone && formik.errors.phone
                ? String(formik.errors.phone)
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            margin="dense"
            label="Nationality"
            name="nationality"
            type="text"
            value={formik.values.nationality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.nationality && formik.errors.nationality)}
            helperText={
              formik.touched.nationality && formik.errors.nationality
                ? String(formik.errors.nationality)
                : ""
            }
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default StudentForm;
