// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
        apiKey: "AIzaSyAcr04Np8vrcsiFUx89Aw2xNoEVsbGF9DA",
        type: "service_account",
        project_id: "prohumanity-42269",
        private_key_id: "d36ea265e86921f716da7d4fce511317d5b2a6dc",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDyXnj56elV5SXf\n92RGJbf4/wtJgeRrY0EJAdeVeW75nkE3URiX/Y+q788uT+fgYPlflNa397PAzqLf\nGsTWFSmL00u7WAIcqZj52qS8hegYCYpxv0hXVCzAAE0oiv1pzv3PWSQzGBnSvkBI\n+GGxrdX7qu4FL/ULP5uR8ReuBPrRWyqWSgMC79WgkcmM4nCECLPdR2SMAQR9VsjW\nxG9YRv2CpRXfUHd8tOoowr0frZuxbAwiWZvWPfFxXBiB7uyX3wEmPfmtodw2qn8h\nbF6/S9zknsr9NLkUOYbxTsMa2b+2Muh1jOTCsX+bahgLdgiDZq94vAVM1kjbisdt\nly2p3ao7AgMBAAECggEAXdeEYcdWyCI8QvaHxb1O+ULO/PwlFAtPIAytizuEY3QJ\n7kAhFKBhox7NCjJ4JmGFzKNVa8+lsq6PU3EK65UwC+qY9QXDc5ObHoqwpCn4zm3L\nQ/V7LgzycrjrJxqBuhkiHsl2Aa6AOR/exiIduW0EYDgzhqCl8WAEfUJrF77n2m0A\nKhG0J6SOL3G1JG5zXq7ZdimGYEdzBTz4qXTMQbYgZ9uCdV/AI/Zu+v1aG/EWevnj\nC9U2qOn+romtIIPljqgF9DUo1PvcthBg1qmKFdCChBvjbPhNnufjSmOiEjqwZY6r\nw4PJfGfmesH/uVI5GqlU/tV0fA7H6dW5JEZgvk4qIQKBgQD9QsD7k3KEj22f7bwT\nfV0u6D7Sp2j7wsM5o+YOpUu3+Q8669WhoSKmBh/EYUgJAMocgo8yiXbk3v6ICTDy\n510k7d6S08F0tWGRw3urKUjTcbIoaBcr66z45894HmNaMiRZ4FN4GDEVw2fOlnHU\nw5xqqJ3PeBY0R7bP7N6LpsF/KwKBgQD0/Y+axuu9KC9TJ8O/psuPPMYuVwV2fyd6\n/zMvnNVBn4oHNhVHE12x1dFwZwl4Is1l1gEq6532R859fjCSYtGTIrN4Yjz1+lus\nRkIhNLXyMDQy3z/teQqZxws/ll4Ywj4kWOs0/qrguNcXrSZ6qeIaCQs4XkQr78UL\nwDQ4CKt5MQKBgQC7/bwQQj/ERE8EYsyzzt/HfN99MIVONCED/TQ89NfCxR5YB0z5\ngAmfIXadJ/T3sd1U0lkHE2DsvNZFFkV+WN0cF3GanZLBVg4JzAhVYfzL715mffWN\nRZCM5k1rhWsMPaIcENcEkziERhsdDzGJ1HWb+nPB2ArrXbxGlTYQhYSmJwKBgQDu\nZXMBXQJ2rgznMTG1ZDx/JNeArmN9fJxRftYzRbzrP7ET9VfdMwYgj/1fEJTRV6Rh\nrU6zklXDGvrfeRUQzaI8OC9GPOovPjFIwZGGOIG4q5mPy1is3/Ul0N+sP8lO9G19\n9xziE9L6HEQKIQ7pnDiNtzE459oUmxw2pBDsWdtqcQKBgQCIs1AMZYWp6Z9Xl+ru\njPBGZGYoKC1RK0lyBTZYpsN4iZ88TSnIoEyxWYopBQzPWicIrJsllBb9U2yG2/Yb\nCihHfustVMF2y4OWhFzr8Vsj6BntzZ+TCKxEYwvW9z3njssANO90njEtJUWRfzky\nTYsv+HqEHGCKxAWubS46r0NhIA==\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-x5ngf@prohumanity-42269.iam.gserviceaccount.com",
        client_id: "108895893853066267556",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x5ngf%40prohumanity-42269.iam.gserviceaccount.com",
        universe_domain: "googleapis.com"
      };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
      });
const firestore = getFirestore(app);

export { auth, firestore };