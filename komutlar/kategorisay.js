const Discord = require('discord.js');

exports.run = async (client, message, args) => {
const kategorikanallar = message.guild.channels.filter(channel => channel.type === "category");
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  kategorikanallar.forEach(channel => {
  embed.addField('Sayılan kategori', channel.name + '\nKanal sayısı ' +  channel.children.size, true)
  })
  message.channel.send({embed: embed})
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 0,
	kategori: 'genel'
}

exports.help = {
	komut: 'kategorisay',
	aciklama: 'Kategorideki kanalları sayar.',
	kullanim: 'kategorisay'
}