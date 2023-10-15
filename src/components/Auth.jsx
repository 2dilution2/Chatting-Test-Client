import { Navigate, Outlet } from 'react-router-dom';
import { useQueryInfo } from '../hooks/member';
import Spinner from './Spinner';

function Auth() {
  const { info, infoStatus } = useQueryInfo();
  const isLogin = infoStatus === 'success' && info !== undefined;

  if (infoStatus === 'loading') {
    console.info('loading to get user');
    return <Spinner />;
  }

  if (!isLogin) {
    console.info('no login user');
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default Auth;
