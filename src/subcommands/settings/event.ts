import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { updateEventSetting } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";

export async function setevent(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>["events"]): Promise<void> {
	const choice = interaction.options.getBoolean("choice")!;
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });

	const events = args.events!;
	const eventKeys = [
		"antiRaid",
		"botUpdate",
		"roleUpdate",
		"threadUpdate",
		"guildUpdate",
		"emojiUpdate",
		"memberUpdate",
		"inviteUpdate",
		"messageUpdate",
		"channelUpdate",
		"stickerUpdate",
		"webhookUpdate",
		"autoModeration",
		"integrationUpdate",
		"commandPermission",
		"stageInstanceUpdate",
		"guildScheduledUpdate"
	];

	for (const event of events) {
		if (eventKeys.includes(event)) {
			await updateEventSetting(interaction, guildSettings!, event, choice, interaction.locale);
		}
	}
}
