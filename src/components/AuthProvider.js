import { useQuery } from "@apollo/client";
import { decode } from "jsonwebtoken";
import React, { useCallback, useContext, useEffect } from "react";
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

function getAuthTokenPayload() {
    const token = getAuthToken();
    if (!token) {
        return {};
    }
    const payload = decode(token);
    return payload;
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
    const { loading, error, data, client, refetch } = useQuery(GET_CURRENT_USER_QUERY);
    
    const unauthorize = useCallback(function () {
        cleanAuthToken();
        client.resetStore();
        navigate("/");
        toast({
            status: "success",
            description: "You've successfully loggedd out"
        })
    }, [client, navigate, toast]);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            const payload = getAuthTokenPayload();
            const nowInSecound = Math.round(Date.now() / 1000);
            console.log(payload.exp - nowInSecound);
            if (payload.exp - nowInSecound < 15) {
                unauthorize();
            }
        }, 5000);
        return () => {
            clearInterval(intervalId);
        }
    },[unauthorize])

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