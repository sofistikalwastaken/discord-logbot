const Discord = require("discord.js") 
const client = (global.client = new Discord.Client());
const { TextChannel, MessageEmbed, Guild } = require("discord.js")
const db = require("quick.db")
const logs = require("discord-logs")
client(logs)
client.log = "Log Kanal ID'si";
client.Token = "Token";

const send = async function send(type, content, imageURL) {
const embed = new MessageEmbed().setColor("RANDOM").setTimestamp().setTitle(type).setDescription(content).setFooter("Sofistikal was here!")

if (imageURL) {
embed.setImage(imageURL)
}

client.channels.cache.get(client.log).send(embed)
};

client.login(client.Token).then(qwe => console.log(`${client.user.tag} ismi ile giriş yapıldı!`)).catch(hata => console.error("Bota giriş yapılamadı."));

client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
send("İzinler Değiştirildi!", `**${channel.name}** isimli kanalın **izinleri** değiştirildi!`);
});

client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
send("Kanal Konusu Değiştirildi!", `**${channel.name}** isimli kanalın **konusu** değiştirildi!\n\n- \`${oldTopic}\`\n+ \`${newTopic}\``)
});

client.on("guildMemberBoost", (member) => {
send("Bir Kullanıcı Takviye Yaptı!", `${member} (\`${member.user.tag}\`) isimli kullanıcı sunucumuza **takviye** yaptı!`)
});

client.on("guildMemberUnboost", (member) => {
send("Bir Kullanıcı Takviyesini Geri Çekti!", `${member} (\`${member.user.tag}\`) isimli kullanıcı sunucumuzdaki **takviyesini** geri çekti!`)
});

client.on("guildMemberRoleAdd", (member, role) => {
send("Bir Kullanıcıya Rol Verildi!", `${member} (\`${member.user.tag}\`) isimli kullanıcıya **${role.name}** rolü **verildi**!`)
});

client.on("guildMemberRoleRemove", (member, role) => {
send("Bir Kullanıcıdan Rol Alındı!", `${member} (\`${member.user.tag}\`) isimli kullanıcıdan **${role.name}** rolü **alındı**!`)
});

client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
send("Bir Kullanıcının İsmi Değiştirildi!", `${member} (\`${member.user.tag}\`) isimli kullanıcının **sunucu içerisindeki adı** \`${oldNickname}\` isminden \`${newNickname}\` ismine değiştirildi!`)
});

client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {
send("Sunucu Bir Sonraki Takviye Seviyesine Ulaştı!", `**${guild.name}** isimli sunucu ${newLevel === 3 ? "**son seviyeye**" : `**${newLevel} seviyeye**`} ulaştı!`)
});

client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {
send("Sunucu Bir Önceki Takviye Seviyesine Düştü!", `**${guild.name}** isimli sunucu **${oldLevel}** seviyesinden **${newLevel}** seviyesine düştü!`)
});

client.on("guildRegionUpdate", (guild, oldRegion, newRegion) => {
send("Sunucunun Bölgesi Değişti!", `**${guild.name}** isimli sunucunun **bölgesi** \`${oldRegion}\`nden \`${newRegion}\`a değiştirildi!`)
});

client.on("guildBannerAdd", (guild, bannerURL) => {
send("Sunucunun Afişi Değişti!", `**${guild.name}** isimli sunucunun **afişi** değiştirildi! Yeni afiş ekte gösterilmektedir.`, bannerURL)
});

client.on("guildVanityURLAdd", (guild, vanityURL) => {
send("Sunucu Artık Bir Özel URLye Sahip!", `**${guild.name}** isimli sunucunun özel URLsi \`${vanityURL}\` olarak **ayarlandı**! :tada:`, guild.bannerURL ? guild.bannerURL : guild.iconURL({dynamic: true}))
});

client.on("guildVanityURLRemove", (guild, vanityURL) => {
send("Sunucu Özel URLsini Kaybetti!", `**${guild.name}** isimli sunucunun özel URLsi **kaldırıldı**! Kaldırılmadan önce özel URL \`${vanityURL}\`ydi.`, guild.iconURL({dynamic: true}))
});

client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {
send("Sunucunun Özel URLsi Değişti!", `**${guild.name}** isimli sunucunun özel URLsi \`${oldVanityURL}\`den \`${newVanityURL}\`a **değiştirildi**!`)
});

client.on("guildOwnerUpdate", (oldGuild, newGuild) => {
send("Sunucunun Tacı Devredildi!", `**${newGuild.name}** isimli sunucunun tacı **${oldGuild.owner.user.tag}**da iken **${newGuild.owner.user.tag}**a verildi!`)
});

client.on("messagePinned", (message) => {
send("Sunucuda Bir Mesaj Sabitlendi!", `**${message.guild.name}** isimli sunucunun **${message.channel.name}** isimli kanalında \`${message.content}\` içerikli mesajı **sabitlendi**!`)
});

client.on("messageContentEdited", (message, oldContent, newContent) => {
send("Sunucuda Bir Mesaj Düzenlendi!", `**${message.guild.name}** isimli sunucunun **${message.channel.name}** isimli kanalında \`${oldContent}\` içerikli mesajı \`${newContent}\` içeriğine değiştirildi!`)
});

client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {
send("Bir Rolün Yetkileri Değişti!", `**${role.name}** isimli rolün **izinleri değiştirildi**! Detayları konsola yolladım.`).then(console.log(`- ${oldPermissions}\n+ ${newPermissions}`))
});

client.on("voiceChannelJoin", (member, channel) => {
send("Bir Kullanıcı Sesli Kanala Giriş Yaptı!", `**${member.displayName == member.user.username ? member.user.username : member.displayName}** isimli kullanıcı **${channel.name}** isimli ses kanalına katıldı!`)
});

client.on("voiceChannelLeave", (member, channel) => {
send("Bir Kullanıcı Sesli Kanaldan Çıkış Yaptı!", `**${member.displayName == member.user.username ? member.user.username : member.displayName}** isimli kullanıcı **${channel.name}** isimli ses kanalından ayrıldı!`)
});

client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {
send("Bir Kullanıcı Sesli Kanalını Değiştirdi!", `**${member.displayName == member.user.username ? member.user.username : member.displayName}** isimli kullanıcı **${oldChannel.name}** isimli ses kanalından ayrılıp **${newChannel.name}** isimli kanala katıldı!`)
});

client.on("voiceChannelMute", (member, muteType) => {
var tür;
if (muteType == "self-muted") tür = "kendini susturdu.";
if (muteType == "server-muted") tür = "yetkili tarafından susturuldu.";

send("Bir Kullanıcı Sesli Kanalda Susturuldu!", `**${member.displayName == member.user.username ? member.user.username : member.displayName}** isimli kullanıcı \`${member.voice.channel.name}\` isimli kanalda **${tür}**`)
});

client.on("voiceChannelUnmute", (member, oldMuteType) => {
var tür;
if (oldMuteType == "self-muted") tür = "kendini susturmuştu.";
if (oldMuteType == "server-muted") tür = "yetkili tarafından susturulmuştu.";

send("Bir Kullanıcı Sesli Kanalda Susturulması Kaldırıldı!", `**${member.displayName == member.user.username ? member.user.username : member.displayName}** isimli kullanıcı \`${member.voice.channel.name}\` isimli kanalda **${tür}**`)
});

client.on("voiceChannelDeaf", (member, deafType) => {
var tür;
if (deafType == "self-deafed") tür = "kendini sağırlaştırdı.";
if (deafType == "server-deafed") tür = "yetkili tarafından sağırlaştırıldı.";

send("Bir Kullanıcı Sesli Kanalda Sağırlaştırıldı!", `**${member.displayName == member.user.username ? member.user.username : member.displayName}** isimli kullanıcı \`${member.voice.channel.name}\` isimli kanalda **${tür}**`)
});

client.on("voiceChannelUndeaf", (member, deafType) => {
var tür;
if (deafType == "self-deafed") tür = "kendini kendi sağırlaştırmasını kaldırdı.";
if (deafType == "server-deafed") tür = "yetkili tarafından sağırlaştırılması kaldırıldı.";

send("Bir Kullanıcı Sesli Kanalda Sağırlaştırılması Kaldırıldı!", `**${member.displayName == member.user.username ? member.user.username : member.displayName}** isimli kullanıcı \`${member.voice.channel.name}\` isimli kanalda **${tür}**`)
});

client.on("voiceStreamingStart", (member, voiceChannel) => {
send("Bir Kullanıcı Yayın Açtı!", `**${member.displayName == member.user.username ? member.user.username : member.displayName}** isimli kullanıcı \`${voiceChannel.name}\` isimli kanalda **yayın açtı!**`)
});

client.on("voiceStreamingStop", (member, voiceChannel) => {
send("Bir Kullanıcı Açtığı Yayını Kapattı!", `**${member.displayName == member.user.username ? member.user.username : member.displayName}** isimli kullanıcı \`${voiceChannel.name}\` isimli kanalda **açtığı yayını kapattı!**`)
});

client.on("emojiDelete", (emoji) => {
send("Bir Emoji Silindi!", `**${emoji.name}** isimli emoji silindi!`, emoji.url)
})

client.on("emojiUpdate", (oldEmoji, newEmoji) => {
send("Bir Emoji Güncellendi!", `**${oldEmoji.name}** isimli emojinin adı **${newEmoji.name}** olarak değiştirildi!`, newEmoji.url)
});

client.on("emojiCreate", (emoji) => {
send("Bir Emoji Oluşturuldu!", `**${emoji.name}** isminde bir emoji oluşturuldu!`, emoji.url)
});

client.on("guildBanAdd", (guild, user) => {
send("Bir Kullanıcı Yasaklandı!", `\`${user.user.tag}\` isimli kullanıcı sunucumuzdan **yasaklandı!**`)
});

client.on("guildBanRemove", (guild, user) => {
send("Bir Kullanıcının Yasaklaması Kaldırıldı!", `\`${user.user.tag}\` isimli kullanıcı sunucumuzdan **yasaklanması kaldırıldı!**`)
});

client.on("roleCreate", (role) => {
send("Bir Rol Oluşturuldu!", `**${role.name}** adında bir rol oluşturuldu!`)
});

client.on("roleDelete", (role) => {
send("Bir Rol Silindi!", `**${role.name}** isimli bir rol silindi!`)
});

client.on("roleUpdate", (oldRole, newRole) => {
send("Bir Rol Güncellendi!", `**${oldRole.name}** isimli rol güncellendi!`)
});

client.on("messageDelete", (message) => {
send("Bir Mesaj Silindi!", `**${message.channel.name}** isimli kanalda **${message.content}** bir mesaj silindi!`)
})

client.on("channelDelete", (channel) => {
send("Bir Kanal Silindi!", `**${channel.name}** isimli kanal silindi! Tür: ${channel.type == "text" ? "Yazı." : "Ses."}`)
})

client.on("channelCreate", (channel) => {
send("Bir Kanal Oluşturuldu!", `**${channel.name}** isminde kanal oluşturuldu! Tür: ${channel.type == "text" ? "Yazı." : "Ses."}`)
})

client.on("channelUpdate", (oldChannel, newChannel) => {
send("Bir Kanal Oluşturuldu!", `**${oldChannel.name}** isimli kanal güncellendi!\n\n- **${oldChannel.name}**\n+ **${newChannel.name}**`)
})

client.on("ready", () => {
send("Bot Aktif Oldu!", `Bota başarıyla giriş yapıldı!`);
console.log("Bota başarıyla giriş yapıldı!");
client.user.setPresence({ activity: { type: "COMPETING", name: `Sofistikal was here.`}, status: 'dnd' });
})