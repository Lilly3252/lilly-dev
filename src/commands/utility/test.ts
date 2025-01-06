import "reflect-metadata";
import type { TestCommand } from "#slashyInformations/index.js";
import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";

export default class extends Command<typeof TestCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof TestCommand>): Promise<void> {
		// Add your command logic here
	}
}
