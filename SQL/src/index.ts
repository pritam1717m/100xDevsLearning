import pg from "pg";

const client = new pg.Client({
  connectionString: "postgresql://postgres:pritam@123@localhost/postgres",
});

async function insertUserData(
  username: string,
  email: string,
  password: string,
  city: string
) {
  await client.connect();
  const result =
    await client.query("INSERT INTO users (username, email, password, city) VALUES ($1, $2, $3, $4)", [username, email, password, city]);
  console.log(result);
}

insertUserData("rupam@1", "rupam123@gmail.com", "Rupam@123", "Tamluk");

