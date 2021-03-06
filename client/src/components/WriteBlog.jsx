import React, { useContext } from "react";
import NotAuthenticatedContext from "./NotAuthenticatedContext";
import AuthenticatedNavBtn from "./AuthenticatedNavBtn";
import { AuthContext } from "./Context";

const NewStory = () => {
  const { ─▒sAuthenticated } = useContext(AuthContext);

  return (
    <>
      {─▒sAuthenticated ? (
        <AuthenticatedNavBtn></AuthenticatedNavBtn>
      ) : (
        <NotAuthenticatedContext />
      )}
    </>
  );
};
export default NewStory;
