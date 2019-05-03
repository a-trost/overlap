import React from "react";
import { Consumer } from "../../store/createContext";
import Layout from "../../layout/Layout";

export default ({ children }) => {
  return (
    <Consumer>{state => <Layout context={state}>{children}</Layout>}</Consumer>
  );
};
