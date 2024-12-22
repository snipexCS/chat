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

type ChatProps = {
  room: string;
};

type Message = {
  id: string;
  text: string;
  created: { seconds: number; nanoseconds: number } | null;
  user: string;
  room: string;
};

export const Chat: React.FC<ChatProps> = ({ room }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const msgRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      msgRef,
      where("room", "==", room),
      orderBy("created")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const loadedMessages: Message[] = [];
      snapshot.forEach((doc) => {
        loadedMessages.push({ ...doc.data(), id: doc.id } as Message);
      });
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [room]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;

    await addDoc(msgRef, {
      text: message,
      created: serverTimestamp(),
      user: auth.currentUser?.displayName || "Anonymous",
      room,
    });
    setMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room}</h1>
      </div>
      <div className="messages">
        {messages.map((msg) => (
          <div className="message" key={msg.id}>
            <span className="user">{msg.user}</span>: {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={submitForm} className="new-message-form">
        <input
          onChange={(e) => setMessage(e.target.value)}
          className="new-message-input"
          placeholder="Type it here"
          value={message}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

