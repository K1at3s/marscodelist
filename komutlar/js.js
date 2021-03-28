const Discord = require('discord.js');

exports.run = async (client, message, args) => {
// let role = message.guild.roles.find('name', '</> Discord.js')
// let member = message.guild.member(message.author.id)
// if(member.roles.has(role.id)) return message.channel.send('Zaten **</> Discord.js** rolüne sahipsin.')
/// member.addRole(role)
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(client.user.username, client.user.avatarURL)
  .setDescription(`<a:okey:679854253501710383> <@${message.author.id}> Rol almak için <#710357925281005610> kanalına git.`)
  message.channel.send({embed: embed})
  
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['jss', 'jsss','jssss'],
	permLevel: 0,
	kategori: 'genel'
}

exports.help = {
	komut: 'js',
	aciklama: 'JS Rolü verir.',
	kullanim: 'js'
}