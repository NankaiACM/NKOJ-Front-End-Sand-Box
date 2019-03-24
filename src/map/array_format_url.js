const home = {
  announce: '/message/announcement/',
  newproblem: '/problems/list/{0}/{1}/', /* /level/ /count/ */
  newcontest: '/contests/',
};

const problem = {
  list: '/problems/list/{0}/{1}/', /* /left/ /right/ */
  problem: '/problem/{0}/', /* /pid/ */
  tag: '/problem/{0}/tag/', /* /pid/ */
  judge: '/judge/',
  rejudge: '/judge/rejudge/{0}/', /* sid */
  downvote: '/problem/{0}/downvote/{1}/', /* /pid/ /tid/ */
  upvote: '/problem/{0}/upvote/{1}/', /* /pid/ /tid/ */
  tagremove: '/problem/{0}/remove/{1}/', /* /pid/ /tid/ */
};

const status = {
  status: '/status?{0}/', /* /querrystring/ */
  ftstatus: '/status/{0}/{1}?{2}/', /* /from/ /limit/ /querrystring/ */
  tstatus: '/status/{0}/{1}/', /* /till/ /querrystring/ */
};

const vedio = {
  vediolist: '/video/list/',
  vedio: '/video/list/{0}/',
};

const contest = {
  contest: '/contest/{0}/',
  contestsign: '/user/nkpc/',
};

const url = Object.assign(home, problem, status, vedio, contest);

export default url;
