import React, { useContext } from "react";
import { NoteContext } from "../Context/NotesContext";

export default function AllNotes() {
  let { getAllUsersNotes } = useContext(NoteContext);

  return (
    <>
      <div className="container">
        <div className="row g-3">
          {getAllUsersNotes.map((note) => (
            <div className="col-md-4" key={note._id}>
              <div className="noteCard p-3 bg-white rounded-4">
                <div className="title">
                  <p className="">{note.title}</p>
                  <p>{note.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
