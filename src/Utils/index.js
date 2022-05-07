import axios from 'axios';

export const checkUserIsAdmin = currentUser => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes('admin')) return true;

  return false;
}

export const apiInstance = axios.create({
  baseURL: 'https://asia-south1-rediva-lifestyle.cloudfunctions.net/app'
  //baseURL: 'http://localhost:5000/rediva-lifestyle/asia-south1/app'
  //baseURL: 'http://localhost:5001'
});

export const apiInstance2 = axios.create({
  // baseURL: 'https://asia-south1-rediva-lifestyle.cloudfunctions.net/sendMail'
  // baseURL: 'http://localhost:5000/rediva-lifestyle/asia-south1/sendMail'
  baseURL: "http://127.0.0.1:8000/sendemail"
});

export const contentApi = axios.create({
  baseURL: 'https://shoppingcontent.googleapis.com/content/v2.1/291427111/products'
  // baseURL: 'http://localhost:5000/rediva-lifestyle/asia-south1/sendMail'
});
