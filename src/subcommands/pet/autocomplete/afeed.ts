import user from "#database/models/users.js";
import { CommandMethod, InteractionParam } from "@yuudachi/framework/types";

export async function afeed(interaction: InteractionParam<CommandMethod.Autocomplete>, guildID: string, userID: string): Promise<void> {
	const database = await user.findOne({ userID: userID, guildID: guildID });
	const foodinventory = database?.pet?.inventory.food;
	await interaction.respond(foodinventory!.map((t) => ({ name: t.itemName.toString(), value: t.itemName.toString() })));
}
