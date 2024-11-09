import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { getLanguage, updateChannelSetting } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";

export async function channels(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>["channels"]): Promise<void> {
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });
	const chan = interaction.options.getChannel("channel")!;
	const channels = interaction.options.getString("channels");
	await interaction.deferReply({ ephemeral: args.hide ?? true });

	const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
	const locale = getLanguage(interaction, defaultLanguage);
	switch (channels) {
		case "welcomechannel":
			if (chan.isTextBased()) {
				await updateChannelSetting(interaction, guildSettings!, chan, "welcomeChannelID", chan?.id ?? null, "command.config.events.channel_set", "command.config.events.channel_removed", locale);
			}

			break;
		case "modlog":
			if (chan.isTextBased()) {
				await updateChannelSetting(interaction, guildSettings!, chan, "logChannelID", chan?.id ?? null, "command.config.events.channel_set", "command.config.events.channel_removed", locale);
			}
			break;
	}
}
