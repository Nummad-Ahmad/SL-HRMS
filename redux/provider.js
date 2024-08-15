'use client';

import { Provider } from "react-redux";
import userStore from "./userStore";

function Providers({children}){
    return <Provider store={userStore}>{children}</Provider>
}

export default Providers;