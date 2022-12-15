import { useLocation, Navigate, Outlet } from 'react-router-dom';
import * as Lockr from 'lockr';

const RequireAuth = () => {
  const token = Lockr.get('token');
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
