export default async function checkUserFromBackEnd(api, member, tourist, error) {
  try {
    const user = await api('user');
    if (member) member(user);
  } catch (e) {
    const response = await e.response;
    if ((response && response.code === 401) || (response && response.status === 401)) {
      if (tourist) {
        tourist();
      }
    } else if (error) {
      error();
    }
  }
}
