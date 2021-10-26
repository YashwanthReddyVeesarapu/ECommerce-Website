import { auth } from './../../firebase/utils';

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: 'https://rediva-lifestyle.web.app/login'
  };

  return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ['Email not found. Please try again.'];
        reject(err);
      });
  });
};