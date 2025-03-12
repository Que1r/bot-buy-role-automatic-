require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const fs = require('fs');
const tw = require('@fortune-inc/tw-voucher');
const config = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.on("ready", async () => {
    console.log(`✅ บอทออนไลน์: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "ซื้อยศ") {
        const modal = new ModalBuilder()
            .setCustomId('topup')
            .setTitle('เติมเงิน TrueMoney');
        
        const codeInput = new TextInputBuilder()
            .setCustomId('codeInput')
            .setLabel("ลิ้งค์ซองอังเปา")
            .setPlaceholder('https://gift.truemoney.com/campaign/?v=xxxxxxxxxxxxxxx')
            .setStyle(TextInputStyle.Short);

        const actionRow = new ActionRowBuilder().addComponents(codeInput);
        modal.addComponents(actionRow);
        await interaction.showModal(modal);
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    
    if (interaction.customId === "topup") {
        const codeInput = interaction.fields.getTextInputValue('codeInput');
        if (!codeInput.includes("https://gift.truemoney.com/campaign/?v")) {
            return await interaction.reply({
                embeds: [new EmbedBuilder().setColor("Red").setDescription('❌ ลิ้งค์ผิดหรือใช้ไปแล้ว')],
                ephemeral: true
            });
        }

        tw(config.wallet_phone, codeInput).then(async re => {
            const amount = re.amount.toString();
            if (config.roles[amount]) {
                await interaction.member.roles.add(config.roles[amount]);
                await interaction.reply({ embeds: [new EmbedBuilder().setColor("Green").setDescription(`✅ เติมเงินสำเร็จ ${re.amount} บาท`)], ephemeral: true });

                const logChannel = interaction.guild.channels.cache.get(config.channellog);
                if (logChannel) {
                    logChannel.send({
                        embeds: [new EmbedBuilder().setDescription(`💰 **เติมเงินสำเร็จ**: ${re.amount} บาท\n👤 โดย: <@${interaction.user.id}>`).setColor("Green")]
                    });
                }
            } else {
                await interaction.reply({ embeds: [new EmbedBuilder().setColor("Red").setDescription("❌ ยอดเงินไม่ตรงกับแพ็กเกจ")], ephemeral: true });
            }
        }).catch(async () => {
            await interaction.reply({ embeds: [new EmbedBuilder().setColor("Red").setDescription("❌ ลิงค์ผิดหรือใช้ไปแล้ว")], ephemeral: true });
        });
    }
});

client.login(process.env.TOKEN);