import { getUserRooms } from "@/features/create-new/services/create-new.service";
import { useQuery } from "@tanstack/react-query";

type useGetRoomsProps = {
  isEnabled: boolean;
  userEmail: string;
};

const useGetRooms = ({ isEnabled, userEmail }: useGetRoomsProps) => {
  const response = useQuery({
    queryKey: ["user-rooms"],
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

  return { ...response };
};

export default useGetRooms;
