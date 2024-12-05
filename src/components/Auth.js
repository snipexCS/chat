import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import "../styles/Auth.css"
const cookie = new Cookies();

//creating a cokkie to store information about user 
export const Auth = (props) => {
  const {setAuth} = props
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookie.set("auth-token", result.user.refreshToken);
      setAuth(true)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth">
      <p>Sign in With Google</p>
      <button onClick={signInWithGoogle}>DO it </button>
    </div>
  );
};
