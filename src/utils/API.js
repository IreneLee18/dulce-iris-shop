const headers = { "Content-Type": "application/json" };
export const loginAPI = (data) => {
  return fetch(`${process.env.REACT_APP_API}/admin/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
};
// [API]: /admin/signin
// [方法]: post
// [參數]:
//   {
//     "username": "hexscholl@test.com",
//     "password": "zzxxccvv"
//   }
// [成功回應]:
//   {
//     "success": true,
//     "message": "登入成功",
//     "uid": "XX4VbV87lRRBXKhZKT7YX6zhsuO2",
//     "token": "xxx"
//     "expired": "1234567890"
//   }
// [失敗回應]:
//   {
//     "success": false,
//     "message": "登入失敗"
//   }
