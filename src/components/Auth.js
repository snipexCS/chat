import {auth,provider} from "../firebase-config.js"
import {signInWithPopup} from "firebase/auth"
export const Auth = () =>{

    const signInWithGoogle =async () =>{
       const result =  await signInWithPopup(auth,provider)
              
    }


    return(
    <div className="auth"><p>
        Sign in With Google</p>
        <button onClick={signInWithGoogle}>DO it </button>
        </div>
    )
}