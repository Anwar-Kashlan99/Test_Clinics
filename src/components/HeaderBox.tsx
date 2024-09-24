import { RootState } from "@/store";

const HeaderBox = ({ type, title, subtext, user }) => {
  return (
    <section className="header-box">
      <h1 className="header-box-title">
        {title},&nbsp;
        {type === "greeting" && (
          <span className="text-bankGradient">{user?.name}</span>
        )}
      </h1>
      <p className="header-box-subtext !text-xl mb-5">{subtext}</p>
      <p className="header-box-subtext mb-1">Username: {user.username}</p>
      <p className="header-box-subtext mb-1">Role: {user.role.name}</p>
    </section>
  );
};

export default HeaderBox;
