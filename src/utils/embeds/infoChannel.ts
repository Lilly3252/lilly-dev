import guilds from "#database/models/guilds.js";
import { truncateEmbed } from "@yuudachi/framework";
import { InteractionParam } from "@yuudachi/framework/types";
import { APIEmbed, APIEmbedField, BaseGuildTextChannel, ChannelType, PermissionsBitField } from "discord.js";
import i18next from "i18next";

export async function channelInfo(channel: BaseGuildTextChannel, interaction: InteractionParam) {
	const guild = await guilds.findOne({ guildID: interaction.guild.id });
	const info: APIEmbedField = {
		name: `Channel`,
		value: i18next.t("info.channel.value", {
			id: channel.id,
			name: channel.name,
			nsfw: channel.nsfw,
			slowmode: channel.rateLimitPerUser ? channel.rateLimitPerUser + " Seconds" : "None",
			private: channel.permissionsFor(channel.guild.id)?.has(PermissionsBitField.Flags.ViewChannel) ? "False" : "True",
			topic: channel.topic ? channel.topic : "no topic",

			lng: guild?.defaultLanguage
		})
	};

	const embed: APIEmbed = {
		author: {
			name: "Channel Information"
		},
		thumbnail: { url: channel.guild.iconURL()! },
		fields: [info],
		footer: {
			text: `Type: ${ChannelType ? ChannelType[channel.type].replace(/([a-z])([A-Z])/g, "$1 $2") : "Cannot provide this information."}`
		}
	};

	return truncateEmbed(embed);
}
