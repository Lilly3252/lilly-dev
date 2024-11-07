import type { PollCommand } from "#slashyInformations/index.js";
import { PollBuilder } from "#utils/builders/pollBuilder.js";
import { PollArgs } from "#utils/types/functiontypes.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";

export default class extends Command<typeof PollCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof PollCommand>): Promise<void> {
		const answers: string[] = [];
		for (let answerOption = 1; answerOption <= 10; answerOption++) {
			const key = `answer${answerOption}` as keyof PollArgs;
			const answer = args[key];
			if (typeof answer === "string") {
				answers.push(answer);
			}

			const poll = new PollBuilder().setQuestion(args.question).setAnswers(answers).setDuration(args.duration).build();
			await interaction.reply({ poll: poll });
		}
	}
}
