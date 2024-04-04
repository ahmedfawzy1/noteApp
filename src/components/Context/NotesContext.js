import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export let NoteContext = createContext();

export default function NoteContextProvider(props) {
  const [getUserNotes, setUserNotes] = useState([]);
  const [getAllUsersNotes, setAllUsersNotes] = useState([]);
  const [noteUserNumber, setUserNoteNumber] = useState(0);
  const [noteAllUserNumber, setAllUserNoteNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let { userToken } = useContext(UserContext);

  let headers = {
    token: `3b8ny__${localStorage.getItem("userToken")}`,
  };

  function getUserNote() {
    setLoading(true);
    return axios
      .get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
        headers,
      })
      .then((data) => {
        if (data.data.msg == "done") {
          setUserNotes(data.data.notes);
          setUserNoteNumber(data.data.notes.length);
        }
      })
      .catch((error) => {
        setApiError(error.response.data.msg);
        setLoading(false);
      });
  }
  function getAllNotes() {
    setLoading(true);

    return axios
      .get(`https://note-sigma-black.vercel.app/api/v1/notes/allNotes`)
      .then((data) => {
        if (data.data.msg == "done") {
          // setAllUsersNotes(data.data.notes.slice(0, 15));
          setAllUsersNotes(data.data.notes.reverse());
          setAllUserNoteNumber(data.data.notes.length);
        }
      })
      .catch((error) => {
        setApiError(error.response.data.msg);
        setLoading(false);
      });
  }

  function postNote(values) {
    setLoading(true);
    return axios
      .post(`https://note-sigma-black.vercel.app/api/v1/notes`, values, {
        headers,
      })
      .then((data) => {
        getUserNote();
      })
      .catch((error) => {
        console.log("Notsuccess");
        setApiError(error.response.data.msg);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (userToken) {
      getUserNote();
    } else {
      getAllNotes();
    }
  }, [userToken]);

  return (
    <NoteContext.Provider value={{ getUserNote, getUserNotes, getAllUsersNotes, postNote, setUserNotes, noteUserNumber, noteAllUserNumber }}>
      {props.children}
    </NoteContext.Provider>
  );
}
