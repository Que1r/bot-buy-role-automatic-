const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "help",
    description: "ดูรายการยศและราคา",
    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("🛒 รายการยศที่มีจำหน่าย")
            .setDescription(`
            💰 **ดูอิ่มจุใจ** - 10 บาท  
            💰 **ไฟล์รวม1** - 10 บาท  
            💰 **ไฟล์รวม2** - 20 บาท  
            💰 **ไฟล์รวม3** - 25 บาท  
            💰 **ไฟล์รวม4** - 35 บาท  
            💰 **ไฟล์รวม5** - 45 บาท  
            💰 **ไฟล์รวม6** - 60 บาท  
            💰 **ไฟล์รวม7** - 90 บาท  
            💰 **รวมคลิป** - 180 บาท  
            `)
            .setFooter({ text: "ใช้ปุ่มด้านล่างเพื่อซื้อยศ" });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};