"use strict";
let config = require("config");
let Bot = config.get("bot");
let ChannelID = config.get("Channels").general;
let SupportID = config.get("Channels").support;
let MasternodeID = config.get("Channels").masternode;
let JoinID = config.get("Channels").joinchannels;
let hasPermsChainster = require("../helpers.js").hasPermsChainster;
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
        let embed = {
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
	
	embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: Bot.iconurl,
                text: "\u00A9 " + Bot.name
            },
            
            fields: [{
                name: "Everyone, please offer feedback or point out corrections as needed here:",
                value: "IMPORTANT: PLEASE NOTE THAT MASTERNODE OPERATORS ARE NOT RECEIVING REGULAR REWARDS DUE TO A NETWORK ISSUE THAT AFFECTS ALL DASH-FORKED COINS. WE HAVE EVALUATED THE PROBLEM AND HAVE DETERMINED THAT THE BEST WAY TO FIX IT IS A MAJOR WALLET UPDATE THAT WILL REQUIRE A HARD FORK. THIS HARD FORK IS CURRENTLY SCHEDULED FOR THE UPCOMING BLOCK HALVING WHICH IS SCHEDULED TO OCCUR AT BLOCK 1401600 IN EARLY MARCH. BUT AS OF THE WRITING OF THIS MESSAGE OUR NEW WALLET IS NOT READY FOR TESTNET. WE WILL UPDATE THIS MESSAGE, AS WELL AS TWEET AND POST IN OUR DISCORD WHEN WE HAVE ADDITIONAL INFORMATION TO SHARE. "
            }, {
                name: "ATTENTION: Please Take A Moment To Read This Important Message.",
                value: "We are grateful you have come to learn more about Chaincoin and our community. We set this message to be Direct Messaged to each new member of our community in a concerted effort to make each of you aware of the above issue. It has also been pinned as our top tweet on Twitter since Dec.7th and it is prominently highlighted on each page of our Masternode section of the [website](https://www.chaincoin.org)."
            }, {
                name: "What are your options if you have purchased Chaincoin to run a Masternode before learning of this block rewards issue for Masternodes?",
                value: "1. You can go ahead and SET UP A MASTERNODE to support the network and earn sporadic and greatly reduced rewards." + "\n" +
                "2. You can HOLD your Chaincoin in the Chaincoin wallet, available on the [website](https://www.chaincoin.org), and wait for the upcoming hardfork to fix the issue." + "\n" +
                "3. You can SELL your Chaincoin and repurchase, if desired, when the upcoming hardfork and fix have gone into effect."
            }, {
                name: "What are your options if you have NOT YET purchased Chaincoin to run a Masternode before learning of this block rewards issue for Masternodes?",
                value: "1. You can PURCHASE CHC at [Cryptopia](https://cryptopia.co.nz/) and join in the community here and contribute to the coins development where you can add value in anticipation of the upcoming hardfork and fix." + "\n" +
                "2. You can decide to NOT purchase CHC and wait for the fix to go into effect which is scheduled for block 1401600 in early March." + "\n\n" +
                "No matter what you decide, we are grateful for your interest and are working diligently towards a resolution to the issue affecting our Masternode holders and the rewards they are receiving in exchange for the services they provide to the network which include Instant Send, Private Send as well as taking part in governance to help decide the development path."
            }]
        };
        member.send({
            embed
        });
    });
};

exports.welcome = {
    usage: "**[@username]**",
    description: "Send welcome message to specified user.\n    This command only can be use in <#" + ChannelID + "> and user has Chainster role",
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

        if (suffix == "") { /*
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
            }); */
            return;
        }
        if (!hasPermsChainster(msg)) {/*
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
            }); */
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
                url: "https://raw.githubusercontent.com/ChainBotMaster/chainbot/master/bot/image/chccoindesignnew-02.png"
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
                url: "https://raw.githubusercontent.com/ChainBotMaster/chainbot/master/bot/image/chcjoinchannel-02.png"
            }

        };
        msg.channel.send({
            embed
        });
        return;
    }
};
