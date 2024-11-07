import guilds from "#database/models/guilds.js";
import { InfoCommand } from "#slashyInformations/index.js";
import { formatBytes } from "#utils/index.js";
import { truncateEmbed } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import { APIEmbed, APIEmbedField, ClientApplication, TimestampStyles, time } from "discord.js";
import i18next from "i18next";
import ms from "ms";
import os from "os";
import * as Package from "../../../package.json" with { type: "json" };
const b = os.cpus()[0];

export async function botInfo(application: ClientApplication, interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>) {
	const guild = await guilds.findOne({ guildID: interaction.guild.id });
	const info: APIEmbedField = {
		name: "Information",
		value: i18next.t("info.bot.info", {
			owner: `${application.owner} (${application.owner?.id})`,
			servers: interaction.client.guilds.cache.size.toLocaleString(),
			users: interaction.client.guilds.cache.reduce((c, a) => c + a.memberCount, 0).toLocaleString(),
			channels: interaction.client.channels.cache.size.toLocaleString(),
			create_date: time(interaction.client.user.createdAt, TimestampStyles.RelativeTime),
			node: process.version,
			ts: `v${Package.default.dependencies["typescript"].replace("^", "")}`,
			djs: `v${Package.default.dependencies["discord.js"].replace("^", "")}`,
			lng: guild?.defaultLanguage
		}),
		inline: true
	};
	const embed: APIEmbed = {
		author: {
			name: `Bot Information`
		},
		thumbnail: { url: application?.guild?.iconURL() as string },
		fields: [info],
		footer: {
			text: `Flags : ${application.flags?.toArray().map((key) =>
				`${key}`
					.replace(/([a-z])([A-Z])/g, "$1 $2")
					.replace("Limited", "")
					.replace("Gateway", "")
			)}`
		}
	};
	if (args.bot.verbose) {
		const system: APIEmbedField = {
			name: "System",
			value: i18next.t("info.bot.system", {
				platform: process.platform,
				uptime: ms(1e3 * process.uptime(), { long: true }),
				cores: os.cpus().length,
				model: b.model.replace("(R) Core(TM)", ""),
				speed: b.speed,
				total_memory: formatBytes(process.memoryUsage().heapTotal),
				used_memory: formatBytes(process.memoryUsage().heapUsed),
				lng: guild?.defaultLanguage
			}),
			inline: true
		};

		const code: APIEmbedField = {
			name: "Code",
			value: `[Click here](https://github.com/Lilly3252/lilly)`
		};
		embed.fields = [info, system, code];
	}

	return truncateEmbed(embed);
}
