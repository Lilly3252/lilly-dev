import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const UnbanCommand = {
	name: "unban",
	description: "Unban a user.",
	description_localizations: {
		fr: "Révoquer un ban.",
		ja: "ユーザーのバンを解除する。"
	},
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "id",
			name_localizations: {
				fr: "id",
				ja: "ID"
			},
			description: "Put an ID",
			description_localizations: {
				fr: "Inscrire un ID",
				ja: "IDを入力する"
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
			description: "Reason for revoking the ban",
			description_localizations: {
				fr: "Raison pour révoquer le ban",
				ja: "バン解除の理由"
			}
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
