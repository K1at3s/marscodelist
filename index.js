const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const moment = require('moment');
const useful = require('useful-tools');
client.ayar = db;
client.htmll = require('cheerio');
client.useful = useful;
client.tags = require('html-tags');


client.ayarlar = {
  "prefix": '!', //prefix
  "oauthSecret": "Piu6uzA93VH2fACuJqXwcesZxXeiN3O9", //bot secreti
	"callbackURL": "https://marscodelist.glitch.me/callback", //benim sitenin urlsini kendin ile değiş "/callback" kalacak!
	"kayıt": "688442448543744007", //onaylandı, reddedildi, başvuru yapıldı falan kayıtların gideceği kanalın ID'ini yazacaksın
  "renk": "RANDOM" //embedların rengini burdan alıo can sıkıntısdna yapılmış bişe falan fln
};

client.yetkililer = ["276829048943149057","315129141559033856"] //tüm yetkililerin ıdleri gelcek array


//["id", "id2"]

client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);
  
   require("./app.js")(client);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yaptı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Site aktif!`);
  client.user.setStatus("dnd")
  client.user.setActivity(`${client.ayarlar.prefix}yardım`, { type:"PLAYING" })
});

const chalk = require('chalk')

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir(`./komutlar/`, (err, files) => {
	let jsfiles = files.filter(f => f.split(".").pop() === "js")

	if(jsfiles.length <= 0) {
		console.log("Olamazz! Hiç komut dosyası bulamadım!")
	} else {
		if (err) {
			console.error("Hata! Bir komutun name veya aliases kısmı yok!")
		}
		console.log(`${jsfiles.length} komut yüklenecek.`)

		jsfiles.forEach(f => {
			let props = require(`./komutlar/${f}`)
			client.commands.set(props.help.komut, props)
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.komut)
			})
			console.log(`Yüklenen komut: ${props.help.komut}`)
		})
	}
});

client.on("message", async message => {

	if (message.author.bot) return
  if (!message.content.startsWith(client.ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(client.ayarlar.prefix.length);
	var args = message.content.split(' ').slice(1)
	var cmd = ''
  
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  } else {
    message.channel.send(`Komutlarımda \`\`${command}\`\` adında bir komut bulamadım! Komut listeme bakmak için: \`\`${client.ayarlar.prefix}yardım\`\``)
  }
  
  

	if (client.commands.has(command)) {
		var cmd = client.commands.get(command)
	} else if (client.aliases.has(command)) {
		var cmd = client.commands.get(client.aliases.get(command))
	}

	if (cmd) {
    if (cmd.conf.permLevel === 'ozel') { //o komutu web yetkilileri kullanabsiln sadece diye yaptıgım bişe 
      if (client.yetkililer.includes(message.author.id) === false) {
        const embed = new Discord.RichEmbed()
					.setDescription(`Kardeşim sen WebSite yetkilisi değilsin saçma saçma işlerle uğraşma!`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send("Yetersiz Yetki.")
				return
      }
    }
    
		if (cmd.conf.permLevel === 1) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Sen önce mesajları yönetmeyi öğren sonra bu komutu kullanırsın.`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send("Yetersiz yetki.")
				return
			}
		}
		if (cmd.conf.permLevel === 2) {
			if (!message.member.hasPermission("KICK_MEMBERS")) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Üyeleri atma yetkin yok.`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send("Üyeleri atma yetkin yok.")
				return
			}
		}
		if (cmd.conf.permLevel === 3) {
			if (!message.member.hasPermission("ADMINISTRATOR")) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Yetersiz yetki.`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send("Yetersiz yetki.")
				return
			}
		}
		if (cmd.conf.permLevel === 4) {
			const x = await client.fetchApplication()
      var arr = [x.owner.id, '276829048943149057',"315129141559033856","299861100176867328"]
			if (!arr.includes(message.author.id)) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Yetkin yetersiz.`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send("Yetersiz yetki.")
				return
			}
		}
		if (cmd.conf.enabled === false) {
			const embed = new Discord.RichEmbed()
				.setDescription(`Bu komut devre dışı.`)
				.setColor(client.ayarlar.renk)
				.setTimestamp()
			message.channel.send("Bu komut devre dışı.")
			return
		}
		if(message.channel.type === "dm") {
			if (cmd.conf.guildOnly === true) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komutu özel mesajlarda kullanamazsın.`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send("Bu komutu özel mesajlarda kullanamazsın.")
				return
			}
		}
		cmd.run(client, message, args)
	}
});

client.on('guildMemberAdd',async member => {
  const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 50;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 7}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
  let user = client.users.get(member.id);
  let kanalveri = await db.fetch(`gelenKanal_${member.guild.id}`)
    const Canvas = require('canvas')
    const canvas = Canvas.createCanvas(700,300);
    const ctx = canvas.getContext('2d');
      if(member.user.bot) {return;}
   if (!member.bot){
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/692997437857595422/693015862822567996/gelen.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
    ctx.fillStyle = "#263238"
    ctx.shadowColor = '#263238';
    ctx.shadowBlur = 10;
    ctx.font = applyText(canvas, `${user.tag}`);
	  ctx.fillText(`${user.tag}`, canvas.width / 3.0, canvas.height / 1.5);
	  ctx.font = applyText(canvas, `${user.tag}`);
	  ctx.fillStyle = '#ffffff';
	  ctx.fillText(`${user.tag}`, canvas.width / 3.0, canvas.height / 1.5);
    ctx.font = '30pt Impact';
    ctx.fillStyle = "#263238"
    ctx.shadowColor = '#263238';
    ctx.fill()
    ctx.beginPath();
    ctx.ellipse(130, 160, 100, 100, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(avatar, 30, 60, 220, 220);
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'MarsCode-Hosgeldin.png');
   member.guild.channels.get(kanalveri).send(attachment)
   }
})

client.on('guildMemberRemove',async member => {
  const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 50;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 7}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
  let user = client.users.get(member.id);
  let kanalveri = await db.fetch(`gelenKanal_${member.guild.id}`)
    const Canvas = require('canvas')
    const canvas = Canvas.createCanvas(700,300);
    const ctx = canvas.getContext('2d');
      if(member.user.bot) {return;}
   if (!member.bot){
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/692997437857595422/693015863909154846/giden.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
    ctx.fillStyle = "#263238"
    ctx.shadowColor = '#263238';
    ctx.shadowBlur = 10;
    ctx.font = applyText(canvas, `${user.tag}`);
	  ctx.fillText(`${user.tag}`, canvas.width / 3.0, canvas.height / 1.5);
	  ctx.font = applyText(canvas, `${user.tag}`);
	  ctx.fillStyle = '#ffffff';
	  ctx.fillText(`${user.tag}`, canvas.width / 3.0, canvas.height / 1.5);
    ctx.font = '30pt Impact';
    ctx.fillStyle = "#263238"
    ctx.shadowColor = '#263238';
    ctx.fill()
    ctx.beginPath();
    ctx.ellipse(130, 160, 100, 100, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(avatar, 30, 60, 220, 220);
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'MarsCode-GuleGule.png');
   member.guild.channels.get(kanalveri).send(attachment)
   }
})


client.on('guildMemberAdd',async member => {
  const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 50;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 7}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
  let user = client.users.get(member.id);
		let kanalveri = await db.fetch(`guvenlikK_${member.guild.id}`)
    const Canvas = require('canvas')
    const canvas = Canvas.createCanvas(750,300);
    const ctx = canvas.getContext('2d');
      if(member.user.bot) {return;}
   if (!member.bot){
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment.duration(kurulus).format("D")   
    var kontrol;
    if (kurulus > 2592000000) kontrol = 'Güvenli'
    if (kurulus < 2592000000) kontrol = 'Şüpheli'
    const background = await Canvas.loadImage('https://media.discordapp.net/attachments/663220987948564531/663221025252573184/bunesimdiyy.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
    ctx.fillStyle = "#263238"
    ctx.shadowColor = '#263238';
    ctx.shadowBlur = 10;
    ctx.font = applyText(canvas, `${user.tag}`);
	  ctx.fillText(`${user.tag}`, canvas.width / 3.0, canvas.height / 1.5);
	  ctx.font = applyText(canvas, `${user.tag}`);
	  ctx.fillStyle = '#ffffff';
	  ctx.fillText(`${user.tag}`, canvas.width / 3.0, canvas.height / 1.5);
    ctx.font = '30pt serif';
    ctx.fillStyle = "#263238"
    ctx.shadowColor = '#263238';
    ctx.shadowBlur = 10;
    ctx.fillText(kontrol, 250 , 140);
    ctx.font = '30pt serif';
	  ctx.fillStyle = '#ffffff';
	  ctx.fillText(kontrol, 250 , 140);
    ctx.strokeStyle = '#3F51B5';
    ctx.lineWidth = 8;
    ctx.shadowColor = '#3F51B5';
    ctx.shadowBlur = 8;
    ctx.fill()
    ctx.beginPath();
    ctx.ellipse(130, 160, 100, 100, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(avatar, 30, 60, 220, 220);
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'MarsCodeList-Güvenlik.png');
   member.guild.channels.get(kanalveri).send(attachment)
   }
})


client.on("guildMemberAdd", async member => {
  
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  member.guild.channels.get(skanal9).send(`:inbox_tray: ${member.user.tag} sunucuya katıldı, ${sayac} kişi olmamıza ${sayac - member.guild.members.size} kişi kaldı.`)

});




client.on("guildMemberRemove", async member => {
  
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`); 
  if (!skanal9) return;
  member.guild.channels.get(skanal9).send(`:inbox_tray: **${member.user.tag}** adlı kullanıcı sunucudan ayrıldı. **${sayac}** kullanıcı olmaya **${sayac - member.guild.members.size}** kullanıcı kaldı.`)

  });


		client.on('guildMemberAdd', async member => {
		let otorol = await db.fetch(`otorol_${member.guild.id}`)
    let otorolK = await db.fetch(`otorlK_${member.guild.id}`)
		if (member.guild.roles.get(otorol) === undefined || member.guild.roles.get(otorol) === null) return;
    let otoroladi = member.guild.roles.get(otorol)
    member.addRole(otorol);
    member.guild.channels.get(otorolK).send(`:inbox_tray: ${member.user.tag} Katıldı ${otoroladi.name} adlı rol verildi`)
	})


client.on('guildMemberAdd' ,member => {
member.guild.channels.get('693004554098180177').setName(`Toplam Kullanıcı Sayısı: ${member.guild.memberCount}`);
member.guild.channels.get('693004588667633684').setName(`Toplam Kişi Sayısı: ${member.guild.members.filter(m => !m.user.bot).size}`);
member.guild.channels.get('693004614131253308').setName(`Toplam Bot Sayısı: ${member.guild.members.filter(m => m.user.bot).size}`);
member.guild.channels.get('693004628056604722').setName(`Rekor Aktiflik: ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`);
member.guild.fetchBans().then(bans => member.guild.channels.get('693005814390325270').setName(`Toplam Banlı Kişi Sayısı: ${bans.size}`))
member.guild.channels.get('693012652791955506').setName(`Son Üye: ${member.user.tag}`)
})

client.on('guildMemberRemove' ,member => {
member.guild.channels.get('693004554098180177').setName(`Toplam Kullanıcı Sayısı: ${member.guild.memberCount}`);
member.guild.channels.get('693004588667633684').setName(`Toplam Kişi Sayısı: ${member.guild.members.filter(m => !m.user.bot).size}`);
member.guild.channels.get('693004614131253308').setName(`Toplam Bot Sayısı: ${member.guild.members.filter(m => m.user.bot).size}`);
member.guild.channels.get('693004628056604722').setName(`Rekor Aktiflik: ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`);
member.guild.fetchBans().then(bans => member.guild.channels.get('693005814390325270').setName(`Toplam Banlı Kişi Sayısı: ${bans.size}`))
member.guild.channels.get('693012652791955506').setName(`Son Ayrılan: ${member.user.tag}`)
})

client.on('guildBanAdd', async (guild, member) => {
member.guild.channels.get('693004554098180177').setName(`Toplam Kullanıcı Sayısı: ${member.guild.memberCount}`);
member.guild.channels.get('693004588667633684').setName(`Toplam Kişi Sayısı: ${member.guild.members.filter(m => !m.user.bot).size}`);
member.guild.channels.get('693004614131253308').setName(`Toplam Bot Sayısı: ${member.guild.members.filter(m => m.user.bot).size}`);
member.guild.channels.get('693004628056604722').setName(`Rekor Aktiflik: ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`);
member.guild.fetchBans().then(bans => member.guild.channels.get('693005814390325270').setName(`Toplam Banlı Kişi Sayısı: ${bans.size}`))
member.guild.channels.get('693012652791955506').setName(`Son Banlanan: ${member.user.tag}`)  
})
	
client.on('guildBanRemove', async (guild, member) => {
member.guild.channels.get('693004554098180177').setName(`Toplam Kullanıcı Sayısı: ${member.guild.memberCount}`);
member.guild.channels.get('693004588667633684').setName(`Toplam Kişi Sayısı: ${member.guild.members.filter(m => !m.user.bot).size}`);
member.guild.channels.get('693004614131253308').setName(`Toplam Bot Sayısı: ${member.guild.members.filter(m => m.user.bot).size}`);
member.guild.channels.get('693004628056604722').setName(`Rekor Aktiflik: ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`);
member.guild.fetchBans().then(bans => member.guild.channels.get('693005814390325270').setName(`Toplam Banlı Kişi Sayısı: ${bans.size}`))
member.guild.channels.get('693012652791955506').setName(`Son Banı Kaldırılan: ${member.user.tag}`)
})


client.on('guildMemberUpdate', function(oldMember, newMember) {
 let logCh = db.fetch(`Log_${oldMember.guild.id}`);
  if(oldMember.roles.size !== newMember.roles.size) {
  var or = []
  var eklenen;
  var silinen;
  oldMember.roles.forEach(a => or.push(a))
  newMember.roles.forEach(a => {
    if(!or.includes(a)) eklenen = a;
    else {
    or.forEach(aa => {
      if(aa !== a) silinen = aa
    })
    } 
  })
 
   const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(oldMember.user.tag , oldMember.user.displayAvatarURL)
    .setDescription(`${newMember.user.username} Kişiye  ឵\`${eklenen.name}\` rolü verildi.`)
    .setThumbnail(`${oldMember.user.displayAvatarURL}`)
oldMember.guild.channels.get(logCh).send(embed);
  }  
})


client.on('message', msg => {

if(client.ping > 2500) {

let bölgeler = [
'singapore', 
'eu-central', 
'india', 
'us-central', 
'london',
'eu-west',
'amsterdam',
'brazil',
'us-west',
'hongkong', 
'us-south', 
'southafrica', 
'us-east', 
'sydney', 
'frankfurt',
'russia'
]
let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
let sChannel = client.channel.get('688456378867777552');

msg.guild.setRegion(yenibölge)
.then(g => sChannel.send(`Sunucuda ping yükseldiği için sunucu bölgesini değiştirdim yeni bölge ${g.region}.`)) 
.catch(console.error);
}});


client.on('messageReactionAdd', async (reaction ,user) => {
  const message = reaction.message;
  let starkanal = await db.fetch(`starboard_${message.guild.id}`); 
        const starboardChannel = message.guild.channels.get(starkanal);
      if (reaction.emoji.name !== '⭐') return;
 //   if (message.author.id === user.id) return message.channel.send(`${user}, Kendi mesajını oylayamassın.`);
    if (message.author.bot) return message.channel.send(`${user}, Botların mesajını oylayamassın.`);
    if (!starboardChannel) return 
    const fetch = await starboardChannel.fetchMessages({ limit: 100 });
    const starMsg = fetch.find(m => m.embeds.length && m.embeds[0].footer && m.embeds[0].footer.text && m.embeds[0].footer.text.startsWith("⭐") && m.embeds[0].footer.text.endsWith(message.id));
     const embeds = message.embeds
     const attachments = message.attachments
      let eURL = ''

            if (embeds.length > 0) {
              // attempt to resolve image url; if none exist, ignore it
              if (embeds[0].thumbnail && embeds[0].thumbnail.url) { eURL = embeds[0].thumbnail.url } else if (embeds[0].image && embeds[0].image.url) { eURL = embeds[0].image.url } else { eURL = embeds[0].url }
            } else if (attachments.array().length > 0) {
              const attARR = attachments.array()
              eURL = attARR[0].url
              // no attachments or embeds
            }

  if (starMsg) {
    const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(starMsg.embeds[0].footer.text);
    const foundStar = starMsg.embeds[0];
    var embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag , message.author.displayAvatarURL)
        .setColor(foundStar.color)
        .setDescription(foundStar.description)
        .setTimestamp(new Date(message.createdTimestamp))
        .setFooter(`⭐ ${parseInt(star[1])+1} | ${message.id}`)
        .setImage(eURL);
       const oldMsg = await starboardChannel.fetchMessages(starMsg.id);
       await oldMsg.edit({ embed });
    }
  if(!starMsg){
            const embed = new Discord.RichEmbed()
                .setColor(15844367)
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setDescription(`[Mesaja uç](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})\n${message.content}`)
                .setTimestamp(new Date(message.createdTimestamp))
                .setFooter(`⭐ ${message.reactions.get("⭐").count} | ${message.id}`)
                .setImage(eURL);
            await starboardChannel.send({ embed })
        }
}); 

client.on('messageReactionRemove', async (reaction ,user) => {
  const message = reaction.message;
 let starkanal = await db.fetch(`starboard_${reaction.guild.id}`); 
        const starboardChannel = message.guild.channels.get(starkanal);
      if (reaction.emoji.name !== '⭐') return;
    if (message.author.id === user.id)
    if (message.author.bot);
    const fetch = await starboardChannel.fetchMessages({ limit: 100 });
    const starMsg = fetch.find(m => m.embeds.length && m.embeds[0].footer && m.embeds[0].footer.text && m.embeds[0].footer.text.startsWith("⭐") && m.embeds[0].footer.text.endsWith(message.id));
     const embeds = message.embeds
     const attachments = message.attachments
      let eURL = ''

            if (embeds.length > 0) {
              // attempt to resolve image url; if none exist, ignore it
              if (embeds[0].thumbnail && embeds[0].thumbnail.url) { eURL = embeds[0].thumbnail.url } else if (embeds[0].image && embeds[0].image.url) { eURL = embeds[0].image.url } else { eURL = embeds[0].url }
            } else if (attachments.array().length > 0) {
              const attARR = attachments.array()
              eURL = attARR[0].url
              // no attachments or embeds
            }
  if(starMsg){
     const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(starMsg.embeds[0].footer.text);
            const embed = new Discord.RichEmbed()
                .setColor(15844367)
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setDescription(`[Mesaja uç](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})\n${message.content}`)
                .setTimestamp(new Date(message.createdTimestamp))
                .setFooter(`⭐ ${parseInt(star[1])-1} | ${message.id}`)
                .setImage(eURL);
                const oldMsg = await starboardChannel.fetchMessages(starMsg.id);
                await oldMsg.edit({ embed });
        }
});


client.on('raw', packet => {
   if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
  
   const channel = client.channels.get('710357925281005610');
    if (channel.messages.has('710426132494811168')) return;
  
    channel.fetchMessage('710426132494811168').then(message => {

        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
    
        const reaction = message.reactions.get(emoji);

        if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
        
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));         


          
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
        }
    });
})

 client.on('messageReactionAdd', (reaction, user) => {
  //  console.log(`${user.tag} Adlı kişiye rol verildi ${reaction.emoji.name}`);
   var member = reaction.message.guild.members.find(member => member.id == user.id)
 if (reaction.emoji.name == '🎉') {
member.addRole('710427652372299786')
 } 
 if (reaction.emoji.name == '📄') { 
member.addRole('688454163562233948')
 } 
  if (reaction.emoji.id == '710333000075837459') { 
member.addRole('688453853695574068')
 } 
  if(reaction.emoji.name == '📘'){
    member.addRole('710434049306656841')
  }
});

client.on('messageReactionRemove', (reaction, user) => {
  //  console.log(`${user.tag} Adlı kişiden rol alındı ${reaction.emoji.name}`);
       var member = reaction.message.guild.members.find(member => member.id == user.id)
   if (reaction.emoji.name == '🎉') {
member.removeRole('710427652372299786')
 } 
 if (reaction.emoji.name == '📄') { 
member.removeRole('688454163562233948')
 } 
  if (reaction.emoji.id == '710333000075837459') { 
member.removeRole('688453853695574068')
 } 
    if(reaction.emoji.name == '📘'){
    member.removeRole('710434049306656841')
  }
});


client.login("NjU2NjE2NDc5MTQzMzYyNTYx.Xm6hFQ.1A0cQk1p-n-hAgS880RgyU931YQ").catch(console.error); //tokeni yaz işte