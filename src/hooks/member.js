import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getMe, signUp } from '../apis/memberApi';
import { login, logout } from '../apis/authApi';

export function useMutationSignUp() {
    const navigate = useNavigate();
  
    const { mutate: signUpUser, status: signUpStatus } = useMutation(signUp, {
      onSuccess: ({ result }) => {
        toast.success(result);
        navigate('/login');
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
    return { signUpUser, signUpStatus };
}

export function useMutationLogin() {
    const navigate = useNavigate();
  
    const { mutate: loginUser, status: loginStatus } = useMutation(login, {
      onSuccess: ({ accessToken, refreshToken }) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        toast.success('로그인 성공');
        navigate('/', { replace: true });
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
    return { loginUser, loginStatus };
}

export function useQueryInfo() {
    const navigate = useNavigate();
    const { data: info, status: infoStatus } = useQuery({
      queryKey: ['info'],
      queryFn: getMe,
      onError: () => {
        navigate('/login', { replace: true });
      },
      staleTime: 1000 * 60 * 60 * 8, // should be refetched every 8 hours
    });
    return { info, infoStatus };
}

export function useMutationLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
  
    const { mutate: logoutUser } = useMutation(logout, {
      onSuccess: ({ result }) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        toast.success(result);
        queryClient.setQueryData(['info'], null);
        queryClient.removeQueries(['info']);
        navigate('/login', { replace: true });
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
    return { logoutUser };
}