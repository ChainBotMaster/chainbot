"use strict";

// Load up libraries
const Discord = require("discord.js");
const NodeCache = require("node-cache");
require('console-stamp')(console, {
    pattern: 'dd/mm/yyyy HH:MM:ss.l'
});
// Load config!
let config = require("config");
let Bot = config.get("bot");
let ChannelID = config.get("Channels").joinchannels;

const myCache = new NodeCache({
    stdTTL: 600,
    checkperiod: 1
});

var aliases;
try {
    aliases = require("./alias.json");
} catch (e) {
    //No aliases defined
    aliases = {
        test: {
            process: function(bot, msg) {
                msg.channel.send("test");
            }
        }
    };
}
var commands = {
    ping: {
        description: "responds pong, useful for checking if bot is alive",
        process: async function(bot, msg, suffix) {
            let m = await msg.channel.send(msg.author + " Ping?");
            m.edit(
                `Pong! Latency is ${m.createdTimestamp -
          msg.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`
            );
            if (suffix) {
                msg.channel.send("note that !ping takes no arguments!");
            }
        }
    }
};

var bot = new Discord.Client();
var joinmsgid1 = null;
var joinmsgid2 = null;
var joinmsgid3 = null;

bot.on('messageReactionAdd', async (reaction, user) => {

    if (user.id === bot.user.id)
        return;

    if (user.bot && user.id !== bot.user.id)
        return;

    let member = await reaction.message.guild.fetchMember(user);
    if (reaction.message.id == joinmsgid1) {
        if (reaction.emoji.id === "390878445309132800") { // Mining
            member.addRole("390882049587937280");
        } else if (reaction.emoji.id === "390878479492579332") { // Marketplace
            member.addRole("390882132064600064");
        } else if (reaction.emoji.id === "390878529295745035") { // Chaintipster
            member.addRole("390882206626873384");
        } else if (reaction.emoji.id === "390878573331742750") { // Altcoins
            member.addRole("390882258149572617");
        } else if (reaction.emoji.name === "ðŸ¤”") { // Memes
            member.addRole("390882335551389697");
        }
        return;
    }
    if (reaction.message.id == joinmsgid2) {
        if (reaction.emoji.id === "390878635437064193") { // Github-updates
            member.addRole("390882439528054785");
        } else if (reaction.emoji.id === "390878688935411722") { // Development
            member.addRole("390882465830666240");
        } else if (reaction.emoji.id === "390878926379155456") { // Pre-proposal-feedback
            member.addRole("390882566502350848");
        } else if (reaction.emoji.id === "390878915222306827") { // Code-testing
            member.addRole("390882512718659585");
        } else if (reaction.emoji.id === "390879200724385792") { // Whitepaper-collaboration
            member.addRole("390883013166104587");
        } else if (reaction.emoji.id === "390879244038832128") { // Marketing
            member.addRole("390883034712375297");
        } else if (reaction.emoji.id === "390879271796867092") { // Webdev
            member.addRole("390883056984129537");
        } else if (reaction.emoji.id === "390879339975147520") { // Designs
            member.addRole("390883083987058688");
        } else if (reaction.emoji.id === "390879386389315594") { // Exchanges
            member.addRole("390883116392251393");
        } else if (reaction.emoji.id === "390879436083560450") { // Media
            member.addRole("390883169165115414");
        }
        return;
    }
    if (reaction.message.id == joinmsgid3) {
        if (reaction.emoji.name === "ðŸ‡¨ðŸ‡³") { // China flag
            member.addRole("390894220350849024"); // Role id
        } else if (reaction.emoji.name === "ðŸ‡·ðŸ‡º") { // Russia flag
            member.addRole("390894592410517505");
        } else if (reaction.emoji.name === "ðŸ‡ªðŸ‡¸") { // Spain flag
            member.addRole("390894186397696001");
        } else if (reaction.emoji.name === "ðŸ‡©ðŸ‡ª") { // German flag
            member.addRole("390894255838593024");
        } else if (reaction.emoji.name === "ðŸ‡«ðŸ‡·") { // France flag
            member.addRole("390894611050004490");
        }
        return;
    }

});

bot.on('messageReactionRemove', async (reaction, user) => {

    if (user.id === bot.user.id)
        return;

    if (user.bot && user.id !== bot.user.id)
        return;

    let member = await reaction.message.guild.fetchMember(user);
    if (reaction.message.id == joinmsgid1) {
        if (reaction.emoji.id === "390878445309132800") { // Mining
            member.removeRole("390882049587937280");
        } else if (reaction.emoji.id === "390878479492579332") { // Marketplace
            member.removeRole("390882132064600064");
        } else if (reaction.emoji.id === "390878529295745035") { // Chaintipster
            member.removeRole("390882206626873384");
        } else if (reaction.emoji.id === "390878573331742750") { // Altcoins
            member.removeRole("390882258149572617");
        } else if (reaction.emoji.name === "ðŸ¤”") { // Memes
            member.removeRole("390882335551389697");
        }
        return;
    }
    if (reaction.message.id == joinmsgid2) {
        if (reaction.emoji.id === "390878635437064193") { // Github-updates
            member.removeRole("390882439528054785");
        } else if (reaction.emoji.id === "390878688935411722") { // Development
            member.removeRole("390882465830666240");
        } else if (reaction.emoji.id === "390878926379155456") { // Pre-proposal-feedback
            member.removeRole("390882566502350848");
        } else if (reaction.emoji.id === "390878915222306827") { // Code-testing
            member.removeRole("390882512718659585");
        } else if (reaction.emoji.id === "390879200724385792") { // Whitepaper-collaboration
            member.removeRole("390883013166104587");
        } else if (reaction.emoji.id === "390879244038832128") { // Marketing
            member.removeRole("390883034712375297");
        } else if (reaction.emoji.id === "390879271796867092") { // Webdev
            member.removeRole("390883056984129537");
        } else if (reaction.emoji.id === "390879339975147520") { // Designs
            member.removeRole("390883083987058688");
        } else if (reaction.emoji.id === "390879386389315594") { // Exchanges
            member.removeRole("390883116392251393");
        } else if (reaction.emoji.id === "390879436083560450") { // Media
            member.removeRole("390883169165115414");
        }
        return;
    }
    if (reaction.message.id == joinmsgid3) {
        if (reaction.emoji.name === "ðŸ‡¨ðŸ‡³") { // China flag
            member.removeRole("390894220350849024"); // Role id
        } else if (reaction.emoji.name === "ðŸ‡·ðŸ‡º") { // Russia flag
            member.removeRole("390894592410517505");
        } else if (reaction.emoji.name === "ðŸ‡ªðŸ‡¸") { // Spain flag
            member.removeRole("390894186397696001");
        } else if (reaction.emoji.name === "ðŸ‡©ðŸ‡ª") { // German flag
            member.removeRole("390894255838593024");
        } else if (reaction.emoji.name === "ðŸ‡«ðŸ‡·") { // France flag
            member.removeRole("390894611050004490");
        }
        return;
    }
});

bot.on("ready", async function() {
    console.log(
        "Logged in! Serving in " + bot.guilds.array().length + " servers"
    );
    require("./plugins.js").init();
    console.log("type " + Bot.prefix + "help in Discord for a commands list.");
    bot.user.setGame(Bot.prefix + "help");

    let msglist = await bot.channels.get(ChannelID).fetchMessages();
    bot.channels.get(ChannelID).bulkDelete(msglist);

    let embed = {
        timestamp: new Date(),
        footer: {
            icon_url: Bot.iconurl,
            text: "\u00A9 " + Bot.name
        },
        author: {
            name: "Join Channels Instruction."
        },
        description: 'Welcome to the Chaincoin Discord! Please select the channels YOU are interested in following. JOIN by "Clicking On" the corresponding emoji **below the message**. Deselecting the emoji will remove the channel from your view.'
    };

    await bot.channels.get(ChannelID)
        .send({
            embed
        });

    embed = {
        timestamp: new Date(),
        footer: {
            icon_url: Bot.iconurl,
            text: "\u00A9 " + Bot.name
        },
        description: "__**[ Chain General & Chat ]**__ \n\n" +
            "**Mining**  <:mining:390878445309132800> \n\n" +
            "**Marketplace **  <:marketplace:390878479492579332> \n\n" +
            "**Chaintipster**  <:chaintipster:390878529295745035> \n\n" +
            "**Altcoins**  <:altcoins:390878573331742750> \n\n" +
			"**Memes**  :thinking:"
    };

    let msg1 = await bot.channels.get(ChannelID)
        .send({
            embed
        });

	await msg1.react(bot.emojis.get("390878445309132800"));
	await msg1.react(bot.emojis.get("390878479492579332"));
	await msg1.react(bot.emojis.get("390878529295745035"));
	await msg1.react(bot.emojis.get("390878573331742750")); 
	await msg1.react("ðŸ¤”");
	
    embed = {
        timestamp: new Date(),
        footer: {
            icon_url: Bot.iconurl,
            text: "\u00A9 " + Bot.name
        },
        description: "__**[ Chain Development ]**__ \n\n" +
            "**Github-updates**  <:github:390878635437064193> \n\n" +
            "**Development**  <:dev:390878688935411722> \n\n" +
            "**Pre-proposal-feedback**  <:feedback:390878926379155456> \n\n" +
            "**Code-testing**  <:codetest:390878915222306827> \n\n" +
            "**Whitepaper-collaboration**  <:whitepaper:390879200724385792> \n\n" +
            "**Marketing**  <:marketing:390879244038832128> \n\n" +
            "**Webdev**  <:webdev:390879271796867092> \n\n" +
            "**Designs**  <:design:390879339975147520> \n\n" +
            "**Exchanges**  <:exchanges:390879386389315594> \n\n" +
            "**Media**  <:media:390879436083560450> "
    };

    let msg2 = await bot.channels.get(ChannelID)
        .send({
            embed
        });

	await msg2.react(bot.emojis.get("390878635437064193"));
	await msg2.react(bot.emojis.get("390878688935411722"));
	await msg2.react(bot.emojis.get("390878926379155456"));
	await msg2.react(bot.emojis.get("390878915222306827"));
	await msg2.react(bot.emojis.get("390879200724385792"));
	await msg2.react(bot.emojis.get("390879244038832128"));
	await msg2.react(bot.emojis.get("390879271796867092"));
	await msg2.react(bot.emojis.get("390879339975147520"));
	await msg2.react(bot.emojis.get("390879386389315594"));
	await msg2.react(bot.emojis.get("390879436083560450"));
		
    embed = {
        timestamp: new Date(),
        footer: {
            icon_url: Bot.iconurl,
            text: "\u00A9 " + Bot.name
        },
        description: "__**[ Chain International ]**__ \n\n" +
            "**Espanol**  :flag_es: \n\n" +
            "**Chinese**  :flag_cn: \n\n" +
            "**German**  :flag_de: \n\n" +
            "**Russian**  :flag_rs: \n\n" +
            "**French**  :flag_fr: "
    };

    let msg3 = await bot.channels.get(ChannelID)
        .send({
            embed
        });

	await msg3.react("ðŸ‡¨ðŸ‡³");
	await msg3.react("ðŸ‡·ðŸ‡º");
	await msg3.react("ðŸ‡ªðŸ‡¸");
	await msg3.react("ðŸ‡©ðŸ‡ª");
	await msg3.react("ðŸ‡«ðŸ‡·");
	
    joinmsgid1 = msg1.id;
    joinmsgid2 = msg2.id;
    joinmsgid3 = msg3.id;
});

bot.on("disconnected", function() {
    console.log("Disconnected!");
    myCache.close();
    process.exit(1); //exit node.js with an error
});

function checkMessageForCommand(msg, isEdit) {
    myCache.set(msg.author.id);
    //check if message is a command
    if (msg.author.id != bot.user.id && msg.content.startsWith(Bot.prefix)) {
        console.log(
            "treating " +
            msg.content +
            " from UserID:" +
            msg.author +
            " || UserName: " +
            msg.author.username +
            " as command"
        );
        var cmdTxt = msg.content.split(" ")[0].substring(Bot.prefix.length).toLowerCase();
        var suffix = msg.content.substring(
            cmdTxt.length + Bot.prefix.length + 1
        ).toLowerCase();
        //-- break
        //add one for the ! and one for the space
        /*   if (msg.isMentioned(bot.user)) {
             try {
               cmdTxt = msg.content.split(" ")[1];
               suffix = msg.content.substring(
                 bot.user.mention().length + cmdTxt.length + Bot.prefix.length + 1
               );
             } catch (e) {
               //no command
               msg.channel.send("Yes?");
               return;
             }
           } */
        let alias = aliases[cmdTxt];
        if (alias) {
            var cmd = alias;
        } else {
            var cmd = commands[cmdTxt];
        }
        if (cmdTxt === "help") {
            //help is special since it iterates over the other commands
            if (suffix) {
                var cmds = suffix.split(" ").filter(function(cmd) {
                    return commands[cmd];
                });
                var info = "";
                for (var i = 0; i < cmds.length; i++) {
                    var cmd = cmds[i];
                    info += "**" + Bot.prefix + cmd + "**";
                    var usage = commands[cmd].usage;
                    if (usage) {
                        info += " " + usage;
                    }
                    var description = commands[cmd].description;
                    if (description instanceof Function) {
                        description = description();
                    }
                    if (description) {
                        info += "\n\t" + description;
                    }
                    info += "\n";
                }
                msg.channel.send(info);
            } else {
                msg.author.send("**Available Commands:**").then(function() {
                    var batch = "";
                    var sortedCommands = Object.keys(commands).sort();
                    for (var i in sortedCommands) {
                        var cmd = sortedCommands[i];
                        var info = "**" + Bot.prefix + cmd + "**";
                        var usage = commands[cmd].usage;
                        if (usage) {
                            info += " " + usage;
                        }
                        var description = commands[cmd].description;
                        if (description instanceof Function) {
                            description = description();
                        }
                        if (description) {
                            info += "\n\t" + description;
                        }
                        var newBatch = batch + "\n" + info;
                        if (newBatch.length > 1024 - 8) {
                            //limit message length
                            msg.author.send(batch);
                            batch = info;
                        } else {
                            batch = newBatch;
                        }
                    }
                    if (batch.length > 0) {
                        msg.author.send(batch);
                    }
                });
            }
        } else if (cmd) {
            // Add permission check here later on ;)
            try {
                cmd.process(bot, msg, suffix, isEdit, myCache);
            } catch (e) {
                var msgTxt = "command " + cmdTxt + " failed :(";
                if (Bot.debug) {
                    msgTxt += "\n" + e.stack;
                }
                msg.channel.send(msgTxt);
            }
        } else {
            msg.channel
                .send(cmdTxt + " not recognized as a command!\nPlease use **!help** for a list of all available commands.")
                .then(message => message.delete(10000));
        }
    } else {
        //message isn't a command or is from us
        //drop our own messages to prevent feedback loops
        if (msg.author == bot.user) {
            return;
        }

        if (msg.author != bot.user && msg.isMentioned(bot.user)) {
            //msg.channel.send("yes?"); //using a mention here can lead to looping
            msg.author.send("**Available Commands:**").then(function() {
                var batch = "";
                var sortedCommands = Object.keys(commands).sort();
                for (var i in sortedCommands) {
                    //console.log(sortedCommands[i]);
                    var cmd = sortedCommands[i];
                    var info = "**" + Bot.prefix + cmd + "**";
                    var usage = commands[cmd].usage;
                    if (usage) {
                        info += " " + usage;
                    }
                    var description = commands[cmd].description;
                    if (description instanceof Function) {
                        description = description();
                    }
                    if (description) {
                        info += "\n\t" + description;
                    }
                    var newBatch = batch + "\n" + info;
                    if (newBatch.length > 1024 - 8) {
                        //limit message length
                        msg.author.send(batch);
                        batch = info;
                    } else {
                        batch = newBatch;
                    }
                }
                if (batch.length > 0) {
                    msg.author.send(batch);
                }
            });
        } else {}
    }
}

bot.on("message", msg => checkMessageForCommand(msg, false));
bot.on("messageUpdate", (oldMessage, newMessage) => {
    checkMessageForCommand(newMessage, true);
});

exports.addCommand = function(commandName, commandObject) {
    try {
        commands[commandName] = commandObject;
    } catch (err) {
        console.log(err);
    }
};
exports.addCustomFunc = function(customFunc) {
    try {
        customFunc(bot);
    } catch (err) {
        console.log(err);
    }
};
exports.commandCount = function() {
    return Object.keys(commands).length;
};

bot.login(Bot.token);
