module.exports = {
  config: {
    credits: "SARDAR RDX",
    name: "goibot",
    eventType: "message",
    description: "Jab koi 'bot' kahe, bot user ko mention kar ke reply karta hai."
  },

  async run({ api, event }) {
    const { threadID, messageID, body, senderID } = event;
    if (!body) return;

    const botID = api.getCurrentUserID();
    if (String(senderID) === String(botID)) return;

    const lower = body.toLowerCase().trim();

    const triggers = ["bot", "goibot", "hey bot", "oi bot", "oy bot", "boti", "botu"];
    const triggered = triggers.some(t =>
      lower === t ||
      lower.startsWith(t + " ") ||
      lower.endsWith(" " + t) ||
      lower.includes(" " + t + " ")
    );
    if (!triggered) return;

    const msgs = [
      "Washroom Jao yaha nhi kr dena 😾",
      "Haldi Lgana ki omer ma larkiya chuna lga rahi han 🤭",
      "Shakal achi nhi banda bat achi kr leta ha 😂",
      "aby ruk tare to bot bot krta rehta 😾",
      "Raja ka hon i smjh 🌚",
      "Mujha bta tera masla kia 😑",
      "Kon sa kera kat RHA ry teko 😤",
      "Janam auo na kbhi khushbo lga KA side pa 🤭",
      "time dekh or harkty dekh 😾",
      "Gory Gory mukhry pa kala kala chashma 😎",
      "Number do Raat ko babu shona kry gy 🙈",
      "Gongi Bhi bot bol rhi thi 😒",
      "Aik jhapar lgy ga Sara bot nikl JYE ga 👋",
      "Pkg Lagwa do Jano intezar kr Rahi hogi 🕵️‍♂️",
      "Lagta Tmha mirchi Lagi ha 🔥",
      "Naha kr aao badbo a rahi tmsa 🤭",
      "Acha acha samajh gaya bolo 😏",
      "Tang kiya to Raja boss ko bta donga 🤗",
      "Charsi lagta ha to mja 🧐",
      "Bahir aker dant tor donga tere 😾",
      "I love u jano Aga bolo 😘",
      "Abhi available hun thodi der ke liye 😌",
      "Bilo Nach warna goli mar donga tjha😾",
      "Kali Biwi milygi tjha 🤔",
      "Lagta ha bari zor ki i ha 😹",
      "Haan haan bolo kia kehna tha 😑",
      "Wife ka sath date pa giya jiski thi osna dekh liya😤",
      "Mera Boss Raja ha bus osi ka hon ma ❤️",
      "Mil le pehle phir baat karna 😒",
      "Kolkhuwani ka chawalo ka v apna maza ha  😋"
    ];

    const replyText = msgs[Math.floor(Math.random() * msgs.length)];

    try {
      let name = 'Jan';
      try {
        const info = await Promise.race([
          new Promise((resolve, reject) => {
            api.getUserInfo(senderID, (err, data) => err ? reject(err) : resolve(data));
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 4000))
        ]);
        if (info && info[senderID]) {
          const n = info[senderID].name || info[senderID].firstName || 'Jan';
          name = n.length > 10 ? n.substring(0, Math.ceil(n.length / 2)) : n;
        }
      } catch {}

      const tag = `@${name}`;
      const fullMsg = `${tag} ${replyText}`;

      api.sendMessage(
        { body: fullMsg, mentions: [{ tag, id: senderID, fromIndex: 0 }] },
        threadID,
        (sendErr) => {
          if (sendErr) api.sendMessage(replyText, threadID);
        },
        messageID
      );
    } catch (e) {
      try { api.sendMessage(replyText, threadID); } catch {}
    }
  }
};
