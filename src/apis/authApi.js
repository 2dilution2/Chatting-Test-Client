// import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { privateApi, publicApi } from './baseApi';

// 로그인
export const login = async ({ email, password }) => {
    const { data } = await publicApi.post(`member/login`, { email, password });
    return data;
};

// 로그아웃
export const logout = async (accessToken) => {
    const { data } = await privateApi.post(`member/logout`, { accessToken });
    return data;
};
  
// token 재발급
export const reissue = async (refreshToken) => {
    const { data } = await publicApi.post(
      `members/token`,
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
      }
    );
    return data;
};

// add request interceptor for API calls
privateApi.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
);

// add response interceptor for API calls
privateApi.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status },
        response: { data: { code } }
      } = error;
      if (status === 401 && code === 'E103') {
        // access token invalid
        const originalRequest = config;
  
        const {
          status: reissueStatus,
          response,
          data: { accessToken, refreshToken },
        } = await reissue();
  
        // reissue access token fail
        if (reissueStatus === 401 && response.data.code.includes('E20')) {
          toast.error(response.data.message);
          // 기존의:
          // const naivate = useNavigate();
          // naivate('/login');

          // 변경 후:
          window.location.href = '/login';
        }
  
        // reissue access token success
        else if (status === 200) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          originalRequest.headers.authorization = `Bearer ${accessToken}`;
  
          // request again with new access token
          return privateApi.request(originalRequest);
        }
      }
      return Promise.reject(error);
    }
);
  