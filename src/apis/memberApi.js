import { privateApi, publicApi } from './baseApi';

// 회원가입
export const signUp = async (newUser) => {
  const { data } = await publicApi.post(`member/sign-up`, newUser);
  return data;
};

// 회원 정보 조회
export const getMe = async () => {
  const { data } = await privateApi.get(`member`);
  return data;
};
