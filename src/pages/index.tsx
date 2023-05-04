import { useStore } from "@/stores/appStore";

// TODO: Reroute to dashboard if authenticated

const Landing = () => {
  const store = useStore();

  const SignInButton = () => (
    <button onClick={store.authStore.checkAuth}>LOG IN</button>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignInButton />
    </main>
  );
};

export default Landing;
