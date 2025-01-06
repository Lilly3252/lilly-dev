import guilds from "#database/models/guilds.js";
import { settingEmbed } from "#utils/index.js";
import { InteractionParam } from "@yuudachi/framework/types";

export async function show(interaction: InteractionParam): Promise<void> {
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });

	await interaction.editReply({ embeds: [await settingEmbed(interaction, guildSettings!, interaction.locale)] });
}
