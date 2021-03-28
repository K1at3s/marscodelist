const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
let preKontrol = db.fetch(`premium.${message.guild.id}`)
if(!preKontrol !== true) {
 message.channel.send('Premium aktif.')
}else{
  message.channel.send('<a:no:679854277711233037> Bu sunucuda premium aktif değil.')
}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['jss', 'jsss','jssss'],
	permLevel: 0,
	kategori: 'genel'
}

exports.help = {
	komut: 'deneme',
	aciklama: 'Sistem hakkında bilgi gösterir.',
	kullanim: 'deneme'
}