const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    let guild = args[0]
      const uyari = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription('Lütfen bir kanal belirt.')
  if (!client.guilds.get(guild)) {
      const uyari = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription('<a:no:679854277711233037> Lütfen bir sunucu idi girin.')
    return message.channel.send(uyari)
  }
  let guildadi = client.guilds.get(guild)
  db.delete(`premium.${guild}`)
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription('<a:okey:679854253501710383> Başarılı bir şekilde `' + guildadi.name + '` adlı sunucuda premium deaktif edildi.')
  message.channel.send(embed)
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 4,
  kategori: "yapımcı"
}

exports.help = {
	komut: 'premium-deaktifleştir',
	aciklama: 'Sunucuda premium deaktifleştirsiniz.',
	kullanim: 'Premium deaktifleştir <sunucu id>'
}