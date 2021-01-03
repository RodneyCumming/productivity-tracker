import React from 'react';
import './App.css';

const saveSubscriptionEndpoint = 'https://v1qo2mhy9g.execute-api.us-east-1.amazonaws.com/dev/subscription';
const pushNotificationEndpoint = 'https://v1qo2mhy9g.execute-api.us-east-1.amazonaws.com/dev/push'

function App() {

  const publicVapidKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;

// if("serviceWorker" in navigator) {
//     send().catch(err => console.log(err));
//     navigator.serviceWorker.ready.then(function(reg) {
//     reg.pushManager.getSubscription().then(function(subscription) {
//       subscription.unsubscribe().then(function(successful) {
//         console.log('Youve successfully unsubscribed')
//       }).catch(function(e) {
//         console.log('Unsubscription failed', e)
//         // 
//       })
//     })
//   });
// }

//Register service worker, register push , send push notifications  
// async function send() {
//     console.log("registering service worker");
    // const register = await navigator.serviceWorker.register('/service-worker.js', {
    //     scope: "http://localhost:3000/"
    // });
//     console.log("Service worker registered...");

    //Register push 
    // console.log("Regisering push");
    // const subscription  = await register.pushManager.subscribe({
    //     userVisibleOnly: true,
    //     applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    // })
    // console.log("push registered");

    //send push notification
    // console.log("sending push...")
    // await fetch(`${apiUrl}/subscribe`, {
    //     method: "POST",
    //     body: JSON.stringify(subscription),
    //     headers: {
    //         "content-type" : "application/json"
    //     }
    // })
    // console.log("Push sent...")

// }

// function registerServiceWorker() {
//   return navigator.serviceWorker.register("/sw.js");
// }

function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

// function registerServiceWorker() {
//   if ('serviceWorker' in navigator) {
//     // Register a service worker hosted at the root of the
//     // site using the default scope.
//     navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
//       console.log('Service worker registration succeeded:', registration);
//     }, /*catch*/ function(error) {
//       console.log('Service worker registration failed:', error);
//     });
//   } else {
//     console.log('Service workers are not supported.');
//   }
// }

// async function askUserPermission() {
//   return await Notification.requestPermission();
// }

async function saveSubscription() {
    // console.log("registering service worker");
    // const register = await navigator.serviceWorker.register('/service-worker.js', {
    //     scope: "/"
    // });

    console.log('save subscription');
    const serviceWorker = await navigator.serviceWorker.ready;
    
    console.log("Service worker registered...");

    //Register push 
    console.log("Regisering push");
    const subscription  = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    console.log("push registered", JSON.stringify(subscription));

    //send push notification
    console.log("sending push...")
    await fetch(saveSubscriptionEndpoint, {
        method: "POST",
        body: JSON.stringify(subscription),
        mode: "no-cors", // 'cors' by default
        headers: {
            "content-type" : "application/json"
        }
    })
    console.log("Push sent...")

}

async function pushNotification() {
    
    await fetch(pushNotificationEndpoint, {
        method: "GET",
        mode: "no-cors" // 'cors' by default
    })
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  return (
    <div className="App">
      <header className="App-header">

        <h2>Web Push Testing</h2>
        <button onClick={saveSubscription}><h1>Save Subscription</h1></button>
        <button onClick={pushNotification}><h1>Send Push Notification</h1></button>
        <button onClick={() => alert(isPushNotificationSupported())}><h1>Is Push Notification Supported?</h1></button>
        {/* Todo: unsubscribe */}
      </header>
    </div>
  );
}

export default App;
