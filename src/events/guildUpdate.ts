import type { event } from '../structures/types/index.js';
import type { Guild } from 'discord.js';
import settingSchema from './../database/guildSettings.js';
export const name: event['name'] = 'guildUpdate';
export const once: event['once'] = false;

export const run: event['run'] = async (oldGuild: Guild, newGuild: Guild): Promise<any> => {
	const guildDB = await settingSchema.findOne({ guildID: oldGuild.id });
	if (newGuild.name !== oldGuild.name) {
		guildDB?.update({ name: newGuild.name });
	}

	console.log(`${oldGuild.name} updated to ${newGuild.name}`);
};
