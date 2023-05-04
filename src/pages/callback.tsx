import { useStore } from "@/stores/appStore";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

const Callback = () => {
  const { authStore } = useStore();
  const [didCheckAuth, setDidCheckAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const navigateAfterAuth = async () => {
      if (!didCheckAuth) {
        setDidCheckAuth(true);

        const isAuthenticated = await authStore.checkAuth();

        if (isAuthenticated) {
          router.push("dashboard");
        }
      }
    };

    navigateAfterAuth();
  }, [didCheckAuth, authStore, router]);

  return null;
};

export default observer(Callback);
