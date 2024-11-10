import type { PingCommand } from "#slashyInformations/index.js";
import i18next from "i18next";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import { getLanguage } from "#utils/index.js";

export default class extends Command<typeof PingCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof PingCommand>): Promise<void> {
		const msg = await interaction.reply({
			content: "Pinging...",
			fetchReply: true,
			ephemeral: args.hide ?? true
		});
		const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
		const locale = getLanguage(interaction, defaultLanguage);

		const choices = [
			i18next.t("command.utility.ping.responses.nah", { lng: locale }), // if Ephemeral it says the message in their locale , If not eph.. show in english
			i18next.t("command.utility.ping.responses.okay", { lng: locale }),
			i18next.t("command.utility.ping.responses.alive", { lng: locale })
		];

		const response = choices[Math.floor(Math.random() * choices.length)];
		const latency = msg.createdTimestamp - interaction.client.ws.ping;

		await interaction.editReply({
			content: i18next.t("command.utility.ping.success", {
				response,
				bot_latency: latency,
				API_latency: Math.round(interaction.client.ws.ping),
				lng: locale
			})
		});
	}
}
