/*import { PetCommand } from "#slashyInformations/index.js";

import guilds from "#database/models/guilds.js";
import user from "#database/models/users.js";
import { foodItems } from "#utils/shop/food.js";
import { medicineItems } from "#utils/shop/medecine.js";
import { toyItems } from "#utils/shop/toys.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export async function buyToy(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["buy"], guildID: string, userID: string): Promise<void> {
	const guild = await guilds.findOne({ guildID: interaction.guildId });
	const database = await user.findOne({ userID: userID, guildID: guildID });
	const shopItems = [...foodItems, ...medicineItems, ...toyItems];
	const quantityToy = args.toy.quantity;
	const toyitemNameToBuy = args.toy.itemname;
	const toyitemToBuy = shopItems.find((item) => item.itemName === toyitemNameToBuy);
	const existingItemToBuy = database?.pet?.inventory.toys.find((item) => item.itemName === toyitemNameToBuy);

	if (!toyitemToBuy) {
		await interaction.reply(i18next.t("command.utility.pet.error.item_not_found", { lng: guild?.defaultLanguage }));
		return;
	}

	if (!database) {
		await interaction.reply(i18next.t("command.utility.pet.error.user_not_found", { lng: guild?.defaultLanguage }));
		return;
	}

	if (database.coins < toyitemToBuy.price) {
		await interaction.reply(i18next.t("command.utility.pet.error.not_enough_coins", { lng: guild?.defaultLanguage }));
		return;
	}

	database.coins -= toyitemToBuy.price;
	if (existingItemToBuy) {
		existingItemToBuy.quantity += 1;
	} else {
		database?.pet?.inventory.toys.push({ itemName: toyitemNameToBuy, quantity: quantityToy });
	}

	await database.save();
	await interaction.reply(i18next.t("command.utility.pet.item_bought", { itemName: toyitemNameToBuy, lng: guild?.defaultLanguage }));
}
*/
