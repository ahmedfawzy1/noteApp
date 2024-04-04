import React, { useContext } from "react";
import { NoteContext } from "../Context/NotesContext";
import { Bounce } from "react-awesome-reveal";

export default function AllNotes() {
  let { getAllUsersNotes } = useContext(NoteContext);

  return (
    <>
      <div className="container">
        <div className="row g-3">
          {getAllUsersNotes.map((note) => (
            <div className="col-md-4" key={note._id}>
              <Bounce>
                <div className="noteCard p-3 bg-white rounded-4">
                  <div className="title">
                    <p className="">{note.title.slice(0, 15)}</p>
                    <p>{note.content.slice(0, 15)}</p>
                  </div>
                </div>
              </Bounce>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
