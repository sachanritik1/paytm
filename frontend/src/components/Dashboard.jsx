import React, { useEffect, useRef, memo } from "react";
import UserCard from "./UserCard";
import { API_URL } from "../constants";

const Dashboard = memo(() => {
  const filter = useRef(null);
  const [recentUsers, setRecentUsers] = React.useState([]);
  const [title, setTitle] = React.useState("Recent Users");
  const [searchUsers, setSearchUsers] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  async function fetchBulkUsers() {
    try {
      const res = await fetch(API_URL + "/users/recent", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      if (json.success) {
        setRecentUsers(json.data.users);
        setUsers(json.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = async () => {
    const search = filter.current.value;
    try {
      const res = await fetch(
        `${API_URL}/users/bulk?filter=${filter.current.value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      if (json.success) {
        setSearchUsers(json.data.users);
        setUsers(json.data.users);
        setTitle(`Search results for ${search}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    filter.current.value = "";
    setUsers(recentUsers);
    setTitle("Recent Users");
  };

  useEffect(() => {
    fetchBulkUsers();
  }, []);

  return (
    <div className="my-4 flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          {title}
        </h1>
        <div className="flex justify-between">
          <input
            type="text"
            ref={filter}
            placeholder="search people"
            className="px-4 py-2 my-4 mr-4 bg-gray-200 rounded-lg dark:bg-gray-700"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 my-4 bg-blue-500 rounded-lg text-white dark:bg-blue-600"
          >
            Search
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 my-4 bg-red-500 rounded-lg text-white
            dark:bg-red-600"
          >
            clear
          </button>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {users.length > 0 ? (
              users.map((user) => <UserCard key={user._id} user={user} />)
            ) : (
              <li className="p-4 text-gray-500 dark:text-gray-400">
                No users found
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default Dashboard;
