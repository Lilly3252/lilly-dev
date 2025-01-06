import guilds from "#database/models/guilds.js";
import { InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export async function audit_log(interaction: InteractionParam): Promise<void> {
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });
	const choice = interaction.options.getBoolean("choice");

	await guildSettings?.updateOne({ auditLogEvent: choice });
	interaction.editReply({
		content: i18next.t(choice ? "command.config.events.enabled" : "command.config.events.disabled", {
			event: "Audit logs",
			lng: interaction.locale
		})
	});
}
