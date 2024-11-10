import { ApplicationCommandOptionType } from "discord-api-types/v10";
export const RestrictCommand = {
	name: "restrict",
	description: "Restrict a member",
	description_localizations: {
		fr: "Restreindre un membre.",
		ja: "メンバーを制限する"
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "target",
				ja: "ターゲット"
			},
			description: "Select a user to restrict",
			description_localizations: {
				fr: "Sélectionner l'utilisateur à restreindre",
				ja: "制限するユーザーを選択する"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "restriction",
			name_localizations: {
				fr: "restriction",
				ja: "制限"
			},
			description: "Select a restriction",
			description_localizations: {
				fr: "Sélectionner une restriction",
				ja: "制限を選択する"
			},
			choices: [
				{
					name: "Embed",
					name_localizations: { fr: "Messages incorporés", ja: "埋め込みメッセージ" },
					value: "embed"
				},
				{
					name: "Reaction",
					name_localizations: { fr: "Réaction", ja: "リアクション" },
					value: "reaction"
				},
				{
					name: "Voice",
					name_localizations: { fr: "Connexions vocales", ja: "ボイス接続" },
					value: "voice"
				},
				{
					name: "Slash",
					name_localizations: { fr: "Commandes slash", ja: "スラッシュコマンド" },
					value: "slash"
				},
				{
					name: "Poll",
					name_localizations: { fr: "Messages de sondage", ja: "投票メッセージ" },
					value: "poll"
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
			description: "Reason of the restriction",
			description_localizations: {
				fr: "Raison de la restriction.",
				ja: "制限の理由"
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
