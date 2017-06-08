const express = require('express');
const app = express();
const multer = require('multer');
const fileDir = './uploads/';
const port = process.env.PORT || 3000;
const fs = require('fs');


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', multer({ dest: fileDir }).single('upl'), (req, res) => {
    if (req.file) res.json({ size: req.file.size });
    else res.json({ error: 'Error uploading file' });
    deleteFiles();
})

function deleteFiles() {
    fs.readdir(fileDir, (err, files) => {
        if (err) return console.log(err);
        files.forEach(file => {
            fs.unlink(fileDir+file);
        })
        console.log('Files deleted');
    })
}

app.listen(port, () => {
    console.log('Server started on port ' + port + '.');
});

