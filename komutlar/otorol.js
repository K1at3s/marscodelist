const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => {

			if (message.channel.type !== 'dm') {
if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
		   message.channel.send('<a:no:679854277711233037> Bu komutu kullanmak için yetkin yok.')
    }else{
      
const otorolkanal = message.mentions.channels.first()

  if(!otorolkanal) {
   message.channel.send(`<a:no:679854277711233037> Otorol mesaj kanalını etiketlemelisin.`)
  }
        
      
db.set(`otorlK_${message.guild.id}`, otorolkanal.id)  
let role = args[1]
if (role.length < 1) return message.reply('<a:no:679854277711233037> Otorol için bir rol seçmelisin.');
let role2 = message.guild.roles.find(r => r.name === `${role}`);
if (!role2) return message.reply(`<a:no:679854277711233037> ${role} Rolünü bulamıyorum.`);
db.set(`otorol_${message.guild.id}`, role2.id)
message.channel.send(`<a:okey:679854253501710383> Otorol mesaj kanalı ${otorolkanal} olarak ayarlandı. Otorol **${role}** rolü olarak başarılı bir şekilde ayarlandı.`)   
}
}}


exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 2,
  kategori: 'sunucu'
};
exports.help = {
  komut: 'otorol',
  aciklama: 'Otorol Ayarlarsınız.',
  kullanim: 'otorol <@rol>'
};
