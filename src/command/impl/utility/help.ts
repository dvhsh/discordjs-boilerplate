/*
*
* @file        help.ts
* @author      David (@dvhsh)
* @description Utility | Help Command
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import { Client, EmbedBuilder, Interaction, Message } from "discord.js";
import { Category, Command, CommandOption }           from "@command/command";

export class cHelp extends Command {
    constructor() {

        super("help", "View the help menu.", Category.Utility);

        this.usage = `${this.prefix}help`;
        this.strings = [
            new CommandOption('command', 'Command to view help for.', false)
        ];
    }

    embed(command?: Command): EmbedBuilder {

        const embed = new EmbedBuilder()
            .setColor('#36393F')
            .setFooter({ text: `${process.env.BOT_NAME} ${this.version} | Prefix: ${this.prefix}`})
            .setTitle(`${process.env.BOT_NAME} | Help Menu`)
            .setURL(process.env.FRONTEND_BASE!)
            .setTimestamp(new Date());

        if (command) {

            embed.addFields({
                name: command.usage,
                value: command.description,
                inline: true,
            });

        } else {
            embed.setDescription(`
                **Settings:** \`prefix\` 
                **Utility:** \`help\` \`info\` \`invite\` 
            `);
        }

        return embed;
    }

    async executeSlashCommand(interaction: Interaction): Promise<void> {

        if (interaction.isRepliable() && interaction.isChatInputCommand()) {

            const command = interaction.options.getString('command');

            if (command) {

                const cmd = interaction.client.commands.get(command);

                if (!cmd) {

                    await interaction.reply('Command not found.');
                    return;
                }

                await interaction.reply({ embeds: [this.embed(cmd)] });
                return;
            } else { await interaction.reply({ embeds: [this.embed()] }); }
        }
    }

    async executeCommand(client: Client, msg: Message, args: string[]): Promise<void> {

        if (args.length > 0) {

            const command = client.commands.get(args[0]);

            if (!command) {

                await msg.reply('Command not found.');
                return;
            }

            await msg.reply({ embeds: [this.embed(command)] });
            return;
        } else { await msg.reply({ embeds: [this.embed()] }); }
    }
}

module.exports = new cHelp;

// path : src/command/impl/utility/help.ts
