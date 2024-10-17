const commandInfoMap = {
  ai: {
    name: "ai",
    description: "AI Based on GPT-4",
    guide: "-ai what is life?",
  },
};

const config = {
  name: "help",
  aliases: ["help"],
  version: "1.0",
  description: "View all commands or command details",
  usage: "[command] (optional)",
  credits: "LiANE",
  category: "members",
};

async function onCall({ message, args }) {
  if (args[0]) {
    const command = args[0].toLowerCase();
    if (commandInfoMap[command]) {
      const { name, description, guide } = commandInfoMap[command];
      const response = `━━━━━━━━━━━━━━━━\n𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝙽𝚊𝚖𝚎: ${name}\n𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: ${description}\n𝙶𝚞𝚒𝚍𝚎: ${guide || 'No guide available'}\n━━━━━━━━━━━━━━━━`;
      return message.reply(response);
    } else {
      return message.reply("Command not found.");
    }
  } else {
    const commandsList = `
• 𝗠𝗜𝗚𝗢 𝗔𝗜 𝗦𝗜𝗠𝗣𝗟𝗘 𝗖𝗠𝗗 •
━━━━━━━━━━━━━━━━━━
➜ 𝗮𝗶

➜ 𝗺𝗲𝗿𝗿𝗶𝗮𝗺

➜ 𝘄𝗶𝗸𝗶𝗽𝗲𝗱𝗶𝗮

➜ 𝗵𝗶𝘀𝘁𝗼𝗿𝘆 

➜ 𝗮𝗱𝘃𝗶𝗰𝗲

➜ 𝗴𝗲𝗻𝗱𝗲𝗿

➜ 𝗿𝗶𝗱𝗱𝗹𝗲

➜ 𝗴𝗽𝘁4

➜ 𝗳𝗮𝗰𝘁

➜ 𝗶𝗺𝗮𝗴𝗶𝗻𝗲

➜ 𝘁𝗿𝗶𝘃𝗶𝗮

➜ 𝗯𝗶𝗯𝗹𝗲

➜ 𝘀𝗽𝗼𝘁𝗶𝗳𝘆

➜ 𝗹𝘆𝗿𝗶𝗰𝘀

➜ 𝘁𝗲𝗺𝗽𝗺𝗮𝗶𝗹

➜ 𝘀𝗺𝘀𝗯𝗼𝗺𝗯

➜ 𝗻𝗴𝗹𝘀𝗽𝗮𝗺

━━━━━━━━━━━━━━━━━━
𝘁𝘆𝗽𝗲 𝗵𝗲𝗹𝗽 𝘁𝗼 𝘀𝗲𝗲 𝗴𝘂𝗶𝗱𝗲 𝗼𝗻 𝗰𝗺𝗱
━━━━━━━━━━━━━━━━━━`;

    return message.reply(commandsList);
  }
}

export default {
  config,
  onCall,
};