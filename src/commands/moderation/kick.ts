import guilds from "#database/models/guilds.js";
import { KickCommand } from "#slashyInformations/index.js";
import { permission } from "#utils/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof KickCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof KickCommand>): Promise<void> {
		const guild = await guilds.findOne({ guildID: interaction.guildId });
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		if (!(await permission(interaction, "KickMembers"))) {
			return;
		}
		const member = args.target.member;
		const reason = args.reason ?? i18next.t("command.mod.kick.no_reason", { lng: guild?.defaultLanguage });

		if (!member?.kickable) {
			await interaction.editReply({
				content: i18next.t("command.mod.kick.not_kickable", { lng: guild?.defaultLanguage })
			});
			return;
		}

		try {
			await member.kick(reason);
			await interaction.editReply({
				content: i18next.t("command.mod.kick.success", {
					user: `${member}`,
					lng: guild?.defaultLanguage
				})
			});
		} catch (error) {
			console.error("Failed to kick member:", error);
			await interaction.editReply({
				content: i18next.t("command.common.errors.generic", { lng: guild?.defaultLanguage })
			});
		}
	}
}
