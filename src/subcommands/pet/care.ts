import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { MedicineItem, medicineItems } from "#utils/shop/medecine.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export async function care(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["care"], guildID: string, userID: string): Promise<void> {
	const database = await user.findOne({ userID: userID, guildID: guildID });

	const itemName = args.itemname;

	if (!database?.pet?.petName) {
		await interaction.reply(i18next.t("command.utility.pet.error.no_pet", { lng: interaction.locale }));
		return;
	}

	const spaQuest = database?.quests?.find((q) => q.questName === i18next.t("command.utility.pet.quest.quest_name.pet_spa_day", { lng: interaction.locale }));
	const vetQuest = database?.quests?.find((q) => q.questName === i18next.t("command.utility.pet.quest.quest_name.visit_the_vet", { lng: interaction.locale }));

	const item: MedicineItem = medicineItems.find((med) => med.itemName === itemName)!;

	if (item) {
		database.pet.health = Math.min(database.pet.health + item.healthBenefit, 100);

		if (itemName === i18next.t("command.utility.pet.quest.quest_name.pet_spa_day", { lng: interaction.locale }) && spaQuest && !spaQuest.completed) {
			spaQuest.progress = (spaQuest.progress || 0) + 10;
			if (spaQuest.progress >= 100) {
				spaQuest.completed = true;
				await interaction.reply(i18next.t("command.utility.pet.quest.completed", { questName: spaQuest.questName, reward: spaQuest.reward, lng: interaction.locale }));
			} else {
				await interaction.reply(i18next.t("command.utility.pet.quest.progress", { progress: spaQuest.progress, lng: interaction.locale }));
			}
		} else if (itemName === i18next.t("command.utility.pet.quest.quest_name.visit_the_vet", { lng: interaction.locale }) && vetQuest && !vetQuest.completed) {
			vetQuest.progress = (vetQuest.progress || 0) + 10;
			if (vetQuest.progress >= 100) {
				vetQuest.completed = true;
				await interaction.reply(i18next.t("command.utility.pet.quest.completed", { questName: vetQuest.questName, reward: vetQuest.reward, lng: interaction.locale }));
			} else {
				await interaction.reply(i18next.t("command.utility.pet.quest.progress", { progress: vetQuest.progress, lng: interaction.locale }));
			}
		} else {
			await interaction.reply(i18next.t("command.utility.pet.used_item", { itemName, health: database.pet.health, lng: interaction.locale }));
		}

		await database.save();
	} else {
		await interaction.reply(i18next.t("command.utility.pet.error.item_not_found", { lng: interaction.locale }));
	}
}
