import { BanCommand } from "#slashyInformations/index.js";
import { permission } from "#utils/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof BanCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof BanCommand>): Promise<void> {
		if (!(await permission(interaction, "BanMembers", interaction.locale))) {
			return;
		}

		const user = args.target.user ?? interaction.options.getUser("target");
		const member = args.target.member ?? interaction.options.getMember("target");

		if (!member?.bannable) {
			await interaction.editReply({
				content: i18next.t("command.mod.ban.not_bannable", { user: `${user ?? member}`, lng: interaction.locale })
			});
			return;
		}

		try {
			await interaction.guild.members.ban(member ?? user, {
				deleteMessageSeconds: args.days ?? undefined
			});
			await interaction.editReply({
				content: i18next.t("command.mod.ban.success", {
					user: `${user ?? member}`,
					lng: interaction.locale
				})
			});
		} catch (error) {
			console.error("Failed to ban member:", error);
			await interaction.editReply({
				content: i18next.t("command.common.errors.generic", { lng: interaction.locale })
			});
		}
	}
}
