import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const SettingCommand = {
	name: "settings",
	description: "Show or add settings.",
	description_localizations: { fr: "Montrer ou ajouter des paramètres de guilde.", ja: "設定を表示または追加する。" },
	options: [
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "show",
			description: "Show settings from the guild.",
			description_localizations: { fr: "Montrer les paramètres de guilde.", ja: "ギルドの設定を表示する。" },
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示" },
					description: "Hides the output",
					description_localizations: { fr: "Masque(cacher) le résultat", ja: "出力を非表示にする" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "language",
			description: "Modify the default language of the bot.",
			description_localizations: { fr: "Modifier le langage par défaut.", ja: "ボットのデフォルトの言語を変更する。" },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "lng",
					name_localizations: { fr: "langue", ja: "言語" },
					description: "Default language of the bot",
					description_localizations: { fr: "Langue par défaut", ja: "ボットのデフォルトの言語" },
					choices: [
						{ name: "English", name_localizations: { fr: "Anglais", ja: "英語" }, value: "en-US" },
						{ name: "French", name_localizations: { fr: "Français", ja: "フランス語" }, value: "fr" },
						{ name: "Japanese", name_localizations: { fr: "Japonais", ja: "日本語" }, value: "ja" }
					]
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示" },
					description: "Hides the output",
					description_localizations: { fr: "Masque(cacher) le résultat", ja: "出力を非表示にする" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "audit_log",
			description: "Enable/disable audit logs",
			description_localizations: { fr: "Activer/désactiver les logs serveur.", ja: "監査ログを有効/無効にする" },
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "choice",
					name_localizations: { fr: "choix", ja: "選択" },
					description: "Enable or disable the logs.",
					description_localizations: { fr: "Activer ou désactiver les logs.", ja: "ログを有効または無効にする。" },
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示" },
					description: "Hides the output.",
					description_localizations: { fr: "Masque(cacher) le résultat。", ja: "出力を非表示にする。" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "channels",
			description: "Setup log and welcome channel",
			description_localizations: { fr: "Configurer les logs et le channel de bienvenue.", ja: "ログとウェルカムチャンネルを設定する。" },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "channels",
					name_localizations: { fr: "channels", ja: "チャンネル" },
					description: "Select your channels.",
					description_localizations: { fr: "Sélectionnez vos channels。", ja: "チャンネルを選択する。" },
					choices: [
						{ name: "Welcome Channel", name_localizations: { fr: "Channel de bienvenue", ja: "ウェルカムチャンネル" }, value: "welcomechannel" },
						{ name: "Mod Log", name_localizations: { fr: "Log des modérateurs", ja: "モデレーションログ" }, value: "modlog" }
					],
					required: true
				},
				{
					type: ApplicationCommandOptionType.Channel,
					name: "channel",
					name_localizations: { fr: "channel", ja: "チャンネル" },
					description: "Select a channel.",
					description_localizations: { fr: "Sélectionnez un channel.", ja: "チャンネルを選択する。" },
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示" },
					description: "Hides the output.",
					description_localizations: { fr: "Masque(cacher) le résultat。", ja: "出力を非表示にする。" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "events",
			description: "Set all your events for logging purposes",
			description_localizations: { fr: "Configurer tous vos évènements pour les logs。", ja: "ログのためにすべてのイベントを設定する。" },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "events",
					name_localizations: { fr: "évènements", ja: "イベント" },
					description: "Select your events.",
					description_localizations: { fr: "Sélectionnez vos évènements。", ja: "イベントを選択する。" }
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示" },
					description: "Hides the output.",
					description_localizations: { fr: "Masque(cacher) le résultat。", ja: "出力を非表示にする。" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "restriction_roles",
			description: "Set all your restriction roles for the guild",
			description_localizations: {
				fr: "Configurer tous vos rôles de restriction pour cette guilde.",
				ja: "ギルドのすべての制限役割を設定する。"
			},
			options: [
				{
					type: ApplicationCommandOptionType.Role,
					name: "role_id",
					name_localizations: {
						fr: "role_id",
						ja: "役割ID"
					},
					description: "Select the role to assign.",
					description_localizations: {
						fr: "Sélectionnez le rôle à attribuer.",
						ja: "割り当てる役割を選択する。"
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.String,
					name: "role",
					name_localizations: {
						fr: "rôle",
						ja: "役割"
					},
					description: "Select your restriction role type.",
					description_localizations: {
						fr: "Sélectionnez le type de rôle de restriction.",
						ja: "制限役割の種類を選択する。"
					},
					choices: [
						{
							name: "Embed",
							name_localizations: {
								fr: "Incorporer",
								ja: "埋め込み"
							},
							value: "embed"
						},
						{
							name: "Reaction",
							name_localizations: {
								fr: "Réaction",
								ja: "リアクション"
							},
							value: "reaction"
						},
						{
							name: "Voice",
							name_localizations: {
								fr: "Voix",
								ja: "ボイス"
							},
							value: "voice"
						},
						{
							name: "Slash",
							name_localizations: {
								fr: "Barre oblique",
								ja: "スラッシュ"
							},
							value: "slash"
						},
						{
							name: "Poll",
							name_localizations: {
								fr: "Sondage",
								ja: "投票"
							},
							value: "poll"
						},
						{
							name: "Safe",
							name_localizations: {
								fr: "Sûr",
								ja: "安全"
							},
							value: "safe"
						}
					]
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
						ja: "出力を非表示にする"
					}
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "restriction_roles",
					description: "Set all your restriction roles for the guild",
					description_localizations: {
						fr: "Configurer tous vos rôles de restriction pour cette guilde.",
						ja: "ギルドのすべての制限役割を設定する。"
					},
					options: [
						{
							type: ApplicationCommandOptionType.Role,
							name: "role_id",
							name_localizations: {
								fr: "role_id",
								ja: "役割ID"
							},
							description: "Select the role to assign.",
							description_localizations: {
								fr: "Sélectionnez le rôle à attribuer.",
								ja: "割り当てる役割を選択する。"
							},
							required: true
						},
						{
							type: ApplicationCommandOptionType.String,
							name: "role",
							name_localizations: {
								fr: "rôle",
								ja: "役割"
							},
							description: "Select your restriction role type.",
							description_localizations: {
								fr: "Sélectionnez le type de rôle de restriction.",
								ja: "制限役割の種類を選択する。"
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
								},
								{
									name: "Safe",
									name_localizations: {
										fr: "Sûr",
										ja: "安全"
									},
									value: "safe"
								}
							]
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
								ja: "出力を非表示にする。"
							}
						}
					]
				}
			]
		}
	],
	default_member_permissions: "0"
} as const;
