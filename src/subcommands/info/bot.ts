import { InfoCommand } from "#slashyInformations/index.js";
import { botInfo } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";

export async function bot(interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>): Promise<void> {
	const application = await interaction.client.application.fetch();
	await interaction.editReply({ embeds: [await botInfo(application, interaction, args, interaction.locale)] });
}
