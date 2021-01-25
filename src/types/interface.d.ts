interface ErrorInterface {
  name: string;
  message: string;
  debug: Debug;
}
interface Debug {
  value?: string;
  location?: string;
  type?: string;
}

interface ApiReturn {
  code: number;
  message: string;
  data?: (AnnouncementReturnInterface)[] | UserInformationReturnInterface | ContestsListReturnInterface | ContestDetailReturnInterface | ContestCreateReturnInterface | ProblemsListReturnInterface | null;
  error?: (ErrorInterface)[] | ErrorInterface;
}

interface AnnouncementReturnInterface {
  message_id: number;
  title: string;
  content: string;
  since: string;
}

interface MessageRequestInterface {
  title: string;
  message: string;
}

interface MessageWithdrawReturnInterface {
  affected: number;
}

interface AdminWhisperRequestInterface {
  uid: number;
  title: string;
  message: string;
}

interface UserInformationReturnInterface {
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

interface Perm {
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

interface SignInRequestInterface {
  captcha: string;
  password: string;
  user: string;
}

interface ContestsListReturnInterface {
  requested: number;
  served: number;
  is_end: boolean;
  list?: (ContestsListContestSimpleEntity)[] | null;
}

interface ContestsListContestSimpleEntity {
  contest_id: number;
  title: string;
  description: string;
  during: string;
  perm: string;
  private: boolean;
  problems?: (ContestsListContestProblemSimpleEntity | null)[] | null;
}

interface ContestsListContestProblemSimpleEntity {
  pid: number;
  ac: number;
  all: number;
}

interface ContestDetailReturnInterface {
  contest_id: number;
  title: string;
  during: string;
  description: string;
  extra: boolean;
  perm: string;
  private: boolean;
  rule: string;
  start: string; // date and time, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
  end: string; // like above
  problems?: (ContestDetailContestDetail)[] | null;
  file?: string;
}

interface ContestDetailContestDetail {
  problem_id: number;
  ac: number;
  all: number;
  title: string;
  special_judge: number;
  detail_judge: boolean;
  level: number;
}

interface ContestCreateRequestInterface {
  title: string;
  perm: string; // '(1,0,0,0,0)'
  start: string; // date and time, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
  end: string; // like above
  private: boolean;
  rule: ContestRule; // 'acm', 'oi'
  file?: File;
  description: string;
}

interface ContestCreateReturnInterface {
  file?: string;
  contest_id: number;
  title: string;
  during: string;
  description: string;
  extra: boolean;
  perm: string;
  private: boolean;
  rule: string;
}

interface ContestEditSaveRequestInterface extends ContestCreateRequestInterface {
  extra: boolean;
}

type ContestEditSaveReturnInterface = ContestCreateReturnInterface

interface ProblemsListReturnInterface {
  requested: number;
  served: number;
  is_end: boolean;
  list?: (ProblemsListProblemSampleEntity)[] | null;
}

interface ProblemsListProblemSampleEntity {
  problem_id: number;
  title: string;
  ac: number;
  all: number;
  special_judge: number;
  detail_judge: boolean;
  cases: number;
  time_limit: number;
  memory_limit: number;
  level: number;
  contest_id?: null;
}

interface ContestAdminDetailReturnInterface {
  contest_id: number;
  title: string;
  description: string;
  during: string;
  perm: string;
  private: boolean;
  problems?: (ContestAdminDetailProblemEntity)[] | null;
  participants?: (ContestAdminDetailParticipantsEntity)[] | null;
}

interface ContestAdminDetailProblemEntity {
  pid: number;
  ac: number;
  all: number;
}

interface ContestAdminDetailParticipantsEntity {
  user_id: number;
  nickname: string;
}
