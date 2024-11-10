import { ApplicationCommandOptionType } from "discord-api-types/v10";
import { ChannelType } from "discord.js";

export const SlowmodeCommand = {
	name: "slowmode",
	description: "Enabling a slowmode on the current channel.",
	description_localizations: {
		fr: "Instaurer un slowmode sur le channel courant.",
		ja: "現在のチャンネルでスローモードを有効にする。"
	},
	options: [
		{
			type: ApplicationCommandOptionType.Channel,
			name: "channel",
			name_localizations: {
				fr: "channel",
				ja: "チャンネル"
			},
			description: "Channel for the slowmode",
			description_localizations: {
				fr: "Channel pour le slowmode",
				ja: "スローモードのチャンネル"
			},
			channel_types: [ChannelType.GuildText, ChannelType.GuildVoice],
			required: true
		},
		{
			type: ApplicationCommandOptionType.Number,
			name: "time",
			name_localizations: {
				fr: "temps",
				ja: "時間"
			},
			description: "Time of the slowmode (in seconds)",
			description_localizations: {
				fr: "Temps du slowmode (en secondes)",
				ja: "スローモードの時間（秒単位）"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.Boolean,
			name: "hide",
			name_localizations: {
				fr: "masquer",
				ja: "非表示"
			},
			description: "Hides the output",
			description_localizations: {
				fr: "Masque(cacher) le résultat",
				ja: "出力を非表示にする"
			}
		}
	],
	default_member_permissions: "0"
} as const;
