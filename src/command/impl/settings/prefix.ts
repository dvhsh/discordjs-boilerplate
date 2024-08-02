/*
*
* @file        prefix.ts
* @author      David (@dvhsh)
* @description Guild prefix setting command
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import { Interaction, Client, Message, PermissionsBitField } from "discord.js";

import { Category, Command, CommandOption }                  from "@command/command";
import { setGuildPrefix }                                    from "@util/uWrapper"

export class cPrefix extends Command {

    constructor() {

        super("prefix", "Get or set the current guild prefix.", Category.Settings);

        this.usage   = `${this.prefix}prefix <value>`;
        this.strings = [
            new CommandOption('value', 'New prefix to set.', true)
        ];
    }

    async executeSlashCommand(interaction: Interaction, u: any, g: any): Promise<void> {

        if (interaction.isRepliable() && interaction.isChatInputCommand()) {

            const prefix = interaction.options.getString('value');

            if (prefix) {

                // check if user has manage guild perms
                const member = await interaction.guild?.members.fetch(interaction.user.id);
                if (!member?.permissions.has(PermissionsBitField.Flags.ManageGuild)) {

                    await interaction.reply('You do not have permission to use this command.');
                    return;
                }

                await setGuildPrefix(g.id, prefix);
                await interaction.reply(`Prefix set to \`${prefix}\``);
                return;
            }
        } else if (interaction.isRepliable()) {

            await interaction.reply(`Prefix for this guild is \`${g.prefix}\``);
            return;
        }
    }

    async executeCommand(client: Client, msg: Message, args: string[], u: any, g: any): Promise<void> {

        const prefix = args[0];

        if (prefix) {

            const member = await msg.guild?.members.fetch(msg.author.id);
            if (!member?.permissions.has(PermissionsBitField.Flags.ManageGuild)) {

                await msg.reply('You do not have permission to use this command.');
                return;
            }

            await setGuildPrefix(g.id, prefix);
            await msg.reply(`Prefix set to \`${prefix}\``);
            return;
        }

        await msg.reply(`Prefix for this guild is \`${g.prefix}\``);
    }
}

module.exports = new cPrefix;