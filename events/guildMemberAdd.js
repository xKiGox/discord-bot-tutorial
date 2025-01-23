module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const welcomeRole = await member.guild.roles.cache.find(role => role.name === 'Guest');
        await member.roles.add(welcomeRole);

        const welcomeChannel = await member.guild.channels.cache.find(channel => channel.name === 'welcome');
        await welcomeChannel.fetch();
        welcomeChannel.send(`Hallo ${member.user}. Du hast es zu Zockerrunden geschafft und bist nun als Gast dabei. Wenn du volle Berechtigungen haben möchtest, dann sag einem der Mods bescheid.`);
    }
}