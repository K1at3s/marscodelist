const Discord = require('discord.js')
const db = require('quick.db');
exports.run = async (client, message, args) => {
 
    let kanal = message.mentions.channels.first();
    if (!kanal) return message.channel.send('<a:no:679854277711233037> Lütfen bir kanal belirtin.')
        
   let gelengiden = await db.set(`gelenKanal_${message.guild.id}`, kanal.id)
      return message.channel.send(`<a:okey:679854253501710383> Giriş çıkış kanalı başarıyla <#${gelengiden}> olarak **ayarlandı!**`)
};
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3,
    kategori: 'sunucu'

}

exports.help = {
    komut: 'giriş-çıkış',
    aciklama: 'Gelen giden kanalını belirler.',
    kullanim:"giriş-çıkış"
}