import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { GET_CURRENT_USER_QUERY } from "../pages/CurrentUserDetailsPage";

function saveAuthToken(token) {
    localStorage.setItem("token", token);
}

export function getAuthToken() {
   return localStorage.getItem("token") || null;
}

const DEFAULT_VALUE = {
    currentUser: null,
    authorize: token => console.log("Trying to authorize: ", token),
    unauthorize: ()  => console.log("Trying to unauthorize")
};

export const AuthContext = React.createContext(DEFAULT_VALUE);

//uzycie custom hook'a zamiast bezposrenio usecontext hook'a
export function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_CURRENT_USER_QUERY);
    function authorize(token) {
        saveAuthToken(token);
        navigate("/");
    }
    const authValue = {
        ...DEFAULT_VALUE,
        authorize
    };

    if (!loading && !error) {
    authValue.currentUser = data.currentUser;
    }

    return (
        <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;