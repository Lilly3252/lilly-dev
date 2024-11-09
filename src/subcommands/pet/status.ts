import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { getLanguage } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";
export async function petstatus(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["status"], guildID: string, userID: string): Promise<void> {
	await interaction.deferReply({ ephemeral: args.hide ?? true });
	const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
	const locale = getLanguage(interaction, defaultLanguage);

	const database = await user.findOne({ userID: userID, guildID: guildID });

	if (!database?.pet?.petName) {
		await interaction.reply(i18next.t("command.utility.pet.error.no_pet", { lng: locale }));
		return;
	}

	await interaction.reply(
		i18next.t("command.utility.pet.status", {
			petName: database.pet.petName,
			petType: database.pet.petType,
			hunger: database.pet.hunger,
			happiness: database.pet.happiness,
			lng: locale
		})
	);
}
