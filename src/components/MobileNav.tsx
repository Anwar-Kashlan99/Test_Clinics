import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { RootState } from "@/store";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import hamburger from "../assets/icons/hamburger.svg";
import logo from "../assets/icons/logo.svg";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";

const MobileNav = ({ user }: RootState) => {
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
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <img
            src={hamburger}
            alt="hamburger Icon"
            className="cursor-pointer size-8"
          />
        </SheetTrigger>
        <SheetContent
          aria-describedby={undefined}
          className="bg-white border-none"
          side="left"
        >
          <SheetTitle></SheetTitle>
          <Link
            to="/dashboard"
            className="flex cursor-pointer items-center gap-1 px-4"
          >
            <img src={logo} alt="logo" className="size-8" />
            <p className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Clinics
            </p>
          </Link>

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex flex-col h-full gap-6 pt-16">
                {filteredLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`/${item.route}`);
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        to={item.route}
                        key={item.label}
                        className={classNames("mobilenav-sheet_close w-full", {
                          "bg-bank-gradient": isActive,
                        })}
                      >
                        <img
                          src={item.imgURL}
                          alt={item.label}
                          className={classNames("size-5", {
                            "brightness-[3] inset-0": isActive,
                          })}
                        />

                        <p
                          className={classNames(
                            "text-black-2 text-16 font-semibold",
                            {
                              "!text-white": isActive,
                            }
                          )}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
            <SheetClose asChild>
              <LogoutButton />
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
