import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useActionData } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "./useGlobal";
import toast from "react-hot-toast";
import { useEffect } from "react";
function useLogin() {
  let { dispetch } = useContext(GlobalContext);
  let actionLogin = useActionData();

  useEffect(() => {
    if (actionLogin) {
      handleLogin();
    }
  }, [actionLogin]);
  let handleLogin = () => {
    if (actionLogin) {
      signInWithEmailAndPassword(auth, actionLogin.email, actionLogin.password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispetch({ type: "LOG_IN", paylod: user });
          toast.success("Welcome");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          toast.error(errorCode);
        });
    }
  };
  return { handleLogin };
}

export default useLogin;
