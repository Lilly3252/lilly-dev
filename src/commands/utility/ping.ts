import type { PingCommand } from "#slashyInformations/index.js";
import i18next from "i18next";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import guilds from "#database/models/guilds.js";

export default class extends Command<typeof PingCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof PingCommand>): Promise<void> {
		const guild = await guilds.findOne({ guildID: interaction.guildId });
		const msg = await interaction.reply({
			content: "Pinging...",
			fetchReply: true,
			ephemeral: args.hide ?? true
		});

		const choices = [
			i18next.t("command.utility.ping.responses.nah", { lng: guild?.defaultLanguage }),
			i18next.t("command.utility.ping.responses.okay", { lng: guild?.defaultLanguage }),
			i18next.t("command.utility.ping.responses.alive", { lng: guild?.defaultLanguage })
		];
		const response = choices[Math.floor(Math.random() * choices.length)];
		const latency = msg.createdTimestamp - interaction.createdTimestamp;

		await interaction.editReply({
			content: i18next.t("command.utility.ping.success", {
				response,
				bot_latency: latency,
				API_latency: Math.round(interaction.client.ws.ping),
				lng: guild?.defaultLanguage
			})
		});
	}
}
