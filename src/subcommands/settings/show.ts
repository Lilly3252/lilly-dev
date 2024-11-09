import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { getLanguage, settingEmbed } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";

export async function show(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>["show"]): Promise<void> {
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });
	await interaction.deferReply({ ephemeral: args.hide ?? true });
	const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
	const locale = getLanguage(interaction, defaultLanguage);
	await interaction.editReply({ embeds: [await settingEmbed(interaction, guildSettings!, locale)] });
}
