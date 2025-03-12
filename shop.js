const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('เปิดร้านค้าสำหรับซื้อยศ'),
    async execute(interaction) {
        // สร้าง Embed สำหรับร้านค้า
        const shopEmbed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('🛒 ร้านค้ายศ')
            .setDescription('เลือกยศที่ต้องการซื้อ!')
            .addFields(
                { name: 'ดูอิ่มจุใจ', value: '10 บาท' },
                { name: 'ไฟล์รวม1', value: '10 บาท' },
                { name: 'ไฟล์รวม2', value: '20 บาท' },
                { name: 'ไฟล์รวม3', value: '25 บาท' },
                { name: 'ไฟล์รวม4', value: '35 บาท' },
                { name: 'ไฟล์รวม5', value: '45 บาท' },
                { name: 'ไฟล์รวม6', value: '60 บาท' },
                { name: 'ไฟล์รวม7', value: '90 บาท' },
                { name: 'รวมคลิป', value: 180 บาท },
            )
            .setThumbnail('https://cdn.discordapp.com/attachments/1254756187065548831/1349407134776823829/CD_20250312_223339_0000.png?ex=67d2fcd3&is=67d1ab53&hm=91d481a3826b0f1c1e50bff58f62f0b1bf27c9d1378f920feb6644a7feb584bd&') // รูปภาพเล็ก
            .setImage('https://cdn.discordapp.com/attachments/1254756187065548831/1349407119031402537/A4__20250312_224127_0000.png?ex=67d2fccf&is=67d1ab4f&hm=95edd6e396abb48ab0f30ba6e64d7ba234fa675d01323708ed1d458457e74517&'); // รูปภาพใหญ่

        // ส่ง Embed ไปที่ช่องที่คำสั่งถูกเรียก
        await interaction.reply({ embeds: [shopEmbed] });
    }
};
