import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import auth from "../Firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkmode, setDarkmode] = useState(
    localStorage.getItem("darkmode") === "true" || false
  );

  // Website dark and light mode functionality
  useEffect(() => {
    localStorage.setItem("darkmode", darkmode);
  }, [darkmode]);

  // Handle Email Registration
  const handleRegisterEmailPassword = (email, password, name, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photoURL,
        });
        setUser(userCredential.user);
        toast.success(`Registration Successful`, {
          position: "top-center",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
        setName(name);
        setImage(photoURL);
        const userMail = { userMail: userCredential.user.email };
        axios.post("https://mrirakib04-server-2.vercel.app/jwt", userMail, {
          withCredentials: true,
        });
      })
      .catch((error) => {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };
  // Handle Email Login
  const handleLoginEmailPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        toast.success(`Login Successful`, {
          position: "top-center",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
        const userMail = { userMail: userCredential.user.email };
        // console.log(userMail);
        axios.post("https://mrirakib04-server-2.vercel.app/jwt", userMail, {
          withCredentials: true,
        });
      })
      .catch((error) => {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  // User Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName);
        setImage(currentUser.photoURL);
        setPhone(currentUser.phoneNumber);
        const userMail = { userMail: currentUser.email };
        axios.post("https://mrirakib04-server-2.vercel.app/jwt", userMail, {
          withCredentials: true,
        });
      } else {
        setUser(null);
        setName("");
        setImage("");
        setPhone(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // Handle Google Login/Registration
  const handleGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        setImage(result.user.photoURL);
        setName(result.user.displayName);
        setPhone(result.user.phoneNumber);
        toast.success(`Login Successful`, {
          position: "top-center",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log("user res", result.user.email);
        const userMail = { userMail: result.user.email };
        console.log(userMail);
        axios.post("https://mrirakib04-server-2.vercel.app/jwt", userMail, {
          withCredentials: true,
        });
      })
      .catch((error) => {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  // Handle Logout
  const handleLogout = () => {
    setLoading(true);
    return signOut(auth)
      .then((res) => {
        toast.warn(`Logout Successful`, {
          position: "top-center",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
        if (res) {
          axios.post("https://mrirakib04-server-2.vercel.app/logout", {
            withCredentials: true,
          });
        }
      })
      .catch((error) => {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  const contextInfo = {
    user,
    setUser,
    name,
    setName,
    image,
    setImage,
    phone,
    setPhone,
    loading,
    handleRegisterEmailPassword,
    handleLoginEmailPassword,
    handleGoogle,
    handleLogout,
    darkmode,
    setDarkmode,
  };
  return (
    <AuthContext.Provider value={contextInfo}>{children}</AuthContext.Provider>
  );
};
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthContextProvider;
