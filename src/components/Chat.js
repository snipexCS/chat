import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth } from "../firebase-config";
import { db } from "../firebase-config";
import "../styles/Chat.css";

export const Chat = (props) => {
  const { room } = props;
  const [message, setMessage] = useState("");
  const [messages, setMsg] = useState([]);
  const msgRef = collection(db, "messages");

  useEffect(() => {
    const querymsg = query(
      msgRef,
      where("room", "==", room),
      orderBy("created")
    );
    const del = onSnapshot(querymsg, (snap) => {
      let messages = [];
      snap.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMsg(messages);
      console.log(snap);
    });

    return () => del();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    if (message === "") return;

    await addDoc(msgRef, {
      text: message,
      created: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setMessage("");
  };
  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to:{room}</h1>
      </div>
      <div className="messages">
        {messages.map((mes) => (
          <div className="message" key={mes.id}>
            <span className="user">{mes.user}</span>: {mes.text}
          </div>
        ))}
        <form onSubmit={submitForm} className="new-message-form">
          <input
            onChange={(e) => setMessage(e.target.value)}
            className="new-message-input"
            placeholder="type it here"
            value={message}
          ></input>
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
