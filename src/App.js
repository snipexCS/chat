import { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth.tsx";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat.tsx";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookie = new Cookies();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(cookie.get("auth-token")); // Rename state
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    try {
      await signOut(auth); // Pass the Firebase auth object
      cookie.remove("auth-token");
      setIsAuthenticated(false); 
      setRoom(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Checking if user is already signed up, if yes then it prompts to enter room number
  if (!isAuthenticated) {
    return (
      <div>
        <Auth setAuth={setIsAuthenticated} />
      </div>
    );
  }

  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label>Enter room name</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>Enter chat</button>
        </div>
      )}
      <div className="sign-out">
        <button onClick={signUserOut}>Sign out</button>
      </div>
    </>
  );
}

export default App;

