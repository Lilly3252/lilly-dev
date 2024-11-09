import { KickCommand } from "#slashyInformations/index.js";
import { getLanguage, permission } from "#utils/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof KickCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof KickCommand>): Promise<void> {
		const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
		const locale = getLanguage(interaction, defaultLanguage);

		await interaction.deferReply({ ephemeral: args.hide ?? true });
		if (!(await permission(interaction, "KickMembers", defaultLanguage))) {
			return;
		}
		const member = args.target.member;
		const reason = args.reason ?? i18next.t("command.mod.kick.no_reason", { lng: locale });

		if (!member?.kickable) {
			await interaction.editReply({
				content: i18next.t("command.mod.kick.not_kickable", { lng: locale })
			});
			return;
		}

		try {
			await member.kick(reason);
			await interaction.editReply({
				content: i18next.t("command.mod.kick.success", {
					user: `${member}`,
					lng: locale
				})
			});
		} catch (error) {
			console.error("Failed to kick member:", error);
			await interaction.editReply({
				content: i18next.t("command.common.errors.generic", { lng: locale })
			});
		}
	}
}
