const home = {
  announce: '/message/announcement',
  newProblem: '/problems/list/{level}/{count}',
  newContest: '/contests',
};

const problem = {
  problemsList: '/problems/list/{offset}/{pageSize}', // offset 从 0 开始
  problem: '/problem/{pid}',
  tag: '/problem/{pid}/tag',
  judge: '/judge',
  rejudge: '/judge/rejudge/{sid}',
  downvote: '/problem/{pid}/downvote/{tid}',
  upvote: '/problem/{pid}/upvote/{tid}',
  tagreMove: '/problem/{pid}/remove/{tid}',
};

const status = {
  status: '/status?{querryString}',
  ftStatus: '/status/{from}/{limit}?{querryString}',
  tStatus: '/status/{till}/{querryString}',
  detail: '/status/detail/{sid}',
};

const user = {
  login: '/u/login',
  logout: '/u/logout',
  user: '/user',
  userPlus: '/user/{uid}',
  contestSign: '/user/nkpc',
};

const video = {
  videoList: '/video/list',
  video: '/video/list/{name}',
};

const contest = {
  contest: '/contest/{cid}', // '/admin/contest/{cid}' 提供的基础信息较少 :-)
  contestsList: '/contests', // 可能是不完全的
  contestsListRange: '/contests/{offset}/{pageSize}', // offset 从 0 开始
};

const submitted = {
  submitted: '/contest/{cid}/own_submitted',
};

const admin = {
  reportList: '/admin/report/all',
  reportInqueue: '/admin/report',
  withdrawAnnounce: '/admin/message/withdraw/{mid}',
  messageAll: '/admin/message/all',
  whisper: '/admin/message/{uid}',
  reportApprove: '/admin/report/approve/{rid}',
  reportDecline: '/admin/report/decline/{rid}',
  postRemove: '/admin/post/remove/{pid}',
  postRecover: '/admin/post/recover/{pid}',
  postCommentRemove: '/admin/post/remove/comment/{pcid}',
  postCommentRecover: '/admin/post/recover/comment/{pcid}',
  contestProblemAdd: '/admin/contest/{cid}/problem/add/{pid}',
  contestProblemRemove: '/admin/contest/{cid}/problem/remove/{pid}',
  contestUserAdd: '/admin/contest/{cid}/user/add/{uid}',
  contestUserRemove: '/admin/contest/{cid}/user/remove/{uid}',
  amdinContest: '/admin/contest/{cid}',
  contestDelete: '/admin/contest/remove/{cid}',
  contestCreate: '/admin/contest',
  contestEdit: '/admin/contest/{cid}',
};

const discuss = {
  discuss0: '/posts/0',
};

export const API_BASE_URL = '//acm.nankai.edu.cn/api';

const AVATAR_BASE_URL = `${API_BASE_URL}/avatar`; // suffix uid

const CAPTCHA_BASE_URL = `${API_BASE_URL}/captcha/login?_t=`; // suffix Math.random()

const NKPC_BASE_URL = '//acm.nankai.edu.cn/NKPC';

const PROBLEM_BASE_URL = '//acm.nankai.edu.cn/problem';

const DISCUSS_BASE_URL = '//acm.nankai.edu.cn/discuss';

// TODO: 构建允许管理员由私信 ID 获取私信内容的 api
// const WHISPER_BASE_URL = '//';
// export function getWhisperUrl(): string {}

export function newCaptchaImageSrc(): string {
  return `${CAPTCHA_BASE_URL}${Math.random()}`;
}

export function getAvatarImageSrc(uidOrNickname: number | string): string {
  return `${AVATAR_BASE_URL}/${uidOrNickname}`;
}

export function getNKPCUrl(contestId: number): string {
  return `${NKPC_BASE_URL}/${contestId}`;
}

export function getProblemUrl(problemId: number): string {
  return `${PROBLEM_BASE_URL}/${problemId}`;
}

export function getDiscussUrl(discussId: number): string {
  return `${DISCUSS_BASE_URL}/${discussId}`;
}

export default {
  ...home,
  ...problem,
  ...status,
  ...video,
  ...user,
  ...contest,
  ...submitted,
  ...admin,
  ...discuss,
};
