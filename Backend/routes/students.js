const express = require('express');
const fetchuser = require('../middleWare/fetchuser');
const router = express.Router();
const multer = require('multer');
const { addstudent, getAllStudents, getStudentByID, getStudentWithSerchandPagination, updateStudentwithID, deleteStudent } = require('../Controller/studentController');
;
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./images")
    },
    filename: (req, file, callback) => {
        callback(null, `imgae-${Date.now()}. ${file.originalname}`)
    }
})


// img filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(new Error("only images is allowd"))
    }
}

const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
});

// Add Student
// const upload = multer({ storage: storage });

router.post('/add', fetchuser, upload.single('imgUrl'), addstudent);

// Get StudentList 
router.get('/getstudents', fetchuser,getAllStudents)

// Get Student data with  _ID 
router.get('/:id',fetchuser, getStudentByID);

// Get Student with Search and Pagination 
router.get('',fetchuser, getStudentWithSerchandPagination);
// http://localhost:8080/api/student/all?search=$"'&page=$1&limit=$1

// Update Student with ID 
router.put('/update/:id', fetchuser, updateStudentwithID)

// Delete Student 
router.delete('/delete/:id', fetchuser, deleteStudent)

module.exports = router
