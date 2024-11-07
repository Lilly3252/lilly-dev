import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const SettingCommand = {
	name: "settings",
	description: "Show or add settings.",
	description_localizations: {
		fr: "Montrer ou ajouter des paramètres de guilde."
	},
	options: [
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "show",
			description: "Show settings from the guild.",
			description_localizations: {
				fr: "Montrer les paramètres de guilde."
			},
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: {
						fr: "masquer"
					},
					description: "Hides the output",
					description_localizations: {
						fr: "Masque(cacher) le résultat"
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "language",
			description: "Modify the default language of the bot.",
			description_localizations: {
				fr: "Modifier le language par default."
			},

			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "lng",
					name_localizations: {
						fr: "langues"
					},
					description: "Default language of the bot",
					description_localizations: {
						fr: "Language par default"
					},
					choices: [
						{
							name: "English",
							value: "en-US"
						},
						{
							name: "French",
							value: "fr-FR"
						},
						{
							name: "Japanese",
							value: "ja-JP"
						}
					]
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: {
						fr: "masquer"
					},
					description: "Hides the output",
					description_localizations: {
						fr: "Masque(cacher) le résultat"
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "audit_log",
			description: "Enable/disable audit logs",
			description_localizations: {
				fr: "activer/déactiver les logs serveur."
			},
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "choice",
					name_localizations: {
						fr: "choix"
					},
					description: "enable or disable the logs.",
					description_localizations: {
						fr: "activer ou déactiver les logs."
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: {
						fr: "masquer"
					},
					description: "Hides the output.",
					description_localizations: {
						fr: "Masque(cacher) le résultat."
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "channels",
			description: "Setup log and welcome channel",
			description_localizations: {
				fr: "activer/déactiver les logs serveur."
			},
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "channels",
					name_localizations: {
						fr: "channels"
					},
					description: "Select your channels.",
					description_localizations: {
						fr: "Sélectionnez vos channels."
					},
					choices: [
						{
							name: "Welcome Channel",
							value: "welcomechannel"
						},
						{
							name: "Mod Log",
							value: "modlog"
						}
					],
					required: true
				},
				{
					type: ApplicationCommandOptionType.Channel,
					name: "channel",
					name_localizations: {
						fr: "channel"
					},
					description: "select a channel.",
					description_localizations: {
						fr: "sélectionnez un channel."
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: {
						fr: "masquer"
					},
					description: "Hides the output.",
					description_localizations: {
						fr: "Masque(cacher) le résultat."
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "events",
			description: "Set all your events for logging purposes",
			description_localizations: {
				fr: "Configurer toute vos évènements pour les logs."
			},
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "events",
					name_localizations: {
						fr: "events"
					},
					description: "select your events.",
					description_localizations: {
						fr: "sélectionnez vos events."
					}
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: {
						fr: "masquer"
					},
					description: "Hides the output.",
					description_localizations: {
						fr: "Masque(cacher) le résultat."
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "restriction_roles",
			description: "Set all your restriction roles for the guild",
			description_localizations: {
				fr: "Configurer toute vos role de restriction pour cette guilde."
			},
			options: [
				{
					type: ApplicationCommandOptionType.Role,
					name: "role_id",
					name_localizations: {
						fr: "role_id"
					},
					description: "Select the role to assign.",
					description_localizations: {
						fr: "Sélectionnez le rôle à attribuer."
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.String,
					name: "role",
					name_localizations: {
						fr: "role"
					},
					description: "Select your restriction role type.",
					description_localizations: {
						fr: "Sélectionnez le type de rôle de restriction."
					},
					choices: [
						{
							name: "Embed",
							value: "embed"
						},
						{
							name: "Reaction",
							value: "reaction"
						},
						{
							name: "Voice",
							value: "voice"
						},
						{
							name: "Slash",
							value: "slash"
						},
						{
							name: "Poll",
							value: "poll"
						},
						{
							name: "Safe",
							value: "safe"
						}
					]
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: {
						fr: "masquer"
					},
					description: "Hides the output.",
					description_localizations: {
						fr: "Masque(cacher) le résultat."
					}
				}
			]
		}
	],
	default_member_permissions: "0"
} as const;
