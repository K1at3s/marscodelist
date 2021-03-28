const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  	if (!args[0]) {
		const help = {}
		client.commands.forEach((command) => {
			const cat = command.conf.kategori;
			if (!help.hasOwnProperty(cat)) help[cat] = [];
			help[cat].push(`\n**${client.ayarlar.prefix}${command.help.komut}** = ${command.help.aciklama}`);
		})
		var str = ''
		for (const kategori in help) {
			str += `**${kategori.charAt(0).toUpperCase() + kategori.slice(1)}** ${help[kategori].join(" ")}\n\n`
		}

		const embed = new Discord.RichEmbed()
			.setAuthor(`${client.user.username} Komutları`, client.user.displayAvatarURL)
			.setDescription("Herhangi bir komut hakkında detaylı yardım almak için "+ client.ayarlar.prefix + "yardım <komut adı> yazabilirsiniz.\n\n" + str)
			.setTimestamp()
			.setColor('RANDOM')
      .setFooter('Komut Sayısı ' + client.commands.size , client.user.displayAvatarURL)
      .addField('Linkler','Tüm kodlara [buaradan](https://marscodelist.glitch.me/kodlar) bakabilirsiniz.\nKod eklemek için [tıklayın](https://marscodelist.glitch.me/kodgonder).')
		 message.channel.send({embed})
		return
	}
  
  	let command = args[0]
	if (client.commands.has(command)) {
		command = client.commands.get(command)
		var yetki = command.conf.permLevel.toString()
			.replace("0", `Yetki gerekmiyor.`)
			.replace("1", `Mesajları Yönet yetkisi gerekiyor.`)
			.replace("2", `Üyeleri At yetkisi gerekiyor.`)
			.replace("3", `Yönetici yetkisi gerekiyor.`)
			.replace("4", `Bot sahibi yetkisi gerekiyor.`)
		const embed = new Discord.RichEmbed()
			.addField('Komut', command.help.komut, false)
			.addField('Açıklama', command.help.aciklama, false)
			.addField('Kullanabilmek için Gerekli Yetki', yetki)
			.addField('Doğru Kullanım', client.ayarlar.prefix + command.help.kullanim)
			.addField('Alternatifler', command.conf.aliases[0] ? command.conf.aliases.join(', ') : 'Bulunmuyor')
			.setTimestamp()
      .setFooter(`${message.author.username} Tarafından istendi` , message.author.displayAvatarURL)
			.setColor('RANDOM')
		message.channel.send({embed})
	} else {
		const embed = new Discord.RichEmbed()
			.setDescription(`${args[0]} diye bir komut bulunamadı. Lütfen geçerli bir komut girin. Eğer komutları bilmiyorsanız ${client.ayarlar.prefix}yardım yazabilirsiniz.`)
			.setTimestamp()
			.setColor('RANDOM')
		message.channel.send({embed})
	}
  
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['y', 'help'],
	permLevel: 0,
	kategori: 'genel'
}

exports.help = {
	komut: 'yardım',
	aciklama: 'Bot hakkında bilgi gösterir.',
	kullanim: 'yardım'
}