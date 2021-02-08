import React from "react";
import { Button } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const saveSubscriptionEndpoint =
  "https://v1qo2mhy9g.execute-api.us-east-1.amazonaws.com/dev/subscription";
const pushNotificationEndpoint =
  "https://v1qo2mhy9g.execute-api.us-east-1.amazonaws.com/dev/push";

const PushNotifications = () => {
  const publicVapidKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;

  function isPushNotificationSupported() {
    return "serviceWorker" in navigator && "PushManager" in window;
  }

  async function saveSubscription() {
    console.log("save subscription");
    const serviceWorker = await navigator.serviceWorker.ready;
    console.log("Service worker registered...");

    //Register push
    console.log("Regisering push");
    const subscription = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log("push registered", JSON.stringify(subscription));

    //send push notification
    console.log("sending push...");
    await fetch(saveSubscriptionEndpoint, {
      method: "POST",
      body: JSON.stringify(subscription),
      mode: "no-cors", // 'cors' by default
      headers: {
        "content-type": "application/json",
      },
    });
    console.log("Push sent...");
  }

  async function pushNotification() {
    await fetch(pushNotificationEndpoint, {
      method: "GET",
      mode: "no-cors", // 'cors' by default
    });
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  return (
    <div>
      <Typography variant="h4" component="h4">
        Push Notifications
      </Typography>

      <Box m={1} mb={1} mt={3} ml={0}>
        <Button
          onClick={saveSubscription}
          variant="contained"
          color="primary"
        >
          Save Subscription
        </Button>
      </Box>
      <Box m={1} mb={1} ml={0}>
      <Button
        onClick={pushNotification}
        variant="contained"
        color="primary"
      >
        Send Push Notification
      </Button>
      </Box>
      <Box m={1} mb={1} ml={0}>
      <Button
        onClick={() => alert(isPushNotificationSupported())}
        variant="contained"
        color="primary"
      >
        Is Push Notification Supported?
      </Button>
      </Box>
    </div>
  );
};

export default PushNotifications;
