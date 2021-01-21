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
        console.log('未授权');
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

export interface ErrorInterface {
  name: string;
  message: string;
  debug: Debug;
}
export interface Debug {
  value: string;
  location: string;
}

export interface ApiReturn {
  code: number;
  message: string;
  data?: (AnnouncementInterface)[] | UserInformation | ContestsListInterface | ContestDetailInterface | ContestCreateReturn | null;
  error?: (ErrorInterface)[];
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

export interface ContestsListInterface {
  requested: number;
  served: number;
  is_end: boolean;
  list?: (ContestSimpleEntity)[] | null;
}
export interface ContestSimpleEntity {
  contest_id: number;
  title: string;
  description: string;
  during: string;
  perm: string;
  private: boolean;
  problems?: (ProblemSimpleEntity | null)[] | null;
}
export interface ProblemSimpleEntity {
  pid: number;
  ac: number;
  all: number;
}

/**
 * 获取比赛列表
 */
export async function apiContestsList(offset: number, pageSize: number): Promise<ContestsListInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contestslistrange, { offset, pageSize }),
      { method: 'GET' },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    const contestsList: ContestsListInterface = ret.data as ContestsListInterface;
    console.log('获取比赛列表成功');
    return contestsList;
  } catch (e) {
    console.log('获取比赛列表失败');
    throw e;
  }
}

/**
 * 获取全部的比赛列表
 *
 * @export
 * @param {number} pageSize
 * @returns {Promise<(ContestSimpleEntity)[]>}
 */
export async function apiContestsListAll(pageSize: number): Promise<(ContestSimpleEntity)[]> {
  try {
    let offset = 0;
    let contestsListsAll = [] as Array<ContestSimpleEntity>;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const contestsList = await apiContestsList(offset, pageSize);
      contestsListsAll = contestsListsAll.concat(contestsList.list as Array<ContestSimpleEntity>);
      if (contestsList.is_end) {
        break;
      }
      offset += pageSize;
    }
    console.log('获取全部比赛列表成功');
    return contestsListsAll;
  } catch (e) {
    console.log('获取全部比赛列表失败');
    throw e;
  }
}

export interface ContestDetailInterface {
  contest_id: number;
  title: string;
  during: string;
  description: string;
  extra: boolean;
  perm: string;
  private: boolean;
  rule: string;
  start: string;
  end: string;
  problems?: (ContestProblemEntity)[] | null;
  file?: string;
}
export interface ContestProblemEntity {
  problem_id: number;
  ac: number;
  all: number;
  title: string;
  special_judge: number;
  detail_judge: boolean;
  level: number;
}

/**
 * 获取比赛详情
 *
 * @export
 * @param {number} contestId
 * @returns {Promise<ContestDetailInterface>}
 */
export async function apiContestDetail(contestId: number): Promise<ContestDetailInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contest, { cid: contestId }),
      { method: 'GET' },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    const contestDetail: ContestDetailInterface = ret.data as ContestDetailInterface;
    console.log('获取比赛详情成功');
    return contestDetail;
  } catch (e) {
    console.log('获取比赛详情失败');
    throw e;
  }
}

export interface ContestCreateInterface {
  title: string;
  perm: string; // "(1,0,0,0,0)"
  start: string; // date and time, "2021-01-20T00:00"
  end: string; // like above
  private: boolean;
  rule: string; // "acm", "oi"
  file: File;
  description: string;
}

export interface ContestCreateReturn {
  file: string;
  contest_id: number;
  title: string;
  during: string;
  description: string;
  extra: boolean;
  perm: string;
  private: boolean;
  rule: string;
}

/**
 * 创建比赛。api 支持上传 file 字段的文件，考虑到暂无应用场景，此处搁置。
 * TODO: 上传 file，在对应场景中应用。
 *
 * @export
 * @param {ContestCreateInterface} contestCreate
 * @returns {Promise<ContestCreateReturn>}
 */
export async function apiContestCreate(contestCreate: ContestCreateInterface): Promise<ContestCreateReturn> {
  const formData = new FormData();
  formData.append('title', contestCreate.title);
  formData.append('perm', contestCreate.perm);
  formData.append('start', contestCreate.start);
  formData.append('end', contestCreate.end);
  formData.append('private', String(contestCreate.private));
  formData.append('rule', contestCreate.rule);
  formData.append('file', contestCreate.file);
  formData.append('description', contestCreate.description);
  try {
    const ret: ApiReturn = await fetchBase(
      objFormatUrl.contestcreate,
      { method: 'POST', body: formData },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      if (ret.error !== undefined) {
        ret.error.map((item) => console.log(`${item.name}: ${item.message}`));
      }
      throw ret;
    }
    const ccreateReturn: ContestCreateReturn = ret.data as ContestCreateReturn;
    console.log('创建比赛成功');
    return ccreateReturn;
  } catch (e) {
    console.log('创建比赛失败');
    throw e;
  }
}

/**
 * 删除比赛
 *
 * @export
 * @param {number} contestId
 * @returns {Promise<void>}
 */
export async function apiContestDelete(contestId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contestDelete, { cid: contestId }),
      { method: 'GET' },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    console.log('删除比赛成功');
  } catch (e) {
    console.log('删除比赛失败');
    throw e;
  }
}
