import type { SlowmodeCommand } from "#slashyInformations/index.js";
import { permission } from "#utils/index.js";
import i18next from "i18next";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import guilds from "#database/models/guilds.js";

export default class extends Command<typeof SlowmodeCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof SlowmodeCommand>): Promise<void> {
		const guild = await guilds.findOne({ guildID: interaction.guildId });
		const channel = args.channel ?? interaction.channel;

		await interaction.deferReply({ ephemeral: args.hide ?? true });

		if (!(await permission(interaction, "ManageChannels"))) {
			return;
		}

		if (channel.isTextBased()) {
			try {
				await channel.setRateLimitPerUser(args.time);
				await interaction.editReply({
					content: i18next.t("command.mod.slowmode.success", {
						channel: `${channel}`,
						time: `${args.time}`,
						lng: guild?.defaultLanguage
					})
				});
			} catch (error) {
				console.error("Failed to set slowmode:", error);
				await interaction.editReply({
					content: i18next.t("command.common.errors.generic", { lng: guild?.defaultLanguage })
				});
			}
		}
	}
}
