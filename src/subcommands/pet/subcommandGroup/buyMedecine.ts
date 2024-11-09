/*import { PetCommand } from "#slashyInformations/index.js";

import guilds from "#database/models/guilds.js";
import user from "#database/models/users.js";
import { foodItems } from "#utils/shop/food.js";
import { medicineItems } from "#utils/shop/medecine.js";
import { toyItems } from "#utils/shop/toys.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";
export async function buyMedecine(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["buy"], guildID: string, userID: string): Promise<void> {
	const guild = await guilds.findOne({ guildID: interaction.guildId });
	const database = await user.findOne({ userID: userID, guildID: guildID });
	const shopItems = [...foodItems, ...medicineItems, ...toyItems];
	const quantityMed = args.medicine.quantity;
	const meditemNameToBuy = args.medicine.itemname;
	const meditemToBuy = shopItems.find((item) => item.itemName === meditemNameToBuy);
	const medexistingItemToBuy = database?.pet?.inventory.medicine.find((item) => item.itemName === meditemNameToBuy);

	if (!meditemToBuy) {
		await interaction.reply(i18next.t("command.utility.pet.error.item_not_found", { lng: guild?.defaultLanguage }));
		return;
	}

	if (!database) {
		await interaction.reply(i18next.t("command.utility.pet.error.user_not_found", { lng: guild?.defaultLanguage }));
		return;
	}

	if (database.coins < meditemToBuy.price) {
		await interaction.reply(i18next.t("command.utility.pet.error.not_enough_coins", { lng: guild?.defaultLanguage }));
		return;
	}

	database.coins -= meditemToBuy.price;
	if (medexistingItemToBuy) {
		medexistingItemToBuy.quantity += 1;
	} else {
		database?.pet?.inventory.medicine.push({ itemName: meditemNameToBuy, quantity: quantityMed });
	}

	await database.save();
	await interaction.reply(i18next.t("command.utility.pet.item_bought", { itemName: meditemNameToBuy, lng: guild?.defaultLanguage }));
}
*/
