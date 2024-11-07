import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export async function languages(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>["language"]): Promise<void> {
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });
	const languages = interaction.options.getString("lng");
	await interaction.deferReply({ ephemeral: args.hide ?? true });

	switch (languages) {
		case "fr-FR": {
			await guildSettings?.updateOne({ defaultLanguage: languages });
			interaction.editReply({
				content: i18next.t("command.config.events.defaultLanguage", { lng: "fr-FR", language: languages })
			});
			break;
		}
		case "ja-JP": {
			await guildSettings?.updateOne({ defaultLanguage: languages });
			interaction.editReply({
				content: i18next.t("command.config.events.defaultLanguage", { lng: "ja-JP", language: languages })
			});
			break;
		}
		case "en-US": {
			await guildSettings?.updateOne({ defaultLanguage: languages });
			interaction.editReply({
				content: i18next.t("command.config.events.defaultLanguage", { lng: "en-US", language: languages })
			});
			break;
		}
	}
}
