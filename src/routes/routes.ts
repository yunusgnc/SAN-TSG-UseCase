export type RoutePermission =
  | "VIEW_POSTS"
  | "VIEW_COMMENTS"
  | "EDIT_POST";

export interface AppRoute {
  name: string;
  path: string;
  renderer: () => Promise<{ default: React.ComponentType<any> }> | React.ComponentType<any>;
  permissions?: string[];
  translations?: string[];
}

export const routes: AppRoute[] = [
  {
    name: "login",
    path: "/login",
    renderer: () => import("../pages/auth/LoginPage"),
    permissions: [],
    translations: ["auth", "common"],
  },
  {
    name: "forbidden",
    path: "/403",
    renderer: () => import("../pages/ForbiddenPage"),
    permissions: [],
    translations: ["errors", "common"],
  },
  {
    name: "not-found",
    path: "/404",
    renderer: () => import("../pages/NotFoundPage"),
    permissions: [],
    translations: ["errors", "common"],
  },
  {
    name: "dashboard",
    path: "/",
    renderer: () => import("../pages/dashboard/DashboardPage"),
    permissions: ["VIEW_POSTS"],
    translations: ["dashboard", "common"],
  },
  {
    name: "posts",
    path: "/posts",
    renderer: () => import("../pages/posts/PostsListPage"),
    permissions: ["VIEW_POSTS"],
    translations: ["posts", "common"],
  },
  {
    name: "createPost",
    path: "/posts/create",
    renderer: () => import("../pages/posts/CreatePostPage"),
    permissions: ["VIEW_POSTS", "EDIT_POST"],
    translations: ["posts", "forms", "common"],
  },
  {
    name: "editPost",
    path: "/posts/:postId/edit",
    renderer: () => import("../pages/posts/PostEditPage"),
    permissions: ["VIEW_POSTS", "EDIT_POST"],
    translations: ["posts", "forms", "common"],
  },
  {
    name: "postComments",
    path: "/posts/:postId/comments",
    renderer: () => import("../pages/posts/PostCommentsPage"),
    permissions: ["VIEW_POSTS"],
    translations: ["posts", "comments", "common"],
  },
  {
    name: "postDetail",
    path: "/posts/:postId",
    renderer: () => import("../pages/posts/PostDetailPage"),
    permissions: ["VIEW_POSTS"],
    translations: ["posts", "comments", "common"],
  },
];
