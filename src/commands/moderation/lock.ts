import guilds from "#database/models/guilds.js";
import { LockCommand } from "#slashyInformations/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof LockCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof LockCommand>): Promise<void> {
		const guild = await guilds.findOne({ guildID: interaction.guildId });
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		const role = interaction.guild.roles.everyone;
		const lock = args.activate;

		try {
			if (lock) {
				role.permissions.remove("SendMessages");
				await interaction.editReply({
					content: i18next.t("command.mod.lock.locked", { lng: guild?.defaultLanguage })
				});
			} else {
				role.permissions.add("SendMessages");
				await interaction.editReply({
					content: i18next.t("command.mod.lock.unlocked", { lng: guild?.defaultLanguage })
				});
			}
		} catch (error) {
			console.error("Failed to update role permissions:", error);
			await interaction.editReply({
				content: i18next.t("command.common.errors.generic", { lng: guild?.defaultLanguage })
			});
		}
	}
}
