import { channelInfo } from "#utils/index.js";
import { InteractionParam } from "@yuudachi/framework/types";
import { BaseGuildTextChannel } from "discord.js";
export async function channel(interaction: InteractionParam): Promise<void> {
	const channel = interaction.options.getChannel("channel") as BaseGuildTextChannel;
	await interaction.editReply({ embeds: [await channelInfo(channel, interaction, interaction.locale)] });
}
