import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// setting axios
const API = axios.create({
  baseURL: "http://192.168.1.5:5000/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});
// setting headers token
const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
// url file base
export const baseURL = "http://192.168.1.5:5000/uploads/";
//==== Auth ===== //

export const loginApi = (body) => {
  const url = "/login";
  return API.post(url, body).then((res) => {
    const token = res.data.data.token;
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
    return res;
  });
};

export const registerApi = (body) => {
  const url = "/register";
  return API.post(url, body).then((res) => {
    const token = res.data.data.token;
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
    return res;
  });
};

export const reloadApi = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    return null;
  }
  setAuthToken(token);
  const url = "/verify";
  return API.get(url).then((res) => res.data.data);
};

export const getPosts = () => {
  const url = "/posts";
  return API.get(url).then((res) => {
    return res.data.data.posts.map((post) => {
      return {
        uri: `${baseURL}${post.photo[0].image}`,
        id : post.id,
        width: 1080,
        height: 1920,
      };
    });
  });
};

// export const getPosts = () => {
//   const url = "/posts";
//   return API.get(url).then(async (res) => {
//     console.log(res)
//     return Promise.all(
//       res.data.data.posts.map(async (post) => {
//         const img = new Image();
//         if (!post.photo[0].image) {
//           return null;
//         }
//         img.src = `${baseURL}${post.photo[0].image}`;
//         await new Promise((resolve, reject) => {
//           img.onload = () => {
//             resolve();
//           };
//           setTimeout(() => {
//             reject();
//           }, 2000);
//         });
//         return {
//           uri : `${baseURL}${post.photo[0].image}`,
//           dimensions: { width: img.width, height: img.height }
//         };
//       })
//     );
//   });
// };
