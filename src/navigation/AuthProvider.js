import React, { createContext, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth.signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log("Could not login");
          }
        },

        register: async (displayName, email, password) => { 
          try {
            await firebase
                .auth
                .createUserWithEmailAndPassword(email, password)
                .then((credential) => {
                  credential.user
                  .updateProfile({ displayName: displayName })
                  });
        }catch (e) {
            console.log("Could not register");
          }
        },

        logout: async () => {
          try{
            await auth.signOut();
          }catch(e){
            console.log("Could not logout");
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};


/*import React, { createContext, useState } from 'react';

import { kitty } from '../chatkitty';
import { auth } from '../firebase/index';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
      <AuthContext.Provider
          value={{
            user,
            setUser,
            loading,
            setLoading,
            login: async (email, password) => {
              setLoading(true);

              const result = await kitty.startSession({
                username: email,
                authParams: {
                  password: password,
                },
              });

              setLoading(false);

              if (result.failed) {
                console.log('Could not login');
              }
            },
            register: async (displayName, email, password) => {
              setLoading(true);

              try {
                await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((credential) => {
                  credential.user
                  .updateProfile({ displayName: displayName })
                  .then(async () => {
                    const result = await kitty.startSession({
                      username: email,
                      authParams: {
                        password: password,
                      },
                    });

                    if (result.failed) {
                      console.log('Could not login');
                    }
                  });
                });
              } catch (e) {
                console.log(e);
              }

              setLoading(false);
            },
            logout: async () => {
              try {
                await kitty.endSession();
              } catch (e) {
                console.error(e);
              }
            },
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};*/
