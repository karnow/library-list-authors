import React from "react";



const DEFAULT_VALUE = {
    currentUser: null,
    authorize: token => console.log("Trying to authorize: ", token),
    unauthorize: ()  => console.log("Trying to unauthorize")
};

const AuthContext = React.createContext(DEFAULT_VALUE);