import axios from "./axios";
export function getMenues () {
  return new Promise((resolve, reject) => {
    axios.get(api.SYS_MENU_LIST).then(response => {
      let d = formateMenueData(response.data.data)
      resolve(d);
    }, err => {
      resolve("失败了！");
    })
      .catch((error) => {
        resolve("失败了！")
      })
  })
}