// styles
import "./App.css";

// rrd
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// components
import ProtectedRoutes from "./components/ProtectedRoutes";

// pages
import { Home, About, Contact, Login, Register } from "./pages";

// layout
import MainLayout from "./layout/MainLayout";

// rr
import { useSelector, useDispatch } from "react-redux";

// loader
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";

// react
import { useEffect } from "react";

// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

// slice
import { isAuthChange, login } from "./features/todos/userSlice";

function App() {
  const { user, isAuthReady } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(isAuthChange());
    });
  }, []);
  return <>{isAuthReady && <RouterProvider router={routes} />}</>;
}

export default App;
