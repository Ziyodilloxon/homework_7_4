import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { login } from "../features/todos/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";

const useRegister = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const registerWithEmail = async (email, password, displayName, photoURL) => {
    setIsPending(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      const user = userCredential.user;
      toast.success("Login successfuly!   Welcome");
      setIsPending(false);
      dispatch(login(user));
    } catch (error) {
      const errorMessage = error.message;
      setIsPending(false);
    }
  };

  return { registerWithEmail, isPending };
};

export { useRegister };
