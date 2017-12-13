"use strict";
let needle = require("needle");
let config = require("config");
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
    }, 8 * 60 * 60 * 1000); //6 * 60 * 60 * 1000

    function sendMiningInfo(bot) {
        let embed;
        needle.get("http://104.238.153.140:3001/api/getblockcount", function(error, response) {
            if (error || response.statusCode !== 200) {
                embed = {
                    color: 1741945,
                    timestamp: new Date(),
                    footer: {
                        icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                        text: "\u00A9 CHCBot"
                    },
                    fields: [{
                        name: "Oops,",
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
                        needle.get("https://chc.suprnova.cc/index.php?page=api&action=getpoolstatus&api_key=cd856b384f20681b62bdd079ff67dabfc9190e9153b2690bfa541d61d25d51ad", function(error, response) {
                            if (error || response.statusCode !== 200) {
                                embed = {
                                    color: 1741945,
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                                        text: "\u00A9 CHCBot"
                                    },
                                    fields: [{
                                        name: "Oops,",
                                        value: "Suprnova API is not available"
                                    }]
                                };
                                bot.channels.get(ChannelID).send({
                                    embed
                                });
                            } else {
                                let obj = JSON.parse(response.body);
                                let block_time = Number(obj.getpoolstatus.data.timesincelast);
                                embed = {
                                    color: 1741945,
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                                        text: "\u00A9 CHCBot"
                                    },
                                    fields: [{
                                        name: "CHC Network Stats",
                                        value: "Hashrate: " + numberWithCommas(hashrate) + " hash/seconds\n" +
                                            "Difficulty: " + numberWithCommas(difficulty.toFixed(0)) + "\n" +
                                            "Current Block: " + numberWithCommas(height.toFixed(0)) + "\n" +
                                            "Last Block Found: " + numberWithCommas(block_time.toFixed(0)) + " seconds ago\n" +
                                            "Mining Block Reward: 4.4 CHC \n" +
                                            "Masternode Block Reward: 3.6 CHC"
                                    }]
                                };
                                bot.channels.get(ChannelID).send({
                                    embed
                                });
                                return;
                            }
                        });
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
    description: "Displays current Hashrate of Network.\n    Displays potential Earnings For Given Hashrate.\n    This command only can be use in <#" + ChannelID + ">"",
    process: function(bot, msg, suffix) {
        if (!inPrivate(msg) && !ChannelID.includes(msg.channel.id)) {
            let embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                    text: "\u00A9 CHCBot"
                },
                author: {
                    name: "Oops, Wrong Channel..."
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
                            icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                            text: "\u00A9 CHCBot"
                        },
                        fields: [{
                            name: "Oops,",
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
                            needle.get("https://chc.suprnova.cc/index.php?page=api&action=getpoolstatus&api_key=cd856b384f20681b62bdd079ff67dabfc9190e9153b2690bfa541d61d25d51ad", function(error, response) {
                                if (error || response.statusCode !== 200) {
                                    embed = {
                                        color: 1741945,
                                        timestamp: new Date(),
                                        footer: {
                                            icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                                            text: "\u00A9 CHCBot"
                                        },
                                        fields: [{
                                            name: "Oops,",
                                            value: "Suprnova API is not available"
                                        }]
                                    };
                                    msg.channel.send({
                                        embed
                                    });
                                } else {
                                    let obj = JSON.parse(response.body);
                                    let block_time = Number(obj.getpoolstatus.data.timesincelast);
                                    embed = {
                                        color: 1741945,
                                        timestamp: new Date(),
                                        footer: {
                                            icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                                            text: "\u00A9 CHCBot"
                                        },
                                        fields: [{
                                            name: "CHC Network Stats",
                                            value: "Hashrate: " + numberWithCommas(hashrate) + " hash/seconds\n" +
                                                "Difficulty: " + numberWithCommas(difficulty.toFixed(0)) + "\n" +
                                                "Current Block: " + numberWithCommas(height.toFixed(0)) + "\n" +
                                                "Last Block Found: " + numberWithCommas(block_time.toFixed(0)) + " seconds ago\n" +
                                                "Mining Block Reward: 4.4 CHC \n" +
                                                "Masternode Block Reward: 3.6 CHC"
                                        }]
                                    };
                                    msg.channel.send({
                                        embed
                                    });
                                    return;
                                }
                            });
                        });
                    });
                }
            });
        }

        function sendProfitInfo(bot, msg, suffix) {
            let embed;
            needle.get("http://104.238.153.140:3001/api/getdifficulty", function(error, response) {
                if (error || response.statusCode !== 200) {
                    embed = {
                        color: 1741945,
                        timestamp: new Date(),
                        footer: {
                            icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                            text: "\u00A9 CHCBot"
                        },
                        fields: [{
                            name: "Oops,",
                            value: "Explorer API is not available."
                        }]
                    };
                    msg.channel.send({
                        embed
                    });
                } else {
                    let difficulty = Number(response.body); // network difficulty
                    let hashrate = parseFloat(myhashrate) * Math.pow(10, 6); // in Mh/s
                    let reward = Number(4.4); // block reward
                    let secondperhour = 60 * 60; //number second per hours

                    let CHC = (reward * hashrate * secondperhour) / (difficulty * Math.pow(2, 32));
                    let CHC24 = (reward * hashrate * secondperhour * 24) / (difficulty * Math.pow(2, 32));
                    let CHC1w = (reward * hashrate * secondperhour * 24 * 7) / (difficulty * Math.pow(2, 32));
                    let CHC1m = (reward * hashrate * secondperhour * 24 * 30) / (difficulty * Math.pow(2, 32));
                    let CHC1y = (reward * hashrate * secondperhour * 24 * 30 * 12) / (difficulty * Math.pow(2, 32));

                    needle.get("https://api.coinmarketcap.com/v1/ticker/chaincoin/", function(error, response) {
                        let author1 = "With " + numberWithCommas(parseFloat(myhashrate)) + " Mh/s and Current Difficulty " + difficulty.toFixed(0);
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
                                icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                                text: "\u00A9 CHCBot"
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
