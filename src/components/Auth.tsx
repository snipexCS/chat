import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import "../styles/Auth.css";

const cookie = new Cookies();

type AuthProps = {
  setAuth: (value: boolean) => void;
};

export const Auth = ({ setAuth }: AuthProps) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookie.set("auth-token", result.user.refreshToken);
      setAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth">
      <p>Sign in With Google</p>
      <button onClick={signInWithGoogle}>DO it</button>
    </div>
  );
};
