import { login as loginUrl } from '@/map/obj_format_url.js';

const login = function loginWithPasswrodUserCaptcha(password, user, captcha) {
  return apost(loginUrl, { password, user, captcha });
};

export default {
  login,
};
