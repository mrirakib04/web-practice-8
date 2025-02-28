import { useContext } from "react";
import { Navigate } from "react-router";
import PropTypes from "prop-types";
import { DNA } from "react-loader-spinner";
import { AuthContext } from "../Contexts/AuthContextProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <DNA></DNA>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;
