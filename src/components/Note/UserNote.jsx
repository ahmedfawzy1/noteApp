import React, { useContext } from "react";
import { NoteContext } from "../Context/NotesContext";
import axios from "axios";

export default function UserNote() {
  let { getUserNote, getUserNotes } = useContext(NoteContext);

  let headers = {
    token: `3b8ny__${localStorage.getItem("userToken")}`,
  };

  function editNote(id) {
    console.log(id);
  }
  function deleteNote(id) {
    return axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, { headers })
      .then((res) => getUserNote())
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="container">
        <div className="row g-3">
          {getUserNotes.map((note) => (
            <div className="col-md-4" key={note._id}>
              <div className="noteCard p-3 bg-white rounded-4">
                <div className="title">
                  <p className="">{note.title}</p>
                  <p>{note.content}</p>
                </div>
                <div className="icons d-flex justify-content-between">
                  <button onClick={() => editNote(note._id)} className="btn">
                    <i className="fa-solid fa-pen-to-square me-3 fs-4 " style={{ color: "#0dcaf0" }}></i>
                  </button>
                  <button onClick={() => deleteNote(note._id)} className="btn">
                    <i className="fa-solid fa-trash fs-4" style={{ color: "#0dcaf0" }}></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
