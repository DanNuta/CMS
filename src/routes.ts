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

export const navigateToPost = () => {
  gotoPostDetails: (id: string) =>
    `${ROUTES_PATHS.postIdEdit.replace("id", id)}`;
  gotoPostEdit: (id: string) => `${ROUTES_PATHS.postIdEdit.replace(":id", id)}`;
};
