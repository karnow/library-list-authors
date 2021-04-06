import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { GET_CURRENT_USER_QUERY } from "../pages/CurrentUserDetailsPage";
import { useToast } from "./Toast";

function saveAuthToken(token) {
    localStorage.setItem("token", token);
}

function cleanAuthToken() {
    localStorage.removeItem("token");

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
    const toast = useToast();
    const { loading, error, data, client ,refetch} = useQuery(GET_CURRENT_USER_QUERY);
    function unauthorize() {
        cleanAuthToken();
        client.resetStore();
        navigate("/");
        toast({
            status: "success",
            description: "You've successfully loggedd out"
        })

    }
    
    function authorize(token) {
        saveAuthToken(token);
        navigate("/");
        refetch();
    }
    const authValue = {
        ...DEFAULT_VALUE,
        authorize,
        unauthorize
    };

    if (!loading && !error) {
    authValue.currentUser = data.currentUser;
    }

    return (
        <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;