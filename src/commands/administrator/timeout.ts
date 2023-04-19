import { botPermissionDenied, errors, successful } from '#constants/constants.js';
import type { SlashCommand } from '#type/index.js';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder } from 'discord.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('timeout')
	.setDescription('timeout a member.')
	.addUserOption((option) => option.setName('target').setDescription('Select a user').setRequired(true))
	.addStringOption((option) =>
		option
			.setName('time')
			.setDescription('time for timeout')
			.addChoices(
				{ name: '5mins', value: '300000' },
				{ name: '10mins', value: '600000' },
				{ name: '15mins', value: '900000' },
				{ name: '30min', value: '1800000' },
				{ name: '45min', value: '2700000' },
				{ name: '1day', value: '86400000' },
				{ name: '2days', value: '172800000' },
				{ name: '3days', value: '259200000' },
				{ name: '4days', value: '345600000' },
				{ name: '5days', value: '432000000' },
				{ name: '6days', value: '518400000' },
				{ name: '1week', value: '604800000' },
				{ name: '2weeks', value: '1209600000' },
				{ name: '28days', value: '2419200000' },
			)
			.setRequired(true),
	)

	.addStringOption((option) => option.setName('reason').setDescription('reason to timeout').setRequired(true))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
		return interaction.reply({
			content: botPermissionDenied('ModerateMembers'),
			ephemeral: true,
		});
	}
	const member = interaction.options.getMember('target')!;
	const time = interaction.options.getString('time')!;
	const reason = interaction.options.getString('reason')!;
	//const database = await prisma.guild.findFirst({ where: { guildID: interaction.guild.id } });
	if (!member.moderatable || !member.manageable) {
		await interaction.reply({
			content: errors.moderationDenied,
			ephemeral: true,
		});
	}
	member
		.timeout(+time, reason)
		.then(() => {
			member.send(`Hello, you have been timeout in ${interaction.guild.name} for: ${reason}`).catch((err) => console.log(err)),
				interaction.reply({
					content: successful.timeout(member.user.username),
					ephemeral: true,
				});
		})
		.catch((err) => console.log(err));

	//  const g = database?.logChannelID;
	//if (!g || g === null) { return }
	//const LogChannel = interaction.client.channels.cache.get(g);
	//if (!LogChannel || LogChannel === null) { return }
	//if (LogChannel?.isTextBased()) {
	//   LogChannel?.send({ embeds: [Embed.adminEmbed(interaction, member!, reason!)] });
	// }
};
