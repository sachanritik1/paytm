import React from "react";
import { useSearchParams } from "react-router-dom";
import { balanceAtom } from "../store/atoms/balance";
import { useRecoilState } from "recoil";
import { API_URL } from "../constants";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const receiver = JSON.parse(searchParams.get("to"));
  const amount = React.useRef(0);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [balance, setBalance] = useRecoilState(balanceAtom);

  const sendMoney = async () => {
    try {
      const res = await fetch(API_URL + "/accounts/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: receiver._id,
          amount: Number.parseInt(amount.current.value),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setBalance(balance - json.data.amount);
        alert("Money sent successfully!!");
      } else {
        setError(true);
        setErrorMessage(json.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {receiver.firstName} {receiver.lastName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            @{receiver.username}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {receiver.email}
          </span>
          <div className="flex mt-4 md:mt-6 justify-between items-center">
            <div>
              <label className="text-white">$</label>
              <input
                type="number"
                placeholder="Amount"
                ref={amount}
                className="px-2 py-2 mx-1 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
              />
            </div>
            <button
              onClick={sendMoney}
              className="px-4 py-2 mx-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send Money
            </button>
          </div>
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm font-bold my-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SendMoney;
