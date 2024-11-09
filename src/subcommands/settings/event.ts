import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { getLanguage, updateEventSetting } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";

export async function setevent(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>["events"]): Promise<void> {
	const choice = interaction.options.getBoolean("choice")!;
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });
	await interaction.deferReply({ ephemeral: args.hide ?? true });

	const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
	const locale = getLanguage(interaction, defaultLanguage);
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
			await updateEventSetting(interaction, guildSettings!, event, choice, locale);
		}
	}
}
