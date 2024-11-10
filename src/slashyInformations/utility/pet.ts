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
	description_localizations: { fr: "Gérer votre animal de compagnie virtuel", ja: "仮想ペットを管理する" },
	options: [
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "adopt",
			description: "Adopt a new pet",
			description_localizations: { fr: "Adopter un nouvel animal de compagnie", ja: "新しいペットを養子にする" },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "petname",
					description: "The name of your pet",
					description_localizations: { fr: "Le nom de votre animal de compagnie", ja: "ペットの名前" },
					required: true
				},
				{
					type: ApplicationCommandOptionType.String,
					name: "pettype",
					description: "The type of pet",
					description_localizations: { fr: "Le type d'animal de compagnie", ja: "ペットの種類" },
					required: true,
					choices: [
						{ name: "Dog", name_localizations: { fr: "Chien", ja: "犬" }, value: "🐕 Dog" },
						{ name: "Cat", name_localizations: { fr: "Chat", ja: "猫" }, value: "🐈 Cat" },
						{ name: "Rabbit", name_localizations: { fr: "Lapin", ja: "ウサギ" }, value: "🐇 Rabbit" },
						{ name: "Bird", name_localizations: { fr: "Oiseau", ja: "鳥" }, value: "🐦 Bird" },
						{ name: "Fish", name_localizations: { fr: "Poisson", ja: "魚" }, value: "🐠 Fish" },
						{ name: "Hamster", name_localizations: { fr: "Hamster", ja: "ハムスター" }, value: "🐹 Hamster" },
						{ name: "Turtle", name_localizations: { fr: "Tortue", ja: "カメ" }, value: "🐢 Turtle" },
						{ name: "Guinea Pig", name_localizations: { fr: "Cochon d'Inde", ja: "モルモット" }, value: "🐹 Guinea Pig" },
						{ name: "Lizard", name_localizations: { fr: "Lézard", ja: "トカゲ" }, value: "🦎 Lizard" },
						{ name: "Snake", name_localizations: { fr: "Serpent", ja: "蛇" }, value: "🐍 Snake" },
						{ name: "Frog", name_localizations: { fr: "Grenouille", ja: "カエル" }, value: "🐸 Frog" },
						{ name: "Parrot", name_localizations: { fr: "Perroquet", ja: "オウム" }, value: "🦜 Parrot" },
						{ name: "Ferret", name_localizations: { fr: "Furet", ja: "フェレット" }, value: "🦨 Ferret" },
						{ name: "Hedgehog", name_localizations: { fr: "Hérisson", ja: "ハリネズミ" }, value: "🦔 Hedgehog" },
						{ name: "Chinchilla", name_localizations: { fr: "Chinchilla", ja: "チンチラ" }, value: "🐹 Chinchilla" }
					]
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示" },
					description: "Hides the output",
					description_localizations: { fr: "Masque le résultat", ja: "出力を非表示にする" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "feed",
			description: "Feed your pet",
			description_localizations: { fr: "Nourrir votre animal de compagnie", ja: "ペットに餌をあげる" },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "itemname",
					description: "The name of the item",
					description_localizations: { fr: "Le nom de l'article", ja: "アイテムの名前" },
					required: true,
					autocomplete: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示" },
					description: "Hides the output",
					description_localizations: { fr: "Masque le résultat", ja: "出力を非表示にする" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "play",
			description: "Play with your pet",
			description_localizations: { fr: "Jouer avec votre animal de compagnie", ja: "ペットと遊ぶ" },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "itemname",
					description: "The name of the item",
					description_localizations: { fr: "Le nom de l'article", ja: "アイテムの名前" },
					autocomplete: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示" },
					description: "Hides the output",
					description_localizations: { fr: "Masque le résultat", ja: "出力を非表示にする" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "status",
			description: "Check the status of your pet",
			description_localizations: { fr: "Vérifiez l'état de votre animal de compagnie", ja: "ペットの状態を確認する" },
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示" },
					description: "Hides the output",
					description_localizations: { fr: "Masque le résultat", ja: "出力を非表示にする" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "care",
			description: "Take care of your pet",
			description_localizations: { fr: "Prenez soin de votre animal de compagnie", ja: "ペットの世話をする" },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "itemname",
					description: "The name of the item used",
					description_localizations: { fr: "Le nom de l'article utilisé", ja: "使用するアイテムの名前" },
					required: false,
					autocomplete: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示" },
					description: "Hides the output",
					description_localizations: { fr: "Masque le résultat", ja: "出力を非表示にする" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.SubcommandGroup,
			name: "buy",
			description: "Buy an item from the shop",
			description_localizations: { fr: "Acheter un article dans la boutique", ja: "ショップからアイテムを購入する" },
			options: [
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "food",
					description: "Buy food items",
					description_localizations: { fr: "Acheter des articles alimentaires", ja: "食品を購入する" },
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "itemname",
							description: "The name of the item",
							description_localizations: { fr: "Le nom de l'article", ja: "アイテムの名前" },
							required: true,
							choices: foodChoices
						},
						{
							type: ApplicationCommandOptionType.Integer,
							name: "quantity",
							description: "The quantity of the item",
							description_localizations: { fr: "La quantité de l'article", ja: "アイテムの数量" },
							required: true
						},
						{
							type: ApplicationCommandOptionType.Boolean,
							name: "hide",
							name_localizations: { fr: "masquer", ja: "非表示" },
							description: "Hides the output",
							description_localizations: { fr: "Masque le résultat", ja: "出力を非表示にする" }
						}
					]
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "toy",
					description: "Buy toy items",
					description_localizations: {
						fr: "Acheter des jouets",
						ja: "おもちゃを買う"
					},
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "itemname",
							description: "The name of the item",
							description_localizations: {
								fr: "Le nom de l'article",
								ja: "アイテムの名前"
							},
							required: true,
							choices: toyChoices
						},
						{
							type: ApplicationCommandOptionType.Integer,
							name: "quantity",
							description: "The quantity of the item",
							description_localizations: {
								fr: "La quantité de l'article",
								ja: "アイテムの数量"
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
					]
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "medicine",
					description: "Buy medicine items",
					description_localizations: {
						fr: "Acheter des médicaments",
						ja: "薬を買う"
					},
					options: [
						{
							type: ApplicationCommandOptionType.String,
							name: "itemname",
							description: "The name of the item",
							description_localizations: {
								fr: "Le nom de l'article",
								ja: "アイテムの名前"
							},
							required: true,
							choices: medicineChoices
						},
						{
							type: ApplicationCommandOptionType.Integer,
							name: "quantity",
							description: "The quantity of the item",
							description_localizations: {
								fr: "La quantité de l'article",
								ja: "アイテムの数量"
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
					]
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "train",
			description: "Train your pet",
			description_localizations: {
				fr: "Entraîner votre animal de compagnie",
				ja: "ペットを訓練する"
			},
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "skill",
					description: "The skill to train your pet",
					description_localizations: {
						fr: "La compétence à entraîner",
						ja: "ペットを訓練するスキル"
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
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "battle",
			description: "Battle with another pet",
			description_localizations: {
				fr: "Combattre avec un autre animal de compagnie",
				ja: "他のペットと戦う"
			},
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "opponent",
					description: "The ID of the opponent",
					description_localizations: {
						fr: "L'ID de l'adversaire",
						ja: "対戦相手のID"
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
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "quest",
			description: "Start a quest",
			description_localizations: {
				fr: "Commencer une quête",
				ja: "クエストを開始する"
			},
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "new",
					description: "Is it a new quest?",
					description_localizations: {
						fr: "Est-ce une nouvelle quête?",
						ja: "新しいクエストですか？"
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.String,
					name: "questname",
					description: "The name of the quest",
					description_localizations: {
						fr: "Le nom de la quête",
						ja: "クエストの名前"
					},
					required: true,
					autocomplete: true
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
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "daily",
			description: "Get 50 coins! (available each 24h)",
			description_localizations: {
				fr: "Obtenez 50 pièces! (disponible toutes les 24h)",
				ja: "50コインを獲得！ (24時間ごとに利用可能)"
			},
			options: [
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
			]
		}
	],
	default_member_permissions: "0"
} as const;
