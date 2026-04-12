import axiosInstance from "@/utils/axios";
import { useAuth, useUser } from "@clerk/react";
import { useEffect, useRef } from "react";

const SyncUser = () => {
  const hasSyncedRef = useRef(false);
  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!user || hasSyncedRef.current) return;

    const sync = async () => {
      if (!user) return;

      await axiosInstance.post("/user/sync", {
        email: user.emailAddresses[0].emailAddress,
      });
    };
    sync();
  }, [user, getToken]);

  return null;
};

export default SyncUser;
