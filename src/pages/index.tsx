import { useStore } from "@/stores/appStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Landing = () => {
  const { authStore } = useStore();
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };

  const SignInButton = () => (
    <button onClick={(e) => authStore.authenticate(navigateToDashboard)}>
      LOG IN
    </button>
  );

  useEffect(() => {
    authStore.retrieveAccessToken();
  }, [authStore]);

  useEffect(() => {
    if (authStore.accessToken) {
      router.push("/dashboard");
    }
  }),
    [authStore.accessToken];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignInButton />
    </main>
  );
};

export default Landing;
