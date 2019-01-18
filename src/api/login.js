import apost from './axios';
import url from './url';

const login = function loginWithPasswrodUserCaptcha(password, user, captcha) {
  return apost(url.login, { password, user, captcha });
};

export default {
  login,
};
