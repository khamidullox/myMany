import MainLayout from "./layout/MainLayout";
import React, { useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
//pages
import Home from "./pages/Home";
import Singup from "./pages/Singup";
import Login from "./pages/Login";
//componenets || hooks
import { GlobalContext } from "./hooks/useGlobal";
import ProtectotRoots from "./components/ProtectotRoots";

// action
import { action as actionSingup } from "./pages/Singup";
import { actionLogin as actionLogin } from "./pages/Login";
import { actionhome as actionHome } from "./pages/Home";
//firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebase";
function App() {
  let { user, dispetch, authReady } = useContext(GlobalContext);
  let router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectotRoots user={user}>
          <MainLayout />,
        </ProtectotRoots>
      ),

      children: [
        {
          index: true,
          element: <Home />,
          action: actionHome,
        },
      ],
    },
    {
      path: "/singup",
      element: user ? <Navigate to="/" /> : <Singup />,
      action: actionSingup,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: actionLogin,
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispetch({ type: "LOG_IN", paylod: user });
      dispetch({ type: "AUTH_READY" });
    });
    let allData = [];
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "money"));
      querySnapshot.docs.forEach((itme) => {
        allData.push({ idF: itme.id, ...itme.data() });
      });
      dispetch({ type: "DATA_BASE", paylod: allData });
    }
    getData();
  }, []);
  return <>{authReady && <RouterProvider router={router} />}</>;
}

export default App;
