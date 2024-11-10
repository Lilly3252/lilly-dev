import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const LockCommand = {
	name: "lock",
	description: "Lock a channel",
	description_localizations: {
		fr: "verrouille un canaux de discussion",
		ja: "チャンネルをロックする"
	},
	options: [
		{
			name: "activate",
			name_localizations: {
				fr: "activation",
				ja: "アクティベーション"
			},
			description: "Lock this channel?",
			description_localizations: {
				fr: "verrouiller ce canaux ?",
				ja: "このチャンネルをロックしますか？"
			},
			type: ApplicationCommandOptionType.Boolean,
			required: true
		},
		{
			name: "hide",
			name_localizations: {
				fr: "masquer",
				ja: "非表示"
			},
			description: "Hides the output",
			description_localizations: {
				fr: "Masque(cacher) le résultat",
				ja: "出力を非表示にする"
			},
			type: ApplicationCommandOptionType.Boolean
		}
	],
	default_member_permissions: "0"
} as const;
