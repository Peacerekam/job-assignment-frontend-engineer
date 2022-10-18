import axios from "axios";
import { useEffect, useState } from "react";
import "./style.scss"

export const Notifications: React.FC = () => {
  const [notification, setNotification] = useState<string>();

  useEffect(() => {
    let notificationTimeout: NodeJS.Timeout;
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status === 401) {
          setNotification(error.response.data.message);
          if (notificationTimeout) clearTimeout(notificationTimeout);
          notificationTimeout = setTimeout(() => setNotification(""), 5000);
        }
        return error;
      }
    );
  }, []);

  return notification ? <div className="notification-bar">{notification}</div> : null;
};
