import { InfoCommand } from "#slashyInformations/index.js";
import { getLanguage, roleInfo } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
export async function role(interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>["role"]): Promise<void> {
	await interaction.deferReply({ ephemeral: args.hide ?? true });
	const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
	const locale = getLanguage(interaction, defaultLanguage);
	const role = interaction.options.getRole("role");
	await interaction.editReply({ embeds: [await roleInfo(args, role!, interaction, locale)] });
}
