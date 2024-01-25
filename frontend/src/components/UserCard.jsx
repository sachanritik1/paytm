import React, { memo } from "react";
import { Link } from "react-router-dom";

const UserCard = memo(({ user }) => {
  const { _id, username, firstName, lastName, email } = user;
  return (
    <li className="py-3 sm:py-4">
      <div className="flex justify-between items-center">
        <div className="min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            @{username}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {email}
          </p>
        </div>
        <div className="text-base font-semibold text-gray-900 dark:text-white">
          {firstName} {lastName}
        </div>
        <Link
          to={"/sendMoney?to=" + JSON.stringify(user)}
          className="px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
        >
          Send Money
        </Link>
      </div>
    </li>
  );
});

export default UserCard;
