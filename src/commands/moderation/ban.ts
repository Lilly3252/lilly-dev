import guilds from "#database/models/guilds.js";
import { BanCommand } from "#slashyInformations/index.js";
import { getLanguage, permission } from "#utils/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof BanCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof BanCommand>): Promise<void> {
		const guild = await guilds.findOne({ guildID: interaction.guildId });
		const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
		const locale = getLanguage(interaction, defaultLanguage);
		await interaction.deferReply({ ephemeral: args.hide ?? true });

		if (!(await permission(interaction, "BanMembers", locale))) {
			return;
		}

		const user = args.target.user ?? interaction.options.getUser("target");
		const member = args.target.member ?? interaction.options.getMember("target");

		if (!member?.bannable) {
			await interaction.editReply({
				content: i18next.t("command.mod.ban.not_bannable", { user: `${user ?? member}`, lng: guild?.defaultLanguage })
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
					lng: guild?.defaultLanguage
				})
			});
		} catch (error) {
			console.error("Failed to ban member:", error);
			await interaction.editReply({
				content: i18next.t("command.common.errors.generic", { lng: guild?.defaultLanguage })
			});
		}
	}
}
