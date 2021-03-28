const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    let channel = message.mentions.channels.first()
  if (!channel) {
      const uyari = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription('<a:no:679854277711233037> Lütfen bir kanal belirt.')
    return message.channel.send(uyari)
  }
  db.set(`Log_${message.guild.id}`,channel.id)
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription('<a:okey:679854253501710383> Başarılı bir şekilde log kanalı' + channel + ' olarak ayarlandı.')
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
	komut: 'log-ayarla',
	aciklama: 'log kanalını ayarlamanısı sağlar ayarları gösterir.',
	kullanim: 'log-ayarla <#kanal>'
}