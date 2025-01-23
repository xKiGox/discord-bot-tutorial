const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('movemsg')
            .setDescription('Verschiebt Nachrichten zwischen den Kanälen.')
            .addStringOption(option => option
                .setName('nachricht')
                .setDescription('Message ID')
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName('channel')
                .setDescription('Message ID')
                .setRequired(true)
            ),

    async execute(interaction) {
        await interaction.deferReply();

        const options = await interaction.options.data;
        const messageId = options[0].value;
        const channelId = options[1].value;
        const channel = interaction.guild.channels.cache.find(channels => channels.name === channelId);
        
        if(!channel) { return interaction.reply({ flags: MessageFlags.Ephemeral, content: 'Diesen Kanal gibt es nicht!' }); }
        

        await channel.fetch();
        interaction.channel.messages.fetch(messageId)
            .then((message) => {
                const unixTimestamp = message.createdTimestamp;
                const date = new Date(unixTimestamp);

                const embed = new EmbedBuilder()
                    .setColor('Orange')
                    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                    .addFields(
                        {
                            name: 'Nachricht verschoben:',
                            value: message.content,
                            inline: false
                        }
                    )
                    .setFooter({ text: `Vom ${date.toLocaleString()}` });
                
                channel.send({ embeds: [embed] });
                message.delete();
            });

        interaction.editReply({ flags: MessageFlags.Ephemeral, content: 'Nachricht verschoben.' })
    }
}