import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const BlacklistCommand = {
	// pingCommand / banCommand / settingCommand ...
	name: "blacklist",
	name_localizations: {
		fr: "liste-noire",
		ja: "ブラックリスト"
	},
	description: "Add a user to the blacklist.",
	description_localizations: {
		fr: "Ajouter un membre à la liste noire",
		ja: "ユーザーをブラックリストに追加します。"
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "target",
				ja: "ターゲット"
			},
			description: "User to be added",
			description_localizations: {
				fr: "Membre à ajouter",
				ja: "追加するユーザー"
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
