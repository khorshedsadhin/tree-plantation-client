import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/authentication/Register";
import Login from "../pages/authentication/Login";
import UpcomingEvents from "../pages/Events/UpcomingEvents";
import PrivateRoute from "../routes/PrivateRoute";
import CreateEvent from "../pages/Events/CreateEvent";
import EventDetails from "../pages/Events/EventDetails";
import ManageEvents from "../pages/Events/ManageEvents";
import UpdateEvent from "../pages/Events/UpdateEvent";
import JoinedEvents from "../pages/Events/JoinedEvents";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
	{
		path: "/",
		Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
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
      {
        path: "/event/:id",
        Component: EventDetails
      },
      {
        path: "/manage-events",
        element: (
          <PrivateRoute>
            <ManageEvents></ManageEvents>
          </PrivateRoute>
        )
      },
      {
        path: "/update-event/:id",
        element: (
          <PrivateRoute>
            <UpdateEvent></UpdateEvent>
          </PrivateRoute>
        )
      },
      {
        path: "/joined-events",
        element: (
          <PrivateRoute>
            <JoinedEvents></JoinedEvents>
          </PrivateRoute>
        )
      }
		],
	},
]);

export default router;
