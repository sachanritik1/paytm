import React from "react";
import { useSearchParams } from "react-router-dom";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const receiver = JSON.parse(searchParams.get("to"));
  console.log(receiver);
  const amount = React.useRef(0);

  const sendMoney = async () => {
    try {
      const res = await fetch("http://localhost/api/v1/accounts/transfer", {
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
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center my-4">
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-end px-4 pt-4"></div>
        <div class="flex flex-col items-center pb-10">
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {receiver.firstName} {receiver.lastName}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            @{receiver.username}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {receiver.email}
          </span>
          <div class="flex mt-4 md:mt-6 justify-between items-center">
            <div>
              <label className="text-white">$</label>
              <input
                type="number"
                placeholder="1"
                ref={amount}
                class="px-2 py-2 mx-1 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
              />
            </div>
            <button
              onClick={sendMoney}
              class="px-4 py-2 mx-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
