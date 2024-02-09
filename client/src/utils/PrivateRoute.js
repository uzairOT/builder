import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.userInfo);
  console.log(isAuthenticated);

  return isAuthenticated ? <Outlet /> :  <Outlet />;
  //<Navigate to='/' replace />
};

export default PrivateRoute;
