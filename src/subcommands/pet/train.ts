import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { getLanguage } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";
export async function train(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["train"], guildID: string, userID: string): Promise<void> {
	await interaction.deferReply({ ephemeral: args.hide ?? true });
	const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
	const locale = getLanguage(interaction, defaultLanguage);

	const database = await user.findOne({ userID: userID, guildID: guildID });

	const skill = args.skill;
	if (!database?.pet?.petName) {
		await interaction.reply(i18next.t("command.utility.pet.error.no_pet", { lng: locale }));
		return;
	}

	database.pet.skills = database.pet.skills || [];
	if (!database.pet.skills.includes(skill)) {
		database.pet.skills.push(skill);
		await database.save();
		await interaction.reply(i18next.t("command.utility.pet.skill_learned", { skill: skill, lng: locale }));
	} else {
		await interaction.reply(i18next.t("command.utility.pet.error.skill_known", { lng: locale }));
	}
}
