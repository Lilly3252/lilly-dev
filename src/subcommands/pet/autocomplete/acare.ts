import user from "#database/models/users.js";
import { CommandMethod, InteractionParam } from "@yuudachi/framework/types";
export async function acare(interaction: InteractionParam<CommandMethod.Autocomplete>, guildID: string, userID: string): Promise<void> {
	const database = await user.findOne({ userID: userID, guildID: guildID });
	const careinventory = database?.pet?.inventory.medicine;
	await interaction.respond(careinventory!.map((t) => ({ name: t.itemName, value: t.itemName })));
}
