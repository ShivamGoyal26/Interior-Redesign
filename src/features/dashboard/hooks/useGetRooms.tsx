import { getUserRooms } from "@/features/create-new/services/create-new.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type useGetRoomsProps = {
  isEnabled: boolean;
  userEmail: string;
};

const useGetRooms = ({ isEnabled, userEmail }: useGetRoomsProps) => {
  const queryKey = ["user-rooms"];
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

  useEffect(() => {
    return () => {
      queryClient.cancelQueries({ queryKey });
    };
  }, []);

  return { ...response };
};

export default useGetRooms;
