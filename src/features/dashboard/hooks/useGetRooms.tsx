import { getUserRooms } from "@/features/create-new/services/create-new.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type useGetRoomsProps = {
  isEnabled: boolean;
  userEmail: string;
};

const queryKey = ["user-rooms"];
const useGetRooms = ({ isEnabled, userEmail }: useGetRoomsProps) => {
  const queryClient = useQueryClient();

  const response = useQuery({
    queryKey,
    queryFn: () =>
      getUserRooms({
        userEmail,
      }),
    enabled: isEnabled,
    retry: 1,
    staleTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const resetQuery = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  useEffect(() => {
    return () => {
      queryClient.cancelQueries({ queryKey });
    };
  }, [queryClient, queryKey]);

  return { ...response, resetQuery };
};

export default useGetRooms;
