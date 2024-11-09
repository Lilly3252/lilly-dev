import guilds from "#database/models/guilds.js";
import { default as user, default as users } from "#database/models/users.js";
import { InteractionParam } from "@yuudachi/framework/types";
import { AuditLogChange, ChatInputCommandInteraction, Guild, GuildMember, GuildTextBasedChannel, Interaction, PermissionResolvable, Role, RoleMention } from "discord.js";
import i18next from "i18next";
import { guild } from "./types/database.js";
import { EmojifyOptions } from "./types/functiontypes.js";

export async function permission(interaction: InteractionParam, permission: PermissionResolvable, defaultLanguage: string | undefined) {
	const language = defaultLanguage;
	const perms = interaction.guild.members.me?.permissions.has(permission);
	if (!perms && interaction.deferred) {
		await interaction.editReply({
			content: i18next.t("command.common.errors.permission_not_found", { perm: `${permission}`, lng: getLanguage(interaction, language) })
		});
		return perms;
	} else {
		if (!perms && !interaction.deferred)
			await interaction.reply({
				content: i18next.t("command.common.errors.permission_not_found", { perm: `${permission}`, lng: getLanguage(interaction, language) })
			});
	}
	return perms;
}

export async function createSettings(param: Guild | ChatInputCommandInteraction<"cached">) {
	const paramCondition = param instanceof ChatInputCommandInteraction;

	await guilds.create({
		guildID: paramCondition ? param.guild.id : param.id,
		name: paramCondition ? param.guild.name : param.name,
		auditLogEvent: false,
		logChannelID: null,
		welcomeChannelID: null,
		guildSettings: [
			{
				antiRaid: false,
				botUpdate: false,
				roleUpdate: false,
				guildUpdate: false,
				emojiUpdate: false,
				inviteUpdate: false,
				threadUpdate: false,
				memberUpdate: false,
				messageUpdate: false,
				channelUpdate: false,
				stickerUpdate: false,
				webhookUpdate: false,
				autoModeration: false,
				integrationUpdate: false,
				commandPermission: false,
				stageInstanceUpdate: false,
				guildScheduledUpdate: false
			}
		]
	});
	return createSettings;
}
export async function addUserBlacklist(member: GuildMember) {
	await users.create({
		guildID: member.guild.id,
		userID: member.id,
		blacklisted: true
	});
	return addUserBlacklist;
}

export function isEnabled(name: boolean) {
	return name ? "Enabled" : "Disabled";
}

export function emojify({ mode, padStart = true, separator, space = 0 }: EmojifyOptions) {
	const emoji = mode ? "✅" : "❌";

	return padStart ? emoji.padStart(space, separator) : emoji.padEnd(space, separator);
}

export function getRoles(target: GuildMember) {
	return target.roles.cache
		.sort((c, a) => a.position - c.position)
		.map((a) => a.toString())
		.slice(0, -1);
}
/**
 * Converts a number of bytes into a human-readable string with appropriate units.
 * @param bytes - The number of bytes to format.
 * @returns A string representing the formatted bytes.
 */
export function formatBytes(bytes: number): string {
	if (bytes === 0) return "0 Bytes";

	const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	const exponent = Math.floor(Math.log(bytes) / Math.log(1024));
	const value = (bytes / Math.pow(1024, exponent)).toFixed(2);

	return `${value} ${units[exponent]}`;
}
/** * Checks if the member is blacklistable based on their roles and the guild's safe roles.
 * @param member - The guild member to check.
 * @param guild_db - The guild's database settings.
 * @returns `true` if the member is blacklistable, otherwise `false`. */
export function blacklistable(member: GuildMember, guild_db: guild) {
	const settings = guild_db.safeRoles;
	if (member.roles.highest.position > member.guild.members.me!.roles.highest.position) {
		return false;
	}
	if (member.roles.cache.find((role: Role) => role.id === settings.toString())) {
		return false;
	}
}
/**
 * Trims an array of role mentions to a specified limit and adds a summary if there are more roles.
 * @param roles - The array of role mentions to trim.
 * @param limit - The maximum number of roles to include in the trimmed array. Default is 10.
 * @returns An array of strings representing the trimmed roles and a summary if there are more roles.
 */
export function trimRole(roles: RoleMention[], limit = 10): string[] {
	const trimmedRoles = roles.slice(0, limit).map((role) => role.toString());

	if (roles.length > limit) {
		trimmedRoles.push(`${roles.length - limit} more...`);
	}

	if (trimmedRoles.length === 0) {
		trimmedRoles.push("None.");
	}

	return trimmedRoles;
}

/** * Updates the channel setting in the guild settings.
 * @param interaction - The interaction object for editing the reply.
 * @param guildSettings - The settings of the guild.
 * @param chan - The channel to update.
 * @param settingKey - The key of the setting to update.
 * @param channelId - The ID of the channel.
 * @param successMessage - The success message to display.
 * @param removeMessage - The removal message to display. *
 * @param locale - The locale for translation. */
export async function updateChannelSetting(
	interaction: ChatInputCommandInteraction<"cached">,
	guildSettings: guild,
	chan: GuildTextBasedChannel | null,
	settingKey: string,
	channelId: string | null,
	successMessage: string,
	removeMessage: string,
	defaultLanguage: string | undefined
) {
	const language = defaultLanguage;
	if (channelId) {
		await guildSettings.updateOne({ [settingKey]: channelId });
		interaction.editReply({
			content: i18next.t(successMessage, {
				channel: settingKey,
				channel_id: chan,
				lng: getLanguage(interaction, language)
			})
		});
	} else {
		await guildSettings.updateOne({ [settingKey]: null });
		interaction.editReply({
			content: i18next.t(removeMessage, { lng: getLanguage(interaction, language) })
		});
	}
}

/** * Updates the event setting in the guild settings.
 *  @param interaction - The interaction object for editing the reply.
 *  @param guildSettings - The settings of the guild.
 *  @param eventKey - The key of the event to update.
 *  @param enabled - Whether the event is enabled or disabled.
 *  @param locale - The locale for translation. */
export async function updateEventSetting(interaction: ChatInputCommandInteraction<"cached">, guildSettings: guild, eventKey: string, enabled: boolean, defaultLanguage: string | undefined) {
	const language = defaultLanguage;
	await guildSettings.updateOne({ [eventKey]: enabled });
	interaction.editReply({
		content: i18next.t(enabled ? "command.config.events.enabled" : "command.config.events.disabled", {
			event: eventKey,
			lng: getLanguage(interaction, language)
		})
	});
}

/** * Updates the role setting in the guild settings.
 * @param interaction - The interaction object for editing the reply.
 * @param guildSettings - The settings of the guild.
 * @param role - The role to update.
 * @param settingKey - The key of the setting to update.
 * @param roleId - The ID of the role.
 * @param successMessage - The success message to display.
 * @param removeMessage - The removal message to display.
 * @param locale - The locale for translation. */
export async function updateRoleSetting(
	interaction: ChatInputCommandInteraction<"cached">,
	guildSettings: guild,
	role: Role | null,
	settingKey: string,
	roleId: string | null,
	successMessage: string,
	removeMessage: string,
	defaultLanguage: string | undefined
) {
	const language = defaultLanguage;
	await guildSettings.updateOne({ [settingKey]: roleId });
	interaction.editReply({
		content: i18next.t(roleId ? successMessage : removeMessage, {
			role: settingKey,
			role_id: role,
			lng: getLanguage(interaction, language)
		})
	});
}

/** * Determines the language to use based on the interaction's locale and a default language.
 * If the default language is undefined, it returns "en-US" or the interaction's locale if it is supported.
 * @param interaction - The interaction object containing locale information.
 * @param defaultLanguage - The default language to use if it is defined.
 * @returns The language to use for the interaction. */
export function getLanguage(interaction: Interaction, defaultLanguage: string | undefined) {
	if (isUndefined(defaultLanguage)) {
		const supportedLanguages = ["en-US", "fr", "ja"];
		return supportedLanguages.includes(interaction.locale) ? interaction.locale : "en-US";
	} else {
		return "en-US";
	}
}
/** * Updates the safe roles in the guild settings.
 * @param interaction - The interaction object for editing the reply.
 * @param guildSettings - The settings of the guild.
 * @param roleId - The ID of the role to add or remove.
 * @param add - Whether to add or remove the role.
 * @param locale - The locale for translation. */
export async function updateSafeRoles(interaction: ChatInputCommandInteraction<"cached">, guildSettings: guild, roleId: string, add: boolean, defaultLanguage: string | undefined) {
	const language = defaultLanguage;
	if (add) {
		await guildSettings.updateOne({ $addToSet: { safeRoles: roleId } });
	} else {
		await guildSettings.updateOne({ $pull: { safeRoles: roleId } });
	}
	interaction.editReply({
		content: i18next.t(add ? "command.config.events.enabled" : "command.config.events.disabled", {
			event: "Safe Role",
			lng: getLanguage(interaction, language)
		})
	});
}

/** * Checks if the user's pet has leveled up and updates its level and experience.
 *  @param userToCheck - The user whose pet's level is being checked.
 *  @param interaction - The interaction object to follow up the response. */
export async function checkLevelUp(userToCheck: InstanceType<typeof user>, interaction: InteractionParam): Promise<void> {
	const xpToNextLevel = userToCheck.pet!.level * 100;
	if (userToCheck.pet!.experience >= xpToNextLevel) {
		userToCheck.pet!.level += 1;
		userToCheck.pet!.experience = 0;
		await userToCheck.save();
		await interaction.followUp(`Congratulations! Your pet has leveled up to level ${userToCheck.pet!.level}!`);
	}
}
/** * Checks if the audit log change is related to communication being disabled.
 * @param change - The audit log change to check.
 * @returns `true` if the change is related to communication being disabled, otherwise `false`. */
export function isCommunicationDisabledUntil(change: AuditLogChange): boolean {
	return change.key === "communication_disabled_until";
}
/** * Checks if the given value is undefined.
 * @param value - The value to check.
 * @returns `true` if the value is undefined, otherwise `false`. */
export function isUndefined(value: unknown): boolean {
	return value === undefined;
}
