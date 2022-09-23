/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
import { config } from 'dotenv';
config();
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import fs from "fs";
import process from 'process';
import type  { SlashCommand } from './structures/index.js';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const commands: any[]=[];
const modules = ["administrator", "fun", "information", "utilities"];

modules.forEach(async (folder) => {
    const commandFiles = fs
        .readdirSync(`./dist/src/commands/${folder}/`)
        .filter((file: string) => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command : SlashCommand = await import(`./commands/${folder}/${file}`);
        await commands.push(command.slashy.toJSON());
    }
});

const clientId = process.env.CLIENT_ID!;
const rest = new REST({ version: "10" }).setToken(
    process.env.TOKEN!
);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands(clientId!), {
            body: commands,
        });

        console.log(
            `Successfully reloaded application (/) commands. ${commands.length} commands has been refreshed`
        );
    } catch (error) {
        console.error(error);
    }
})();
