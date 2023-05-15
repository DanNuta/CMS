import { PropsWithChildren } from "react";
import {
  Navigate,
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
import { useAuth } from "@/context";
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

export const ProtectedRouterLogin: React.FC<PropsWithChildren> = ({
  children,
}): any => {
  const auth = useAuth();

  if (auth?.user !== null) {
    return <Navigate to={`${ROUTES_PATHS.users}`} />;
  }
  return children;
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
    element: (
      <ProtectedRouterLogin>
        <Login />
      </ProtectedRouterLogin>
    ),
  },
  {
    path: `${ROUTES_PATHS.register}`,
    element: (
      <ProtectedRouterLogin>
        <Register />
      </ProtectedRouterLogin>
    ),
  },
];

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        loader={() => {
          const localStorege = localStorage.getItem("userId");

          if (localStorege === null) {
            throw redirect(`${ROUTES_PATHS.login}`);
          }
          return 0;
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
