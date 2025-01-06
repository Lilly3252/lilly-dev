import type { SlowmodeCommand } from "#slashyInformations/index.js";
import { permission } from "#utils/index.js";
import i18next from "i18next";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";

export default class extends Command<typeof SlowmodeCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof SlowmodeCommand>): Promise<void> {
		const channel = args.channel ?? interaction.channel;

		if (!(await permission(interaction, "ManageChannels", interaction.locale))) {
			return;
		}

		if (channel.isTextBased()) {
			try {
				await channel.setRateLimitPerUser(args.time);
				await interaction.editReply({
					content: i18next.t("command.mod.slowmode.success", {
						channel: `${channel}`,
						time: `${args.time}`,
						lng: interaction.locale
					})
				});
			} catch (error) {
				console.error("Failed to set slowmode:", error);
				await interaction.editReply({
					content: i18next.t("command.common.errors.generic", { lng: interaction.locale })
				});
			}
		}
	}
}
