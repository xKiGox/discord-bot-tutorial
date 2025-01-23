const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('essen')
            .setDescription('Sagt dir welche Richtung dein essen haben soll.')
            .addBooleanOption(option =>
                option 
                    .setName('büro')
                    .setDescription('Bist du im Büro an der Cloppenburger Str., wird dir zufällig ein Restaurant ausgegeben.')
                    .setRequired(false)
            ), //options are not necessary

    async execute(interaction) {
        await interaction.deferReply();

        const globalDish = ['italienisch', 'türkisch', 'asiatisch', 'griechisch', 'Burger', 'Pizza', 'Pasta', 'Döner', 'indisch', 'Sushi'];
        const localDish = ['zu Mangal', 'zu Son Tung', 'zu Buger King', 'zu Berlin Döner', 'zu Luciano', 'zu Aktiv', 'zu Bartsch', 'in die Kantine'];

        if(interaction.options.getBoolean('büro')) {
            const index = Math.floor(Math.random() * localDish.length);
            await interaction.editReply({ content: `Du solltest ${localDish[index]} gehen!` });
        } else {
            const index = Math.floor(Math.random() * localDish.length);
            interaction.editReply({ content: `Wie wäre es mit ${globalDish[index]}?` });
        } 
    }
}