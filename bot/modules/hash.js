"use strict";
let needle = require("needle");
let config = require("config");
let Bot = config.get("bot");
let ChannelID = config.get("Channels").mining;
let inPrivate = require("../helpers.js").inPrivate;

exports.commands = [
    "hash"
];

exports.custom = [
    "timedhash"
];

exports.timedhash = function(bot) {
    setInterval(function() {
        sendMiningInfo(bot);
    }, 24 * 60 * 60 * 1000); //24 * 60 * 60 * 1000

    function sendMiningInfo(bot) {
        let embed;
        needle.get("http://104.238.153.140:3001/api/getblockcount", function(error, response) {
            if (error || response.statusCode !== 200) {
                embed = {
                    color: 1741945,
                    timestamp: new Date(),
                    footer: {
                        icon_url: Bot.iconurl,
                        text: "\u00A9 " + Bot.name
                    },
                    fields: [{
                        name: "Woops,",
                        value: "Explorer API is not available."
                    }]
                };
                bot.channels.get(ChannelID).send({
                    embed
                });
            } else {
                let height = Number(response.body);
                needle.get("http://104.238.153.140:3001/api/getnetworkhashps", function(error, response) {
                    let hashrate = Number(response.body);
                    needle.get("http://104.238.153.140:3001/api/getdifficulty", function(error, response) {
                        let difficulty = Number(response.body);
                        embed = {
                            color: 1741945,
                            timestamp: new Date(),
                            footer: {
                                icon_url: Bot.iconurl,
                                text: "\u00A9 " + Bot.name
                            },
                            fields: [{
                                name: "CHC Network Stats",
                                value: "Hashrate: " + numberWithCommas(hashrate) + " hash/seconds\n" +
                                    "Difficulty: " + numberWithCommas(difficulty.toFixed(0)) + "\n" +
                                    "Current Block: " + numberWithCommas(height.toFixed(0)) + "\n" +
                                    "Mining Block Reward: 4.4 CHC "
                            }]
                        };
                        bot.channels.get(ChannelID).send({
                            embed
                        });
                        return;
                    });
                });
            }
        });

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
};

exports.hash = {
    usage: "**power [Mh/s]**",
    description: "Displays current Hashrate of Network.\n    Displays potential Earnings For Given Hashrate.\n    This command only can be use in <#" + ChannelID + ">",
    process: function(bot, msg, suffix) {
        if (!inPrivate(msg) && !ChannelID.includes(msg.channel.id)) {
            let embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Woops, Wrong Channel..."
                },
                description: "Please use <#" + ChannelID + "> or DMs bot."
            };
            msg.channel.send({
                embed
            });
            return;
        }
        let myhashrate = "100";

        if (!suffix) {
            sendMiningInfo(bot, msg, suffix);
            return;
        } else {
            let words = suffix.trim().split(" ").filter(function(n) {
                return n !== "";
            });
            let profitcommand = words[0];

            if (profitcommand === "power") {
                //if (!Number.isNaN(words[1]) && words[1].toString().indexOf('.') != -1) {
                if (!Number.isNaN(parseFloat(words[1]))) {
                    myhashrate = words[1];
                }
                sendProfitInfo(bot, msg, suffix);
                return;
            } else {
                sendMiningInfo(bot, msg, suffix);
                return;
            }
        }

        function sendMiningInfo(bot, msg, suffix) {
            let embed;
            needle.get("http://104.238.153.140:3001/api/getblockcount", function(error, response) {
                if (error || response.statusCode !== 200) {
                    embed = {
                        color: 1741945,
                        timestamp: new Date(),
                        footer: {
                            icon_url: Bot.iconurl,
                            text: "\u00A9 " + Bot.name
                        },
                        fields: [{
                            name: "Woops,",
                            value: "Explorer API is not available."
                        }]
                    };
                    msg.channel.send({
                        embed
                    });
                } else {
                    let height = Number(response.body);
                    needle.get("http://104.238.153.140:3001/api/getnetworkhashps", function(error, response) {
                        let hashrate = Number(response.body);
                        needle.get("http://104.238.153.140:3001/api/getdifficulty", function(error, response) {
                            let difficulty = Number(response.body);
                            embed = {
                                color: 1741945,
                                timestamp: new Date(),
                                footer: {
                                    icon_url: Bot.iconurl,
                                    text: "\u00A9 " + Bot.name
                                },
                                fields: [{
                                    name: "CHC Network Stats",
                                    value: "Hashrate: " + numberWithCommas(hashrate) + " hash/seconds\n" +
                                        "Difficulty: " + numberWithCommas(difficulty.toFixed(0)) + "\n" +
                                        "Current Block: " + numberWithCommas(height.toFixed(0)) + "\n" +
                                        "Mining Block Reward: 4.4 CHC "
                                }]
                            };
                            msg.channel.send({
                                embed
                            });
                            return;
                        });
                    });
                }
            });
        }

        function sendProfitInfo(bot, msg, suffix) {
            let embed;
            needle.get("http://104.238.153.140:3001/api/getnetworkhashps", function(error, response) {
                if (error || response.statusCode !== 200) {
                    embed = {
                        color: 1741945,
                        timestamp: new Date(),
                        footer: {
                            icon_url: Bot.iconurl,
                            text: "\u00A9 " + Bot.name
                        },
                        fields: [{
                            name: "Woops,",
                            value: "Explorer API is not available."
                        }]
                    };
                    msg.channel.send({
                        embed
                    });
                } else {
                    let hashrate = parseFloat(myhashrate) * Math.pow(10, 6); // in mega hashrate/second
                    let rewardperblock = Number(4.4); // block reward
                    let currenthashrate = Number(response.body); // current hashrate/secord
                    let percentage = hashrate / (currenthashrate + hashrate);
                    let blocktime = Number(90);
                    let totalrewardperhour = ((60 * 60) / blocktime * rewardperblock) * percentage;

                    let CHC = totalrewardperhour;
                    let CHC24 = totalrewardperhour * 24;
                    let CHC1w = totalrewardperhour * 24 * 7;
                    let CHC1m = totalrewardperhour * 24 * 30;
                    let CHC1y = totalrewardperhour * 24 * 30 * 12;

                    needle.get("https://api.coinmarketcap.com/v1/ticker/chaincoin/", function(error, response) {
                        let author1 = "With " + numberWithCommas(parseFloat(myhashrate)) + " Mh/s";
                        let name1 = "You can potentially earn the following amounts of **CHC**"
                        let val1 = "```1 Hour  = " + numberWithCommas(CHC.toFixed(8)) + "\n" +
                            "1 Day   = " + numberWithCommas(CHC24.toFixed(8)) + "\n" +
                            "1 Week  = " + numberWithCommas(CHC1w.toFixed(8)) + "\n" +
                            "1 Month = " + numberWithCommas(CHC1m.toFixed(8)) + " \n" +
                            "1 Year  = " + numberWithCommas(CHC1y.toFixed(8)) + "```";

                        let name2 = "Equivalent amounts of **BTC**"
                        let val2 = "```1 Hour  = " + numberWithCommas((CHC * Number(response.body[0].price_btc)).toFixed(8)) + "\n" +
                            "1 Day   = " + numberWithCommas((CHC24 * Number(response.body[0].price_btc)).toFixed(8)) + "\n" +
                            "1 Week  = " + numberWithCommas((CHC1w * Number(response.body[0].price_btc)).toFixed(8)) + "\n" +
                            "1 Month = " + numberWithCommas((CHC1m * Number(response.body[0].price_btc)).toFixed(8)) + " \n" +
                            "1 Year  = " + numberWithCommas((CHC1y * Number(response.body[0].price_btc)).toFixed(8)) + "```";

                        let name3 = "Equivalent amounts of **USD**"
                        let val3 = "```1 Hour  = " + numberWithCommas((CHC * Number(response.body[0].price_usd)).toFixed(2)) + "\n" +
                            "1 Day   = " + numberWithCommas((CHC24 * Number(response.body[0].price_usd)).toFixed(2)) + "\n" +
                            "1 Week  = " + numberWithCommas((CHC1w * Number(response.body[0].price_usd)).toFixed(2)) + "\n" +
                            "1 Month = " + numberWithCommas((CHC1m * Number(response.body[0].price_usd)).toFixed(2)) + " \n" +
                            "1 Year  = " + numberWithCommas((CHC1y * Number(response.body[0].price_usd)).toFixed(2)) + "```";

                        embed = {
                            color: 1741945,
                            timestamp: new Date(),
                            footer: {
                                icon_url: Bot.iconurl,
                                text: "\u00A9 " + Bot.name
                            },
                            author: {
                                name: author1
                            },
                            fields: [{
                                    name: name1,
                                    value: val1
                                },
                                {
                                    name: name2,
                                    value: val2
                                },
                                {
                                    name: name3,
                                    value: val3
                                }
                            ]
                        };
                        msg.channel.send({
                            embed
                        });
                        return;
                    });
                }
            });
        }

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
};
