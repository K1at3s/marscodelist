const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
   let pre = args.slice(0).join(' ');
      if (!pre[0]) {
       msg.channel.send("<a:no:679854277711233037> | Not: `ayrıl` ya da `katıl` yazmalısın!") 
  }
   
       if (pre === 'ayrıl') {
          client.emit('guildMemberRemove', msg.member || await msg.guild.fetchMember(msg.author));
         msg.channel.send('<a:okey:679854253501710383> Başarılı!')
         
        
       }
  if (pre === 'katıl') {
     client.emit('guildMemberAdd', msg.member || await msg.guild.fetchMember(msg.author));
    msg.channel.send('<a:okey:679854253501710383> Başarılı!')
        
       }
   }   


exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 4,
  kategori: 'yapımcı'
}

exports.help = {
	komut: 'sahte',
	aciklama: 'Sahte katılıp ayrılmanızı sağlar.',
	kullanim: 'sahte'
}