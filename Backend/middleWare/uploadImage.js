const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({ storage: multerStorage });

const uploadImage = upload.single('imgUrl');

module.exports = uploadImage;
