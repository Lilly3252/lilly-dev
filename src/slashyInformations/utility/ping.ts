import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const PingCommand = {
	name: "ping",
	description: "Check ping.",
	description_localizations: {
		fr: "Vérification du ping.",
		ja: "ピングの確認。"
	},
	options: [
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
