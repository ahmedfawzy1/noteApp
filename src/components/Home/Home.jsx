import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { useFormik } from "formik";
import Note from "../Note/UserNote";
import { NoteContext } from "../Context/NotesContext";
import { UserContext } from "../Context/UserContext";
import { Bounce, Fade, Flip, Hinge, Rotate, Slide } from "react-awesome-reveal";
import UserNote from "../Note/UserNote";
import AllNotes from "../Note/AllNotes";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [handleClose, setHandleClose] = useState(true);
  let { postNote } = useContext(NoteContext);
  let { userToken } = useContext(UserContext);

  let formik = useFormik({
    initialValues: { title: "", content: "" },
    onSubmit: postNote,
  });

  return (
    <div className="overflow-hidden bg-body-tertiary min-vh-100">
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-10 px-lg-5 px-2 py-5">
            <div className="text-end me-2 mb-4">
              <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className="fa-solid fa-plus"></i> Add Note
              </button>
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Add Note
                      </h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={formik.handleSubmit}>
                        <input
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="text"
                          className="form-control mb-4 shadow-none"
                          name="title"
                          id="title"
                          placeholder="Please Enter Title"
                        />
                        <input
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="text"
                          className="form-control mb-4 shadow-none"
                          name="content"
                          id="content"
                          placeholder="Please Enter Content"
                        />
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                      </button>
                      <button onClick={formik.handleSubmit} disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-primary">
                        Add Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-4">
              {userToken ? (
                <Bounce>
                  <UserNote />
                </Bounce>
              ) : (
                <Bounce>
                  <AllNotes />
                </Bounce>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
