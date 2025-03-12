const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: "topup",
    description: "เติมเงินเพื่อรับยศ",
    data: new SlashCommandBuilder()
        .setName("topup")
        .setDescription("เติมเงินผ่าน TrueMoney Wallet เพื่อรับยศ"),
    
    run: async (client, interaction) => {
        // สร้าง Modal ให้ผู้ใช้กรอกลิงก์ซองอั่งเปา
        const modal = new ModalBuilder()
            .setCustomId('topup_modal')
            .setTitle('เติมเงิน TrueMoney Wallet');

        const codeInput = new TextInputBuilder()
            .setCustomId('codeInput')
            .setLabel("ลิ้งค์ซองอังเปา")
            .setPlaceholder('https://gift.truemoney.com/campaign/?v=xxxxxxxxxxxxxxx')
            .setStyle(TextInputStyle.Short);

        const actionRow = new ActionRowBuilder().addComponents(codeInput);
        modal.addComponents(actionRow);
        
        await interaction.showModal(modal);
    }
};