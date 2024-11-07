import { InfoCommand } from "#slashyInformations/index.js";
import { bot, channel, role, server, user } from "#subcommands/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";

export default class extends Command<typeof InfoCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>): Promise<void> {
		const subCommand = interaction.options.getSubcommand();
		switch (subCommand) {
			case "user":
				await user(interaction, args.user);
				break;
			case "channel":
				await channel(interaction, args.channel);
				break;
			case "role":
				await role(interaction, args.role);
				break;
			case "bot":
				await bot(interaction, args);
				break;
			case "server":
				await server(interaction, args);
				break;
		}
	}
}
