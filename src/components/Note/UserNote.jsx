import React, { useContext, useState } from "react";
import { NoteContext } from "../Context/NotesContext";
import axios from "axios";
import { Bounce } from "react-awesome-reveal";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function UserNote() {
  const [show, setShow] = useState(false);
  const [noteId, setNoteId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let { getUserNote, getUserNotes } = useContext(NoteContext);

  let headers = {
    token: `3b8ny__${localStorage.getItem("userToken")}`,
  };

  function updateNote(value) {
    return axios
      .put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, value, { headers })
      .then((res) => getUserNote())
      .catch((err) => console.log(err));
  }
  let formik = useFormik({
    initialValues: { title: "", content: "" },
    onSubmit: updateNote,
  });

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
              <Bounce>
                <div className="noteCard p-3 bg-white rounded-4">
                  <div className="title">
                    <p className="">{note.title}</p>
                    <p>{note.content}</p>
                  </div>
                  <div className="icons d-flex justify-content-between">
                    <Button
                      className="btn bg-transparent p-0 border-0"
                      variant="primary"
                      onClick={() => {
                        handleShow();
                        setNoteId(note._id);
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square fs-4 " style={{ color: "#0dcaf0" }}></i>
                    </Button>
                    <button onClick={() => deleteNote(note._id)} className="btn">
                      <i className="fa-solid fa-trash fs-4" style={{ color: "#0dcaf0" }}></i>
                    </button>
                  </div>
                </div>
              </Bounce>
            </div>
          ))}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" autoFocus />
                </Form.Group>
                <Form.Group className="mb-3" controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control onBlur={formik.handleBlur} onChange={formik.handleChange} as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleClose();
                  formik.handleSubmit();
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}
