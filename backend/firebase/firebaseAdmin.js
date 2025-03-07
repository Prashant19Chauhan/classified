import admin from 'firebase-admin';
import source from '../config/firebaseServiceKey.json' assert { type: 'json' };

const initializeFirebase = () => {
  try{
        admin.initializeApp({
            credential: admin.credential.cert(source),
        });
    }catch(err){
        console.log(err);
    }
};

export { initializeFirebase };