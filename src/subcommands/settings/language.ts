import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { getLanguage } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export async function languages(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>["language"]): Promise<void> {
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });
	const language = args.lng;
	await interaction.deferReply({ ephemeral: args.hide ?? true });
	const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
	const locale = getLanguage(interaction, defaultLanguage);

	switch (language) {
		case "fr": {
			await guildSettings?.updateOne({ defaultLanguage: languages });
			interaction.editReply({
				content: i18next.t("command.config.events.defaultLanguage", { lng: "fr-FR", language: locale })
			});
			break;
		}
		case "ja": {
			await guildSettings?.updateOne({ defaultLanguage: languages });
			interaction.editReply({
				content: i18next.t("command.config.events.defaultLanguage", { lng: "ja-JP", language: locale })
			});
			break;
		}
		case "en-US": {
			await guildSettings?.updateOne({ defaultLanguage: languages });
			interaction.editReply({
				content: i18next.t("command.config.events.defaultLanguage", { lng: "en-US", language: locale })
			});
			break;
		}
	}
}
