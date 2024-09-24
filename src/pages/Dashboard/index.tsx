import AdminsTable from "@/components/AdminsTable";
import HeaderBox from "@/components/HeaderBox";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.userDetails);
  const isAdmin = useSelector(
    (state: RootState) => state.auth.userDetails?.role.name === "admins"
  );

  return (
    <section className="home !flex-col">
      <div className="home-content shadow-md mb-10">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            subtext="Access & manage your Clinics."
            user={user}
          />
        </header>
      </div>
      {!isAdmin && <AdminsTable />}
    </section>
  );
};

export default Dashboard;
