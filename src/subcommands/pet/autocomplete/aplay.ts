import user from "#database/models/users.js";
import { CommandMethod, InteractionParam } from "@yuudachi/framework/types";

export async function aplay(interaction: InteractionParam<CommandMethod.Autocomplete>, guildID: string, userID: string): Promise<void> {
	const database = await user.findOne({ userID: userID, guildID: guildID });
	const inventory = database?.pet?.inventory.toys;
	await interaction.respond(inventory!.map((t) => ({ name: t.itemName.toString(), value: t.itemName.toString() })));
}
