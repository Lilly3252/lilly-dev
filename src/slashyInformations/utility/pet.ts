import { foodItems } from "#utils/shop/food.js";
import { medicineItems } from "#utils/shop/medecine.js";
import { toyItems } from "#utils/shop/toys.js";
import { ApplicationCommandOptionType } from "discord.js";

const medicineChoices = medicineItems.map((item) => ({
	name: `${item.itemName} - Price: $${item.price}, Health: ${item.healthBenefit}`,
	value: item.itemName
}));

const foodChoices = foodItems.map((item) => ({
	name: `${item.itemName} - Price: $${item.price}, Health: ${item.healthBenefit}, Hunger: ${item.hungerBenefit}`,
	value: item.itemName
}));

const toyChoices = toyItems.map((item) => ({
	name: `${item.itemName} - Price: $${item.price}`,
	value: item.itemName
}));

export const PetCommand = {
	name: "pet",
	description: "Manage your virtual pet",
	options: [
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "adopt",
			description: "Adopt a new pet",
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "petname",
					description: "The name of your pet",
					required: true
				},
				{
					type: ApplicationCommandOptionType.String,
					name: "pettype",
					description: "The type of pet",
					required: true,
					choices: [
						{ name: "Dog", value: "🐕 Dog" },
						{ name: "Cat", value: "🐈 Cat" },
						{ name: "Rabbit", value: "🐇 Rabbit" },
						{ name: "Bird", value: "🐦 Bird" },
						{ name: "Fish", value: "🐠 Fish" },
						{ name: "Hamster", value: "🐹 Hamster" },
						{ name: "Turtle", value: "🐢 Turtle" },
						{ name: "Guinea Pig", value: "🐹 Guinea Pig" },
						{ name: "Lizard", value: "🦎 Lizard" },
						{ name: "Snake", value: "🐍 Snake" },
						{ name: "Frog", value: "🐸 Frog" },
						{ name: "Parrot", value: "🦜 Parrot" },
						{ name: "Ferret", value: "🦨 Ferret" },
						{ name: "Hedgehog", value: "🦔 Hedgehog" },
						{ name: "Chinchilla", value: "🐹 Chinchilla" }
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
			name: "feed",
			description: "Feed your pet",
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "itemname",
					description: "The name of the item",
					required: true,
					autocomplete: true
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
			name: "play",
			description: "Play with your pet",
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "itemname",
					description: "The name of the item",
					autocomplete: true
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
			name: "status",
			description: "Check the status of your pet",
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
			name: "care",
			description: "Take care of your pet",
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "itemname",
					description: "The name of the item used",
					required: false,
					autocomplete: true
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
			type: ApplicationCommandOptionType.SubcommandGroup,
			name: "buy",
			description: "Buy an item from the shop",
			options: [
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "food",
					description: "Buy food items",
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "itemname",
							description: "The name of the item",
							required: true,
							choices: foodChoices
						},
						{
							type: ApplicationCommandOptionType.Integer,
							name: "quantity",
							description: "The quantity of the item",
							required: true
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
					name: "toy",
					description: "Buy toy items",
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "itemname",
							description: "The name of the item",
							required: true,
							choices: toyChoices
						},
						{
							type: ApplicationCommandOptionType.Integer,
							name: "quantity",
							description: "The quantity of the item",
							required: true
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
					name: "medicine",
					description: "Buy medicine items",
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "itemname",
							description: "The name of the item",
							required: true,
							choices: medicineChoices
						},
						{
							type: ApplicationCommandOptionType.Integer,
							name: "quantity",
							description: "The quantity of the item",
							required: true
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
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "train",
			description: "Train your pet",
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "skill",
					description: "The skill to train your pet",
					required: true
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
			name: "battle",
			description: "Battle with another pet",
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "opponent",
					description: "The ID of the opponent",
					required: true
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
			name: "quest",
			description: "Start a quest",
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "new",
					description: "is it a new quest?",
					required: true
				},
				{
					type: ApplicationCommandOptionType.String,
					name: "questname",
					description: "The name of the quest",
					required: true,
					autocomplete: true
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
			name: "daily",
			description: "Get 50 coins! (available each 24h)",
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
		}
	],
	default_member_permissions: "0"
} as const;
