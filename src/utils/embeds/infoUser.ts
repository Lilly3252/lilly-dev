import { InfoCommand } from "#slashyInformations/index.js";
import { user } from "#utils/types/database.js";
import { truncateEmbed } from "@yuudachi/framework";
import { ArgsParam } from "@yuudachi/framework/types";
import { APIEmbed, APIEmbedField, Colors, GuildMember, TimestampStyles, User, time } from "discord.js";
import i18next from "i18next";

export async function userInfo(args: ArgsParam<typeof InfoCommand>["user"], target: User | GuildMember, user: user, language: string | undefined): Promise<APIEmbed> {
	const isGuildMember = target instanceof GuildMember;
	const userBlacklisted = user?.blacklisted;
	const spammer = isGuildMember ? target.user.flags?.has("Spammer") : target.flags?.has("Spammer");

	const embed: APIEmbed = {
		title: isGuildMember ? "Member Information" : "User Information",
		color: isGuildMember ? target.displayColor : Colors.DarkButNotBlack,
		thumbnail: {
			url: target.displayAvatarURL({ size: 512 })
		},
		footer: {
			text: `Blacklisted: ${userBlacklisted ? "✅" : "❌"} | Spammer: ${spammer ? "✅" : "❌"}`,
			icon_url: target.displayAvatarURL()
		}
	};

	const fields: APIEmbedField[] = [];

	if (isGuildMember) {
		const guildMemberInfo: APIEmbedField = {
			name: i18next.t("command.utility.info.member.name", { lng: language }),
			value: i18next.t("command.utility.info.member.value", {
				username: target.user.username,
				id: target.id,
				avatar: `[link to Avatar](${target.displayAvatarURL()})`,
				status: target.presence?.status ?? "No information",
				lng: language
			})
		};
		fields.push(guildMemberInfo);

		if (args.verbose) {
			const role = target.roles.highest;
			const memberRole: APIEmbedField = {
				name: "Role",
				value: i18next.t("command.utility.info.role.value", {
					name: `${role}`,
					role_id: role.id,
					color: `${role.hexColor.toUpperCase()}`,
					hoisted: role.hoist,
					mentionable: role.mentionable,
					lng: language
				}),
				inline: true
			};

			const otherInfo: APIEmbedField = {
				name: "Other",
				value: i18next.t("command.utility.info.member.other", {
					created_at: time(target.user.createdAt, TimestampStyles.RelativeTime),
					joined_at: time(target.joinedAt!, TimestampStyles.RelativeTime),
					pending: target.pending,
					is_timed_out: target.communicationDisabledUntil ? time(target.communicationDisabledUntil, TimestampStyles.RelativeTime) : "false",
					is_bot: target.user.bot,
					lng: language
				}),
				inline: true
			};

			fields.push(memberRole, otherInfo);

			if (user.notes && user.notes.length > 0) {
				const notesField: APIEmbedField = {
					name: "Notes",
					value: user.notes.map((n, index) => `${index + 1}. ${n.note} (by <@${n.moderator}> on ${n.date.toLocaleDateString()})`).join("\n")
				};
				fields.push(notesField);
			}

			if (user.pet) {
				const petField: APIEmbedField = {
					name: "Pet",
					value: `Name: ${user.pet.petName}\nType: ${user.pet.petType}`
				};
				fields.push(petField);
			}
		}
	} else {
		const userInfo: APIEmbedField = {
			name: i18next.t("command.utility.info.user.name", { lng: language }),
			value: i18next.t("command.utility.info.user.value", {
				username: target.username,
				id: target.id,
				avatar: `[link to Avatar](${target.displayAvatarURL()})`,
				time_create: time(target.createdAt, TimestampStyles.RelativeTime),
				lng: language
			})
		};
		fields.push(userInfo);
	}

	embed.fields = fields;

	return truncateEmbed(embed);
}
