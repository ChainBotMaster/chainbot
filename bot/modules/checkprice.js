"use strict";
let needle = require("needle");
let config = require("config");
let ChannelID = config.get("Channels").altcoin;
let Bot = config.get("bot");
let inPrivate = require("../helpers.js").inPrivate;

exports.commands = [
    "cp",
    "market",
    "price"
];

exports.cp = {
    usage: "**[coin symbol]**",
    description: "Check coin price.\n    This command only can be use in <#" + ChannelID + ">",
    process: function(bot, msg, suffix) {
        let embed;
        if (!inPrivate(msg) && !ChannelID.includes(msg.channel.id)) {
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
                description: "Please use <#" + ChannelID + "> or DMs bot."
            };
            msg.channel.send({
                embed
            });
            return;
        }
        let words = suffix.trim().split(" ").filter(function(n) {
            return n !== "";
        });
        let symbol = words[0];
        let author = "";
        let price = "";
        let data = "";
        let price_change = "";
        let thumbnail = "";

        let url = "https://api.coinmarketcap.com/v1/ticker/?limit=10000";
        needle.get(url, function(error, response) {
            if (error || response.statusCode !== 200) {
                embed = {
                    timestamp: new Date(),
                    footer: {
                        icon_url: Bot.iconurl,
                        text: "\u00A9 " + Bot.name
                    },
                    color: 1741945,
                    fields: [{
                        name: "Woops,",
                        value: "Coinmarketcap API is not available."
                    }]
                };

                msg.channel.send({
                    embed
                });
            } else {
                let found = false;
                for (var x = 0; x < response.body.length; x++) {
                    var myObj = response.body[x];
                    if (myObj.symbol.toUpperCase() === symbol.toUpperCase()) {
                        found = true;
                        var arr = Object.keys(myObj).map(function(key) {
                            return myObj[key];
                        });
                        //console.log(parseFloat(myObj.market_cap_usd.toString()).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                        /*for(var tt = 0; tt < arr.length; tt++){
                        	console.log(tt + "  "+ arr[tt]);
                        }*/
                        author = myObj.name + " (" + myObj.symbol + ")";
                        price = myObj.price_btc + " Bitcoin (BTC)\n" + myObj.price_usd + " US Dollar";

                        if (myObj.market_cap_usd != null) {
                            myObj.market_cap_usd = parseFloat(myObj.market_cap_usd.toString()).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                        }

                        if (arr[6] != null) {
                            arr[6] = parseFloat(arr[6].toString()).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                        }

                        data = "Rank: " + myObj.rank + " \nMarket Cap : $ " + myObj.market_cap_usd + " \nCirculating Units: " + myObj.available_supply + " \nTrading Volume: $ " + arr[6];
                        price_change = "1 Hour:  " + myObj.percent_change_1h + " \n1 Day:    " + myObj.percent_change_24h + " \n1 Week: " + myObj.percent_change_7d;
                        thumbnail = "https://files.coinmarketcap.com/static/img/coins/200x200/" + myObj.id + ".png";

                        embed = {
                            timestamp: new Date(),
                            footer: {
                                icon_url: Bot.iconurl,
                                text: "\u00A9 " + Bot.name
                            },
                            thumbnail: {
                                url: thumbnail
                            },
                            color: 1741945,
                            author: {
                                name: author
                            },
                            fields: [{
                                name: "Price",
                                value: price
                            }, {
                                name: "Data",
                                value: data,
                                inline: true
                            }, {
                                name: "Price change",
                                value: price_change,
                                inline: true
                            }]
                        };

                        msg.channel.send({
                            embed
                        });
                    }
                }

                if (!found) {
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
                        description: "Coin not found!"
                    };
                    msg.channel.send({
                        embed
                    });
                    return;
                }
                return;
            }
        });
    }
};

exports.price = {
    usage: "",
    description: "Check Chaincoin price.",
    process: function(bot, msg, suffix) {
        let embed;
        let symbol = "chc";
        let author = "";
        let price = "";
        let data = "";
        let price_change = "";
        let thumbnail = "";

        let url = "https://api.coinmarketcap.com/v1/ticker/?limit=10000";
        needle.get(url, function(error, response) {
            if (error || response.statusCode !== 200) {
                embed = {
                    timestamp: new Date(),
                    footer: {
                        icon_url: Bot.iconurl,
                        text: "\u00A9 " + Bot.name
                    },
                    color: 1741945,
                    fields: [{
                        name: "Woops,",
                        value: "Coinmarketcap API is not available."
                    }]
                };

                msg.channel.send({
                    embed
                });
            } else {
                for (var x = 0; x < response.body.length; x++) {
                    var myObj = response.body[x];
                    if (myObj.symbol.toUpperCase() === symbol.toUpperCase()) {
                        var arr = Object.keys(myObj).map(function(key) {
                            return myObj[key];
                        });
                        //console.log(parseFloat(myObj.market_cap_usd.toString()).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                        /*for(var tt = 0; tt < arr.length; tt++){
                        	console.log(tt + "  "+ arr[tt]);
                        }*/
                        author = myObj.name + " (" + myObj.symbol + ")";
                        price = myObj.price_btc + " Bitcoin (BTC)\n" + myObj.price_usd + " US Dollar";

                        if (myObj.market_cap_usd != null) {
                            myObj.market_cap_usd = parseFloat(myObj.market_cap_usd.toString()).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                        }

                        if (arr[6] != null) {
                            arr[6] = parseFloat(arr[6].toString()).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                        }

                        data = "Rank: " + myObj.rank + " \nMarket Cap : $ " + myObj.market_cap_usd + " \nCirculating Units: " + myObj.available_supply + " \nTrading Volume: $ " + arr[6];
                        price_change = "1 Hour:  " + myObj.percent_change_1h + " \n1 Day:    " + myObj.percent_change_24h + " \n1 Week: " + myObj.percent_change_7d;
                        thumbnail = "https://files.coinmarketcap.com/static/img/coins/200x200/" + myObj.id + ".png";

                        embed = {
                            timestamp: new Date(),
                            footer: {
                                icon_url: Bot.iconurl,
                                text: "\u00A9 " + Bot.name
                            },
                            thumbnail: {
                                url: thumbnail
                            },
                            color: 1741945,
                            author: {
                                name: author
                            },
                            fields: [{
                                name: "Price",
                                value: price
                            }, {
                                name: "Data",
                                value: data,
                                inline: true
                            }, {
                                name: "Price change",
                                value: price_change,
                                inline: true
                            }]
                        };

                        msg.channel.send({
                            embed
                        });
                    }
                }
                return;
            }
        });
    }
};

exports.market = {
    usage: "",
    description: "See all Chaincoin buy/sell orders.",
    process: function(bot, msg, suffix) {
        let embed;
        let field_buy = "Buy offers:";
        let buy_value = "```";
        let field_sell = "Sell offers: ";
        let sell_value = "```";

        let url = "https://www.cryptopia.co.nz/api/GetMarketOrders/CHC_BTC/10";
        needle.get(url, function(error, response) {
            if (error || response.statusCode !== 200) {
                embed = {
                    timestamp: new Date(),
                    footer: {
                        icon_url: Bot.iconurl,
                        text: "" + Bot.name
                    },
                    color: 1741945,
                    fields: [{
                        name: "Woops,",
                        value: "Cryptopia API is not available."
                    }]
                };

                msg.channel.send({
                    embed
                });
            } else {

                for (var i in response.body.Data.Buy) {
                    var buy = response.body.Data.Buy[i];
                    var price = parseFloat(buy.Price) * 100000000;
                    var amount = buy.Volume;
                    if (i == 9)
                        buy_value = buy_value + "Price: " + price.toFixed(0) + " Satoshi,  Volume: " + amount + " CHC```";
                    else
                        buy_value = buy_value + "Price: " + price.toFixed(0) + " Satoshi,  Volume: " + amount + " CHC\n";
                }

                for (var i in response.body.Data.Sell) {
                    var sell = response.body.Data.Sell[i];
                    var price = parseFloat(sell.Price) * 100000000;
                    var amount = sell.Volume;
                    if (i == 9)
                        sell_value = sell_value + "Price: " + price.toFixed(0) + " Satoshi,  Volume: " + amount + " CHC```";
                    else
                        sell_value = sell_value + "Price: " + price.toFixed(0) + " Satoshi,  Volume: " + amount + " CHC\n";
                }

                embed = {
                    timestamp: new Date(),
                    footer: {
                        icon_url: Bot.iconurl,
                        text: "\u00A9 " + Bot.name
                    },
                    color: 1741945,
                    fields: [{
                        name: field_buy,
                        value: buy_value
                    }, {
                        name: field_sell,
                        value: sell_value
                    }]
                };

                msg.channel.send({
                    embed
                });
                return;
            }
        });
    }
};
