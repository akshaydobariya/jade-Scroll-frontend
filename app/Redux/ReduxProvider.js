"use client";

import { Provider } from "react-redux";
import React from "react";
import Store from "./store";

export function ReduxProvider({ children }) {
    return <Provider store={Store}>{children}</Provider>;
}