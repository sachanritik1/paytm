import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/user";

const Header = memo(() => {
  const [user, setUser] = useRecoilState(userAtom);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  async function fetchBalance() {
    try {
      const res = await fetch("http://localhost/api/v1/accounts/balance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      setBalance(json.data.balance);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      fetchBalance();
    }
  }, [user]);

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
          <Link to="/dashboard">Paytm</Link>
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
