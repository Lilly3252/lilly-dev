import guilds from "#database/models/guilds.js";
import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { availablePets } from "#utils/shop/availablePets.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export async function adopt(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["adopt"], userID: string, guildID: string): Promise<void> {
	const database = await user.findOne({ userID: userID, guildID: guildID });
	const guild = await guilds.findOne({ guildID: interaction.guildId });
	const petName = args.petname;
	const petType = args.pettype;

	if (!petName || !petType) {
		await interaction.reply(i18next.t("command.utility.pet.error.provide_both", { lng: guild?.defaultLanguage }));
		return;
	}

	const selectedPet = availablePets.find((pet) => pet.petType.toLowerCase() === petType.toLowerCase());
	if (!selectedPet) {
		await interaction.reply(i18next.t("command.utility.pet.error.invalid_pet_type", { lng: guild?.defaultLanguage }));
		return;
	}
	if (database?.pet?.petName) {
		await interaction.reply(i18next.t("command.utility.pet.error.already_have_pet", { lng: guild?.defaultLanguage }));
		return;
	}

	await user.findOneAndUpdate(
		{ userID: userID, guildID: guildID },
		{
			pet: {
				petName,
				petType,
				hunger: selectedPet.defaultHunger,
				happiness: selectedPet.defaultHappiness,
				health: selectedPet.defaultHealth,
				lastFed: new Date(),
				lastPlayed: new Date(),
				skills: []
			}
		},
		{ upsert: true, new: true }
	);
	await interaction.reply(i18next.t("command.utility.pet.error.already_have_pet", { petType: petType, petName: petName, lng: guild?.defaultLanguage }));
}
