/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	AuditLogChange,
	AuditLogEvent,
	ChannelType,
	Client,
	EmbedBuilder,
	Events,
	GuildAuditLogsEntry,
	GuildAuditLogsTargetType,
	GuildChannel,
	GuildEmoji,
	GuildScheduledEvent,
	Integration,
	Invite,
	Role,
	StageInstance,
	Sticker,
	time,
	Webhook
} from "discord.js";
import { injectable } from "tsyringe";

import type { Event } from "@yuudachi/framework/types";
import { isCommunicationDisabledUntil, isUndefined } from "#utils/index.js";

@injectable()
export default class implements Event {
	public name = "Audit log";

	public event = Events.GuildAuditLogEntryCreate as const;

	public constructor(public readonly client: Client<true>) {}

	public async execute(): Promise<void> {
		this.client.on(this.event, async (auditLogEntry: GuildAuditLogsEntry, guild) => {
			console.log(`Audit log entry created in guild: ${guild.name}`);
			console.log(auditLogEntry);
			const change = auditLogEntry.changes[0]!;

			function getTargetName(audit: GuildAuditLogsEntry): string {
				if (typeof audit === "object" && audit !== null) {
					if ("name" in audit && typeof audit.name === "string") {
						return audit.name;
					} else if ("code" in audit && typeof audit.code === "string") {
						return audit.code;
					} else if ("topic" in audit && typeof audit.topic === "string") {
						return audit.topic;
					}
				}

				if (audit === null) {
					return "N/A";
				}
				return audit?.target?.toString() || "N/A";
			}

			const embed = new EmbedBuilder()
				.setTitle("Audit Log Entry")
				.setColor(0x00ae86)
				.setTimestamp(new Date())
				.addFields(
					{ name: "Action", value: auditLogEntry.actionType.toString(), inline: true },
					{ name: "Target", value: getTargetName(auditLogEntry) || "N/A", inline: true },
					{ name: "Executor", value: auditLogEntry.executor?.tag || "N/A", inline: true }
				);

			const formatChange = (changeValue: unknown) => {
				if (Array.isArray(changeValue)) {
					return changeValue
						.map((element) =>
							Object.entries(element)
								.map(([key, value]) => `\n\u3000 ${key}: ${value}`)
								.join(" ")
						)
						.join(", ");
				}
				return changeValue !== undefined ? changeValue : "undefined";
			};

			const changesDoneNew = auditLogEntry.changes
				.map((change: AuditLogChange) => {
					return `**❯** ${change.key}:\n\u3000 New: ${formatChange(change.new)}`;
				})
				.join("\n");

			const changesDoneOld = auditLogEntry.changes
				.map((change: AuditLogChange) => {
					return `**❯** ${change.key}:\n\u3000 Old: ${formatChange(change.old)}`;
				})
				.join("\n");

			const changesDone =
				auditLogEntry.changes
					.map((change: AuditLogChange) => {
						return `**❯** ${change.key}:\n\u3000 New: ${formatChange(change.new)} \n\u3000 Old: ${formatChange(change.old)}`;
					})
					.join("\n") || "No changes";

			const oldlogDate = change.old ? new Date(change.old as string | number | Date) : undefined;
			const newlogDate = change.new ? new Date(change.new as string | number | Date) : undefined;

			function changes(_target: GuildAuditLogsTargetType): string {
				if (change) {
					const communicationDisabled = isCommunicationDisabledUntil(change);
					if (communicationDisabled) {
						return `**❯** ${change.key}:\n\u3000 Until: ${formatChange(time(newlogDate))}}`;
					}
					return `${isUndefined(change.new) ? changesDoneOld : isUndefined(change.old) ? changesDoneNew : changesDone}`;
				}
				return "No changes";
			}

			switch (auditLogEntry.action) {
				case AuditLogEvent.GuildUpdate:
					embed.setDescription(`Guild updated: ${auditLogEntry.target}\nChanges:\n${changes("Guild")}`);
					break;
				case AuditLogEvent.ChannelCreate:
					if (auditLogEntry.target instanceof GuildChannel) {
						embed.setDescription(`Channel created: ${auditLogEntry.target.name}\nType: ${ChannelType[auditLogEntry.target.type]}`);
					}
					break;
				case AuditLogEvent.ChannelUpdate:
					if (auditLogEntry.target instanceof GuildChannel) {
						embed.setDescription(`Channel updated: ${auditLogEntry.target.name}\nChanges:\n${changes("Channel")}`);
					}
					break;
				case AuditLogEvent.ChannelDelete:
					if (auditLogEntry.target instanceof GuildChannel) {
						embed.setDescription(`Channel deleted: ${auditLogEntry.target.name}\nType: ${ChannelType[auditLogEntry.target.type]}`);
					}
					break;
				case AuditLogEvent.ChannelOverwriteCreate:
					embed.setDescription(`Channel overwrite created: ${auditLogEntry.target}`);
					break;
				case AuditLogEvent.ChannelOverwriteUpdate:
					embed.setDescription(`Channel overwrite updated: ${auditLogEntry.target}\nChanges:\n${changes("Channel")}`);
					break;
				case AuditLogEvent.ChannelOverwriteDelete:
					embed.setDescription(`Channel overwrite deleted: ${auditLogEntry.target}`);
					break;
				case AuditLogEvent.MemberKick:
					embed.setDescription(`Member kicked: ${auditLogEntry.target}`);
					break;
				case AuditLogEvent.MemberPrune:
					embed.setDescription(`Members pruned: ${auditLogEntry.extra}`);
					break;
				case AuditLogEvent.MemberBanAdd:
					embed.setDescription(`Member banned: ${auditLogEntry.target}`);
					break;
				case AuditLogEvent.MemberBanRemove:
					embed.setDescription(`Member unbanned: ${auditLogEntry.target}`);
					break;
				case AuditLogEvent.MemberUpdate:
					embed.setDescription(`Member updated: ${auditLogEntry.target}\nChanges:\n${changes("User")}`);
					break;
				case AuditLogEvent.MemberRoleUpdate:
					embed.setDescription(`Member roles updated: ${auditLogEntry.target}\nChanges:\n${changes("Role")}`);
					break;
				case AuditLogEvent.MemberMove:
					embed.setDescription(`Member moved: ${auditLogEntry.target}`);
					break;
				case AuditLogEvent.MemberDisconnect:
					embed.setDescription(`Member disconnected: ${auditLogEntry.target}`);
					break;
				case AuditLogEvent.BotAdd:
					embed.setDescription(`Bot added: ${auditLogEntry.target}`);
					break;
				case AuditLogEvent.RoleCreate:
					if (auditLogEntry.target instanceof Role) {
						embed.setDescription(`Role created: ${auditLogEntry.target.name}\nPermissions: ${auditLogEntry.target.permissions}`);
					}
					break;
				case AuditLogEvent.RoleUpdate:
					if (auditLogEntry.target instanceof Role) {
						embed.setDescription(`Role updated: ${auditLogEntry.target.name}\nChanges:\n${changes("Role")}`);
					}
					break;
				case AuditLogEvent.RoleDelete:
					if (auditLogEntry.target instanceof Role) {
						embed.setDescription(`Role deleted: ${auditLogEntry.target.name}`);
					}
					break;
				case AuditLogEvent.InviteCreate:
					if (auditLogEntry.target instanceof Invite) {
						embed.setDescription(`Invite created: ${auditLogEntry.target.code}\nChannel: ${auditLogEntry.target.channel}`);
					}
					break;
				case AuditLogEvent.InviteUpdate:
					if (auditLogEntry.target instanceof Invite) {
						embed.setDescription(`Invite updated: ${auditLogEntry.target.code}\nChanges:\n${changes}`);
					}
					break;
				case AuditLogEvent.InviteDelete:
					if (auditLogEntry.target instanceof Invite) {
						embed.setDescription(`Invite deleted: ${auditLogEntry.target.code}`);
					}
					break;
				case AuditLogEvent.WebhookCreate:
					if (auditLogEntry.target instanceof Webhook) {
						embed.setDescription(`Webhook created: ${auditLogEntry.target.name}\nChannel: ${auditLogEntry.target.channel}`);
					}
					break;
				case AuditLogEvent.WebhookUpdate:
					if (auditLogEntry.target instanceof Webhook) {
						embed.setDescription(`Webhook updated: ${auditLogEntry.target.name}\nChanges:\n${changes("Webhook")}`);
					}
					break;
				case AuditLogEvent.WebhookDelete:
					if (auditLogEntry.target instanceof Webhook) {
						embed.setDescription(`Webhook deleted: ${auditLogEntry.target.name}`);
					}
					break;
				case AuditLogEvent.EmojiCreate:
					if (auditLogEntry.target instanceof GuildEmoji) {
						embed.setDescription(`Emoji created: ${auditLogEntry.target.name}`);
					}
					break;
				case AuditLogEvent.EmojiUpdate:
					if (auditLogEntry.target instanceof GuildEmoji) {
						embed.setDescription(`Emoji updated: ${auditLogEntry.target.name}\nChanges:\n${changes("Emoji")}`);
					}
					break;
				case AuditLogEvent.EmojiDelete:
					if (auditLogEntry.target instanceof GuildEmoji) {
						embed.setDescription(`Emoji deleted: ${auditLogEntry.target.name}`);
					}
					break;
				case AuditLogEvent.MessageDelete:
					embed.setDescription(`Message deleted: ${auditLogEntry.target}`);
					break;
				case AuditLogEvent.MessageBulkDelete:
					embed.setDescription(`Bulk messages deleted: ${auditLogEntry.extra}`);
					break;
				case AuditLogEvent.MessagePin:
					embed.setDescription(`Message pinned: ${auditLogEntry.target}`);
					break;
				case AuditLogEvent.MessageUnpin:
					embed.setDescription(`Message unpinned: ${auditLogEntry.target}`);
					break;
				case AuditLogEvent.IntegrationCreate:
					if (auditLogEntry.target instanceof Integration) {
						embed.setDescription(`Integration created: ${auditLogEntry.target.name}`);
					}
					break;
				case AuditLogEvent.IntegrationUpdate:
					if (auditLogEntry.target instanceof Integration) {
						embed.setDescription(`Integration updated: ${auditLogEntry.target.name}\nChanges:\n${changes("Integration")}`);
					}
					break;
				case AuditLogEvent.IntegrationDelete:
					if (auditLogEntry.target instanceof Integration) {
						embed.setDescription(`Integration deleted: ${auditLogEntry.target.name}`);
					}
					break;
				case AuditLogEvent.StageInstanceCreate:
					if (auditLogEntry.target instanceof StageInstance) {
						embed.setDescription(`Stage instance created: ${auditLogEntry.target.topic}`);
					}
					break;
				case AuditLogEvent.StageInstanceUpdate:
					if (auditLogEntry.target instanceof StageInstance) {
						embed.setDescription(`Stage instance updated: ${auditLogEntry.target.topic}\nChanges:\n${changes("StageInstance")}`);
					}
					break;
				case AuditLogEvent.StageInstanceDelete:
					if (auditLogEntry.target instanceof StageInstance) {
						embed.setDescription(`Stage instance deleted: ${auditLogEntry.target.topic}`);
					}
					break;
				case AuditLogEvent.StickerCreate:
					if (auditLogEntry.target instanceof Sticker) {
						embed.setDescription(`Sticker created: ${auditLogEntry.target.name}`);
					}
					break;
				case AuditLogEvent.StickerUpdate:
					if (auditLogEntry.target instanceof Sticker) {
						embed.setDescription(`Sticker updated: ${auditLogEntry.target.name}\nChanges:\n${changes("Sticker")}`);
					}
					break;
				case AuditLogEvent.StickerDelete:
					if (auditLogEntry.target instanceof Sticker) {
						embed.setDescription(`Sticker deleted: ${auditLogEntry.target.name}`);
					}
					break;
				case AuditLogEvent.GuildScheduledEventCreate:
					if (auditLogEntry.target instanceof GuildScheduledEvent) {
						embed.setDescription(`Scheduled event created: ${auditLogEntry.target.name}`);
					}
					break;
				case AuditLogEvent.GuildScheduledEventUpdate:
					if (auditLogEntry.target instanceof GuildScheduledEvent) {
						embed.setDescription(`Scheduled event updated: ${auditLogEntry.target.name}\nChanges:\n${changes("Guild")}`);
					}
					break;
				case AuditLogEvent.GuildScheduledEventDelete:
					if (auditLogEntry.target instanceof GuildScheduledEvent) {
						embed.setDescription(`Scheduled event deleted: ${auditLogEntry.target.name}`);
					}
					break;
				default:
					embed.setDescription(`Unhandled audit log event: ${auditLogEntry.action}`);
					break;
			}

			const logChannel = guild.channels.cache.get("1031369807859302400");
			if (logChannel && logChannel.isTextBased()) {
				logChannel.send({ embeds: [embed] });
			}
		});
	}
}
