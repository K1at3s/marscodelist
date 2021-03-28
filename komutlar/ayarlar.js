const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
 let o = db.fetch(`otorol_${message.guild.id}`)
  let ot;
  if (o == null) ot = 'Ayarlı değil'
  else ot = '`@' + message.guild.roles.get(o).name + '`'
  
        
let girişk = db.fetch(`gelenKanal_${message.guild.id}`)
let giriş
if(girişk == null) giriş = 'Ayarlı değil'
else giriş = `<#${girişk}>`

     
let log = db.fetch(`Log_${message.guild.id}`)
let logs
if(log == null) logs = 'Ayarlı değil'
else logs = `<#${log}>` 

let güvenlik = db.fetch(`Log_${message.guild.id}`)
let güvenliks
if(güvenlik == null) güvenliks = 'Ayarlı değil'
else güvenliks = `<#${güvenlik}>` 

let starboard = db.fetch(`Log_${message.guild.id}`)
let starboards
if(starboard == null) starboards = 'Ayarlı değil'
else starboards = `<#${starboard}>` 

 const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setAuthor(`${message.guild.name} | Adlı sunucunun ayarları`, message.guild.iconURL)
 .addField('Giriş Kanalı', giriş)
 .addField('Log Kanalı', logs)
 .addField('Güvenlik Kanalı', güvenliks)
 .addField('Starboard' , starboards)
 .addField('Otorol', ot)
 message.channel.send(embed)
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 3,
  kategori: "sunucu"
}

exports.help = {
	komut: 'ayarlar',
	aciklama: 'Botun ayarlarına bakarsınız.',
	kullanim: 'ayarlar'
}