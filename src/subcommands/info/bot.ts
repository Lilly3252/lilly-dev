import { InfoCommand } from "#slashyInformations/index.js";
import { botInfo, getLanguage } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";

export async function bot(interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>): Promise<void> {
	await interaction.deferReply({ ephemeral: args.bot.hide ?? true });
	const defaultLanguage = (args.bot.hide ?? true) ? undefined : "en-US";
	const locale = getLanguage(interaction, defaultLanguage);
	const application = await interaction.client.application.fetch();
	await interaction.editReply({ embeds: [await botInfo(application, interaction, args, locale)] });
}
