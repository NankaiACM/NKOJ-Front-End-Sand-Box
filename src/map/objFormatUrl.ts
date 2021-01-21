const home = {
  announce: '/message/announcement/',
  newproblem: '/problems/list/{level}/{count}/', /* /level/ /count/ */
  newcontest: '/contests/',
};

const problem = {
  problemlist: '/problems/list/{left}/{limit}/', /* /left/ /limit/ */
  problem: '/problem/{pid}/', /* /pid/ */
  tag: '/problem/{pid}/tag/', /* /pid/ */
  judge: '/judge/',
  rejudge: '/judge/rejudge/{sid}/', /* sid */
  downvote: '/problem/{pid}/downvote/{tid}/', /* /pid/ /tid/ */
  upvote: '/problem/{pid}/upvote/{tid}/', /* /pid/ /tid/ */
  tagremove: '/problem/{pid}/remove/{tid}/', /* /pid/ /tid/ */
};

const status = {
  status: '/status?{querrystring}/', /* /querrystring/ */
  ftstatus: '/status/{from}/{limit}?{querrystring}/', /* /from/ /limit/ /querrystring/ */
  tstatus: '/status/{till}/{querrystring}/', /* /till/ /querrystring/ */
  detail: '/status/detail/{sid}/',
};

const user = {
  login: '/u/login/',
  logout: '/u/logout',
  user: '/user/',
  userplus: '/user/{uid}',
  contestsign: '/user/nkpc/',
};

const video = {
  videolist: '/video/list/',
  video: '/video/list/{name}/',
};

const contest = {
  contest: '/contest/{cid}/',
  contestDelete: '/admin/contest/remove/{cid}',
  contestcreate: '/admin/contest/',
  contestslist: '/contests', // 可能是不完全的
  contestslistrange: '/contests/{offset}/{pageSize}/', // offset 从 0 开始
};

const submitted = {
  submitted: '/contest/{cid}/own_submitted',
};

const admin = {
  reportlist: '/admin/report/all',
  reportinqueue: '/admin/report',
  withdrawannounce: '/admin/message/withdraw/{mid}',
  messageall: '/admin/message/all',
  /*
   * post body {
   *             title: '',
   *             message: ''
   *           }
   */
  whisper: '/admin/message/{uid}',
  /*
   * post body {
   *             title: '',
   *             message: '',
   *           }
   */
};

const discuss = {
  discuss0: '/posts/0',
};

export const API_BASE_URL = '//acm.nankai.edu.cn/api';

const AVATAR_BASE_URL = `${API_BASE_URL}/avatar`; // suffix uid

const CAPTCHA_BASE_URL = `${API_BASE_URL}/captcha/login?_t=`; // suffix Math.random()

const NKPC_BASE_URL = '//acm.nankai.edu.cn/NKPC';

const PROBLEM_BASE_BURL = '//acm.nankai.edu.cn/problem';

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
  return `${PROBLEM_BASE_BURL}/${problemId}`;
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
