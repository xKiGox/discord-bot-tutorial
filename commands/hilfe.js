const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('hilfe')
            .setDescription('Zeigt dir alle Funktionen.'),

    async execute(interaction) {
        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setTitle('Hilfe')
            .setDescription('Folgende Aktionen kannst du mit Robo Hinsch ausführen!')
            .setColor('Orange')
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp()
            .addFields(
                {
                    name: '/hilfe',
                    value: 'Öffnet das Hilfe-Fenster',
                    inline: false
                },
                {
                    name: '/hallo',
                    value: 'Sagt dir hallo (Testfunktion)',
                    inline: true
                },
                {
                    name: '+1 Option',
                    value: 'Wählst du einen anderen Benutzer aus, wird diesem Hallo gesagt.',
                    inline: true
                },
                {
                    name: '/8ball',
                    value: 'Hilft dir eine Entscheidung zu treffen.',
                    inline: false
                },
                {
                    name: '/essen',
                    value: 'Sagt dir was du essen sollst.',
                    inline: true
                },
                {
                    name: '+1 Option',
                    value: 'Setzt du die Option "Büro" auf "true" wird die ein Restaurant in der Cloppenburger Str. ausgegeben.',
                    inline: true
                }
            );

        await interaction.editReply({
            embeds: [embed],
            flags: MessageFlags.Ephemeral //only user asking for help get the help-dsiplay
        })
    }
}