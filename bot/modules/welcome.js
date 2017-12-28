"use strict";
let config = require("config");
let Bot = config.get("bot");
let ChannelID = config.get("Channels").general;
let SupportID = config.get("Channels").support;
let MasternodeID = config.get("Channels").masternode;
let JoinID = config.get("Channels").joinchannels;
let hasPerms = require("../helpers.js").hasPerms;
let inPrivate = require("../helpers.js").inPrivate;
exports.custom = [
    "onUserJoin"
];


exports.commands = [
    "welcome",
	"join"
];

exports.onUserJoin = function(bot) {
    bot.on("guildMemberAdd", member => {
        const embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: Bot.iconurl,
                text: "\u00A9 " + Bot.name
            },
            author: {
                name: "Welcome to  ChainCoin Discord Community"
            },
            description: 'Welcome to the Chaincoin Community. This is the "Home For Chainsters" from around the world. A place where we come together and collaborate, chat, work, contribute and frankly, cut up and have a great time. ' + "We don't always agree but we do respect diverse views and  work for a greater outcome for all parties involved in ChainCoin and taking this journey with us. Take a few minutes to browse through the channels and see the work happening here. We are always open to new talent joining and contributing your best to the ChainCoin Vision and helping us bring it into reality.   As a new member you can simply enter-->>  **!help**, to get more information and help from our handy CHCBot. Thanks For Dropping By, We Are Glad You Are Here.",
            image: {
                url: Bot.iconurl
            }
        };
        member.send({
            embed
        });
    });
};

exports.welcome = {
    usage: "**[@username]**",
    description: "Send welcome message to specified user.\n    This command only can be use in <#" + ChannelID + "> and people has role as Moderator & Chainster",
    process: function(bot, msg, suffix) {
        let embed;
        if (!ChannelID.includes(msg.channel.id) || inPrivate(msg)) {
            if (inPrivate(msg)) {
                embed = {
                    color: 1741945,
                    timestamp: new Date(),
                    footer: {
                        icon_url: Bot.iconurl,
                        text: "\u00A9 " + Bot.name
                    },
                    author: {
                        name: "Woops..."
                    },
                    description: "Command cannot be used in a DM.\nPlease use <#" + ChannelID + ">."
                };
                msg.channel.send({
                    embed
                });
                return;
            } else if (!ChannelID.includes(msg.channel.id)) {
                embed = {
                    color: 1741945,
                    timestamp: new Date(),
                    footer: {
                        icon_url: Bot.iconurl,
                        text: "\u00A9 " + Bot.name
                    },
                    author: {
                        name: "Woops, Wrong Channel..."
                    },
                    description: "Please use <#" + ChannelID + ">."
                };
                msg.channel.send({
                    embed
                });
                return;
            }
        }

        if (suffix == "") {
            embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Woops..."
                },
                description: "No user defined."
            };
            msg.channel.send({
                embed
            });
            return;
        }
        if (!hasPerms(msg)) {
            embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Woops..."
                },
                description: "You Don't Have Permission To Use This Command!"
            };
            msg.channel.send({
                embed
            });
            return;
        }
        embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: Bot.iconurl,
                text: "\u00A9 " + Bot.name
            },
            author: {
                name: "Welcome to the Official ChainCoin Discord."
            },
            description: "<@" + msg.mentions.members.first().id + ">, Welcome to Chaincoin's Discord. You are in our Chainster Chat, Please see <#" + SupportID + "> or <#" + MasternodeID + "> if you need technical support.",
            image: {
                url: Bot.iconurl
            }

        };
        msg.channel.send({
            embed
        });
        return;
    }
};

exports.join = {
    usage: "",
    description: "Send join channel message",
    process: function(bot, msg, suffix) {
        const embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: Bot.iconurl,
                text: "\u00A9 " + Bot.name
            },
            description: "You Can Join EVEN MORE Channels in <#" + JoinID + ">",
            image: {
                url: "https://raw.githubusercontent.com/ChainBotMaster/chainbot/master/bot/image/chcjoinchannel-01.png"
            }

        };
        msg.channel.send({
            embed
        });
        return;
    }
};
