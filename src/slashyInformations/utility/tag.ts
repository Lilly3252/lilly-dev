import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const TagCommand = {
	name: "tag",
	name_localizations: {
		fr: "tag",
		ja: "タグ"
	},
	description: "Get a tag",
	description_localizations: {
		fr: "Obtenez un tag",
		ja: "タグを取得する"
	},
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "query",
			name_localizations: {
				fr: "tag",
				ja: "タグ"
			},
			description: "Tag",
			description_localizations: {
				fr: "Tag",
				ja: "タグ"
			},
			autocomplete: true,
			required: true
		}
	],
	default_member_permissions: "0"
} as const;
