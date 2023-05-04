import { useStore } from "@/stores/appStore";
import { getSnapshot } from "mobx-state-tree";
import { useEffect, useMemo, useState } from "react";

// TODO: Reroute to login if not authenticated

const Landing = () => {
  const [profile, setProfile] = useState(null);
  const store = useStore();

  console.log("store", getSnapshot(store));

  // useEffect(() => {
  //   store.authStore.checkAuth();
  // }, [store.authStore]);

  // if (!profile) {
  //   return <button onClick={checkAuth}>Log In</button>;
  // }

  const SignInButton = () => (
    <button onClick={store.authStore.checkAuth}>Log In</button>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!profile ? (
        <SignInButton />
      ) : (
        <>
          <h1>Display your Spotify profile data</h1>

          <section id="profile">
            <h2>
              Logged in as <span id="displayName"></span>
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
                Spotify URI: <a id="uri" href="#"></a>
              </li>
              <li>
                Link: <a id="url" href="#"></a>
              </li>
              <li>
                Profile Image: <span id="imgUrl"></span>
              </li>
            </ul>
          </section>
        </>
      )}
    </main>
  );
};

export default Landing;
