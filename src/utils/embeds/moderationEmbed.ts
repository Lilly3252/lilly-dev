import guilds from "#database/models/guilds.js";
import { RestrictCommand } from "#slashyInformations/index.js";
import { truncateEmbed } from "@yuudachi/framework";
import { ArgsParam } from "@yuudachi/framework/types";
import { APIEmbed, APIEmbedField, ChatInputCommandInteraction } from "discord.js";
import i18next from "i18next";

export async function moderationEmbed(interaction: ChatInputCommandInteraction, args: ArgsParam<typeof RestrictCommand>) {
	const guild = await guilds.findOne({ guildID: interaction.guild?.id });
	const descriptions: APIEmbedField = {
		name: i18next.t("mod.embed.info.name", {
			name: args.target.member!.displayName,
			id: args.target.member!.id
		}),
		value: i18next.t("mod.embed.info.value", {
			action: args.restriction,
			reason: args.reason
		})
	};

	const embed: APIEmbed = {
		author: {
			name: `${interaction.user.displayName} (${interaction.user.id})`
		},
		fields: [descriptions],
		footer: {
			text: i18next.t("")
		}
	};

	return truncateEmbed(embed);
}
