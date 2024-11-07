/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TagCommand } from "#slashyInformations/index.js";

import { Tag } from "#utils/types/functiontypes.js";
import * as TOML from "@ltd/j-toml";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, CommandMethod, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import { Collection } from "discord.js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const tags = new Collection<string, Tag>();

export default class extends Command<typeof TagCommand> {
	public override async autocomplete(interaction: InteractionParam<CommandMethod.Autocomplete>): Promise<void> {
		const fileExists = existsSync(`./dist/tags/${interaction.guildId}-tags.toml`);
		if (!fileExists) {
			writeFileSync(`./dist/tags/${interaction.guildId}-tags.toml`, "");
		}
		const file = readFileSync(`./dist/tags/${interaction.guildId}-tags.toml`);

		const tagParsed = TOML.parse(file, 1.0, "\n");
		const filtered = tags.filter((t) => t.keywords.toString().includes(interaction.options.getFocused() + ""));

		Object.keys(tagParsed).forEach((x) => {
			tags.set(x, tagParsed[x] as unknown as Tag);
		});

		return await interaction.respond(filtered.map((t) => ({ name: t.keywords.toString(), value: t.keywords.toString() })));
	}

	// slash command section
	public override async chatInput(interaction: InteractionParam): Promise<void> {
		const tagName = interaction.options.getString("query", true);

		const tag = tags.find((t) => t.keywords.toString() === tagName.toLowerCase());

		if (tag) {
			interaction.reply({ content: tag?.content });
		} else {
			//todo : i18n for the next line.
			interaction.reply({ content: "nothing fit the search", ephemeral: true });
		}
	}
}
