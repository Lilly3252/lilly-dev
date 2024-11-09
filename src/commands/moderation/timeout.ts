import { TimeoutCommand } from "#slashyInformations/index.js";
import { getLanguage, permission } from "#utils/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof TimeoutCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof TimeoutCommand>): Promise<void> {
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
		const locale = getLanguage(interaction, defaultLanguage);
		if (!(await permission(interaction, "ModerateMembers", locale))) {
			await interaction.editReply({
				content: i18next.t("command.common.errors.no_permission", { lng: locale })
			});
			return;
		}

		const member = args.target.member;
		const duration = args.duration;
		const reason = args.reason ?? i18next.t("command.mod.timeout.no_reason", { lng: locale });

		if (!member?.moderatable) {
			await interaction.editReply({
				content: i18next.t("command.mod.timeout.not_moderatable", { lng: locale })
			});
			return;
		}

		try {
			await member.timeout(duration, reason);
			await interaction.editReply({
				content: i18next.t("command.mod.timeout.success", {
					user: `${member}`,
					duration: `${duration}`,
					lng: locale
				})
			});
		} catch (error) {
			console.error("Failed to timeout member:", error);
			await interaction.editReply({
				content: i18next.t("command.common.errors.generic", { lng: locale })
			});
		}
	}
}
