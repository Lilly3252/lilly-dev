import guilds from "#database/models/guilds.js";
import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { checkLevelUp } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";
export async function play(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["play"], guildID: string, userID: string): Promise<void> {
	const guild = await guilds.findOne({ guildID: interaction.guildId });
	const database = await user.findOne({ userID: userID, guildID: guildID });
	const items = args.itemname;

	if (database?.pet?.petName) {
		await interaction.reply(i18next.t("command.utility.pet.error.no_pet_play", { lng: guild?.defaultLanguage }));
		return;
	}
	const toy = database?.pet?.inventory.toys.find((toy) => toy.itemName === items);
	if (toy!.itemName === database?.pet?.inventory.toys[0].itemName) {
		database.pet.happiness = Math.min(database.pet.happiness + 20, 100);
		database.pet.experience += 10;
		await checkLevelUp(database, interaction);
		database.pet.lastPlayed = new Date();
		await database.save();
		await interaction.reply(i18next.t("command.utility.pet.played_with_pet", { petName: database.pet.petName, happiness: database.pet.happiness }));
	}
}
