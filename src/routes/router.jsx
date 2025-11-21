import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/authentication/Register";
import Login from "../pages/authentication/Login";
import UpcomingEvents from "../pages/Events/UpcomingEvents";
import PrivateRoute from "../routes/PrivateRoute";
import CreateEvent from "../pages/Events/CreateEvent";

const router = createBrowserRouter([
	{
		path: "/",
		Component: RootLayout,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: "/register",
				Component: Register,
			},
			{
				path: "/login",
				Component: Login,
			},
			{
				path: "/upcoming-events",
				Component: UpcomingEvents,
			},
			{
				path: "/create-event",
				element: (
					<PrivateRoute>
						<CreateEvent></CreateEvent>
					</PrivateRoute>
				),
			},
		],
	},
]);

export default router;
