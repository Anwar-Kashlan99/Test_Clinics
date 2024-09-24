import { sidebarLinks } from "@/constants";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/icons/logo.svg";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const role = useSelector(
    (state: RootState) => state.auth.userDetails?.role.name
  );

  const filteredLinks = sidebarLinks.filter((item) => {
    if (
      role === "admins" &&
      (item.route === "/dashboard/add-clinic" ||
        item.route === "/dashboard/add-admin")
    ) {
      return false;
    }
    return true;
  });

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className="flex mb-12 cursor-pointer items-center gap-2"
        >
          <img src={logo} alt="logo" className="max-xl:size-14 size-[24px]" />
          <p className="sidebar-logo">Clinics</p>
        </Link>
        <div>
          <div className="flex flex-col gap-1">
            {filteredLinks.map((item) => {
              const isActive =
                pathname === item.route ||
                pathname.startsWith(`/${item.route}`);
              return (
                <Link
                  to={item.route}
                  key={item.label}
                  className={classNames("sidebar-link", {
                    "bg-bank-gradient": isActive,
                  })}
                >
                  <div className="relative size-6">
                    <img
                      src={item.imgURL}
                      alt={item.label}
                      className={classNames("w-full h-full object-cover", {
                        "brightness-[3] inset-0": isActive,
                      })}
                    />
                  </div>
                  <p
                    className={classNames("sidebar-label", {
                      "!text-white": isActive,
                    })}
                  >
                    {item.label}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      <LogoutButton />
    </section>
  );
};

export default Sidebar;
