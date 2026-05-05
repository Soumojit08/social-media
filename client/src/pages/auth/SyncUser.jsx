import { useAxios } from "@/hooks/useAxios";
import { useAuth, useUser } from "@clerk/react";
import { useEffect, useRef } from "react";

const SyncUser = () => {
  const hasSyncedRef = useRef(false);
  const { getToken } = useAuth();
  const { user } = useUser();
  const axiosInstance = useAxios();

  useEffect(() => {
    if (!user || hasSyncedRef.current) return;

    const sync = async () => {
      if (!user) return;
      try {
        const token = await getToken();
        console.log("User data", user);
        console.log("token", token);

        await axiosInstance.post("/user/sync", {
          email: user.emailAddresses[0].emailAddress,
          fullName: user.fullName,
          hasImage: user.hasImage,
          imageUrl: user.imageUrl,
        });

        hasSyncedRef.current = true;
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    };
    sync();
  }, [user, getToken, axiosInstance]);

  return null;
};

export default SyncUser;
