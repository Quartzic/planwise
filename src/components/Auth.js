import { supabase } from "../lib/api";
import React, { useRef, useState, useEffect, useContext, createContext } from "react";
import { Route, Navigate } from "react-router-dom";
import Spinner from "../pages/Spinner.js";
import LandingPage from "../pages/LandingPage.js";
const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [session, setSession] = useState(null);

  // Subscribe to session in mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        if(session === null){
            setSession(false);
        }else{
            setSession(session);
        }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
        if(session === null){
            setSession(false);
        }else{
            setSession(session);
        }
    });
  }, []);

  // Return the session object and auth methods
  return {
    session: session,
    signOut: () => {supabase.auth.signOut();},
  };
}

// checks if the user is logged in and if not redirects to login page
export function AuthGuard({ children, home, ...rest }) {
  const auth = useAuth();
  // check if auth is loaded
  if (auth.session === null) {
    return <Spinner/>;
  } else {
    if (auth.session.user) {
      return children;
    } else {
      if(home){
        return <LandingPage />;
      }else{
        return <Navigate to="/login" />;
      }
    }
  }
}
