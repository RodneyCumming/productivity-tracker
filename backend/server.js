if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
const webpush = require("web-push");
const path = require("path");
var { putItem, getAllItems } = require("./services/dynamoDb");

const app = express();

app.use(cors())

app.use(express.json());
// app.use(express.static(path.join(__dirname, "client")));

// app.get("/service-worker.js", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public", "service-worker.js"));
// });
// app.get("*", function response(req, res) {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey =  process.env.PRIVATE_VAPID_KEY;
const maltoEmail =  process.env.MALTO_EMAIL;

webpush.setVapidDetails(
  maltoEmail,
  publicVapidKey,
  privateVapidKey
);

//Subscribe route
app.post("/subscribe", (req, res) => {
  //Get push subscription object
  const subscription = req.body;

  //Send 201 - resource created
  res.status(201).json({});

  //Create payload
  const payload = JSON.stringify({ title: "push testing...." });

  // Pass Object into send Notification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err));
});

app.post("/save-subscription", (req, res) => {
  //Get push subscription object

  // const subscription = req.body;

  putItem("Subscriptions", { subscription: JSON.stringify(req.body) });

  //Send 201 - resource created
  res.status(203).json({});

  // //Create payload
  // const payload = JSON.stringify({title: "push testing...."});

  // // Pass Object into send Notification
  // webpush.sendNotification(subscription, payload)
  // .catch(err => console.log(err));
});

const sendPushNotification = async () => {
  //Create payload
  const payload = JSON.stringify({ title: "push testing...." });

  // console.log("savedSubscription", savedSubscription);

  // Get Subscriptions from dynamoDb
  const dbItems = await getAllItems("Subscriptions");
  console.log(dbItems)
  const subscriptionsArray = dbItems.Items.map(
    (item) => item.subscription
  );

  // for each subscription send notification?
  // Pass Object into send Notification
  for (const subscription of subscriptionsArray) {
    await webpush
      .sendNotification(JSON.parse(subscription), payload)
      .catch((err) => console.log(err));
  }
}

app.get("/push-notification", async (req, res) => {
  res.status(200).json({});

  sendPushNotification();
});

app.get("/getAllItems", async (req, res) => {
  const dbItems = await getAllItems("Subscriptions");
  res.status(200).json({ dbItems });
});

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
//   sendPushNotification();
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server started on ${PORT}`));
