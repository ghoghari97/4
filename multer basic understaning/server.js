var express = require("express")
var app = express();
var multer = require("multer");
var path = require("path");

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
        // cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        // cb(null,Date.now() + '--' + file.originalname);
        cb(null,file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
})
app.post("/single" ,upload.single("image"), (req,res)=>{
    console.log(req.file);
    // res.render('Book');
    res.send("single file upload")
});

app.post("/multiple" ,upload.array('images',3), (req,res)=>{
    console.log(req.files);
    // res.render('Book');
    res.send("file upload")
});

app.listen(5000);