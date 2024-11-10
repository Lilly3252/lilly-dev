import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const PollCommand = {
	name: "poll",
	description: "Do a poll.",
	description_localizations: {
		fr: "Créer un sondage.",
		ja: "アンケートを作成する。"
	},
	options: [
		{
			type: ApplicationCommandOptionType.Number,
			name: "duration",
			name_localizations: {
				fr: "durée",
				ja: "期間"
			},
			description: "Duration of the poll (in seconds 1 = 1 hour , MAX = 168 (a week))",
			description_localizations: {
				fr: "Durée du sondage (en secondes, 1 = 1 heure, MAX = 168 (une semaine))",
				ja: "アンケートの期間（秒単位、1 = 1時間、最大 = 168（1週間））"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "question",
			name_localizations: {
				fr: "question",
				ja: "質問"
			},
			description: "Ask a question",
			description_localizations: {
				fr: "Poser une question",
				ja: "質問をする"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer1",
			name_localizations: {
				fr: "réponse1",
				ja: "回答1"
			},
			description: "Answer 1",
			description_localizations: {
				fr: "Réponse 1",
				ja: "回答1"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer2",
			name_localizations: {
				fr: "réponse2",
				ja: "回答2"
			},
			description: "Answer 2",
			description_localizations: {
				fr: "Réponse 2",
				ja: "回答2"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer3",
			name_localizations: {
				fr: "réponse3",
				ja: "回答3"
			},
			description: "Answer 3",
			description_localizations: {
				fr: "Réponse 3",
				ja: "回答3"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer4",
			name_localizations: {
				fr: "réponse4",
				ja: "回答4"
			},
			description: "Answer 4",
			description_localizations: {
				fr: "Réponse 4",
				ja: "回答4"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer5",
			name_localizations: {
				fr: "réponse5",
				ja: "回答5"
			},
			description: "Answer 5",
			description_localizations: {
				fr: "Réponse 5",
				ja: "回答5"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer6",
			name_localizations: {
				fr: "réponse6",
				ja: "回答6"
			},
			description: "Answer 6",
			description_localizations: {
				fr: "Réponse 6",
				ja: "回答6"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer7",
			name_localizations: {
				fr: "réponse7",
				ja: "回答7"
			},
			description: "Answer 7",
			description_localizations: {
				fr: "Réponse 7",
				ja: "回答7"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer8",
			name_localizations: {
				fr: "réponse8",
				ja: "回答8"
			},
			description: "Answer 8",
			description_localizations: {
				fr: "Réponse 8",
				ja: "回答8"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer9",
			name_localizations: {
				fr: "réponse9",
				ja: "回答9"
			},
			description: "Answer 9",
			description_localizations: {
				fr: "Réponse 9",
				ja: "回答9"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer10",
			name_localizations: {
				fr: "réponse10",
				ja: "回答10"
			},
			description: "Answer 10",
			description_localizations: {
				fr: "Réponse 10",
				ja: "回答10"
			}
		}
	],
	default_member_permissions: "0"
} as const;
