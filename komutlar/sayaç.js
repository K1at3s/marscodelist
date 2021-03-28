const Discord = require('discord.js')
const db = require('quick.db')
 
exports.run = async (client, message, args) => {
  const sayackanal = message.mentions.channels.first()
  const sayac = args[0]
  const sayacsayi = await db.fetch(`sayac_${message.guild.id}`);
  
    if(args[0] === "sıfırla") {
    if(!sayacsayi) {
      message.channel.send(`<a:no:679854277711233037> Ayarlanmayan şeyi sıfırlayamazsın.`)
      return
    }
    
    db.delete(`sayac_${message.guild.id}`)
    db.delete(`sayacK_${message.guild.id}`)
    message.channel.send(`<a:no:679854277711233037> Sayaç başarıyla sıfırlandı.`)
    return
  }
  
if (!sayac) return message.channel.send(`<a:no:679854277711233037> Bir sayı belirtmelisin.\n **${client.ayarlar.prefix}sayaç <sayı> <#kanal>**`);
if(isNaN(sayac)) return message.channel.send(`<a:no:679854277711233037> Geçerli bir sayı belirtmelisin.\n **${client.ayarlar.prefix}sayaç <sayı> <#kanal>**`);
if(sayac <= message.guild.members.size) return message.channel.send(`<a:no:679854277711233037> Sunucudaki kullanıcı sayısından (${message.guild.members.size}) daha yüksek bir sayı girmelisin.`);
if (!sayackanal) return message.channel.send(`<a:no:679854277711233037> Sayaç kanalını belirtmelisin.\n **${client.ayarlar.prefix}sayaç ${sayac} <#kanal>**`);   
     
  db.set(`sayac_${message.guild.id}`, sayac)
  db.set(`sayacK_${message.guild.id}`, sayackanal.id)
  
  message.channel.send(`<a:okey:679854253501710383> Sayaç **${sayac}**, sayaç kanalı **${sayackanal}** olarak ayarlandı.`)
}
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['sayac'],
        permLevel: 3,
        kategori: 'sunucu'
}
 
exports.help = {
        komut: 'sayaç',
        aciklama: 'Sayacı ayarlar.',
        kullanim: 'sayaç <sayı> <#kanal> / sıfırla'
}