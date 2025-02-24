import { Client, Events } from "discord.js";
import { inject, injectable } from "tsyringe";

import { getLanguage } from "#utils/index.js";
import type { Command } from "@yuudachi/framework";
import { kCommands, logger, transformApplicationInteraction } from "@yuudachi/framework";
import type { Event } from "@yuudachi/framework/types";

@injectable()
export default class implements Event {
	public name = "Interaction handling";

	public event = Events.InteractionCreate as const;

	public constructor(
		public readonly client: Client<true>,
		@inject(kCommands) public readonly commands: Map<string, Command>
	) {}

	public async execute(): Promise<void> {
		this.client.on(this.event, async (interaction) => {
			const locale = "en-US";
			const effectiveLocale = locale ?? interaction.locale;
			if (!interaction.inCachedGuild()) {
				return;
			}

			if (interaction.isChatInputCommand()) {
				await interaction.deferReply({ ephemeral: interaction.options.getBoolean("hide") ?? true });
				const command = this.commands.get(interaction.commandName);

				logger.info(
					{ command: { name: interaction.commandName, type: interaction.type }, userId: interaction.user.id },
					`Executing ${interaction.isAutocomplete() ? "autocomplete" : "chatInput command"} ${interaction.commandName}`
				);
				const defaultLanguage = (interaction.options.getBoolean("hide") ?? true) ? undefined : "en-US";
				const locale = getLanguage(interaction, defaultLanguage);
				await command?.chatInput(interaction, transformApplicationInteraction(interaction.options.data), locale);
			}
			if (interaction.isModalSubmit()) {
				switch (interaction.customId) {
					case "characterCreate": {
						await interaction.reply({ content: "ok", ephemeral: true });
						const nameInputs = interaction.fields.getTextInputValue("nameInput");
						const hobbiesInputs = interaction.fields.getTextInputValue("hobbiesInput");
						console.log({ nameInputs, hobbiesInputs });
						break;
					}
				}
			}

			if (interaction.isAutocomplete()) {
				try {
					const command = this.commands.get(interaction.commandName);
					if (command) {
						await command.autocomplete(interaction, transformApplicationInteraction(interaction.options.data), effectiveLocale);
					}
				} catch {
					return interaction.respond([]);
				}
			}
		});
	}
}
