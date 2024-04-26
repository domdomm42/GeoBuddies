import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleMapsProvider } from "./components/GoogleMapsProvider";
import routes from "./routes";
import { NextUIProvider } from "@nextui-org/react";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <GoogleMapsProvider>
        <RouterProvider router={router} />
      </GoogleMapsProvider>
    </NextUIProvider>
  </React.StrictMode>
);
