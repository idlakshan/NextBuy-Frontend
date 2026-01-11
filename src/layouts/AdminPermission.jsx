import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";

const AdminPermission = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (isAdmin(user?.role)) {
    return <>{children}</>;
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-red-500 bg-red-50 p-4">Access Denied</h2>
    </div>
  );
};

export default AdminPermission;
