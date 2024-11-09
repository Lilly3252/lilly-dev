import User from "#database/models/users.js";
import type { UserNoteCommand } from "#slashyInformations/index.js";
import { getLanguage } from "#utils/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import i18next from "i18next";
import "reflect-metadata";

export default class extends Command<typeof UserNoteCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof UserNoteCommand>): Promise<void> {
		await interaction.deferReply();

		const locale = getLanguage(interaction, "en-US");
		const action = args.action;
		const target = args.target;
		const note = args.note!;
		const moderator = interaction.user.id;
		const userNotes = await User.findOne({ userID: target.user.id, guildID: interaction.guildId });
		const notesList = userNotes?.notes?.map((n, index) => `${index + 1}. ${n.note} (by <@${n.moderator}> on ${n.date.toLocaleDateString()})`).join("\n");
		const noteIndex = parseInt(note, 10) - 1;
		const userNotesToDelete = await User.findOne({ userID: target.user.id, guildID: interaction.guildId });

		if (!target.user) {
			await interaction.editReply(i18next.t("command.utility.user_note.errors.user_not_specified", { lng: locale }));
			return;
		}

		switch (action) {
			case "add":
				if (!note) {
					await interaction.editReply(i18next.t("command.utility.user_note.errors.note_not_provided", { lng: locale }));
					return;
				}
				await User.findOneAndUpdate({ userID: target.user.id, guildID: interaction.guildId }, { $push: { notes: { note, moderator } } }, { upsert: true, new: true });
				await interaction.editReply(i18next.t("command.utility.user_note.note_added", { target: target.user.tag, lng: locale }));
				break;

			case "view":
				if (!userNotes || !userNotes.notes || userNotes.notes.length === 0) {
					await interaction.editReply(i18next.t("command.utility.user_note.errors.user_note_not_found", { target: target.user.tag, lng: locale }));
					return;
				}
				await interaction.editReply(i18next.t("command.utility.user_note.note_view", { target: target.user.tag, notesList: notesList, lng: locale }));
				break;

			case "delete":
				if (!userNotesToDelete || !userNotesToDelete.notes || !userNotesToDelete.notes[noteIndex]) {
					await interaction.editReply(i18next.t("command.utility.user_note.errors.index_note_not_found", { note: note, lng: locale }));
					return;
				}
				userNotesToDelete.notes.splice(noteIndex, 1);
				await userNotesToDelete.save();
				await interaction.editReply(i18next.t("command.utility.user_note.note_deleted", { note: note, target: target.user.tag, lng: locale }));
				break;

			default:
				await interaction.editReply(i18next.t("command.config.common.errors.generic", { lng: locale }));
				break;
		}
	}
}
