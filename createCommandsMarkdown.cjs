const fs = require("fs");
const path = require("path");

const typeMapping = {
    1: "Subcommand",
    2: "Subcommand Group",
    3: "String",
    4: "Integer",
    5: "Boolean",
    6: "User",
    7: "Channel",
    8: "Role",
    9: "Mentionable",
    10: "Number"
};

function listCommands(folderPaths) {
    const commands = [];
    folderPaths.forEach((folderPath) => {
        fs.readdirSync(folderPath).forEach((file) => {
            if (file.endsWith(".js") || file.endsWith(".ts")) {
                const commandName = path.basename(file, path.extname(file));
                commands.push({ name: commandName, path: path.join(folderPath, file), folder: folderPath });
            }
        });
    });
    return commands;
}

async function listParameters(commandFilePath) {
    if (fs.existsSync(commandFilePath)) {
        console.log(`Processing file: ${commandFilePath}`);
        try {
            const resolvedPath = path.resolve(commandFilePath);
            const fileUrl = `file://${resolvedPath.replace(/\\/g, '/')}`;
            const commandFile = await import(fileUrl);
            const command = commandFile[Object.keys(commandFile)[0]];
            return {
                description: command.description,
                options: command.options.map((option) => ({
                    type: typeMapping[option.type] || option.type,
                    name: option.name,
                    description: option.description,
                    required: option.required,
                    choices: option.choices || [],
                    subOptions: option.options || []
                }))
            };
        } catch (error) {
            console.error(`Error processing file: ${commandFilePath}`, error.message);
            return { description: "No description available.", options: [] };
        }
    } else {
        console.error(`File not found: ${commandFilePath}`);
        return { description: "No description available.", options: [] };
    }
}

const folderPaths = ["dist/slashyInformations/moderation", "dist/slashyInformations/utility"];
const commands = listCommands(folderPaths);

console.log('Commands:', commands);

let markdownContent =
    "# My Bot\n\n## Description\nThis bot is designed to assist with various tasks and provide information dynamically based on the files present in its folders. It is equipped with a range of commands that can be executed to perform different functions.\n\n";

const folderTables = {};

(async () => {
    for (const command of commands) {
        const { description, options } = await listParameters(command.path);
        const folderName = path.basename(command.folder);
        if (!folderTables[folderName]) {
            folderTables[folderName] = `## ${folderName.charAt(0).toUpperCase() + folderName.slice(1)} Commands\n\n`;
            folderTables[folderName] += `| Name | Option | Description | Type | Required | Choices |\n`;
            folderTables[folderName] += `|------|--------|-------------|------|----------|---------|\n`;
        }

        folderTables[folderName] += `| ${command.name} | | ${description} | Command | | |\n`;

        const subcommands = options.filter(option => option.type === "Subcommand");
        const parameters = options.filter(option => option.type !== "Subcommand");

        if (parameters.length > 0) {
            parameters.forEach((param) => {
                folderTables[folderName] += `|  | ${param.name} | ${param.description} | ${param.type} | ${param.required?"true":"false"} | ${(param.choices && param.choices.length > 0) ? param.choices.map((choice) => choice.name).join(", ") : ""} |\n`;
            });
        }

        if (subcommands.length > 0) {
            subcommands.forEach((subcommand) => {
                folderTables[folderName] += `| ${subcommand.name} | | ${subcommand.description} | ${subcommand.type} | ${subcommand.required?"true":"-"} | |\n`;
                if (subcommand.subOptions && subcommand.subOptions.length > 0) {
                    subcommand.subOptions.forEach((subOption) => {
                        folderTables[folderName] += `|  | ${subOption.name} | ${subOption.description} | ${typeMapping[subOption.type] || subOption.type} | ${subOption.required?"true":"false"} | ${(subOption.choices && subOption.choices.length > 0) ? subOption.choices.map((choice) => choice.name).join(", ") : ""} |\n`;
                    });
                }
            });
        }
    }

    for (const folderName in folderTables) {
        markdownContent += folderTables[folderName] + `\n`;
    }

    fs.writeFileSync("commands.md", markdownContent);

    console.log('Markdown file "commands.md" has been created.');
})();
