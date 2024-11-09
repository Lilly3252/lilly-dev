import { UnbanCommand } from "#slashyInformations/index.js";
import { getLanguage, permission } from "#utils/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof UnbanCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof UnbanCommand>): Promise<void> {
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
		const locale = getLanguage(interaction, defaultLanguage);
		if (!(await permission(interaction, "BanMembers", locale))) {
			await interaction.editReply({
				content: i18next.t("command.common.errors.no_permission", { lng: locale })
			});
			return;
		}

		const id = args.id ?? interaction.options.getString("id");
		const reason = args.reason ?? i18next.t("command.mod.unban.no_reason", { lng: locale });

		if (!id || isNaN(Number(id))) {
			await interaction.editReply({
				content: i18next.t("command.mod.unban.errors.no_ids", { lng: locale })
			});
			return;
		}

		try {
			const bans = await interaction.guild.bans.fetch();
			const bannedUser = bans.find((ban) => ban.user.id === id);

			if (!bannedUser) {
				await interaction.editReply({
					content: i18next.t("command.mod.unban.errors.no_ban", { user: id, lng: locale })
				});
				return;
			}

			await interaction.guild.members.unban(bannedUser.user, reason);
			await interaction.editReply({
				content: i18next.t("command.mod.unban.success", { user: id, lng: locale })
			});
		} catch (error) {
			console.error("Failed to unban member:", error);
			await interaction.editReply({
				content: i18next.t("command.common.errors.generic", { lng: locale })
			});
		}
	}
}
