import { emojify, isEnabled } from "#utils/functions.js";
import type { guild } from "#utils/types/database.js";
import { truncateEmbed } from "@yuudachi/framework";
import type { InteractionParam } from "@yuudachi/framework/types";
import type { APIEmbed, APIEmbedField } from "discord.js";
import i18next from "i18next";

export async function settingEmbed(interaction: InteractionParam, guild_db: guild, language: string | undefined): Promise<APIEmbed> {
	const settings = guild_db.guildSettings[0];

	const description: APIEmbedField = {
		name: i18next.t("command.utility.log.setting_log.channel_title", { lng: language }),
		value: i18next.t("command.utility.log.setting_log.channel_description", {
			welcome_channel: guild_db.welcomeChannelID ?? i18next.t("command.utility.log.setting_log.no_info", { lng: language }),
			log_channel: guild_db.logChannelID ?? i18next.t("command.utility.log.setting_log.no_info", { lng: language }),
			anti_raid_enabled: isEnabled(settings.antiRaid),
			audit_log_enabled: isEnabled(guild_db.auditLogEvent)
		})
	};

	const embed: APIEmbed = {
		author: {
			name: `${interaction.guild.name} Server settings`,
			icon_url: interaction.guild.iconURL()!
		},
		fields: [description]
	};

	if (guild_db.auditLogEvent) {
		const eventDescription: APIEmbedField = {
			name: i18next.t("command.utility.log.setting_log.event_title", { lng: language }),
			value: i18next.t("command.utility.log.setting_log.event_description", {
				bot: emojify({ mode: settings.botUpdate, space: 20, separator: "\u2008" }),
				role: emojify({ mode: settings.roleUpdate, space: 17, separator: "\u2008" }),
				guild: emojify({ mode: settings.guildUpdate, space: 17, separator: "\u2008" }),
				emoji: emojify({ mode: settings.emojiUpdate, space: 15, separator: "\u2008" }),
				thread: emojify({ mode: settings.threadUpdate, space: 12, separator: "\u2008" }),
				message: emojify({ mode: settings.messageUpdate, space: 9, separator: "\u2008" }),
				webhooks: emojify({ mode: settings.webhookUpdate, space: 8, separator: "\u2008" }),
				stage: emojify({ mode: settings.stageInstanceUpdate, space: 3, separator: "\u2008" }),
				lng: language
			}),
			inline: true
		};

		const eventDescription2: APIEmbedField = {
			name: `\u200b`,
			value: i18next.t("command.utility.log.setting_log.event_description2", {
				sticker: emojify({ mode: settings.stickerUpdate, space: 33, separator: "\u2008" }),
				channel: emojify({ mode: settings.channelUpdate, space: 31, separator: "\u2008" }),
				invitations: emojify({ mode: settings.inviteUpdate, space: 29, separator: "\u2008" }),
				integration: emojify({ mode: settings.integrationUpdate, space: 26, separator: "\u2008" }),
				guild_member: emojify({ mode: settings.memberUpdate, space: 20, separator: "\u2008" }),
				auto_moderation: emojify({ mode: settings.autoModeration, space: 16, separator: "\u2008" }),
				scheduled: emojify({ mode: settings.guildScheduledUpdate, space: 15, separator: "\u2008" }),
				cmd_perm: emojify({ mode: settings.commandPermission, space: 4, separator: "\u2008" }),
				lng: language
			}),
			inline: true
		};

		embed.fields!.push(eventDescription, eventDescription2);
	}

	return truncateEmbed(embed);
}
