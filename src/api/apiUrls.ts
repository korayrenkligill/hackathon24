export const baseUrl = "http://192.168.1.163:5000";

export const ApiUrls = {
  announcements: {
    announcement: `${baseUrl}/user/my`,
    my: `${baseUrl}/user/my`,
  },
  badges: {
    badges: `${baseUrl}/badges`,
  },
  events: {
    events: `${baseUrl}/events`,
    my: `${baseUrl}/events/my`,
  },
  fileUpload: {
    fileUpload: `${baseUrl}/fileUpload`,
    my: `${baseUrl}/fileUpload/my`,
  },
  forum: {
    forum: `${baseUrl}/forum`,
  },
  translation: {
    translation: `${baseUrl}/translations`,
  },
  users: {
    register: `${baseUrl}/users/register`,
    login: `${baseUrl}/users/login`,
    forgotPass: `${baseUrl}/users/forgot-password`,
    resetPass: `${baseUrl}/users/reset-password`,
    profile: `${baseUrl}/users/profile`,
    changePass: `${baseUrl}/users/change-password`,
    users: `${baseUrl}/users`,
  },
};
