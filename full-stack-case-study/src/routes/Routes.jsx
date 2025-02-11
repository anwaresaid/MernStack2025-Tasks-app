import { LandingLayout, AuthLayout } from "../Layouts";
import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, authRoutes } from "./index";
import Landing from "../pages/Landing";
import { useEffect, useState } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";
const AllRoutes = (props) => {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? (
            <LandingLayout {...props}>
              <Landing />
            </LandingLayout>
          ) : (
            <Navigate to="/auth/sign-in" />
          )
        }
      />

      {adminRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={
            token ? (
              <LandingLayout {...props}>{route.element}</LandingLayout>
            ) : (
              <Navigate
                to={{
                  pathname: "/auth/sign-in",
                }}
              />
            )
          }
          key={idx}
        />
      ))}

      {authRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={
            token ? (
              <Navigate to="/landing" />
            ) : (
              <AuthLayout {...props}>{route.element}</AuthLayout>
            )
          }
          key={idx}
        />
      ))}
    </Routes>
  );
};

export default AllRoutes;
