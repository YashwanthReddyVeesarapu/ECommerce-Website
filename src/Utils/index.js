import axios from 'axios';

export const checkUserIsAdmin = currentUser => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes('admin')) return true;

  return false;
}





export const apiInstance = axios.create({
  // baseURL: 'https://asia-south1-rediva-lifestyle.cloudfunctions.net/app'
  baseURL: 'https://rediva-api.herokuapp.com/',
  // baseURL: 'http://127.0.0.1:8000/'
});



export const contentApi = axios.create({
  baseURL: 'https://shoppingcontent.googleapis.com/content/v2.1/291427111/products'
  // baseURL: 'http://localhost:5000/rediva-lifestyle/asia-south1/sendMail'
});
