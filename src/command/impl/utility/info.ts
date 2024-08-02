/*
*
* @file        info.ts
* @author      David (@dvhsh)
* @description Utility | Info / Statistic Command
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import { EmbedBuilder, Interaction, Client, Message } from "discord.js";
import { Category, Command }                          from "@command/command";

export class cInfo extends Command {

    constructor() {
        super("info", "Get current performance metrics.", Category.Utility);
        this.usage = `${this.prefix}info`
    }

    embed(client: Client) {
        return new EmbedBuilder()
            .setColor('#36393F')
            .setFooter({ text: `${process.env.BOT_NAME} ${this.version} | Prefix: ${this.prefix}`})
            .setTitle(`${process.env.BOT_NAME} | Current Statistics`)
            .setURL(process.env.FRONTEND_BASE!)
            .setTimestamp(client.readyAt)
            .addFields({
                    name: 'Memory Usage',
                    value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb / ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)}mb`,
                    inline: true,
                },
                {
                    name: 'Uptime',
                    value: `${Math.floor(process.uptime() / 86400)}d ${Math.floor(process.uptime() / 3600) % 24}h ${Math.floor(process.uptime() / 60) % 60}m ${Math.floor(process.uptime()) % 60}s`,
                    inline: true,
                },
                {
                    name : 'Ping',
                    value: `${Math.floor(client.ws.ping)}ms`,
                    inline: true,
                })
    }

    async executeSlashCommand(interaction: Interaction): Promise<void> {
        if (interaction.isRepliable())
            await interaction.reply({ embeds: [this.embed(interaction.client)]});
    }

    async executeCommand(client: Client, msg: Message, args: string[]): Promise<void> {
        await msg.reply({ embeds: [this.embed(client)]});
    }
}

module.exports = new cInfo;

// path : src/command/impl/utility/info.ts
