const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createNewUser = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().createUser({
      email: data.email,
      emailVerified: false,
      phoneNumber: data.phoneNumber,
      password: data.password,
      displayName: data.displayName,
      disabled: false,
    });

    const response = await admin
      .auth()
      .setCustomUserClaims(user.uid, { staff: true });

    return {
      data: user,
    };
  } catch (error) {
    return {
      data: error,
    };
  }
});

exports.makeAdmin = functions.https.onCall(async (data, context) => {
  try {
    const response = await admin
      .auth()
      .setCustomUserClaims(data.userID, { staff: true, admin: true });

    return {
      data: response,
    };
  } catch (error) {
    throw new functions.https.HttpsError(error);
  }
});

exports.deleteUser = functions.https.onCall(async (data, context) => {
  try {
    const response = await admin.auth().deleteUser(data.userID);

    return {
      data: response,
    };
  } catch (error) {
    throw new functions.https.HttpsError(error);
  }
});

exports.updateUser = functions.https.onCall(async (data, context) => {
  try {
    const response = await admin.auth().updateUser(data.uid, data.data);

    return {
      data: response,
    };
  } catch (error) {
    throw new functions.https.HttpsError(error);
  }
});
