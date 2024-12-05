import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
const cookie = new Cookies();
export const Auth = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookie.set("auth-token", result.user.refreshToken);
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
