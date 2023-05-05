import { useStore } from "@/stores/appStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const {
    authStore,
    userStore,
    userStore: { currentUser },
  } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (authStore.accessToken) {
      userStore.getProfile();
    } else {
      authStore.retrieveAccessToken();

      if (!authStore.accessToken) {
        router.push("/");
      }
    }
  }, [authStore, authStore.accessToken, userStore, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section id="profile">
        <h2>
          Logged in as:{" "}
          <span id="displayName">{currentUser?.display_name}</span>
        </h2>
        {/* <span id="avatar"></span> */}
        <ul>
          {/* <li>
            User ID: <span id="id"></span>
          </li>
          <li>
            Email: <span id="email"></span>
          </li> */}
          <li>
            Spotify URI:{" "}
            <a id="uri" href="#">
              {currentUser?.uri}
            </a>
          </li>
          {/* <li>
            Link: <a id="url" href="#"></a>
          </li>
          <li>
            Profile Image: <span id="imgUrl"></span>
          </li> */}
        </ul>
      </section>
      <button onClick={(e) => authStore.logout()}>LOG OUT</button>
    </main>
  );
};

export default observer(Dashboard);
