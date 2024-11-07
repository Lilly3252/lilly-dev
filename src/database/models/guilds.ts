import { guild } from "#utils/types/database.js";
import { model, Schema } from "mongoose";

const guildSchema = new Schema<guild>({
	name: { type: String },
	guildID: { type: String },
	auditLogEvent: { type: Boolean, default: false },
	logChannelID: { type: String, default: null },
	welcomeChannelID: { type: String, default: null },
	defaultLanguage: { type: String, default: "en-US" },
	guildSettings: [
		{
			antiRaid: { type: Boolean, default: false },
			botUpdate: { type: Boolean, default: false },
			roleUpdate: { type: Boolean, default: false },
			threadUpdate: { type: Boolean, default: false },
			guildUpdate: { type: Boolean, default: false },
			emojiUpdate: { type: Boolean, default: false },
			memberUpdate: { type: Boolean, default: false },
			inviteUpdate: { type: Boolean, default: false },
			messageUpdate: { type: Boolean, default: false },
			channelUpdate: { type: Boolean, default: false },
			stickerUpdate: { type: Boolean, default: false },
			webhookUpdate: { type: Boolean, default: false },
			autoModeration: { type: Boolean, default: false },
			integrationUpdate: { type: Boolean, default: false },
			commandPermission: { type: Boolean, default: false },
			stageInstanceUpdate: { type: Boolean, default: false },
			guildScheduledUpdate: { type: Boolean, default: false }
		}
	],
	restrictEmbedRole: { type: String, default: null },
	restrictReactionRole: { type: String, default: null },
	restrictSlashRole: { type: String, default: null },
	restrictPollRole: { type: String, default: null },
	restrictVoiceRole: { type: String, default: null },
	safeRoles: []
});
export default model<guild>("guild", guildSchema);
