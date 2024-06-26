const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI + "typing-logs" || "";
let client;
client = new MongoClient(uri);
console.log("Connected to Mongo");

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
  } catch (error) {
    console.error(error);
  }
}

run();

async function createUserSectionCollection(id) {
  await client.db("test").createCollection(`${id}sections`).catch(console.log);
}
async function collectionExists(id) {
  const res = await client.db("test").listCollections().toArray();

  const filteredRes = res.filter((item) => item.name === `${id}sections`);
  return filteredRes.length > 0;
}

async function logIt(data, user) {
  if (await collectionExists(user.id)) {
    client
      .db("test")
      .collection(`${user.id}sections`)
      .insertOne({
        date: Date.now(), // Fix: Use "date" instead of "dateTime"
        data: data,
      })
      .catch(console.log);
  } else {
    console.log("Creating collection");
    await createUserSectionCollection(user.id);
    await logIt(data, user);
  }
}

module.exports = { logIt };
