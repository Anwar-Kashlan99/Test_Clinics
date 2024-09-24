import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import Login from "./pages/login";
import AddClinic from "./pages/AddClinic";
import AddAdmin from "./pages/AddAdmin";
import Unauthorized from "./pages/Unauthorized";
import { RootState } from "./store";
import Dashboard from "./pages/Dashboard";
import ShowClinic from "./pages/ShowClinic";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import logo from "./assets/icons/logo.svg";
import { Toaster } from "./components/ui/toaster";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.userDetails);

  // Define public routes where the sidebar should not be shown
  const publicRoutes = ["/login", "/unauthorized"];

  return (
    <main className="flex w-full">
      <Toaster />
      {!publicRoutes.includes(location.pathname) && <Sidebar user={user} />}
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <img src={logo} alt="menu icon" className="size-8" />
          <div>
            <MobileNav user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}

function App() {
  const ProtectedRoute = ({
    children,
    allowedRoles,
  }: {
    children: React.ReactNode;
    allowedRoles: string[];
  }) => {
    const role = useSelector(
      (state: RootState) => state.auth.userDetails?.role.name
    );
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    if (!isAuth) {
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles.includes(role || "")) {
      return children;
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  };

  const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    return isAuth ? <Navigate to="/dashboard" replace /> : children;
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard/add-clinic"
            element={
              <ProtectedRoute allowedRoles={["super_admins"]}>
                <AddClinic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["super_admins", "admins"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/add-admin"
            element={
              <ProtectedRoute allowedRoles={["super_admins"]}>
                <AddAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/show-clinic"
            element={
              <ProtectedRoute allowedRoles={["super_admins", "admins"]}>
                <ShowClinic />
              </ProtectedRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
