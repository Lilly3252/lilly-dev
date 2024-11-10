import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const BanCommand = {
	name: "ban",
	description: "Ban a member",
	description_localizations: {
		fr: "Bannissement d'un membre"
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "target",
				ja: "ターゲット"
			},
			description: "Select a user to ban.",
			description_localizations: {
				fr: "Sélectionner l'utilisateur à bannir.",
				ja: "BANするユーザーを選択してください。"
			},
			required: true
		},

		{
			type: ApplicationCommandOptionType.Number,
			name: "days",
			name_localizations: {
				fr: "jours",
				ja: "日数"
			},
			description: "number of days that you want to delete.(messages)",
			description_localizations: {
				fr: "nombre de jours que vous voulez supprimer.(messages)",
				ja: "削除する日数。（メッセージ）"
			},
			choices: [
				{
					name: "0 day",
					name_localizations: {
						fr: "0 jour",
						ja: "0日"
					},
					value: 0
				},
				{
					name: "1 day",
					name_localizations: { fr: "1 jour", ja: "1日" },
					value: 86400
				},
				{
					name: "2 days",
					name_localizations: { fr: "2 jours", ja: "2日" },
					value: 172800
				},
				{
					name: "3 days",
					name_localizations: { fr: "3 jours", ja: "3日" },
					value: 259200
				},
				{
					name: "4 days",
					name_localizations: { fr: "4 jours", ja: "4日" },
					value: 345600
				},
				{
					name: "5 days",
					name_localizations: { fr: "5 jours", ja: "5日" },
					value: 432000
				},
				{
					name: "6 days",
					name_localizations: { fr: "6 jours", ja: "6日" },
					value: 518400
				},
				{
					name: "7 days",
					name_localizations: { fr: "7 jours", ja: "7日" },
					value: 604800
				}
			],
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "reason",
			name_localizations: {
				fr: "raison",
				ja: "理由"
			},
			description: "Reason of the ban.",
			description_localizations: {
				fr: "Raison du ban.",
				ja: "BANの理由。"
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
			description: "Hides the output.",
			description_localizations: {
				fr: "Masque(cacher) le résultat.",
				ja: "出力を非表示にします。"
			}
		}
	],
	default_member_permissions: "0"
} as const;
