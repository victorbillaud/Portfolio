import axios from "axios";

axios.defaults.baseURL = "https://api.victorbillaud.fr";

export async function getAllPost() {
  const res2 = await axios.get('/faq');
  console.log("api" + res2)
  if (!res2.data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return res2.data;
}

export async function getPostsById(data) {
  if(data.answered){
    let result;
    return await axios.post('/faqById', {
      data: data
    })
        .then(function (response) {
          return response.data
        })
        .catch(function (error) {
          console.log(error);
        })
  } else return false;

}