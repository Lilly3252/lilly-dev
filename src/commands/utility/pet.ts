import { PetCommand } from "#slashyInformations/utility/pet.js";
import { acare, adopt, afeed, aplay, battle, buy, care, daily, feed, petstatus, play, quest, train } from "#subcommands/index.js";
import { aquest } from "#subcommands/pet/autocomplete/aquest.js";

import { Command } from "@yuudachi/framework";
import { ArgsParam, CommandMethod, InteractionParam } from "@yuudachi/framework/types";

export default class extends Command<typeof PetCommand> {
	public override async autocomplete(interaction: InteractionParam<CommandMethod.Autocomplete>): Promise<void> {
		const interactions = interaction.options.getSubcommand();
		const userID = interaction.user.id;
		const guildID = interaction.guildId;

		switch (interactions) {
			case "play":
				await aplay(interaction, guildID, userID);
				break;
			case "feed":
				await afeed(interaction, guildID, userID);
				break;
			case "care":
				await acare(interaction, guildID, userID);
				break;
			case "quest":
				await aquest(interaction, guildID, userID);
				break;
		}
	}

	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>): Promise<void> {
		const action = interaction.options.getSubcommand();
		const userID = interaction.user.id;
		const guildID = interaction.guildId;

		switch (action) {
			case "adopt":
				await adopt(interaction, args.adopt, userID, guildID);
				break;

			case "feed":
				await feed(interaction, args.feed, guildID, userID);
				break;

			case "play":
				await play(interaction, args.play, guildID, userID);
				break;

			case "status":
				await petstatus(interaction, args.status, guildID, userID);
				break;
			case "buy":
				await buy(interaction, args.buy, guildID, userID);
				break;

			case "daily":
				await daily(interaction, args.daily, guildID, userID);
				break;

			case "train":
				await train(interaction, args.train, guildID, userID);
				break;

			case "battle": {
				const opponentID = args.battle.opponent;
				await battle(interaction, args.battle, guildID, userID, opponentID);
				break;
			}

			case "care":
				await care(interaction, args.care, guildID, userID);
				break;

			case "quest":
				await quest(interaction, args.quest, guildID, userID);
				break;

			default:
				await interaction.reply("Invalid action.");
				break;
		}
	}
}
