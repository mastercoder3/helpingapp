import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp();

exports.newMessageNotification = functions.firestore
    .document('chat/{messages}')
    .onUpdate(async event => {
        const data = event.after.data();

        console.log(data);

    const userId = data.senderId
    const receiver = data.receiverId
    const receiverName = data.receiverName;
        

    // Notification content
    const payload = {
      notification: {
          title: 'New Message',
          body: `${receiverName} Sent you a Message.`
      }
    }

    // ref to the device collection for the user
    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', userId)


    // get the user's tokens and send notifications
    const devices = await devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push( token )
    })
    return admin.messaging().sendToDevice(tokens, payload)
    });