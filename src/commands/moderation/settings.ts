import guilds from "#database/models/guilds.js";
import type { SettingCommand } from "#slashyInformations/index.js";
import { audit_log, channels, restriction_role, setevent, show } from "#subcommands/index.js";
import { languages } from "#subcommands/settings/language.js";
import { createSettings, permission } from "#utils/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof SettingCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>): Promise<void> {
		const subCommands = interaction.options.getSubcommand();
		const guildSettings = await guilds.findOne({ guildID: interaction.guildId });

		if (!(await permission(interaction, "ManageGuild", interaction.locale))) {
			return;
		}

		if (!guildSettings) {
			await createSettings(interaction);
			await interaction.reply({
				content: i18next.t("command.config.common.errors.no_settings", { lng: interaction.locale }),
				ephemeral: true
			});
			return;
		}

		try {
			switch (subCommands) {
				case "show":
					await show(interaction);
					break;

				case "audit_log":
					await audit_log(interaction);
					break;
				case "channels":
					await channels(interaction);
					break;
				case "events":
					await setevent(interaction, args.events);
					break;
				case "restriction_roles":
					await restriction_role(interaction, args.restriction_roles);
					break;
				case "language":
					await languages(interaction, args.language);
					break;
				default:
					break;
			}
		} catch (error) {
			console.error(error);
			interaction.reply({
				content: "An error occurred while updating the settings.",
				ephemeral: true
			});
		}
	}
}
