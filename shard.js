const { ShardingManager } = require(`discord.js`)

const shards = new ShardingManager(`./aequitas.js`, {
token : process.env.token,
totalShards : 1 }); //Burası İle Oynama
shards.spawn()
