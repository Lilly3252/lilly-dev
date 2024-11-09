import guild from "#database/models/guilds.js";
import { RestrictCommand } from "#slashyInformations/index.js";
import { moderationEmbed } from "#utils/embeds/moderationEmbed.js";
import { getLanguage } from "#utils/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof RestrictCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof RestrictCommand>): Promise<void> {
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		const defaultLanguage = (args.hide ?? true) ? undefined : "en-US";
		const locale = getLanguage(interaction, defaultLanguage);
		const member = args.target.member;
		const reason = args.reason;
		const restriction = args.restriction;
		const restrictionRole = await guild.findOne({ guildID: member?.guild.id });

		if (!member?.moderatable) {
			await interaction.editReply({
				content: i18next.t("command.mod.restrict.not_moderatable", { lng: restrictionRole?.defaultLanguage })
			});
			return;
		}

		const restrictionRoles = {
			embed: restrictionRole?.restrictEmbedRole,
			reaction: restrictionRole?.restrictReactionRole,
			slash: restrictionRole?.restrictSlashRole,
			poll: restrictionRole?.restrictPollRole,
			voice: restrictionRole?.restrictVoiceRole
		};

		const roleToAdd = restrictionRoles[restriction];
		if (roleToAdd) {
			await member.roles.add(roleToAdd, reason);
			await interaction.reply({ embeds: [await moderationEmbed(interaction, args, locale)] });
		} else {
			await interaction.editReply({
				content: i18next.t("command.common.errors.generic", { lng: restrictionRole?.defaultLanguage })
			});
		}
	}
}
