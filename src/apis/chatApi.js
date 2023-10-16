import { privateApi } from './baseApi';

// 채팅방 생성
export const create = async (newCrew) => {
  const { data } = await privateApi.post(`crew`, newCrew);
  return data;
};

// 채팅방 조회
export const get = async () => {
  const { data } = await privateApi.get(`crew`);
  return data;
};
