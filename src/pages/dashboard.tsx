import { useStore } from "@/stores/appStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

// TODO: Reroute to login if not authenticated

const Dashboard = () => {
  const store = useStore();

  // console.log(document.cookie);

  useEffect(() => {
    store.userStore.getProfile();
  }, [store.userStore]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>DASHBOARD</p>
    </main>
  );
};

export default observer(Dashboard);
