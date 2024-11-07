import { EmojiIdentifierResolvable, PollAnswerData, PollData, PollLayoutType, PollQuestionMedia } from "discord.js";

const POLL_MIN_DURATION = 1;
const POLL_MAX_DURATION = 768;

export class PollBuilder {
	private question: string = "";
	private answers: PollAnswerData[] = [];
	private duration: number = POLL_MIN_DURATION; // Default duration: 1 hour
	private allowMultiselect: boolean = false;
	private layoutType: PollLayoutType = PollLayoutType.Default;

	/**
	 * Sets the question for the poll.
	 * @param question - The question to be asked in the poll.
	 * @returns The current instance of PollBuilder.
	 * @throws Will throw an error if the question is not a non-empty string.
	 */
	setQuestion(question: string): this {
		if (typeof question !== "string" || question.trim() === "") {
			throw new Error("Question must be a non-empty string.");
		}
		this.question = question;
		return this;
	}

	/**
	 * Adds an answer option to the poll.
	 * @param answer - The text of the answer option.
	 * @param emoji - An optional emoji associated with the answer.
	 * @returns The current instance of PollBuilder.
	 * @throws Will throw an error if the answer is not a non-empty string.
	 */
	addAnswer(answer: string, emoji: EmojiIdentifierResolvable | undefined): this {
		if (typeof answer !== "string" || answer.trim() === "") {
			throw new Error("Answer must be a non-empty string.");
		}
		this.answers.push({ text: answer, emoji });
		return this;
	}

	/**
	 * Sets multiple answer options for the poll.
	 * @param answers - An array of answer strings.
	 * @returns The current instance of PollBuilder.
	 * @throws Will throw an error if the answers array does not contain at least two and at most ten non-empty strings.
	 */
	setAnswers(answers: string[]): this {
		if (!Array.isArray(answers) || answers.length < 2 || answers.length > 10) {
			throw new Error("Answers must be an array with at least two and at most ten non-empty strings.");
		}
		this.answers = answers.filter((ans) => typeof ans === "string" && ans.trim() !== "").map((ans) => ({ text: ans, emoji: undefined }));
		if (this.answers.length < 2) {
			throw new Error("Poll must have at least two valid answers.");
		}
		return this;
	}

	/**
	 * Sets the duration for the poll.
	 * @param duration - The duration of the poll in milliseconds.
	 * @returns The current instance of PollBuilder.
	 * @throws Will throw an error if the duration is not a number between 1 and 768.
	 */
	setDuration(duration: number): this {
		if (typeof duration !== "number" || duration < POLL_MIN_DURATION || duration > POLL_MAX_DURATION) {
			throw new Error(`Duration must be between ${POLL_MIN_DURATION} and ${POLL_MAX_DURATION} milliseconds.`);
		}
		this.duration = duration;
		return this;
	}

	/**
	 * Sets whether the poll allows multiple selections.
	 * @param allow - A boolean indicating if multiple selections are allowed.
	 * @returns The current instance of PollBuilder.
	 */
	setAllowMultiselect(allow: boolean): this {
		this.allowMultiselect = allow;
		return this;
	}

	/**
	 * Sets the layout type for the poll.
	 * @param layoutType - The layout type of the poll.
	 * @returns The current instance of PollBuilder.
	 */
	setLayoutType(layoutType: PollLayoutType): this {
		this.layoutType = layoutType;
		return this;
	}

	/**
	 * Builds and returns the PollData object.
	 * @returns The PollData object.
	 * @throws Will throw an error if the poll does not have a question or at least two answers.
	 */
	build(): PollData {
		if (!this.question) {
			throw new Error("Poll must have a question.");
		}
		if (this.answers.length < 2) {
			throw new Error("Poll must have at least two options.");
		}

		const pollQuestion: PollQuestionMedia = {
			text: this.question
		};

		return {
			question: pollQuestion,
			answers: this.answers,
			duration: this.duration,
			allowMultiselect: this.allowMultiselect,
			layoutType: this.layoutType
		};
	}
}
