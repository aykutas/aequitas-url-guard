const { Discord, Client, MessageEmbed } = require('discord.js');
const aequitas = new Client();
const moment = require('moment');
const request = require('request');
moment.locale('tr');
let Config = {
	
"URL": "Korunulması gereken url Örn= infinity",
"Log_Kanal": "Url değiştirilmeye çalışılınca log tutulacak kanal",
"Ses_Kanal": "Botun bağlanacağı ses kanal ID"};

aequitas.on("ready", async () => {
aequitas.user.setActivity(`Aequitas ♥ URLGuard`, { type: "STREAMING",url: "https://www.twitch.tv/aequitasurlguard"})
aequitas.channels.cache.get(Config.Ses_Kanal).join().then(x => console.log(`Ses kanalına başarı ile bağlanıldı!`)).catch(err => console.error("Hata: Ses kanalı bulunamadı/Yanlış girildi!"))});
let aequitasembed = new MessageEmbed().setColor("#FF0000").setTimestamp();
//∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞\\



//∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞\\
aequitas.on('guildUpdate', async (eskiURL, yeniURL) => {
if (eskiURL.vanityURLCode === yeniURL.vanityURLCode) return;
let entry = await yeniURL.fetchAuditLogs({ type: 'GUILD_UPDATE' }).then(audit => audit.entries.first());
if (!entry.executor || entry.executor.id === aequitas.user.id) return;

let logkanal = aequitas.channels.cache.get(Config.Log_Kanal);
    
if (logkanal) logkanal.send(aequitasembed
.setDescription(`
__**∞ | URL Çalınmaya Çalışıldı | ∞**__

> **‡ | Hedef Kullanıcı Bilgisi**
> Kullanıcı: ${entry.executor}
> Kimlik: (\`${entry.executor.id}\`)
> İsim Etiket: ${entry.executor.tag}

> **Ѻ | Sunucu Bilgisi**
> Sunucu Durumu: \`Stabil\`

> **Ѻ | Yapılan İşlem**
> Url eski haline getirildi ve hedef kullanıcı sunucudan yasaklandı!`))
if (!logkanal) yeniURL.owner.send(`${entry.executor} isimli kullanıcı sunucunun urlsini değiştirmeye çalıştı bende onu banladım ve urlyi eski haline getirdim!`)

yeniURL.members.ban(entry.executor.id, { reason: `Aequitas URL Koruması!`});

const settings = { url: `https://discord.com/api/v6/guilds/${yeniURL.id}/vanity-url`,
body: { code: Config.URL }, json: true, method: 'PATCH', headers: { "Authorization": `Bot process.env.token` }};
request(settings, (err, res, body) => { if (err) { return console.log(err)}})});
//∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞\\


aequitas.login(process.env.token).then(() => { console.log(`-> ${aequitas.user.username} <-`);});
