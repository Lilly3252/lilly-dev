import guilds from "#database/models/guilds.js";
import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";
export async function petstatus(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["status"], guildID: string, userID: string): Promise<void> {
	const guild = await guilds.findOne({ guildID: interaction.guildId });
	const database = await user.findOne({ userID: userID, guildID: guildID });

	if (!database?.pet?.petName) {
		await interaction.reply(i18next.t("command.utility.pet.error.no_pet", { lng: guild?.defaultLanguage }));
		return;
	}

	await interaction.reply(
		i18next.t("command.utility.pet.status", {
			petName: database.pet.petName,
			petType: database.pet.petType,
			hunger: database.pet.hunger,
			happiness: database.pet.happiness,
			lng: guild?.defaultLanguage
		})
	);
}
