const express = require('express');
const fetchuser = require('../middleWare/fetchuser');
const router = express.Router();
const multer = require('multer');
const { addstudent, getAllStudents, getStudentByID, getStudentWithSerchandPagination, updateStudentwithID, deleteStudent } = require('../Controller/studentController');

// For image Uplod
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
});

const uploadOptions = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }
});

// Add Student
router.post('/add', fetchuser, uploadOptions.single('image'), addstudent);

// Get StudentList 
router.get('/getstudents', getAllStudents)

// Get Student data with  _ID 
router.get('/:id', getStudentByID);

// Get Student with Search and Pagination 
router.get('', getStudentWithSerchandPagination);
// http://localhost:8080/api/student/all?search=$"'&page=$1&limit=$1

// Update Student with ID 
router.put('/update/:id', fetchuser, updateStudentwithID)

// Delete Student 
router.delete('/delete/:id', fetchuser, deleteStudent)

module.exports = router
  