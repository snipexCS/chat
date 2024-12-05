import { useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
const cookie = new Cookies();

function App() {
  const [auth, setAuth] = useState(cookie.get("auth-token"));
  const [room, setRoom] = useState();
  if (!auth) {
    return (
      <div>
        <Auth></Auth>
      </div>
    );
  }

  return (
    <div>
      {room ? (
        <div>Chat</div>
      ) : (
        <div className="room">
          <label>Enter room name</label>
          <input></input>
          <button>Enter chat</button>
        </div>
      )}
    </div>
  );
}

export default App;
