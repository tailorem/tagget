import { useStore } from "@/stores/appStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

// TODO: Reroute to login if not authenticated

const Dashboard = () => {
  const {
    userStore,
    userStore: { currentUser },
  } = useStore();

  // console.log(document.cookie);

  useEffect(() => {
    userStore.getProfile();
  }, [userStore]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section id="profile">
        <h2>
          Logged in as:{" "}
          <span id="displayName">{currentUser?.display_name}</span>
        </h2>
        <span id="avatar"></span>
        <ul>
          <li>
            User ID: <span id="id"></span>
          </li>
          <li>
            Email: <span id="email"></span>
          </li>
          <li>
            Spotify URI:{" "}
            <a id="uri" href="#">
              {currentUser?.uri}
            </a>
          </li>
          <li>
            Link: <a id="url" href="#"></a>
          </li>
          <li>
            Profile Image: <span id="imgUrl"></span>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default observer(Dashboard);
