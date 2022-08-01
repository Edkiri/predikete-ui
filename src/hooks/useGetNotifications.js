import axios from "axios";
import { useState, useEffect } from "react";
import { PREDIKETE_API } from "../constants";

export const useGetNotifications = ({ jwt }) => {
  const [notifications, setNotifications] = useState(null);
  const [notificationsList, setNotificationsList] = useState([]);

  useEffect(() => {
    if (jwt) {
      axios
        .get(`${PREDIKETE_API}/notifications`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => setNotifications(res.data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [jwt]);

  useEffect(() => {
    if (notifications) {
      const newList = [...notifications.invitations, ...notifications.requests];
      const formatedList = newList.map((notification) => {
        if (notification.type === "invitation") {
          return {
            title: "has invited you to",
            ...notification,
          };
        }
        return {
          title: "has applied to join",
          ...notification,
        };
      });
      setNotificationsList(formatedList);
    }
  }, [notifications]);

  const removeNotification = (notificacionId) => {
    const newNotificationsList = notificationsList.filter(
      (notification) => notification.id !== notificacionId
    );
    setNotificationsList(newNotificationsList);
  };

  return { notificationsList, removeNotification };
};
