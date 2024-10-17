const axios = require('axios');

module.exports = {
  name: 'ai',
  description: "Gpt architecture",
  author: 'KA Tian JHYY',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    let userInput = args.join(" ").trim();

    // If there's a message reply, append it to user input
    if (userInput === '' && messageReply) {
      const repliedMessage = messageReply.body;
      userInput = `${repliedMessage} ${userInput}`;
    }

    if (!userInput) {
      return sendMessage(senderId, { text: 'Usage: ai [your question]' }, pageAccessToken);
    }

    sendMessage(senderId, { text: '🕧 | 𝗦𝗲𝗮𝗿𝗰𝗵𝗶𝗻𝗴 𝗳𝗼𝗿 𝗮𝗻 𝗮𝗻𝘀𝘄𝗲𝗿 𝗽𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁...' }, pageAccessToken);

    // Delay before sending request
    await new Promise(resolve => setTimeout(resolve, 2000));

    const gpt4_api = `https://personal-ai-phi.vercel.app/kshitiz?prompt=${encodeURIComponent(userInput)}&content=${encodeURIComponent("you are an AI assistant")}`;

    try {
      const response = await axios.get(gpt4_api);

      if (response.data && response.data.code === 2 && response.data.message === "success") {
        const generatedText = response.data.answer;
        const responseTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila', hour12: true });

        const userName = `User ${senderId}`; // Replace with user fetching logic if needed

        const formattedResponse = `🤖 𝗠𝗜𝗡𝗚 𝗔𝗦𝗦𝗜𝗦𝗧𝗔𝗡𝗧 😼\n━━━━━━━━━━━━━━━━━━\n${generatedText}\n━━━━━━━━━━━━━━━━━━\n🗣𝗔𝘀𝗸𝗲𝗱 𝗕𝘆: ${userName}\n⏰ 𝗥𝗲𝘀𝗽𝗼𝗻𝗱 𝗧𝗶𝗺𝗲: ${responseTime}
━━━━━━━━━━━━━━━━━━`;

        const maxMessageLength = 2000;
        if (formattedResponse.length > maxMessageLength) {
          const messages = splitMessageIntoChunks(formattedResponse, maxMessageLength);
          for (const message of messages) {
            sendMessage(senderId, { text: message }, pageAccessToken);
          }
        } else {
          sendMessage(senderId, { text: formattedResponse }, pageAccessToken);
        }
      } else {
        sendMessage(senderId, { text: '❌ An error occurred while generating the text response. Please try again later.' }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error:', error);
      sendMessage(senderId, { text: `❌ An error occurred while generating the text response. Error: ${error.message}` }, pageAccessToken);
    }
  }
};

function splitMessageIntoChunks(message, chunkSize) {
  const chunks = [];
  for (let i = 0; i < message.length; i += chunkSize) {
    chunks.push(message.slice(i, i + chunkSize));
  }
  return chunks;
}
