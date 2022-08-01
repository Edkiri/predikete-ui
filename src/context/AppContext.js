import React, { createContext } from "react";

import { useLocalStorage } from "@hooks/useLocalStorage";
import { useProfilePic } from "@hooks/useProfilePic";
import { useGetNotifications } from "@hooks/useGetNotifications";

export const Context = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [jwt, setJWT] = useLocalStorage("jwt", null);
  const { profilePic, deleteProfilePic } = useProfilePic(user);
  const { notificationsList, removeNotification } = useGetNotifications({
    jwt,
  });

  const value = {
    user,
    setUser,
    jwt,
    profilePic,
    notificationsList,
    removeNotification,
    login: ({ jwt, user }) => {
      setUser(user);
      setJWT(jwt);
    },
    logout: () => {
      setUser(null);
      setJWT(null);
      deleteProfilePic();
      window.localStorage.clear();
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default {
  Provider,
  Consumer: Context.Consumer,
};
