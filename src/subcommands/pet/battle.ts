import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";
export async function battle(interaction: InteractionParam, _args: ArgsParam<typeof PetCommand>["battle"], guildID: string, userID: string, opponentID: string): Promise<void> {
	const opponent_database = await user.findOne({ userID: opponentID, guildID: guildID });
	const database = await user.findOne({ userID: userID, guildID: guildID });
	if (!database?.pet?.petName || !opponent_database?.pet?.petName) {
		await interaction.reply(i18next.t("command.utility.pet.error.battle_required", { lng: interaction.locale }));
		return;
	}
	const userPetPower = database.pet.level + database.pet.skills.length;
	const opponentPetPower = opponent_database.pet.level + opponent_database.pet.skills.length;

	if (userPetPower > opponentPetPower) {
		database.pet.health = Math.max(database.pet.health - 10, 0);
		opponent_database.pet.health = Math.max(opponent_database.pet.health - 20, 0);
		await database.save();
		await opponent_database.save();

		await interaction.reply(i18next.t("command.utility.pet.battle.win", { userPetName: database.pet.petName, opponentPetName: opponent_database.pet.petName, lng: interaction.locale }));
	} else if (userPetPower < opponentPetPower) {
		database.pet.health = Math.max(database.pet.health - 20, 0);
		opponent_database.pet.health = Math.max(opponent_database.pet.health - 10, 0);
		await database.save();
		await opponent_database.save();

		await interaction.reply(i18next.t("command.utility.pet.battle.lose", { userPetName: database.pet.petName, opponentPetName: opponent_database.pet.petName, lng: interaction.locale }));
	} else {
		database.pet.health = Math.max(database.pet.health - 15, 0);
		opponent_database.pet.health = Math.max(opponent_database.pet.health - 15, 0);
		await database.save();
		await opponent_database.save();

		await interaction.reply(i18next.t("command.utility.pet.battle.tie", { userPetName: database.pet.petName, opponentPetName: opponent_database.pet.petName, lng: interaction.locale }));
	}
}
