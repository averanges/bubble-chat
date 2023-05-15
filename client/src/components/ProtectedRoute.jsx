import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { isLoggedIn } from "../slices/authSlice";

const ProtectedRoute = ({ path, element}) => {
    const isAuthenticated = useSelector(isLoggedIn)
    return (
      isAuthenticated ? (
        <Route path={path} element={element} />
      ) : (
        <Navigate to= "/login" />
      )
    ); 
  };

  export default ProtectedRoute