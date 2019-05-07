const home = {
  announce: '/message/announcement/',
  newproblem: '/problems/list/{level}/{count}/', /* /level/ /count/ */
  newcontest: '/contests/',
};

const problem = {
  list: '/problems/list/{left}/{right}/', /* /left/ /right/ */
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
  captcha: '/captcha/login?_t={random}/',
  user: '/user/',
  contestsign: '/user/nkpc/',
};

const video = {
  videolist: '/video/list/',
  video: '/video/list/{name}/',
};

const contest = {
  contest: '/contest/{cid}/',
  contestlist: '/contests',
};

const submitted = {
  submitted: '/contest/{cid}/own_submitted',
};

const login = {
  login: '/u/login',
  captcha: '/captcha/login?_t={randdouble}',
};

const admin = {
  reportlist: '/admin/report/all',
  reportinqueue: '/admin/report',
};

const url = {
  ...home,
  ...problem,
  ...status,
  ...video,
  ...user,
  ...contest,
  ...submitted,
  ...login,
  ...admin,
};

export default url;
