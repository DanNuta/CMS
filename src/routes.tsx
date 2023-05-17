import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";

import {
  Posts,
  Create,
  Edit,
  Users,
  Dashboard,
  Register,
  Login,
} from "@/features";
import { AppLayout, BlogDetails } from "@/components";

export const ROUTES_PATHS = {
  users: "/",
  posts: "/posts",
  postDetails: "/posts/:id",
  postCreate: "/posts/create",
  postIdEdit: "/posts/:id/edit",
  dashboard: "/dashboard",
  login: "/login",
  register: "/register",
};

export const navigateToPost = {
  gotoPostDetails: (id: number) =>
    `${ROUTES_PATHS.postDetails.replace(":id", id.toString())}`,
  gotoPostEdit: (id: number) =>
    `${ROUTES_PATHS.postIdEdit.replace(":id", id.toString())}`,
};

const appRouters = [
  {
    path: `${ROUTES_PATHS.users}`,
    element: <Users />,
  },
  {
    path: `${ROUTES_PATHS.dashboard}`,
    element: <Dashboard />,
  },

  {
    path: `${ROUTES_PATHS.posts}`,
    element: <Posts />,
  },

  {
    path: `${ROUTES_PATHS.postIdEdit}`,
    element: <Edit />,
  },

  {
    path: `${ROUTES_PATHS.postDetails}`,
    element: <BlogDetails />,
  },

  {
    path: `${ROUTES_PATHS.postCreate}`,
    element: <Create />,
  },
];

const authRoutes = [
  {
    path: `${ROUTES_PATHS.login}`,
    element: <Login />,
  },
  {
    path: `${ROUTES_PATHS.register}`,
    element: <Register />,
  },
];

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        loader={() => {
          const userId = localStorage.getItem("userId");

          if (userId === null) {
            throw redirect("/login");
          }
          return "dan";
        }}
        element={<AppLayout />}
      >
        {appRouters.map((router, i) => {
          return <Route key={i} {...router} />;
        })}
      </Route>

      <Route>
        {authRoutes.map((route, i) => {
          return <Route key={i} {...route} />;
        })}
      </Route>
    </>
  )
);
