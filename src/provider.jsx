
import { GoogleAuthProvider,  signInWithPopup,signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    
    // Triggers when App is started

    useEffect(() => {
        if (!auth) return;
        return auth.onAuthStateChanged((user) => {
            setLoading(false);
            if (user) {
                console.log({user});
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    function signIn(email, password) {
        return new Promise((resolve, reject) => {
            if (!auth) {
                reject();
                return;
            }

            signInWithEmailAndPassword(auth, email, password)
                .then(async (user) => {
                    console.log("Signed in!");
                
                    resolve(user);
                })
                .catch((err) => {
                    console.error("Something went wrong o", err);
                    reject();
                });
        });
    }

    function signUp(email, password, displayName) {
        return new Promise((resolve, reject) => {
            if (!auth) {
                reject();
                return;
            }
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (user) => {
                    try {
                        await signIn(email,password)
                      } catch (error) {
                        console.log(error);
                      }
                    console.log("Signed in!");
                    resolve(user);
                })
                .catch(() => {
                    console.error("Something went wrong o");
                    reject();
                });
        });
    }

    

    function loginGoogle(){
        return new Promise((resolve, reject) => {
            if (!auth) {
                reject();
                return;
            }
            signInWithPopup(auth, new GoogleAuthProvider())
                .then((user) => {
                    console.log("Signed in!");
                    resolve(user);
                })
                .catch(() => {
                    console.error("Something went wrong");
                    reject();
                });
        });
    }

    

    function logout(){
        return new Promise((resolve, reject) => {
            if (!auth) {
                reject();
                return;
            }
            auth.signOut()
                .then(() => {
                    console.log("Signed out");
                    resolve();
                })
                .catch(() => {
                    console.error("Something went wrong");
                    reject();
                });
        });
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signUp,
                loginGoogle,
                loading,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


