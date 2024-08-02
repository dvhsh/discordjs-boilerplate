/*
*
* @file        command.ts
* @author      David (@dvhsh)
* @description Command Class
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import {
    SlashCommandBuilder,
    Interaction,
    Message,
    Client, EmbedBuilder,
} from "discord.js";

import RequireAll          from "require-all";
import * as path           from "path";

/*
*   @enum Category
*   @description: This enum is used to define command categories.
*   If present in the enum, there must be a directory with at least one command in it for the bot to run.
*/
export enum Category {
    Settings    = 'settings',
    Utility     = 'utility',
    Admin       = 'admin',
}

/*
*   @class CommandOption
*   @description: This class is used to define the options for a slash command. (Irrelevant for message commands)
*/
export class CommandOption {
    name           : string;
    description    : string;

    required       : boolean;

    choices      ? : any[];

    max          ? : number;
    min          ? : number;

    // name desc required
    constructor(name: string, desc: string, req: boolean) {
        this.name        = name;
        this.description = desc;
        this.required    = req;
    }

    setMax(max: number) {
        this.max = max; return this;
    }

    setMin(min: number) {
        this.min = min; return this;
    }
}

export class Command {

    prefix       : string = process.env.BETA === 'true' ? process.env.BETA_BOT_PREFIX!  : process.env.BOT_PREFIX!;
    version      : string = process.env.BETA === 'true' ? process.env.BETA_BOT_VERSION! : process.env.BOT_VERSION!;

    extendedHelp : string = '';
    description  : string = '';
    usage        : string = '';
    name         : string = '';

    examples     : string[] = [];
    aliases      : string[] = [];

    category     : Category;

    numbers      : any[] = [];
    strings      : any[] = [];
    users        : any[] = [];
    ints         : any[] = [];

    voteLocked   : boolean = false;

    constructor(name: string, desc: string, cat: Category) {

        this.description = desc;
        this.name        = name;

        this.category    = cat;
    }

    // default embed util function
    get defaultEmbed() {
        return new EmbedBuilder()
            .setColor('#36393F')
            .setFooter({ text: `${process.env.BOT_NAME} ${this.version} | Prefix: ${this.prefix}`})
            .setTimestamp(new Date())
    }

    // build slash command metadata for our deploy script
    get build() : SlashCommandBuilder {
        const cmd = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);

        for (const num of this.numbers) {
            cmd.addNumberOption(option =>
                option
                    .setName(num.name)
                    .setDescription(num.description)
                    .setRequired(num.required)
            );
        }

        for (const user of this.users) {
            cmd.addUserOption(option =>
                option
                    .setName(user.name)
                    .setDescription(user.description)
                    .setRequired(user.required)
            );
        }

        for (const int of this.ints) {
            cmd.addIntegerOption(option =>
                option
                    .setName(int.name)
                    .setDescription(int.description)
                    .setRequired(int.required)
            );
        }

        for (const str of this.strings) {
            cmd.addStringOption(option =>
                option
                    .setName(str.name)
                    .setDescription(str.description)
                    .setRequired(str.required)
            );
        }

        return cmd;
    }

    // abstract execution func
    async executeCommand(client: Client, msg: Message, args: string[], user ?: any, guild ?: any) : Promise<void> { throw new Error("Method not implemented."); }

    // abstract execution func
    async executeSlashCommand(interaction: Interaction, user ?: any, guild ?: any) : Promise<void> { throw new Error("Method not implemented."); }

}

/*
*   @function getCommands
*   @param log: boolean
*   @returns Command[]
*
*   @description: This function will load all commands from the impl directory and return them in an array.
*   Filtered by .js as it's assuming its reading transpiled code in the "dist" directory post build.
*/
export function getCommands(log: boolean) : Command[] {

    let loadedCommands: Command[] = [];

    for (const cat in Category) {

        const commands = Object.entries(

            RequireAll({

                dirname: path.join(__dirname, `impl/${cat.valueOf().toLowerCase()}`),
                filter: /^(?!-)(.+)\.js$/,
            }),
        );

        commands.forEach((command) => { loadedCommands.push(command[1]); });
    }

    return loadedCommands;
}
