import { userDetailContext } from "@/contexts/userDetailContext";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

type useUpdateUserCreditsParams = {
  redirect?: boolean;
};

const useUpdateUserCredits = ({
  redirect = false,
}: useUpdateUserCreditsParams) => {
  const { setUserDetail, userDetail } = useContext(userDetailContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateCreditsInDB = async (selectedCredits: number) => {
    setLoading(true);
    try {
      const result = await db
        .update(usersTable)
        .set({
          credits: selectedCredits,
        })
        .where(eq(usersTable.email, userDetail.email))
        .returning();

      if (result[0]) {
        setUserDetail(result[0]);
        if (redirect) router.back();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { updateCreditsInDB, loading };
};

export default useUpdateUserCredits;
