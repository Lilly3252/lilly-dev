import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { getLanguage } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export async function audit_log(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>["audit_log"]): Promise<void> {
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });
	const choice = interaction.options.getBoolean("choice");
	await interaction.deferReply({ ephemeral: args.hide ?? true });

	const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
	const locale = getLanguage(interaction, defaultLanguage);
	await guildSettings?.updateOne({ auditLogEvent: choice });
	interaction.editReply({
		content: i18next.t(choice ? "command.config.events.enabled" : "command.config.events.disabled", {
			event: "Audit logs",
			lng: locale
		})
	});
}
