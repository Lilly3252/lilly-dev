import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { getLanguage, updateRoleSetting, updateSafeRoles } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";

export async function restriction_role(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>["restriction_roles"]): Promise<void> {
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });
	const choice = interaction.options.getBoolean("choice")!;
	const role = interaction.options.getRole("role_id");
	await interaction.deferReply({ ephemeral: args.hide ?? true });

	const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
	const locale = getLanguage(interaction, defaultLanguage);
	const roles = args.role;
	const roleKeys = ["restrictEmbedRole", "restrictPollRole", "restrictReactionRole", "restrictVoiceRole", "restrictSlashRole"];

	for (const roleKey of roleKeys) {
		if (roles === roleKey.replace("restrict", "").toLowerCase()) {
			await updateRoleSetting(interaction, guildSettings!, role, roleKey, role?.id ?? null, "command.config.events.channel_set", "command.config.events.channel_removed", locale);
		}
	}

	if (roles === "safe") {
		await updateSafeRoles(interaction, guildSettings!, role?.id ?? "", choice, locale);
	}
}
