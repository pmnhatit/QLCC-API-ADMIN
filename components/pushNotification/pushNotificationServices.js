const admin = require("firebase-admin");

const serviceAccount = require("./apartment-management-8187f-firebase-adminsdk-hf2xm-4b33869c4f.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports.sendMessageToDevices = async (tokens, noti) =>{
    // Send a message to the devices corresponding to the provided
  // registration tokens.
  const message = {
    data: noti,
    notification: noti,
    tokens: tokens,
  }
  
  admin.messaging()
  .sendMulticast(message)
  .then(response => {
    // Response is an object of the form { responses: [] }
    const successes = response.responses.filter(r => r.success === true)
      .length;
    const failures = response.responses.filter(r => r.success === false)
      .length;
    console.log(
      'Notifications sent:',
      `${successes} successful, ${failures} failed`
    );
  })
  .catch(error => {
    console.log('Error sending message:', error);
  });
}