import home from "../assets/icons/home.svg";
import addCliinc from "../assets/icons/clinic-svgrepo-com.svg";
import addAdmin from "../assets/icons/admin-1-svgrepo-com.svg";
import clinic from "../assets/icons/medical-clinic-care-svgrepo-com.svg";

export const sidebarLinks = [
  {
    imgURL: home,
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    imgURL: addCliinc,
    route: "/dashboard/add-clinic",
    label: "Add Clinic",
  },
  {
    imgURL: addAdmin,
    route: "/dashboard/add-admin",
    label: "Add Admin",
  },
  {
    imgURL: clinic,
    route: "/dashboard/show-clinic",
    label: "Clinic",
  },
];
