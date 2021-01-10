import fetch from 'isomorphic-fetch';
import format from 'string-format';
import objFormatUrl from './objFormatUrl';

const API_BASE_URL = '//acm.nankai.edu.cn';

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
  data?: (AnnouncementInterface)[] | null;
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
