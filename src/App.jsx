import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import LogIn from "./components/LogIn/LogIn";
import NotFound from "./components/NotFound/NotFound";
import { useContext, useEffect } from "react";
import { UserContext } from "./components/Context/UserContext";
import ProductedRoute from "./components/ProductedRoute/ProductedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "register",
          element: (
            <ProductedRoute>
              <Register />
            </ProductedRoute>
          ),
        },
        {
          path: "login",
          element: <LogIn />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <div className="App">
      <RouterProvider router={routers}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
