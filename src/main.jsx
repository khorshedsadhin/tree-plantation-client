import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/router.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
			<RouterProvider router={router}></RouterProvider>
		</AuthProvider>
	</StrictMode>
);
