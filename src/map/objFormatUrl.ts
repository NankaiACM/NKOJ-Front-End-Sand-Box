const home = {
  announce: '/api/message/announcement/',
  newproblem: '/api/problems/list/{level}/{count}/', /* /level/ /count/ */
  newcontest: '/api/contests/',
};

const problem = {
  problemlist: '/api/problems/list/{left}/{limit}/', /* /left/ /limit/ */
  problem: '/api/problem/{pid}/', /* /pid/ */
  tag: '/api/problem/{pid}/tag/', /* /pid/ */
  judge: '/api/judge/',
  rejudge: '/api/judge/rejudge/{sid}/', /* sid */
  downvote: '/api/problem/{pid}/downvote/{tid}/', /* /pid/ /tid/ */
  upvote: '/api/problem/{pid}/upvote/{tid}/', /* /pid/ /tid/ */
  tagremove: '/api/problem/{pid}/remove/{tid}/', /* /pid/ /tid/ */
};

const status = {
  status: '/api/status?{querrystring}/', /* /querrystring/ */
  ftstatus: '/api/status/{from}/{limit}?{querrystring}/', /* /from/ /limit/ /querrystring/ */
  tstatus: '/api/status/{till}/{querrystring}/', /* /till/ /querrystring/ */
  detail: '/api/status/detail/{sid}/',
};

const user = {
  login: '/api/u/login/',
  captcha: '/api/captcha/login?_t={random}/',
  user: '/api/user/',
  userplus: '/api/user/{uid}',
  contestsign: '/api/user/nkpc/',
};

const video = {
  videolist: '/api/video/list/',
  video: '/api/video/list/{name}/',
};

const contest = {
  contest: '/api/contest/{cid}/',
  contestlist: '/api/contests',
};

const submitted = {
  submitted: '/api/contest/{cid}/own_submitted',
};

const admin = {
  reportlist: '/api/admin/report/all',
  reportinqueue: '/api/admin/report',
  withdrawannounce: '/api/admin/message/withdraw/{mid}',
  messageall: '/api/admin/message/all',
  /*
   * post body {
   *             title: '',
   *             message: ''
   *           }
   */
  whisper: '/api/admin/message/{uid}',
  /*
   * post body {
   *             title: '',
   *             message: '',
   *           }
   */
};

const discuss = {
  discuss0: '/api/posts/0',
};

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
