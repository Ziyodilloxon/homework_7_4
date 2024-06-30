// react
import { useState } from "react";

// rht
import toast from "react-hot-toast";

// rr
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const signInWithEmail = async (email, password) => {
    setIsPending(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userInfo = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };

      toast.success("Login successful! Welcome back");
      setIsPending(false);
      dispatch(login(userInfo));
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      setIsPending(false);
    }
  };

  return { signInWithEmail, isPending };
};

export { useLogin };
