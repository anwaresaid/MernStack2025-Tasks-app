import { lazy } from "react";

// admin routes
const Landing = lazy(() => import("../pages/Landing"));

// auth routes
const SignIn = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));

const adminRoutes = [
  {
    path: "/landing",
    element: <Landing />,
  },
];

const authRoutes = [
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
  },
];

export { adminRoutes, authRoutes };
