import { Suspense } from "react";
import { Link } from "react-router-dom";

import logoDark from "../assets/logo-dark.png";
import authImg from "../assets/auth-img.jpeg";

const AuthLayout = ({ children }) => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat p-2 lg:p-0"
      // style={{ backgroundImage: `url("${authBgImg}")` }}
      style={{ backgroundColor: "#FFFFFF !important" }}
    >
      <div className="absolute inset-0 " />
      <div className="flex h-screen w-full items-center justify-center">
        <div className="max-w-4xl overflow-hidden rounded-lg bg-white drop-shadow-2xl backdrop-blur-3xl">
          <div className="grid lg:grid-cols-6">
            <div className="hidden py-2.5 ps-2.5 lg:block col-span-2">
              <div className="relative h-full overflow-hidden rounded-md">
                <div className="absolute inset-0 bg-black/40" />
                <img
                  src={authImg}
                  className="h-full max-w-full object-cover"
                  style={{ alignItems: "flex-start" }}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="p-6 flex h-full flex-col">
                <Link to="/auth/sign-in" className="mb-8 block shrink">
                  <img className="h-8" src={logoDark} alt="images" />
                </Link>

                <Suspense fallback={<div />}>{children}</Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
