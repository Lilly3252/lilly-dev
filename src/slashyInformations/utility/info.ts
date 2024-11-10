import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const InfoCommand = {
	name: "info",
	description: "Informations.",
	description_localizations: {
		fr: "Informations.",
		ja: "情報。"
	},
	options: [
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "user",
			description: "Show user info.",
			description_localizations: {
				fr: "Montre les infos de l'utilisateur choisi.",
				ja: "ユーザー情報を表示。"
			},
			options: [
				{
					type: ApplicationCommandOptionType.User,
					name: "target",
					name_localizations: {
						fr: "cible",
						ja: "ターゲット"
					},
					description: "Get the member you want information from.",
					description_localizations: {
						fr: "Afficher le membre dont vous voulez les informations.",
						ja: "情報を取得したいメンバー。"
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet",
						ja: "詳細"
					},
					description: "Show complete information",
					description_localizations: {
						fr: "Montre toutes les informations",
						ja: "完全な情報を表示する"
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
						fr: "Masque le résultat",
						ja: "出力を非表示にする"
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "channel",
			description: "Show channel info.",
			description_localizations: {
				fr: "Montre les infos du channel choisi.",
				ja: "チャンネル情報を表示。"
			},
			options: [
				{
					type: ApplicationCommandOptionType.Channel,
					name: "channel",
					name_localizations: {
						fr: "channel",
						ja: "チャンネル"
					},
					description: "Choose the channel",
					description_localizations: {
						fr: "Sélectionner le channel",
						ja: "チャンネルを選択する"
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet",
						ja: "詳細"
					},
					description: "Show complete information",
					description_localizations: {
						fr: "Montre toutes les informations",
						ja: "完全な情報を表示する"
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
						fr: "Masque le résultat",
						ja: "出力を非表示にする"
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "role",
			description: "Information about a role in the guild",
			description_localizations: {
				fr: "Informations à propos d'un rôle dans la guilde",
				ja: "ギルド内の役割に関する情報"
			},
			options: [
				{
					type: ApplicationCommandOptionType.Role,
					name: "role",
					name_localizations: {
						fr: "role",
						ja: "役割"
					},
					description: "Select a role.",
					description_localizations: {
						fr: "Sélectionner un rôle.",
						ja: "役割を選択する。"
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet",
						ja: "詳細"
					},
					description: "Show complete information",
					description_localizations: {
						fr: "Montre toutes les informations",
						ja: "完全な情報を表示する"
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
						fr: "Masque le résultat",
						ja: "出力を非表示にする"
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "bot",
			description: "See bot's info",
			description_localizations: {
				fr: "Voir les informations du bot.",
				ja: "ボットの情報を表示。"
			},
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet",
						ja: "詳細"
					},
					description: "Show complete information",
					description_localizations: {
						fr: "Montre toutes les informations",
						ja: "完全な情報を表示する"
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
						fr: "Masque le résultat",
						ja: "出力を非表示にする"
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "server",
			description: "See server info",
			description_localizations: {
				fr: "Voir les informations du serveur.",
				ja: "サーバーの情報を表示。"
			},
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet",
						ja: "詳細"
					},
					description: "Show complete information",
					description_localizations: {
						fr: "Montre toutes les informations",
						ja: "完全な情報を表示する"
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
						fr: "Masque le résultat",
						ja: "出力を非表示にする"
					}
				}
			]
		}
	],
	default_member_permissions: "0"
} as const;
