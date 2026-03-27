export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  groups: '/groups',
  groupDetail: (groupId: number | string) => `/groups/${groupId}`,
  myGroups: '/my-groups',
  createGroup: '/groups/new',
  myInfo: '/me',
  groupApplications: (groupId: number | string) => `/groups/${groupId}/applications/manage`,
  groupSchedules: (groupId: number | string) => `/groups/${groupId}/schedules`,
}
