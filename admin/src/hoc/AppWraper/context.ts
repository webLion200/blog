import { createContext } from "react";
import { IAppContext } from "./types";

const AppContext = createContext<IAppContext | null>(null);

export default AppContext