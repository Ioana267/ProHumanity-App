// firebase.js
import firebase from 'firebase/app';
import 'firebase/auth'; // Include specific Firebase services as needed

const firebaseConfig = {
    "type": "service_account",
    "project_id": "technovationapp-7b744",
    "private_key_id": "863f2edb0007f66205612d98da7fe547590199ca",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyqZaYb7LkoKcE\ngZsNwfxMg3mVgGALa8xIIvjPsqSWbvtD1a8vFWjDDZbPaVi4QG35UzwcSnFSoFYe\nsjK+hD9lXAOljM34Gf+00/pMo9rdnJDo6/zbZfVOAbl0fOTBgS0L36A75cX4TtxC\nui0y3rem3/8kzlYCU2jgyGBC2ScHg4w96A3MjTJHHaG4TfXMoXsic7hav6tFWfjL\naxTbTAQcx+H3olc1LL2KU2u3vAs2y6FcktJqXctVkC7JIndvhHrIQj1uo0aIAr8B\ne5HNfmZ9OtSrXNift6147uxeA8AjkPh+98asZ63dEG6pTKormETkwrjDzdenadDB\nOc6tyLTPAgMBAAECggEAEMwL6gn6Xi9SdISA4OK/hywHNsyKexhn7NJI5TIM8k29\n1stUvI79OfVhm99yJWR9UmcGbDx9egC0CA/F4I6LbUqg1yQtSymallQloKX5EkPB\nhfyF2dS0ouBboL2LPjwYUZj1Nhxsp+M2Jxnc3P7+cjR2Bu5VPMO9xQBhuHc1Caom\ni6RCJQohQjOskfTy+sofxGbKOfzGcMFDDOjalYDz7wd+gC+S3mPusakR366aRkba\nCxkIz1NDnUJuBzXECffee2uUTgtmsCqUa3WKRqspVkYOjoMWWpMp+Ebijs4bSSTU\nFPPVjnVuJ9ChuGJAyG2Gd0zxspvHyUlxW9CMJhXVuQKBgQDtO+U3+BYEo1NgtEiZ\nMGa6IcVeKkzQXRiHmY4aDNqxAQ9Z6/p/Ch4kXDDEArd2zJOHU6e5TyHVKm64BlsY\nwhoCn9iOZCPgjDBASX01urp7gzpNePFy9ygJK4bsIy5QPhnIMB/HU2z7vLnM/aO/\nmDFPFN5oQpP/1Wyc6YrVfovWBwKBgQDAy5dGicVhb9Den7Oji0tUT6l8XztkHo0G\n0u3j4K5MpfSBU/eoDoWG5SUQQMRDxk5Gc7xhfUkCocp4dWIAmi7O23EnMZC24B6B\nCzdv8gxws9ok/p+hAORgtKjtUUNUIbS2X2zNakORGyIHpnenYnda/U7S3Eeu2c+4\nyVUbGmw4+QKBgQDEMwoCvOmw0kbtroxwLSh4fd+WXlOC68uSsftlLgZb522Dx/c2\nw+5j0d7+7ORAmzbT7+rCBmELw/kntxH2KumKDBr0wHsvhaGOOXkVS6ZY6hH46rJ9\ni00QMHB4sSvnb0SxXKObnTKAC/h6QbcAiOUW60J5Zb6zEhauuzN4GB2cVwKBgGFC\nE2VVOQpnYwH7pJ67NVwp98EzNX3TX6dynumXPbaS/Z6EYmoYMUoUrLbfRWM/Vdt6\npSy1DDDUt5Q++xp8rWJTF2kDOxLWSu0kYGoLvDTathB1lsec8JjMam+V0BZQDp71\n0qhpk/5OpsMfOjtpk/aF1M7QqyTM4lpAzrsmgDPZAoGAMNG9AMgMnAxY/1idHy2C\nwDymT699WRrBYi4QkZ1fyEZ/NYdp3tomKOauywgMDI3VdIbvjDi02C3QO6LZ+YYn\ntldhjOBd/YSNfk4AwrcXuZfRx5jkmLvndSAp5UEheDui97qSkoaznhf2EeswX1xf\nNkAqevPgcegyejtSmSPAJD4=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-q1k36@technovationapp-7b744.iam.gserviceaccount.com",
    "client_id": "116108957795553974174",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-q1k36%40technovationapp-7b744.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;