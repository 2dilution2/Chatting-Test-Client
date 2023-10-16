import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { create, get } from '../apis/chatApi';

export function useQueryCrewList() {
  const { data: crewList, status } = useQuery({
    queryKey: ['crewList'],
    queryFn: get,
  });
  return { crewList, status };
}

export function useMutationCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createCrew, status: createStatus } = useMutation(create, {
    onSuccess: (data) => {
      toast.success('채팅방 생성 성공!');
      queryClient.invalidateQueries(['crewList']);
      navigate(`/crew/${data.id}/chat`);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { createCrew, createStatus };
}
