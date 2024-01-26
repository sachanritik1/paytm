import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/user";
import Header from "./Header";

const Body = () => {
  const user = useRecoilValue(userAtom);
  return user ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/signin" />
  );
};

export default Body;
