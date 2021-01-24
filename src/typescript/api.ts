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

/**
 * 获取所有的公告的集合
 *
 * @export
 * @returns {Promise<AnnouncementReturnInterface[]>}
 */
export async function apiMessageAnnouncement(): Promise<AnnouncementReturnInterface[]> {
  try {
    const ret: ApiReturn = await fetchBase(objFormatUrl.announce, { method: 'GET' });
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    const annouceArray = ret.data as AnnouncementReturnInterface[];
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
 * @param {MessageRequestInterface} body
 * @returns {Promise<void>}
 */
export async function apiMessageAll(body: MessageRequestInterface): Promise<void> {
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

/**
 * 给单个用户发送管理员私信
 *
 * @export
 * @param {AdminWhisperRequestInterface} whisper
 * @returns {Promise<void>}
 */
export async function apiWhisper(whisper: AdminWhisperRequestInterface): Promise<void> {
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

/**
 * 获取指定用户的详细信息
 * userId 为空字符串或者 number
 *
 * @export
 * @param {number | string} userId
 * @returns {Promise<UserInformationReturnInterface>}
 */
export async function apiUserInformation(userId: number | string): Promise<UserInformationReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.userplus, { uid: userId }),
      { method: 'GET' },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    const userInformation: UserInformationReturnInterface = ret.data as UserInformationReturnInterface;
    console.log('获取用户信息成功');
    return userInformation;
  } catch (e) {
    console.log('获取用户信息失败');
    throw e;
  }
}

// /**
//  * 获取本站全部用户信息
//  *
//  * @export
//  * @param {number} limitId
//  * @returns {Promise<Array<UserInformationReturnInterface>>}
//  */
// export async function apiAllUserInformation(limitId: number): Promise<Array<UserInformationReturnInterface>> {
//   try {
//   } catch (e) {
//     console.log('获取全部用户信息失败');
//     throw e;
//   }
// }

/**
 * 获取当前用户的详细信息
 *
 * @export
 * @returns {Promise<UserInformationReturnInterface>}
 */
export async function apiSelfProfile(): Promise<UserInformationReturnInterface> {
  return apiUserInformation('');
}

/**
 * 用户登录
 * signInPackage.password 需要使用公钥加密
 * 例: signInPackage.password = forge.util.encode64(forge.pki.publicKeyFromPem(publicKey).encrypt(signInPackage.password));
 *
 * @export
 * @param {SignInRequestInterface} signInPackage
 * @returns {Promise<UserInformationReturnInterface>}
 */
export async function apiSignIn(signInPackage: SignInRequestInterface): Promise<UserInformationReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      objFormatUrl.login,
      { method: 'POST', body: JSON.stringify(signInPackage) },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    const userInformation: UserInformationReturnInterface = ret.data as UserInformationReturnInterface;
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

/**
 * 获取比赛列表
 */
export async function apiContestsList(offset: number, pageSize: number): Promise<ContestsListReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contestslistrange, { offset, pageSize }),
      { method: 'GET' },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    const contestsList: ContestsListReturnInterface = ret.data as ContestsListReturnInterface;
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
 * @returns {Promise<(ContestsListContestSimpleEntity)[]>}
 */
export async function apiContestsListAll(pageSize: number): Promise<(ContestsListContestSimpleEntity)[]> {
  try {
    let offset = 0;
    let contestsListsAll = [] as Array<ContestsListContestSimpleEntity>;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const contestsList = await apiContestsList(offset, pageSize);
      contestsListsAll = contestsListsAll.concat(contestsList.list as Array<ContestsListContestSimpleEntity>);
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

/**
 * 获取比赛详情
 *
 * @export
 * @param {number} contestId
 * @returns {Promise<ContestDetailReturnInterface>}
 */
export async function apiContestDetail(contestId: number): Promise<ContestDetailReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contest, { cid: contestId }),
      { method: 'GET' },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    const contestDetail: ContestDetailReturnInterface = ret.data as ContestDetailReturnInterface;
    console.log('获取比赛详情成功');
    return contestDetail;
  } catch (e) {
    console.log('获取比赛详情失败');
    throw e;
  }
}

/**
 * 获取比赛的管理员级别的详细信息
 *
 * @export
 * @param {number} contestId
 * @returns {Promise<ContestAdminDetailReturnInterface>}
 */
export async function apiContestAdminDetail(contestId: number): Promise<ContestAdminDetailReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.amdinContest, { cid: contestId }),
      { method: 'GET' },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    const contestDetail: ContestAdminDetailReturnInterface = ret.data as ContestAdminDetailReturnInterface;
    console.log('获取比赛（管理员级别）详情成功');
    return contestDetail;
  } catch (e) {
    console.log('获取比赛（管理员级别）详情失败');
    throw e;
  }
}

/**
 * 创建比赛
 *
 * @export
 * @param {ContestCreateRequestInterface} contestCreate
 * @returns {Promise<ContestCreateReturnInterface>}
 */
export async function apiContestCreate(contestCreate: ContestCreateRequestInterface): Promise<ContestCreateReturnInterface> {
  const formData = new FormData();
  formData.append('title', contestCreate.title);
  formData.append('perm', contestCreate.perm);
  formData.append('start', contestCreate.start);
  formData.append('end', contestCreate.end);
  formData.append('private', String(contestCreate.private));
  formData.append('rule', contestCreate.rule);
  formData.append('file', contestCreate.file as File);
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
    const ccreateReturn: ContestCreateReturnInterface = ret.data as ContestCreateReturnInterface;
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

/**
 * 编辑比赛，和创建比赛使用的是同一个后端接口
 *
 * @export
 * @param {ContestEditSaveRequestInterface} contestEdit
 * @returns {Promise<ContestEditSaveReturnInterface>}
 */
export async function apiContestEditSave(contestId: number, contestEdit: ContestEditSaveRequestInterface): Promise<ContestEditSaveReturnInterface> {
  const formData = new FormData();
  formData.append('title', contestEdit.title);
  formData.append('perm', contestEdit.perm);
  formData.append('start', contestEdit.start);
  formData.append('end', contestEdit.end);
  formData.append('private', String(contestEdit.private));
  formData.append('rule', contestEdit.rule);
  formData.append('extra', String(contestEdit.extra));
  formData.append('description', contestEdit.description);
  // 当且仅当上传新的文件，方才更新 file 字段
  if (contestEdit.file) {
    formData.append('file', contestEdit.file as File);
  }
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contestEdit, { cid: contestId }),
      { method: 'POST', body: formData },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      if (ret.error !== undefined) {
        ret.error.map((item) => console.log(`${item.name}: ${item.message}`));
      }
      throw ret;
    }
    const cESRet: ContestEditSaveReturnInterface = ret.data as ContestEditSaveReturnInterface;
    console.log('编辑比赛成功');
    return cESRet;
  } catch (e) {
    console.log('编辑比赛失败');
    throw e;
  }
}

/**
 * 获取题目列表
 * offset 从 0 开始
 *
 * @export
 * @param {number} offset
 * @param {number} pageSize
 * @returns {Promise<ProblemsListReturnInterface>}
 */
export async function apiProblemsList(offset: number, pageSize: number): Promise<ProblemsListReturnInterface> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.problemlist, { offset, pageSize }),
      { method: 'GET' },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    const problemList = ret.data as ProblemsListReturnInterface;
    console.log('获取题目列表成功');
    return problemList;
  } catch (e) {
    console.log('获取题目列表失败');
    throw e;
  }
}

/**
 * 获取全部的题目列表
 *
 * @export
 * @param {number} pageSize
 * @returns {Promise<(ProblemsListProblemSampleEntity)[]>}
 */
export async function apiProblemsListAll(pageSize: number): Promise<(ProblemsListProblemSampleEntity)[]> {
  try {
    let offset = 0;
    let problemsListAll = [] as Array<ProblemsListProblemSampleEntity>;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const problemsList = await apiProblemsList(offset, pageSize);
      problemsListAll = problemsListAll.concat(problemsList.list as Array<ProblemsListProblemSampleEntity>);
      if (problemsList.is_end) {
        break;
      }
      offset += pageSize;
    }
    console.log('获取全部题目列表成功');
    return problemsListAll;
  } catch (e) {
    console.log('获取全部题目列表失败');
    throw e;
  }
}

/**
 * 为比赛添加题目
 *
 * @export
 * @param {number} contestId
 * @param {number} problemId
 * @returns {Promise<void>}
 */
export async function apiContestProblemAdd(contestId: number, problemId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contestProblemAdd, { cid: contestId, pid: problemId }),
      { method: 'GET' },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    console.log('添加比赛题目成功');
  } catch (e) {
    console.log('添加比赛题目失败');
    throw e;
  }
}

/**
 * 从比赛中移除题目
 *
 * @export
 * @param {number} contestId
 * @param {number} problemId
 * @returns {Promise<void>}
 */
export async function apiContestProblemRemove(contestId: number, problemId: number): Promise<void> {
  try {
    const ret: ApiReturn = await fetchBase(
      format(objFormatUrl.contestProblemRemove, { cid: contestId, pid: problemId }),
      { method: 'GET' },
    );
    if (ret.code !== 0) {
      console.log(ret.message);
      throw ret;
    }
    console.log('移除比赛题目成功');
  } catch (e) {
    console.log('移除比赛题目失败');
    throw e;
  }
}
