const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/keeperApp");

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Note = mongoose.model("Note", noteSchema);

app.get("/express-backend", (req, res) => {
    res.send({ express: 'Express backend is connected to react' });
})

app.get("/notes", (req,res) => {
    Note.find({}, (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.post("/newNote", (req, res) => {
    console.log("Adding new note");
    console.log(req.body);
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });

    console.log(note);

    note.save((err)  => {
        if(err) {
            console.log(err);
        } else {
             
        }
    })
})

app.delete("/deleteNote", (req, res) => {
    Note.deleteOne({_id: req.body.id}, (err) => {
        if(err){
            console.log(err);
        } else {
            res.send("Successfull");
        }
    })
})

app.listen(5000, () => {
    console.log("Listening at port 5000");
})