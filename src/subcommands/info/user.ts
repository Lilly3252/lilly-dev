import users from "#database/models/users.js";
import { InfoCommand } from "#slashyInformations/index.js";
import { userInfo } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";

export async function user(interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>["user"]): Promise<void> {
	const member = interaction.options.getMember("target");
	const blacklist = await users.findOne({ userID: interaction.user.id });
	try {
		if (member) {
			await interaction.editReply({ embeds: [await userInfo(args, member, blacklist!, interaction.locale)] });
		} else {
			const user = interaction.options.getUser("target");
			console.log(user?.flags?.toArray());
			await interaction.editReply({ embeds: [await userInfo(args, user!, blacklist!, interaction.locale)] });
		}
	} catch (error) {
		console.log(error);
		interaction.editReply({ content: "something's wrong" });
	}
}
