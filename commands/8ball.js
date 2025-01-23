const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('8ball')
            .setDescription('Stelle eine Frage, die mit "Ja" oder "Nein" beantwortet werden kann!')
            .addStringOption(option => option
                .setName('frage')
                .setDescription('Deine Frage für die magische Kugel')
                .setRequired(true)
            ),

    async execute(interaction) {
        await interaction.deferReply();

        const { options, user } = await interaction;
        const question = await options.getString('frage');

        if(!question.endsWith('?')) {
            return interaction.editReply({ flags: MessageFlags.Ephemeral, content: 'Eine Frage muss mit einem "?" enden.' })
        }

        const index = Math.floor(Math.random() * responses.length);

        const embed = new EmbedBuilder()
            .setTitle('Magische 8er Kugel')
            .setAuthor({ name: user.username, avatar: user.displayAvatarURL() })
            .setColor('Orange')
            .addFields(
                {
                    name: 'Frage:',
                    value: question
                },
                {
                    name: 'Antwort:',
                    value: responses[index]
                }
            );

        interaction.editReply({ embeds: [embed] });
    }
}

const responses = [
    "Es ist sicher.",
    "Ja, definitiv.",
    "Du kannst darauf zählen.",
    "Ohne Zweifel.",
    "Die Zeichen stehen auf Ja.",
    "Absolut!",
    "Alles spricht dafür.",
    "Gute Aussichten.",
    "Es sieht sehr gut aus.",
    "Ja.",
    "Nein.",
    "Sehr unwahrscheinlich.",
    "Die Antwort ist zweifelhaft.",
    "Frag lieber später nochmal.",
    "Ziemlich düster.",
    "Die Zeichen stehen schlecht.",
    "Das wird nicht passieren.",
    "Nicht in dieser Realität.",
    "Eher nicht.",
    "Es scheint unwahrscheinlich.",
    "Vielleicht.",
    "Konzentriere dich und frag erneut.",
    "Noch unklar.",
    "Die Antwort liegt im Nebel der Zeit.",
    "Frag in einem Jahr nochmal."
];