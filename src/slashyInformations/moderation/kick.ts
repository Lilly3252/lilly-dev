import { ApplicationCommandOptionType } from "discord-api-types/v10";
export const KickCommand = {
	name: "kick",
	description: "Kick a user.",
	description_localizations: {
		fr: "Kick un utilisateur",
		ja: "ユーザーをキックする"
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "target",
				ja: "ターゲット"
			},
			description: "Select a user to kick",
			description_localizations: {
				fr: "Sélectionner l'utilisateur à kick",
				ja: "キックするユーザーを選択する"
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
			description: "Reason of the kick",
			description_localizations: {
				fr: "Raison du kick",
				ja: "キックの理由"
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
