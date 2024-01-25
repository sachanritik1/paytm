import React, { useEffect, useRef, memo } from "react";
import UserCard from "./UserCard";

const Dashboard = memo(() => {
  const [recentUsers, setRecentUsers] = React.useState([]);
  useEffect(() => {
    async function fetchBulkUsers() {
      try {
        const res = await fetch("http://localhost/api/v1/users/recent", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await res.json();
        if (json.success) {
          console.log(json.data.users);
          setRecentUsers(json.data.users);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBulkUsers();
  }, []);

  return (
    <div className="my-4 flex justify-center items-center">
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {recentUsers.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default Dashboard;
