import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { getLanguage } from "#utils/index.js";
import { FoodItem, foodItems } from "#utils/shop/food.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";
export async function feed(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["care"], guildID: string, userID: string): Promise<void> {
	await interaction.deferReply({ ephemeral: args.hide ?? true });
	const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
	const locale = getLanguage(interaction, defaultLanguage);

	const database = await user.findOne({ userID: userID, guildID: guildID });
	const fooditem = args.itemname;

	if (database?.pet?.petName) {
		await interaction.reply(i18next.t("command.utility.pet.error.no_pet", { lng: locale }));

		return;
	}
	const foodItem: FoodItem = foodItems.find((food) => food.itemName === foodItem.itemName)!;
	if (fooditem === database?.pet?.inventory.food[0].itemName) {
		database!.pet!.hunger = Math.min(database!.pet!.hunger + foodItem.hungerBenefit, 100);
		database!.pet!.health = Math.min(database!.pet!.health + foodItem.healthBenefit, 100);
		await database!.save();
		await interaction.reply(i18next.t("command.utility.pet.fed_pet", { itemName: foodItem, hunger: database!.pet!.hunger, health: database!.pet!.health, lng: locale }));
	}
}
