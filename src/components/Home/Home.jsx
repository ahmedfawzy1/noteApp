import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { NoteContext } from "../Context/NotesContext";
import { UserContext } from "../Context/UserContext";
import UserNote from "../Note/UserNote";
import AllNotes from "../Note/AllNotes";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Sidebar from "../Sidebar/Sidebar";

export default function Home() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-9 my-4">
            <div className="text-end me-2 pb-4">
              {userToken && (
                <Button className="btn btn-info text-white" variant="primary" onClick={handleShow}>
                  <i className="fa-solid fa-plus"></i> Add Note
                </Button>
              )}

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" autoFocus maxLength={15} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="content">
                      <Form.Label>Content</Form.Label>
                      <Form.Control onBlur={formik.handleBlur} onChange={formik.handleChange} as="textarea" rows={3} maxLength={15} />
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
            <div className="notes">{userToken ? <UserNote /> : <AllNotes />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
