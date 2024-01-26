import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/user";
import { balanceAtom } from "../store/atoms/balance";
import { useBalance } from "../hooks/useBalance";

const Header = memo(() => {
  const [user, setUser] = useRecoilState(userAtom);
  const balance = useRecoilValue(balanceAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message =
        "You have unsaved changes. Are you sure you want to leave?";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useBalance();

  async function logout() {
    try {
      await fetch("http://localhost/api/v1/users/signout", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUser(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to="/dashboard">SnapPay</Link>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="ml-2">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="ml-2">@{user?.username}</span>
            </div>

            <div className="flex items-center">
              <span className="mr-2">Wallet Balance:</span>
              <span className="font-bold">${balance}</span>
            </div>
            <button
              className="bg-white text-blue-500 px-4 py-2 rounded-full"
              onClick={logout}
            >
              {" "}
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
});

export default Header;
