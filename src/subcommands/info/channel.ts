import { InfoCommand } from "#slashyInformations/index.js";
import { channelInfo } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import { BaseGuildTextChannel } from "discord.js";
export async function channel(interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>["channel"]): Promise<void> {
	await interaction.deferReply({ ephemeral: args.hide ?? true });
	const channel = interaction.options.getChannel("channel") as BaseGuildTextChannel;
	await interaction.editReply({ embeds: [await channelInfo(channel, interaction)] });
}
