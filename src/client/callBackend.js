const callBackendAPI = async () => {
    const response = await fetch('/express-backend');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

const selectAllNotes = async () => {
    const response = await fetch('/notes');
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message); 
    }

    return body;

}

async function addNote(newNote) {
    console.log(newNote);
    const response = await fetch("/newNote", {
    method: 'post',
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(newNote),
    headers: {
        'Content-Type': 'application/json'
        //'Content-Type': 'application/x-www-form-urlencoded',
    }
    
    })
    .then(response => response.json())
    .then(data => console.log("Success: ", data))
    .catch(error => console.error("Error: ", error));
    console.log(response); 

    return response.json();
    
}

async function deleteNote(id) {

    const noteToDelete = {id: id};

    const response = await fetch("/deleteNote", {
        method: 'delete',
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(noteToDelete),
            headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .catch(error => console.error("Error: ", error));
      
  }
export {callBackendAPI, selectAllNotes, addNote, deleteNote};