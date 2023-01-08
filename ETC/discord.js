import Discord from "discord.js";
import { TOKEN } from "./env.js";
import { getLocalTemp } from "./crawller.js";
import { Timer } from "./src/timer.js";

function validateContent(content) {
  if (!content.includes("시간") && !content.includes("분")) return false;
  return true;
}

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", async () => {
  console.log("봇이 준비되었습니다.");
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("^^타이머")) {
    const [, content] = message.content.split(" ");

    if (!validateContent(content))
      return message.channel.send(
        `형식을 지켜주세요. (^^타이머 1시간 or ^^타이머 1분)`
      );

    message.channel.send(`⏰ 째깍째깍 ~ 타이머가 시작되었습니다. ⏰`);
    const result = await Timer(content);
    message.channel.send(result);
  }

  if (message.content.startsWith("^^날씨")) {
    const [, area] = message.content.split(" ");
    const result = await getLocalTemp(area);
    message.channel.send(result);
  }

  if (message.content === "^^순서") {
    const arr = ["(~˘▾˘)~♫•*¨얀조*•.¸¸♪", "(っ◔◡◔)っ♥훤민♥"];
    const idx = Math.round(Math.random());
    message.channel.send(`${arr[idx]}님 순서입니다.`);
  }

  if (message.content === "^^test") {
    message.channel.send({ content: "test", files: ["./unnamed.png"] });
  }
});

client.login(TOKEN);
