import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export const InfoCommand = {
	name: "info",
	description: "informations.",
	description_localizations: {
		fr: "Verification du ping.",
	},
	options: [
		{
			name: "hide",
			name_localizations: {
				fr: "masquer",
			},
			description: "Hides the output",
			description_localizations: {
				fr: "Masque(cacher) le résultat",
			},
			type: ApplicationCommandOptionType.Boolean,
		},
	],
	default_member_permissions: "0",
} as const;