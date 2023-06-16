import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import Helmet from "./Common/Helmet/Helmet";
import ProtectedRoute from "./Route/ProtectedRoute";
import SignUp from "./Component/Signup/SignUp";
import AllStudents from "./Component/Students/AllStudents";
import AddStudents from "./Component/Students/AddStudents";
import EditStudent from "./Component/Students/EditStudent";
import SignIn from "./Component/SignIn/SignIn";
import Navbar from "./Component/Header/Navbar";
import StudentData from "./Component/Students/Student Data/StudentData";

const App = () => {
  return (
    <>
      {/* {isLoggedIn ? ( */}
      <Helmet title={"2023"}>
        <ProtectedRoute>
          <Navbar />
        </ProtectedRoute>
        <Container maxWidth="xl">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AllStudents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/add"
              element={
                <ProtectedRoute>
                  <AddStudents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/edit/:_id"
              element={
                <ProtectedRoute>
                  <EditStudent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/:_id"
              element={
                <ProtectedRoute>
                  <StudentData />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Container>
      </Helmet>
    </>
  );
};

export default App;
