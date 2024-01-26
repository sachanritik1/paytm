import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Body from "./components/Body";
import SendMoney from "./components/SendMoney";
import Signin from "./components/signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "sendMoney",
        element: <SendMoney />,
      },
    ],
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "signin",
    element: <Signin />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
