import { useStore } from "@/stores/appStore";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

const Callback = () => {
  const { authStore } = useStore();
  const [didCheckAuth, setDidCheckAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!didCheckAuth) {
      setDidCheckAuth(true);

      const checkAuth = async () => {
        // obtain authorization code
        authStore.obtainAuthorizationCode();

        // fetch access token
        if (authStore.authorizationCode) {
          await authStore.fetchAccessToken();
        }

        // if successful, go to dashboard
        // else, return to landing
        router.replace(authStore.accessToken ? "/dashboard" : "/");
      };

      checkAuth();
    }
  }, [didCheckAuth, authStore, router]);

  return null;
};

export default observer(Callback);
