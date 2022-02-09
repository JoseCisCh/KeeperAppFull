import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {callBackendAPI, selectAllNotes, addNote, deleteNote} from "../callBackend";

function App() {
  const [notes, setNotes] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    callBackendAPI()
    .then(res => setData(res.express))
    .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    selectAllNotes()
    .then(res => setNotes(res))
    .catch(err => console.log(err));

    console.log("Notes " + notes)
  }, [notes]);
  

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
