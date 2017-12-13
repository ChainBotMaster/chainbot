"use strict";
let config = require("config");
let ChannelID = config.get("Channels").general;
let SupportID = config.get("Channels").support;
let MasternodeID = config.get("Channels").masternode;
let hasPerms = require("../helpers.js").hasPerms;
let inPrivate = require("../helpers.js").inPrivate;
exports.custom = [
    "onUserJoin"
];

exports.onUserJoin = function(bot) {
    bot.on("guildMemberAdd", member => {
        const embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                text: "\u00A9 CHCBot"
            },
            author: {
                name: "Welcome to  ChainCoin Discord Community"
            },
            description: 'Welcome to the Chaincoin Community. This is the "Home For Chainsters" from around the world. A place where we come together and collaborate, chat, work, contribute and frankly, cut up and have a great time. ' + "We don't always agree but we do respect diverse views and  work for a greater outcome for all parties involved in ChainCoin and taking this journey with us. Take a few minutes to browse through the channels and see the work happening here. We are always open to new talent joining and contributing your best to the ChainCoin Vision and helping us bring it into reality.   As a new member you can simply enter-->>  **!help**, to get more information and help from our handy CHCBot. Thanks For Dropping By, We Are Glad You Are Here.",
            image: {
                url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png"
            }
        };
        member.send({
            embed
        });
    });
};

exports.commands = [
    "welcome"
];

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
                        icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                        text: "\u00A9 CHCBot"
                    },
                    author: {
                        name: "Oops..."
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
                        icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                        text: "\u00A9 CHCBot"
                    },
                    author: {
                        name: "Oops, Wrong Channel..."
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
                    icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                    text: "\u00A9 CHCBot"
                },
                author: {
                    name: "Oops..."
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
                    icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                    text: "\u00A9 CHCBot"
                },
                author: {
                    name: "Oops..."
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
                icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                text: "\u00A9 CHCBot"
            },
            author: {
                name: "Welcome to the Official ChainCoin Discord."
            },
            description: "<@" + msg.mentions.members.first().id + ">, Welcome to Chaincoin's Discord. You are in our Chainster Chat, Please see <#" + SupportID + "> or <#" + MasternodeID + "> if you need technical support.",
            image: {
                url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png"
            }

        };
        msg.channel.send({
            embed
        });
        return;
    }
};