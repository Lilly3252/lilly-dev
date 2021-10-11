const { SlashCommandBuilder } = require('@discordjs/builders');
const facts = require('../../Structures/JSONs/fact-core.json');

module.exports = {
data : new SlashCommandBuilder()
        .setName('fact-core')
        .setDescription('....')
	,
	async run(interaction) {
		return msg.channel.send(facts[Math.floor(Math.random() * facts.length)]);
	}
};
