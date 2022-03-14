import axios from "axios";
axios.defaults.baseURL = "http://151.80.155.65:3000";

export async function getAllPost() {
  const res2 = await axios.get('/faq');
  if (!res2.data) {
    console.log(res2)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return res2.data;
}