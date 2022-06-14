import React, { useContext } from "react";
import NotAuthenticatedContext from "./NotAuthenticatedContext";
import AuthenticatedNavBtn from "./AuthenticatedNavBtn";
import { AuthContext } from "./Context";

const NewStory = () => {
  const { ısAuthenticated } = useContext(AuthContext);

  return (
    <>
      {ısAuthenticated ? (
        <AuthenticatedNavBtn></AuthenticatedNavBtn>
      ) : (
        <NotAuthenticatedContext />
      )}
    </>
  );
};
export default NewStory;
