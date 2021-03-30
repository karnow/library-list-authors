import React, { useContext } from "react";



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
    const authValue = {
        ...DEFAULT_VALUE
    };

    return (
        <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;