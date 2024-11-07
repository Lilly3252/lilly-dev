import guilds from "#database/models/guilds.js";
import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { quests } from "#utils/quests.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";
export async function quest(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["quest"], guildID: string, userID: string): Promise<void> {
	const guild = await guilds.findOne({ guildID: interaction.guildId });
	const database = await user.findOne({ userID: userID, guildID: guildID });
	const questName = args.questname;
	if (!database?.pet?.petName) {
		await interaction.reply(i18next.t("command.utility.pet.error.no_pet", { lng: guild?.defaultLanguage }));

		return;
	}

	database.quests = database.quests || [];
	const quest = database.quests.find((q) => q.questName === questName);
	if (quest) {
		if (quest.completed) {
			await interaction.reply(i18next.t("command.utility.pet.error.quest_completed", { lng: guild?.defaultLanguage }));
		} else if (quest.expiryDate && new Date() > quest.expiryDate) {
			await interaction.reply(i18next.t("command.utility.pet.error.quest_expired", { lng: guild?.defaultLanguage }));
		} else {
			quest.progress += 10;
			if (quest.progress >= 100) {
				quest.completed = true;
				await database.save();
				await interaction.reply(i18next.t("command.utility.pet.quest.completed", { questName: questName, reward: quest.reward, lng: guild?.defaultLanguage }));
			}
		}
	} else {
		const newQuest = quests.find((q) => q.questName === questName);
		if (newQuest) {
			const questToAdd = {
				questName: newQuest.questName,
				completed: newQuest.completed || false,
				progress: newQuest.progress || 0,
				reward: newQuest.reward || "",
				expiryDate: newQuest.expiryDate || new Date()
			};
			database.quests.push(questToAdd);
			await database.save();
			await interaction.reply(i18next.t("command.utility.pet.quest.started", { questName: questName, lng: guild?.defaultLanguage }));
		} else {
			await interaction.reply(i18next.t("command.utility.pet.error.quest_not_exist", { lng: guild?.defaultLanguage }));
		}
	}
}
