import { privateApi } from './baseApi';

// 채팅방 생성
export const create = async (newChatRoom) => {
  const { data } = await privateApi.post(`crew`, newChatRoom);
  return data;
};

// 채팅방 조회
export const get = async () => {
  const { data } = await privateApi.get(`crew`);
  return data;
};
