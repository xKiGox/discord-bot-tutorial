const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('hallo')
            .setDescription('Heißt dich willkommen. (Dient als Funktionstest)')
            .addUserOption(option =>
                option 
                    .setName('user')
                    .setDescription('Sag einem Mitglied "Hallo".')
            ), //options are not necessary

    async execute(interaction) {
        await interaction.deferReply();

        const user = interaction.options.getUser('user') || interaction.user;
		interaction.editReply({ content: `Hallo ${user.username} 👋` }); 
    }
}