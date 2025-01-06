import guilds from "#database/models/guilds.js";
import { updateChannelSetting } from "#utils/index.js";
import { InteractionParam } from "@yuudachi/framework/types";

export async function channels(interaction: InteractionParam): Promise<void> {
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });
	const chan = interaction.options.getChannel("channel")!;
	const channels = interaction.options.getString("channels");

	switch (channels) {
		case "welcomechannel":
			if (chan.isTextBased()) {
				await updateChannelSetting(
					interaction,
					guildSettings!,
					chan,
					"welcomeChannelID",
					chan?.id ?? null,
					"command.config.events.channel_set",
					"command.config.events.channel_removed",
					interaction.locale
				);
			}

			break;
		case "modlog":
			if (chan.isTextBased()) {
				await updateChannelSetting(
					interaction,
					guildSettings!,
					chan,
					"logChannelID",
					chan?.id ?? null,
					"command.config.events.channel_set",
					"command.config.events.channel_removed",
					interaction.locale
				);
			}
			break;
	}
}
