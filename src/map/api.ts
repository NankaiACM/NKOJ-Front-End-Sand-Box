import fetch from 'isomorphic-fetch';
import format from 'string-format';
import objFormatUrl, { API_BASE_URL } from './objFormatUrl';

/**
 * 对 fetch 的 options 进行了一些默认设置, 对错误处理进行了修改
 *
 * @param {RequestInfo} url
 * @param {RequestInit} [options]
 * @returns
 */
function fetchBase(url: RequestInfo, options?: RequestInit) {
  const defaultOptions: RequestInit = {
    credentials: 'include',
  };
  const newOptions: RequestInit = {
    ...defaultOptions,
    ...options,
  };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        ...newOptions.headers,
      };
      // JSON 的字符串化在进入函数前进行好，此处延用 RequestInit 数据类型的要求
      // newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  return fetch(API_BASE_URL + url, newOptions)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      if (response.status === 401) {
        // 未授权
        console.log('未授权，前往 http://acm.nankai.edu.cn 登录');
      }
      throw response;
    })
    .then((response) => {
      if (newOptions.method === 'DELETE' || response.status === 204 || response.status === 205) {
        return response.text();
      }
      return response.json();
    })
    .catch((err) => {
      throw err;
    });
}

export interface ApiReturn {
  code: number;
  message: string;
  data?: (AnnouncementInterface)[] | UserInformation | null;
}

export interface AnnouncementInterface {
  message_id: number;
  title: string;
  content: string;
  since: string;
}

export interface MessageInterface {
  title: string;
  message: string;
}

/**
 * 获取所有的公告的集合
 *
 * @export
 * @returns {Promise<AnnouncementInterface[]>}
 */
export async function apiMessageAnnouncement(): Promise<AnnouncementInterface[]> {
  try {
    const ret: ApiReturn = await fetchBase(objFormatUrl.announce, { method: 'GET' });
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    const annouceArray = ret.data as AnnouncementInterface[];
    console.log('获取公告成功');
    return annouceArray;
  } catch (e) {
    console.log('获取公告失败');
    throw e;
  }
}

/**
 * 给所有人发送公告
 *
 * @export
 * @param {MessageInterface} body
 * @returns {Promise<void>}
 */
export async function apiMessageAll(body: MessageInterface): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(objFormatUrl.messageall, { method: 'POST', body: JSON.stringify(body) });
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    console.log('发送公告成功');
  } catch (e) {
    console.log('发送公告失败');
    throw e;
  }
}

export interface MessageWithdrawReturnInterface {
  affected: number;
}

/**
 * 撤回发出的公告
 *
 * @export
 * @param {number} messageId
 * @returns {Promise<void>}
 */
export async function apiMessageWithdraw(messageId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(format(objFormatUrl.withdrawannounce, { mid: messageId }), { method: 'GET' });
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    console.log('删除公告成功');
  } catch (e) {
    console.log('删除公告失败');
    throw e;
  }
}

export interface AdminWhisperInterface {
  uid: number;
  title: string;
  message: string;
}

/**
 * 给单个用户发送管理员私信
 *
 * @export
 * @param {AdminWhisperInterface} whisper
 * @returns {Promise<void>}
 */
export async function apiWhisper(whisper: AdminWhisperInterface): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.whisper, { uid: whisper.uid }),
      {
        method: 'POST',
        body: JSON.stringify({ title: whisper.title, message: whisper.message }),
      },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    console.log('发送私信成功');
  } catch (e) {
    console.log('发送私信失败');
  }
}

export interface UserInformation {
  user_id: number;
  nickname: string;
  gender: number;
  email: string;
  last_login: string;
  submit_ac: number;
  submit_all: number;
  ipaddr: string;
  role?: (number)[] | null;
  words?: null;
  qq: string;
  phone: string;
  real_name: string;
  school: string;
  current_badge: number;
  removed: boolean;
  credits: number;
  perm: Perm;
  ac?: (number)[] | null;
  all?: (number)[] | null;
}
export interface Perm {
  LOGIN: string;
  COMMENT: string;
  REPLY_POST: string;
  ADD_CONTEST: string;
  ADD_PROBLEM: string;
  MANAGE_ROLE: string;
  PUBLIC_EDIT: string;
  REJUDGE_ALL: string;
  SUBMIT_CODE: string;
  SUPER_ADMIN: string;
  GET_CODE_ALL: string;
  CHANGE_AVATAR: string;
  GET_CODE_SELF: string;
  POST_NEW_POST: string;
  CHANGE_PROFILE: string;
  VIEW_OUTPUT_ALL: string;
  EDIT_CONTEST_ALL: string;
  EDIT_PROBLEM_ALL: string;
  VIEW_OUTPUT_SELF: string;
  REJUDGE_CONTEST_ALL: string;
  BYPASS_STATISTIC_ALL: string;
  REJUDGE_CONTEST_SELF: string;
}

/**
 * 获取指定用户的详细信息
 * userId 为空字符串或者 number
 *
 * @export
 * @param {number | string} userId
 * @returns {Promise<UserInformation>}
 */
export async function apiUserInformation(userId: number | string): Promise<UserInformation> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.userplus, { uid: userId }),
      { method: 'GET' },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    const userInformation: UserInformation = ret.data as UserInformation;
    console.log('获取用户信息成功');
    return userInformation;
  } catch (e) {
    console.log('获取用户信息失败');
    throw e;
  }
}

/**
 * 获取当前用户的详细信息
 *
 * @export
 * @returns {Promise<UserInformation>}
 */
export async function apiSelfProfile(): Promise<UserInformation> {
  return apiUserInformation('');
}

export interface SignInInterface {
  captcha: string;
  password: string;
  user: string;
}

/**
 * 用户登录
 * signInPackage.password 需要使用公钥加密
 * 例: signInPackage.password = forge.util.encode64(forge.pki.publicKeyFromPem(publicKey).encrypt(signInPackage.password));
 *
 * @export
 * @param {SignInInterface} signInPackage
 * @returns {Promise<UserInformation>}
 */
export async function apiSignIn(signInPackage: SignInInterface): Promise<UserInformation> {
  try {
    const ret: ApiReturn = await fetchBase(
      objFormatUrl.login,
      { method: 'POST', body: JSON.stringify(signInPackage) },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    const userInformation: UserInformation = ret.data as UserInformation;
    console.log('登录成功');
    return userInformation;
  } catch (e) {
    console.log('登录失败');
    throw e;
  }
}

/**
 * 用户登出
 *
 * @export
 * @returns {Promise<void>}
 */
export async function apiLogout(): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      objFormatUrl.logout,
      { method: 'GET' },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    console.log('登出成功');
  } catch (e) {
    console.log('登出失败');
    throw e;
  }
}
