import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { foodItems } from "#utils/shop/food.js";
import { medicineItems } from "#utils/shop/medecine.js";
import { toyItems } from "#utils/shop/toys.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";
export async function buy(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["buy"], guildID: string, userID: string): Promise<void> {
	const database = await user.findOne({ userID: userID, guildID: guildID });
	const shopItems = [...foodItems, ...medicineItems, ...toyItems];
	const action = interaction.options.getSubcommand();

	switch (action) {
		case "food": {
			const quantityFood = args.food.quantity;
			const fooditemNameToBuy = args.food.itemname;
			const fooditemToBuy = shopItems.find((item) => item.itemName === fooditemNameToBuy);
			const foodexistingItemToBuy = database?.pet?.inventory.food.find((item) => item.itemName === fooditemNameToBuy);

			if (!fooditemToBuy) {
				await interaction.reply(i18next.t("command.utility.pet.error.item_not_found", { lng: interaction.locale }));
				return;
			}

			if (!database) {
				await interaction.reply(i18next.t("command.utility.pet.error.user_not_found", { lng: interaction.locale }));
				return;
			}

			if (database.coins < fooditemToBuy.price) {
				await interaction.reply(i18next.t("command.utility.pet.error.not_enough_coins", { lng: interaction.locale }));
				return;
			}

			database.coins -= fooditemToBuy.price;
			if (foodexistingItemToBuy) {
				foodexistingItemToBuy.quantity += 1;
			} else {
				database?.pet?.inventory.food.push({ itemName: fooditemNameToBuy, quantity: quantityFood });
			}

			await database.save();
			await interaction.reply(i18next.t("command.utility.pet.item_bought", { itemName: fooditemToBuy, lng: interaction.locale }));
			break;
		}
		case "medecine": {
			const quantityMed = args.medicine.quantity;
			const meditemNameToBuy = args.medicine.itemname;
			const meditemToBuy = shopItems.find((item) => item.itemName === meditemNameToBuy);
			const medexistingItemToBuy = database?.pet?.inventory.medicine.find((item) => item.itemName === meditemNameToBuy);

			if (!meditemToBuy) {
				await interaction.reply(i18next.t("command.utility.pet.error.item_not_found", { lng: interaction.locale }));
				return;
			}

			if (!database) {
				await interaction.reply(i18next.t("command.utility.pet.error.user_not_found", { lng: interaction.locale }));
				return;
			}

			if (database.coins < meditemToBuy.price) {
				await interaction.reply(i18next.t("command.utility.pet.error.not_enough_coins", { lng: interaction.locale }));
				return;
			}

			database.coins -= meditemToBuy.price;
			if (medexistingItemToBuy) {
				medexistingItemToBuy.quantity += 1;
			} else {
				database?.pet?.inventory.medicine.push({ itemName: meditemNameToBuy, quantity: quantityMed });
			}

			await database.save();
			await interaction.reply(i18next.t("command.utility.pet.item_bought", { itemName: meditemNameToBuy, lng: interaction.locale }));
			break;
		}

		case "toy": {
			const quantityToy = args.toy.quantity;
			const toyitemNameToBuy = args.toy.itemname;
			const toyitemToBuy = shopItems.find((item) => item.itemName === toyitemNameToBuy);
			const existingItemToBuy = database?.pet?.inventory.toys.find((item) => item.itemName === toyitemNameToBuy);

			if (!toyitemToBuy) {
				await interaction.reply(i18next.t("command.utility.pet.error.item_not_found", { lng: interaction.locale }));
				return;
			}

			if (!database) {
				await interaction.reply(i18next.t("command.utility.pet.error.user_not_found", { lng: interaction.locale }));
				return;
			}

			if (database.coins < toyitemToBuy.price) {
				await interaction.reply(i18next.t("command.utility.pet.error.not_enough_coins", { lng: interaction.locale }));
				return;
			}

			database.coins -= toyitemToBuy.price;
			if (existingItemToBuy) {
				existingItemToBuy.quantity += 1;
			} else {
				database?.pet?.inventory.toys.push({ itemName: toyitemNameToBuy, quantity: quantityToy });
			}

			await database.save();
			await interaction.reply(i18next.t("command.utility.pet.item_bought", { itemName: toyitemNameToBuy, lng: interaction.locale }));
			break;
		}
	}
}
