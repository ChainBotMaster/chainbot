'use strict';

const Client = require("bitcoin-core");
const config = require("config");
let Bot = config.get("bot");
const id = config.get("id");
const chcconfig = config.get("chccore");
const chc = new Client(chcconfig);
let ChannelID = config.get("Channels").chaintipster;
let symbol = config.get("coin").symbol;
let explorer = config.get("coin").explorer;
let inPrivate = require("../helpers.js").inPrivate;

exports.commands = [
    "deposit",
    "balance",
    "withdraw",
    "tip",
    "soak",
    "megasoak",
    "rain",
    "bet"
];

exports.custom = [
    "log"
];

exports.log = function(bot) {
    setInterval(function() {
        log(bot);
    }, 24 * 60 * 60 * 1000); //24 * 60 * 60 * 1000

    async function log(bot) {
        let embed;
        let servicesfee = await chc.getBalance("services fee");
        let bet = await chc.getBalance("bet");
        let unclaimed = parseFloat(await chc.getBalance("unclaimed"));
        let added = parseFloat(0);
        let current = unclaimed;
        let accountlist = Object.keys(await chc.listAccounts());
        await bot.guilds.array()[0].fetchMembers();
        let userlist = new Array();
        for (var i = 0; i < bot.users.array().length; i++) {
            userlist.push(bot.users.array()[i].id);
        }
        for (var i = 0; i < userlist.length; i++) {
            let index = accountlist.indexOf(userlist[i]);
            if (index >= 0) {
                accountlist.splice(index, 1);
            }
        }
        let otherlist = ["bet", "megasoak", "services fee", "unclaimed"];
        for (var i = 0; i < otherlist.length; i++) {
            let index = accountlist.indexOf(otherlist[i]);
            if (index >= 0) {
                accountlist.splice(index, 1);
            }
        }
        accountlist = accountlist.filter(function(entry) {
            return entry.trim() != "";
        }); // remove empty string value
        for (var i = 0; i < accountlist.length; i++) {
            let balance = parseFloat(await chc.getBalance(accountlist[i]));
            added = added + balance;
            if (balance != 0.0) {
                let result = await chc.move(accountlist[i], "unclaimed", balance.toFixed(8), 1, "unclaimed");
                //console.log(accountlist[i] + " " + result); 
            } else {
                //console.log(accountlist[i] + " account 0"); 
            }
        }

        current = current + added;

        embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: Bot.iconurl,
                text: "\u00A9 " + Bot.name
            },
            fields: [{
                    name: "Services fee account",
                    value: "Balance: **" + servicesfee + "** " + symbol
                },
                {
                    name: "Betting account",
                    value: "Balance: **" + bet + "** " + symbol
                },
                {
                    name: "Unclaimed account",
                    value: "Old Balance: **" + unclaimed + "** " + symbol + "\nAdded Amount: **" + added.toFixed(8) + "** " + symbol + "\nCurrent Balance: **" + current.toFixed(8) + "** " + symbol
                }
            ]
        };

        bot.users.get("345076277742403584").send({
            embed
        });
        return;
    }
};

exports.deposit = {
    usage: "",
    description: "Get deposit address.",
    process: function(bot, msg, suffix) {
        chc.getAccountAddress(msg.author.id).then((result, error) => {
            if (error) {
                console.log(error);
                return;
            } else {
                const embed = {
                    color: 1741945,
                    timestamp: new Date(),
                    footer: {
                        icon_url: Bot.iconurl,
                        text: "\u00A9 " + Bot.name
                    },
                    author: {
                        name: symbol + " deposit address"
                    },
                    description: "Hi <@" + msg.author.id + ">, Here's your generated tCHC deposit address:```" + result + "```"
                };
                msg.author.send({
                    embed
                });
                return;
            }
        });
    }
};

exports.balance = {
    usage: "",
    description: "Show your balance",
    process: function(bot, msg, suffix) {
        chc.getBalance(msg.author.id, 1).then((result, error) => {
            if (error) {
                console.log(error);
                return;
            } else {
                const embed = {
                    color: 1741945,
                    timestamp: new Date(),
                    footer: {
                        icon_url: Bot.iconurl,
                        text: "\u00A9 " + Bot.name
                    },
                    author: {
                        name: "Balance:"
                    },
                    description: "You have **" + result + "** " + symbol
                };
                msg.author.send({
                    embed
                });
                return;
            }
        });
    }
};

exports.withdraw = {
    usage: "**[amount] [address] || !withdraw [address] [amount]**",
    description: "Withdraw " + symbol + ", 0.1 " + symbol + " fee for withdrawing.",
    process: function(bot, msg, suffix) {
        let words = msg.content.trim().split(" ").filter(function(n) {
            return n !== "";
        });
        if (words.length != 3) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Invalid withdraw command..."
                },
                description: "Sorry, Please use **!withdraw [amount] [address] or !withdraw [address] [amount]**"
            };
            msg.author.send({
                embed
            });
            return;
        }
        if ((!Number.isNaN(parseFloat(words[2]))) || (words[2].toUpperCase() == ("all").toUpperCase())) {
            let temp = words[2];
            words[2] = words[1];
            words[1] = temp;
        }
        if (((Number.isNaN(parseFloat(words[1]))) && (words[1].toUpperCase() != ("all").toUpperCase())) || ((getValidatedAmount(words[1]) == null) && (words[1].toUpperCase() != ("all").toUpperCase())) || (parseFloat(words[1]) == 0)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Invalid withdraw amount..."
                },
                description: "Sorry, Please use **!withdraw [amount] [address] or !withdraw [address] [amount]**"
            };
            msg.author.send({
                embed
            });
            return;
        }

        chc.getBalance(msg.author.id, 1).then((before, error) => {
            if (words[1].toUpperCase() == ("all").toUpperCase()) {
                words[1] = before;
            }
            if (parseFloat(words[1]) <= (parseFloat(before) - 0.1)) {
                if (parseFloat(words[1]) < 1) {
                    const embed = {
                        color: 1741945,
                        timestamp: new Date(),
                        footer: {
                            icon_url: Bot.iconurl,
                            text: "\u00A9 " + Bot.name
                        },
                        author: {
                            name: "Woops..."
                        },
                        description: "Minimum amount for withdraw is **1** " + symbol
                    };
                    msg.channel.send({
                        embed
                    });
                    return;
                }
                chc.sendFrom(msg.author.id, words[2], parseFloat(words[1]), 1, false, "withdraw", msg.author.id).then((txid, error) => {
                    if (error) {
                        console.log(error);
                        return;
                    } else {
                        const embed = {
                            color: 1741945,
                            timestamp: new Date(),
                            footer: {
                                icon_url: Bot.iconurl,
                                text: "\u00A9 " + Bot.name
                            },
                            author: {
                                name: "Withdraw successfully"
                            },
                            description: "Here's your transaction id " + txid + "\n[**Block explorer**](" + explorer + txid + ")"
                        };
                        msg.author.send({
                            embed
                        });

                        chc.getBalance(msg.author.id, 1).then((after, error) => {
                            let txfee = parseFloat(before) - parseFloat(words[1]) - parseFloat(after);
                            let servicesfee = 0.1 - txfee.toFixed(8);
                            chc.move(msg.author.id, "services fee", servicesfee, 1, "services fee").then(result => {
                                if (result == true) {
                                    console.log("Earn Services Fee: " + servicesfee + " " + symbol);
                                    return;
                                }
                                return;
                            });
                        });
                    }
                });
            } else {
                const embed = {
                    color: 1741945,
                    timestamp: new Date(),
                    footer: {
                        icon_url: Bot.iconurl,
                        text: "\u00A9 " + Bot.name
                    },
                    author: {
                        name: "Insufficient funds..."
                    },
                    description: "Please check your " + symbol + " with **!balance** command."
                };
                msg.author.send({
                    embed
                });
                return;
            }
        });
    }
};

exports.tip = {
    usage: "**[amount] [@username] || !tip [@username] [amount]**",
    description: "Send a tip to a member.",
    process: async function(bot, msg, suffix) {
        if (inPrivate(msg)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Woops, this command can not use in DM"
                },
                description: "Please use <#" + ChannelID + "> channel."
            };
            msg.channel.send({
                embed
            });
            return;
        }
        let words = msg.content.trim().split(" ").filter(function(n) {
            return n !== "";
        });
        if (words.length != 3) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Invalid tip command..."
                },
                description: "<@" + msg.author.id + "> Please use **!tip [amount] [@username] or !tip [@username] [amount]**"
            };
            msg.channel.send({
                embed
            });
            return;
        }
        if ((!Number.isNaN(parseFloat(words[2]))) || (words[2].toUpperCase() == ("all").toUpperCase())) {
            let temp = words[2];
            words[2] = words[1];
            words[1] = temp;
        }
        if (((Number.isNaN(parseFloat(words[1]))) && (words[1].toUpperCase() != ("all").toUpperCase())) || ((getValidatedAmount(words[1]) == null) && (words[1].toUpperCase() != ("all").toUpperCase())) || (parseFloat(words[1]) == 0)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Invalid tip amount..."
                },
                description: "<@" + msg.author.id + "> Please **!tip [amount] [@username] or !tip [@username] [amount]**"
            };
            msg.channel.send({
                embed
            });
            return;
        }

        chc.getBalance(msg.author.id, 1).then((result, error) => {
            if (words[1].toUpperCase() == ("all").toUpperCase()) {
                words[1] = result;
            }
            if (parseFloat(words[1]) <= parseFloat(result)) {
                if (msg.author.id == msg.mentions.members.first().id) {
                    const embed = {
                        color: 1741945,
                        timestamp: new Date(),
                        footer: {
                            icon_url: Bot.iconurl,
                            text: "\u00A9 " + Bot.name
                        },
                        author: {
                            name: "Woops..."
                        },
                        description: "<@" + msg.author.id + "> Sorry, you're not allowed to tip yourself."
                    };
                    msg.channel.send({
                        embed
                    });
                    return;
                } else {
                    if (parseFloat(words[1]) < 1) {
                        const embed = {
                            color: 1741945,
                            timestamp: new Date(),
                            footer: {
                                icon_url: Bot.iconurl,
                                text: "\u00A9 " + Bot.name
                            },
                            author: {
                                name: "Woops..."
                            },
                            description: "<@" + msg.author.id + "> Minimum amount for tip is **1** " + symbol
                        };
                        msg.channel.send({
                            embed
                        });
                        return;
                    }
                    chc.move(msg.author.id, msg.mentions.members.first().id, parseFloat(words[1]), 1, "tip").then(result => {
                        if (result == "false") {
                            console.log("move fail, result false");
                            return;
                        } else {
                            const embed = {
                                color: 1741945,
                                timestamp: new Date(),
                                footer: {
                                    icon_url: Bot.iconurl,
                                    text: "\u00A9 " + Bot.name
                                },
                                author: {
                                    name: "OK, " + msg.author.username + ", your tip has been sent successfully."
                                },
                                description: "<@" + msg.author.id + "> Sent **" + words[1] + "** " + symbol + " to: <@" + msg.mentions.members.first().id + ">"
                            };
                            msg.channel.send({
                                embed
                            });
                            return;
                        }
                    });
                }
            } else {
                const embed = {
                    color: 1741945,
                    timestamp: new Date(),
                    footer: {
                        icon_url: Bot.iconurl,
                        text: "\u00A9 " + Bot.name
                    },
                    author: {
                        name: "Insufficient funds..."
                    },
                    description: "<@" + msg.author.id + "> Please deposit your " + symbol + " with **!deposit** command."
                };
                msg.channel.send({
                    embed
                });
                return;
            }
        });
    }
};

exports.soak = {
    usage: "**[amount]**",
    description: "Tip every member who is currently online.\n    This command only can be used in <#" + ChannelID + ">",
    process: async function(bot, msg, suffix) {
        if (inPrivate(msg) || !ChannelID.includes(msg.channel.id)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Woops, this command can not use in DM or in this channel..."
                },
                description: "Please use <#" + ChannelID + "> channel."
            };
            msg.channel.send({
                embed
            });
            return;
        }
        let words = msg.content.trim().split(" ").filter(function(n) {
            return n !== "";
        });
        if (words.length == 1) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Invalid soak command..."
                },
                description: "<@" + msg.author.id + "> Please use **!soak [amount]**"
            };
            msg.channel.send({
                embed
            });
            return;
        }
        if (((Number.isNaN(parseFloat(words[1]))) && (words[1].toUpperCase() != ("all").toUpperCase())) || ((getValidatedAmount(words[1]) == null) && (words[1].toUpperCase() != ("all").toUpperCase())) || (parseFloat(words[1]) == 0)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Invalid soak amount..."
                },
                description: "<@" + msg.author.id + "> Please use **!soak [amount]**"
            };
            msg.channel.send({
                embed
            });
            return;
        }

        let balance = await chc.getBalance(msg.author.id);
        if (words[1].toUpperCase() == ("all").toUpperCase()) {
            words[1] = balance;
        }
        if (parseFloat(words[1]) > parseFloat(balance)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Insufficient funds..."
                },
                description: "<@" + msg.author.id + "> Please deposit your " + symbol + " with **!deposit** command."
            };
            msg.channel.send({
                embed
            });
            return;
        }

        if (parseFloat(words[1]) < 1) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Woops..."
                },
                description: "<@" + msg.author.id + "> Minimum amount for soak is **1** " + symbol
            };
            msg.channel.send({
                embed
            });
            return;
        }

        await bot.guilds.array()[0].fetchMembers();
        let presence = bot.guilds.array()[0].members.filter(m => {
            if (m.presence.status === "online") {
                if (!m.id.includes(id.self)) {
                    if (!m.id.includes(id.other)) {
                        if (msg.author.id != m.id) {
                            return true;
                        }
                        return false; // soak id
                    }
                    return false; // other id
                }
                return false; // self id
            }
            return false; // not online
        });

        let list = presence.array();
        let totalsoak = parseFloat(words[1]);
        let soak = Math.round((totalsoak / list.length) * 100000000) / 100000000;
        if (totalsoak > (soak * list.length)) {
            soak = Math.floor((totalsoak / list.length) * 100000000) / 100000000;
        }

        let header = "<@" + msg.author.id + "> Sent **" + soak + "** " + symbol + " to:";
        for (var i = 0; i < list.length; i++) {
            let moveresult = await chc.move(msg.author.id, list[i].id, soak, 1, "soak");
            if (moveresult == "false") {
                console.log(list[i].id + " move fail, result false");
            }
        }

        while (list.length) {
            var print = list.splice(0, 90);
            let receiver = "";
            for (var i = 0; i < print.length; i++) {
                receiver = receiver + " " + print[i];
            }
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Soak!"
                },
                description: header + receiver
            };
            msg.channel.send({
                embed
            });
        }
        return;
    }
};

exports.rain = {
    usage: "**[amount]**",
    description: "Send a tip to all active members.\n    This command only can be used in <#" + ChannelID + ">",
    process: async function(bot, msg, suffix, isEdit, myCache) {
        if (inPrivate(msg) || !ChannelID.includes(msg.channel.id)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Woops, this command can not use in DM or in this channel..."
                },
                description: "Please use <#" + ChannelID + "> channel."
            };
            msg.channel.send({
                embed
            });
            return;
        }

        let words = msg.content.trim().split(" ").filter(function(n) {
            return n !== "";
        });
        if (words.length == 1) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Invalid rain command..."
                },
                description: "<@" + msg.author.id + "> Please use **!rain [amount]**"
            };
            msg.channel.send({
                embed
            });
            return;
        }

        if (((Number.isNaN(parseFloat(words[1]))) && (words[1].toUpperCase() != ("all").toUpperCase())) || ((getValidatedAmount(words[1]) == null) && (words[1].toUpperCase() != ("all").toUpperCase())) || (parseFloat(words[1]) == 0)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Invalid rain amount..."
                },
                description: "<@" + msg.author.id + "> Please use **!rain [amount]**"
            };
            msg.channel.send({
                embed
            });
            return;
        }

        let balance = await chc.getBalance(msg.author.id);
        if (words[1].toUpperCase() == ("all").toUpperCase()) {
            words[1] = balance;
        }
        if (parseFloat(words[1]) > parseFloat(balance)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Insufficient funds..."
                },
                description: "<@" + msg.author.id + "> Please deposit your " + symbol + " with **!deposit** command."
            };
            msg.channel.send({
                embed
            });
            return;
        }

        if (parseFloat(words[1]) < 1) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Woops..."
                },
                description: "<@" + msg.author.id + "> Minimum amount for rain is **1** " + symbol
            };
            msg.channel.send({
                embed
            });
            return;
        }

        let arr = new Array();
        arr.push(msg.author.id);
        arr.push(id.self);
        arr = arr.concat(id.other);
        let cachelist = await myCache.keys();
        let rainlist = cachelist.filter(function(item) {
            return arr.indexOf(item) === -1;
        });

        if (rainlist.length == 0) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Rain has fail..."
                },
                description: "<@" + msg.author.id + "> No active user."
            };
            msg.channel.send({
                embed
            });
            return;
        }
        let totalrain = parseFloat(words[1]);
        let rain = Math.round((totalrain / rainlist.length) * 100000000) / 100000000;
        if (totalrain > (rain * rainlist.length)) {
            rain = Math.floor((totalrain / rainlist.length) * 100000000) / 100000000;
        }

        let header = "<@" + msg.author.id + "> Sent **" + rain + "** " + symbol + " to:";
        arr = new Array();
        for (var i = 0; i < rainlist.length; i++) {
            let moveresult = await chc.move(msg.author.id, rainlist[i], rain, 1, "rain");
            if (moveresult == "false") {
                console.log(rainlist[i] + " move fail, result false");
            }
        }

        while (rainlist.length) {
            var print = rainlist.splice(0, 90);
            let receiver = "";
            for (var i = 0; i < print.length; i++) {
                receiver = receiver + " <@" + print[i] + ">";
            }
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Rain!"
                },
                description: header + receiver
            };
            msg.channel.send({
                embed
            });
        }
        return;
    }
};

exports.megasoak = {
    usage: "**[amount]**",
    description: "Donate an amount of " + symbol + " to the megasoak pot.\n    This command only can be used in <#" + ChannelID + ">",
    process: async function(bot, msg, suffix) {
        if (inPrivate(msg) || !ChannelID.includes(msg.channel.id)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Woops, this command can not use in DM or in this channel..."
                },
                description: "Please use <#" + ChannelID + "> channel."
            };
            msg.channel.send({
                embed
            });
            return;
        }
        let words = msg.content.trim().split(" ").filter(function(n) {
            return n !== "";
        });
        if (words.length == 1) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Invalid megasoak command..."
                },
                description: "<@" + msg.author.id + "> Please use **!megasoak [amount]**"
            };
            msg.channel.send({
                embed
            });
            return;
        }
        if (((Number.isNaN(parseFloat(words[1]))) && (words[1].toUpperCase() != ("all").toUpperCase())) || ((getValidatedAmount(words[1]) == null) && (words[1].toUpperCase() != ("all").toUpperCase())) || (parseFloat(words[1]) == 0)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Invalid megasoak amount..."
                },
                description: "<@" + msg.author.id + "> Please use **!megasoak [amount]**"
            };
            msg.channel.send({
                embed
            });
            return;
        }

        let balance = await chc.getBalance(msg.author.id);
        if (words[1].toUpperCase() == ("all").toUpperCase()) {
            words[1] = balance;
        }
        if (parseFloat(words[1]) > parseFloat(balance)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Insufficient funds..."
                },
                description: "<@" + msg.author.id + "> Please deposit your " + symbol + " with **!deposit** command."
            };
            msg.channel.send({
                embed
            });
            return;
        }

        if (parseFloat(words[1]) < 1) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Woops..."
                },
                description: "<@" + msg.author.id + "> Minimum amount for megasoak is **1** " + symbol
            };
            msg.channel.send({
                embed
            });
            return;
        }

        let moveresult = await chc.move(msg.author.id, "megasoak", parseFloat(words[1]), 1, "megasoak");
        if (moveresult == "false") {
            console.log("donate fail, result false");
        } else {
            balance = await chc.getBalance("megasoak");
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Thanks..."
                },
                description: "<@" + msg.author.id + "> Donate **" + words[1] + "** " + symbol + " to megasoak pot. \nCurrent megasoak pot: " + balance + " " + symbol + "."
            };
            msg.channel.send({
                embed
            });
        }

        if (parseFloat(balance) < 1000) {
            return;
        }
        await bot.guilds.array()[0].fetchMembers();
        let presence = bot.guilds.array()[0].members.filter(m => {
            if (m.presence.status === "online") {
                if (!m.id.includes(id.self)) {
                    if (!m.id.includes(id.other)) {
                        if (msg.author.id != m.id) {
                            return true;
                        }
                        return true; // soak id
                    }
                    return false; // other id
                }
                return false; // self id
            }
            return false; // not online
        });

        let list = presence.array();
        let totalsoak = parseFloat(balance);
        let soak = Math.round((totalsoak / list.length) * 100000000) / 100000000;
        if (totalsoak > (soak * list.length)) {
            soak = Math.floor((totalsoak / list.length) * 100000000) / 100000000;
        }

        let header = "Thank for active, you receive **" + soak + "** " + symbol + ":";
        for (var i = 0; i < list.length; i++) {
            let moveresult = await chc.move("megasoak", list[i].id, soak, 1, "megasoak");
            if (moveresult == "false") {
                console.log(list[i].id + " move fail, result false");
            }
        }

        while (list.length) {
            var print = list.splice(0, 90);
            let receiver = "";
            for (var i = 0; i < print.length; i++) {
                receiver = receiver + " " + print[i];
            }
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Megasoak!"
                },
                description: header + receiver
            };
            msg.channel.send({
                embed
            });
        }
        return;
    }
};

exports.bet = {
    usage: "**[amount]**",
    description: "Bet an amount of money using a seed.\n    This command only can be used in <#" + ChannelID + ">",
    process: async function(bot, msg, suffix) {
        if (inPrivate(msg) || !ChannelID.includes(msg.channel.id)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Woops, this command can not use in DM or in this channel..."
                },
                description: "Please use <#" + ChannelID + "> channel."
            };
            msg.channel.send({
                embed
            });
            return;
        }
        let words = msg.content.trim().split(" ").filter(function(n) {
            return n !== "";
        });
        if (words.length == 1) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Invalid bet command..."
                },
                description: "<@" + msg.author.id + "> Please use **!bet [amount]**"
            };
            msg.channel.send({
                embed
            });
            return;
        }
        if (((Number.isNaN(parseFloat(words[1]))) && (words[1].toUpperCase() != ("all").toUpperCase())) || ((getValidatedAmount(words[1]) == null) && (words[1].toUpperCase() != ("all").toUpperCase())) || (parseFloat(words[1]) == 0)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Invalid bet amount..."
                },
                description: "<@" + msg.author.id + "> Please use **!bet [amount]**"
            };
            msg.channel.send({
                embed
            });
            return;
        }

        let balance = await chc.getBalance(msg.author.id);
        if (words[1].toUpperCase() == ("all").toUpperCase()) {
            words[1] = balance;
        }
        if (parseFloat(words[1]) > parseFloat(balance)) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Insufficient funds..."
                },
                description: "<@" + msg.author.id + "> Please check your " + symbol + " with **!balance** command."
            };
            msg.channel.send({
                embed
            });
            return;
        }

        if (parseFloat(words[1]) < 1 || parseFloat(words[1]) > 2000) {
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Hit maximum and minimum amount of bet..."
                },
                description: "<@" + msg.author.id + "> Bet amount can not > **2000** or can not < **1** " + symbol
            };
            msg.channel.send({
                embed
            });
            return;
        }

        let rate = 50;
        var random = Math.floor(Math.random() * 100) + 1;
        if (random > rate) {
            let moveresult = await chc.move("bet", msg.author.id, parseFloat(words[1]), 1, "bet");
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Congratulations..."
                },
                description: "<@" + msg.author.id + "> You have won **" + words[1] + "** " + symbol + ".\nCare for another game?"
            };
            msg.channel.send({
                embed
            });
            return;
        } else {
            let moveresult = await chc.move(msg.author.id, "bet", parseFloat(words[1]), 1, "bet");
            const embed = {
                color: 1741945,
                timestamp: new Date(),
                footer: {
                    icon_url: Bot.iconurl,
                    text: "\u00A9 " + Bot.name
                },
                author: {
                    name: "Too bad..."
                },
                description: "<@" + msg.author.id + "> You have lost **" + words[1] + "** " + symbol + ".\nCare for another game?"
            };
            msg.channel.send({
                embed
            });
            return;
        }
    }
};

function getValidatedAmount(amount) {
    amount = amount.trim();
    if (amount.toLowerCase().endsWith('chc')) {
        amount = amount.substring(0, amount.length - 3);
    }
    return amount.match(/^[0-9]+(\.[0-9]+)?$/) ? amount : null;
}
