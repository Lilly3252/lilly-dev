import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const TimeoutCommand = {
	name: "timeout",
	description: "Timeout a member.",
	description_localizations: {
		fr: "Mute un membre.",
		ja: "メンバーをタイムアウトする。"
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "membre",
				ja: "ターゲット"
			},
			description: "The member to timeout.",
			description_localizations: {
				fr: "Le membre à mute.",
				ja: "タイムアウトするメンバー。"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.Integer,
			name: "duration",
			name_localizations: {
				fr: "durée",
				ja: "期間"
			},
			description: "The duration of the timeout in seconds.",
			description_localizations: {
				fr: "La durée du mute en secondes.",
				ja: "タイムアウトの期間（秒単位）。"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "reason",
			name_localizations: {
				fr: "raison",
				ja: "理由"
			},
			description: "The reason for the timeout.",
			description_localizations: {
				fr: "La raison du mute.",
				ja: "タイムアウトの理由。"
			},
			required: false
		},
		{
			type: ApplicationCommandOptionType.Boolean,
			name: "hide",
			name_localizations: {
				fr: "masquer",
				ja: "非表示"
			},
			description: "Hides the output.",
			description_localizations: {
				fr: "Masque le résultat.",
				ja: "出力を非表示にする。"
			},
			required: false
		}
	],
	default_member_permissions: "0"
} as const;
