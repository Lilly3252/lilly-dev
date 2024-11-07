import i18next from "i18next";
import { Quest } from "./types/functiontypes.js";

export const quests: Quest[] = [
	{
		questName: i18next.t("command.utility.pet.quest.quest_name.feed_pet", { lng: guild?.defaultLanguage }),
		description: i18next.t("command.utility.pet.quest.quest_description.feed_pet", { lng: guild?.defaultLanguage }),
		reward: "50 XP",
		expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
		progress: 0,
		completed: false
	},
	{
		questName: i18next.t("command.utility.pet.quest.quest_name.train_pet", { lng: guild?.defaultLanguage }),
		description: i18next.t("command.utility.pet.quest.quest_description.train_pet", { lng: guild?.defaultLanguage }),
		reward: "200 XP",
		expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		progress: 0,
		completed: false
	},
	{
		questName: i18next.t("command.utility.pet.quest.quest_name.pet_show", { lng: guild?.defaultLanguage }),
		description: i18next.t("command.utility.pet.quest.quest_description.pet_show", { lng: guild?.defaultLanguage }),
		reward: "500 XP",
		expiryDate: new Date("2024-12-25"),
		progress: 0,
		completed: false
	},
	{
		questName: i18next.t("command.utility.pet.quest.quest_name.walk_pet", { lng: guild?.defaultLanguage }),
		description: i18next.t("command.utility.pet.quest.quest_description.walk_pet", { lng: guild?.defaultLanguage }),
		reward: "30 XP",
		expiryDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
		progress: 0,
		completed: false
	},
	{
		questName: i18next.t("command.utility.pet.quest.quest_name.play_fetch_pet", { lng: guild?.defaultLanguage }),
		description: i18next.t("command.utility.pet.quest.quest_description.play_fetch_pet", { lng: guild?.defaultLanguage }),
		reward: "100 XP",
		expiryDate: new Date(Date.now() + 72 * 60 * 60 * 1000),
		progress: 0,
		completed: false
	},
	{
		questName: i18next.t("command.utility.pet.quest.quest_name.visit_the_vet", { lng: guild?.defaultLanguage }),
		description: i18next.t("command.utility.pet.quest.quest_description.visit_the_vet", { lng: guild?.defaultLanguage }),
		reward: "150 XP and a health boost",
		expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
		progress: 0,
		completed: false
	},
	{
		questName: i18next.t("command.utility.pet.quest.quest_name.teach_pet_trick", { lng: guild?.defaultLanguage }),
		description: i18next.t("command.utility.pet.quest.quest_description.teach_pet_trick", { lng: guild?.defaultLanguage }),
		reward: "250 XP",
		expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
		progress: 0,
		completed: false
	},
	{
		questName: i18next.t("command.utility.pet.quest.quest_name.pet_costume_contest", { lng: guild?.defaultLanguage }),
		description: i18next.t("command.utility.pet.quest.quest_description.pet_costume_contest", { lng: guild?.defaultLanguage }),
		reward: "300 XP",
		expiryDate: new Date("2024-10-31"),
		progress: 0,
		completed: false
	},
	{
		questName: i18next.t("command.utility.pet.quest.quest_name.pet_spa_day", { lng: guild?.defaultLanguage }),
		description: i18next.t("command.utility.pet.quest.quest_description.pet_spa_day", { lng: guild?.defaultLanguage }),
		reward: "100 XP and improved happiness",
		expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
		progress: 0,
		completed: false
	}
];
