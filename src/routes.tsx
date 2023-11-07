import {
  Posts,
  Create,
  Edit,
  Users,
  Dashboard,
  Register,
  Login,
} from "@/features";
import { BlogDetails } from "@/components";

export const ROUTES_PATHS = {
  users: "/users",
  posts: "/posts",
  postDetails: "/posts/:id",
  postCreate: "/posts/create",
  postIdEdit: "/posts/:id/edit",
  dashboard: "/dashboard",
  login: "/login",
  register: "/register",
};

export const navigateToPost = {
  gotoPostDetails: (id: string) =>
    `${ROUTES_PATHS.postDetails.replace(":id", id.toString())}`,
  gotoPostEdit: (id: string) =>
    `${ROUTES_PATHS.postIdEdit.replace(":id", id.toString())}`,
};

export const appRouters = [
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

export const authRoutes = [
  {
    path: `${ROUTES_PATHS.login}`,
    element: <Login />,
  },
  {
    path: `${ROUTES_PATHS.register}`,
    element: <Register />,
  },
];
