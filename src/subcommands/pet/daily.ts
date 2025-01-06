import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";
export async function daily(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["daily"], guildID: string, userID: string): Promise<void> {
	const userToClaimDaily = await user.findOne({ userID: userID, guildID: guildID });
	if (!userToClaimDaily) {
		await interaction.reply(i18next.t("command.utility.pet.error.user_not_found", { lng: interaction.locale }));
		return;
	}

	const now = new Date();
	const lastDaily = userToClaimDaily.lastDaily ? new Date(userToClaimDaily.lastDaily) : null;
	const oneDay = 24 * 60 * 60 * 1000;

	if (lastDaily && now.getTime() - lastDaily.getTime() < oneDay) {
		await interaction.reply(i18next.t("command.utility.pet.error.daily_claimed", { lng: interaction.locale }));
		return;
	}

	const dailyReward = 50;
	userToClaimDaily.coins += dailyReward;
	userToClaimDaily.lastDaily = now;
	await userToClaimDaily.save();
	await interaction.reply(i18next.t("command.utility.pet.daily_reward", { dailyReward: dailyReward, lng: interaction.locale }));
}
