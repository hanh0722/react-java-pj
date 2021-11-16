export const serverUrl = "http://localhost:8080";
const authLinks = `${serverUrl}/api/auth`;
const userApi = `${serverUrl}/api/user`;
const dashboardApi = `${serverUrl}/api/dashboard`;
const uploadImageApi = `${serverUrl}/api/upload`;
const urlCheckVerify = (id, token) => {
  return `${authLinks}/verify?id=${id}&token=${token}`;
};
const registerUrl = `${authLinks}/register`;
const urlGetInforUser = (id) => {
  return `${userApi}/info/${id}`;
};
const urlGetUserForgetPassword = (email) =>
  `${userApi}/reset/${email}`;
const loginUrl = `${authLinks}/login`;
const resetPasswordUrl = `${userApi}/reset`;
const checkResetPasswordUrl = (token, uidt) => `${userApi}/reset-password/${token}?${uidt}`;
const changePasswordFromUser = `${userApi}/reset-password`;
const getUserByToken = token => `${userApi}/validate/:token`;
const getUserApi = `${dashboardApi}/user`;
const uploadProductApi = `${dashboardApi}/product`;
const uploadSingleImageApi = `${uploadImageApi}/image`;
const getCountryApi = 'https://countriesnow.space/api/v0.1/countries/flag/images';
const postCountryByName = 'https://countriesnow.space/api/v0.1/countries/states';
const updateUserInformation = `${userApi}/update`;
const updatePasswordByToken = `${userApi}/change/password`;
export {
  urlCheckVerify,
  registerUrl,
  urlGetInforUser,
  loginUrl,
  urlGetUserForgetPassword,
  resetPasswordUrl,
  checkResetPasswordUrl,
  changePasswordFromUser,
  getUserByToken,
  getUserApi,
  uploadProductApi,
  uploadSingleImageApi,
  getCountryApi,
  postCountryByName,
  updateUserInformation,
  updatePasswordByToken
};
