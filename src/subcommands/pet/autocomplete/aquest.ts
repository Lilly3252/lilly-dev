import user from "#database/models/users.js";
import { quests } from "#utils/quests.js";
import { CommandMethod, InteractionParam } from "@yuudachi/framework/types";

/**
 * Handles the autocomplete interaction for quests.
 *
 * @param interaction - The interaction object from Discord
 * @param guildID - The ID of the guild where the command was issued
 * @param userID - The ID of the user who issued the command
 * @returns Promise<void>
 */

export async function aquest(interaction: InteractionParam<CommandMethod.Autocomplete>, guildID: string, userID: string): Promise<void> {
	const database = await user.findOne({ userID: userID, guildID: guildID });
	const incompleteQuest = database?.quests?.find((q) => !q.completed);
	if (incompleteQuest) {
		const questinventory = database?.quests;
		await interaction.respond(questinventory!.map((t) => ({ name: t.questName.toString(), value: t.questName.toString() })));
	} else {
		await interaction.respond((await quests(interaction)).map((t) => ({ name: t.questName.toString(), value: t.questName.toString() })));
	}
}
