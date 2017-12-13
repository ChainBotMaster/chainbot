"use strict";
let config = require("config");
let supportChannel = config.get("Channels").support;
let miningChannel = config.get("Channels").mining;
let randomChannel = config.get("Channels").random;

exports.commands = [
    "info",
    "masternode",
    "specs",
    "vision",
    "roadmap",
    "tutorial",
    "faq",
    "beer"
];

exports.info = {
    usage: " ",
    description: "What is a ChainCoin?",
    process: function(bot, msg) {
        const embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                text: "\u00A9 CHCBot"
            },
            fields: [{
                    name: "What is a ChainCoin?",
                    value: "[**ChainCoin**](https://www.chaincoin.org/) is a global leader for instant secure transactions backed by one of the largest worldwide community networks in digital currency."
                },
                {
                    name: "Get rewarded with Chaincoin",
                    value: "[**Chaincoin masternode**](https://www.chaincoin.org/what-is-a-masternode/) operators provide Private Send and Instant Send functionality and are rewarded for their service delivery. Stakeholders collectively participate in decentralized decision making through the Chaincoin Governance Protocol. Any interested party can participate in Chaincoin’s governance."
                },
                {
                    name: "Why choose ChainCoin?",
                    value: "**No Pre-Mining** - We want many Chaincoins to be available to our community to mine, grow, and benefit from." +
                        "\n**Financial Independence** - Chaincoin encompasses a self-funding blockchain which promotes continued growth and development." +
                        "\n**Unique Hashing Algo** - Chaincoin was the first coin to use the C11 hashing algorithm which keeps mining open to GPU miners." +
                        "\n**Masternodes/Coin-Mixing** - Increases privacy by mixing coins to make tracing the source of transactions practically impossible." +
                        "\n**Decentralized Governance** - Allows the users of Chaincoin to vote on the strategic direction of the coin as well development budgeting." +
                        "\n**Personal Banking** - Chaincoin will become your own personal bank. Easily store or spend your coins."
                },
                {
                    name: "Join our Community",
                    value: "[**Github**](https://github.com/chaincoin/chaincoin)" +
                        "\n[**Discord**](https://discord.gg/NabdcJ7)" +
                        "\n[**Twitter**](https://twitter.com/chaincointeam)" +
                        "\n[**Bitcoin Talk**](https://bitcointalk.org/index.php?topic=422149.0)"
                },
                {
                    name: "Development roadmap",
                    value: "The development roadmap is our backbone and is what will make Chaincoin great. It’s going to require hustle and a lot of hard work, but with support from the community, we’re confident we can execute this plan and achieve our mission for Chaincoin." +
                        "\n[**View the full roadmap**](https://www.chaincoin.org/development-roadmap/)"
                },
                {
                    name: "ChainCoin wallet",
                    value: "Download your Chaincoin wallet. \nAvailable on Windows, Linux, and Mac." +
                        "\n[**Wallet download**](https://www.chaincoin.org/chaincoin-wallet/)"
                },
                {
                    name: "Get ChainCoin",
                    value: "Ready to get some Chaincoin? \nYou can get it from Cryptopia using the link below." +
                        "\n[**Buy CHC from Cryptopia**](https://www.cryptopia.co.nz/Exchange/?market=CHC_BTC)"
                }
            ]
        };
        msg.channel.send({
            embed
        });
    }
};

exports.masternode = {
    usage: " ",
    description: "What is a Masternode?",
    process: function(bot, msg) {
        const embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                text: "\u00A9 CHCBot"
            },
            fields: [{
                name: "What is a Masternode?",
                value: "A masternode is a network server which performs service functions on the blockchain like InstantSend and PrivateSend (coin mixing) and increases the network’s stability. In return for these services, masternodes receive a portion of each mined Chaincoin block reward, currently 45%, as well as transaction fees on a periodic basis." +
                    "\n\nAny interested party can run a masternode and assist in fulfilling the objective of providing a true global level of decentralization for all countries, geographies, individuals, companies and organizations." +
                    "\n\nMasternode setup requires 1,000 Chaincoin (CHC) to be sent to the operator’s wallet, a form of Proof of Stake. Masternodes also receive voting rights on the proposals in the network to help guide future expansion." +
                    "\n\nYOU can become an integral part of the community by going through the masternode setup process and helping us on our way to becoming the largest network in the world providing blockchain based Instant Secure Transactions with Chaincoin."
            }]
        };
        msg.channel.send({
            embed
        });
    }
};

exports.specs = {
    usage: " ",
    description: "ChainCoin specification",
    process: function(bot, msg) {
        const embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                text: "\u00A9 CHCBot"
            },
            fields: [{
                name: "Coin specification",
                value: "Name: ChainCoin" + "\n" +
                    "Symbol: CHC" + "\n" +
                    "Pre-mine: No" + "\n" +
                    "CPU mining: Yes" + "\n" +
                    "GPU mining: Yes" + "\n" +
                    "ASIC mining: No" + "\n" +
                    "Algorithm: 11 hashing algorithms chained (C11)" + "\n" +
                    "Total reward: 16 coins per block (currently 8 per block)" + "\n" +
                    "Miner reward: 3.6 coin per block" + "\n" +
                    "Masternode reward: 3.6 coin per block" + "\n" +
                    "Development fund: 0.8 coin per block" + "\n" +
                    "Halving: Every 700800 blocks (2 years)" + "\n" +
                    "Block time: 90 seconds" + "\n" +
                    "**Total coins**: About **23 million**" + "\n" +
                    "Burning address: [CGTta3M4t3yXu8uRgkKvaWd2d8DQvDPnpL](http://104.238.153.140:3001/address/CGTta3M4t3yXu8uRgkKvaWd2d8DQvDPnpL)" + "\n" +
                    "Burning amount: 2029697.59569225 (as 16 Nov 2017)" + "\n" +
                    "P2P Port: 11994" + "\n" +
                    "RPC Port 11995" + "\n" +
                    "[**View block explorer**](http://104.238.153.140:3001/)"
            }]
        };
        msg.channel.send({
            embed
        });
    }
};

exports.vision = {
    usage: " ",
    description: "The vision",
    process: function(bot, msg) {
        const embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                text: "\u00A9 CHCBot"
            },
            fields: [{
                    name: "Chaincoin’s Instant Secure Transactions Sending Money Around The World.",
                    value: "Chaincoin is a global leader for instant secure transactions allowing users to transmit value around the world on one of the largest worldwide community networks in digital currency providing increased privacy and speed." +
                        "\n\nWhat this means for you is Chaincoin will be easier to use than a local bank. Put money in, pull money out, spend your money, and best of all Chaincoin works for you 24/7—Send money when and where you need. All this happens outside current banking channels allowing more freedom over your funds than you have with traditional remittance service providers."
                },
                {
                    name: "Cross Blockchain Value Exchange @ PROJECT X-CHAIN",
                    value: "Even though the blockchain network is decentralized, many of the services that allow its use in the real world are still centralized. With Project X-Chain we will create a decentralized ecosystem by “chaining” multiple blockchains together and providing an in-wallet exchange. Using this technology, a library of applications can then be developed to further enhance and assist the Chaincoin community in value exchanges."
                },
                {
                    name: "Core Objective",
                    value: "These six principles are to guide our future decision making:" +
                        "\n**Decentralization:** Remain true to the principles of decentralization." +
                        "\n**Onboarding:** Ensure it is simple and easy to acquire CHC." +
                        "\n**Spending:** Withdraw cash from atms, spend with debit cards, or buy online – same as you can with your local bank." +
                        "\n**Control:** Chaincoin will be a feature-rich wallet (mobile and online) allowing you the highest control over your funds." +
                        "\n**Rewards:** As a Chaincoin masternode owner and/or miner you get rewarded for your contribution." +
                        "\n**Community:** Always remember the community when making decisions for the long term success of Chaincoin."
                },
                {
                    name: "ChainCoin | Established 2014",
                    value: "Chaincoin was launched on Jan 18, 2014. Chaincoin was the first blockchain coin launched with eleven hashing algorithms chained, one on top of the other, with intentions to free individuals from centralized banking and create a strong community to support the global movement into cryptocurrency." +
                        "\n\nChaincoin continues to thrive because of the dedicated community which supports its success and evolution to seize current and future opportunities."
                }
            ]
        };
        msg.channel.send({
            embed
        });
    }
};

exports.roadmap = {
    usage: " ",
    description: "Development roadmap",
    process: function(bot, msg) {
        const embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                text: "\u00A9 CHCBot"
            },
            fields: [{
                    name: "Code Base Upgrades (2017 - Done)",
                    value: "Various fixes and improvements based on Bitcoin and Bitcoin soft-forks."
                },
                {
                    name: "Development Subsidy/Budgeting Update (2017 - In Progress)",
                    value: "A percentage of the block reward will be allocated to a development fund where master node owners will be able to vote on how the budget is allocated ensuring transparency of operations. This feature will be funded and developed by the community, and then included in our core software."
                },
                {
                    name: "Media Presence And Penetration (2018Q1)",
                    value: "Increase presence and penetration of mainstream media through both advertising and public relations."
                },
                {
                    name: "High Volume Exchange Campaign (2018Q1)",
                    value: "Develop high-quality partners for exchange services, market making, and brokerage to improve market liquidity and access."
                },
                {
                    name: "Masternode Improvements (2018Q2)",
                    value: "Various stability and security enhancements based on Dash 12.2"
                },
                {
                    name: "Chaincoin Merchant / ATM Services (2018Q3)",
                    value: "Payment card to withdraw/spend funds making it more consumer friendly."
                },
                {
                    name: "Project X-Chain (2018Q4)",
                    value: "Decentralized cross-blockchain CHC Exchange Service and Applications."
                }
            ]
        };
        msg.channel.send({
            embed
        });
    }
};

exports.faq = {
    usage: " ",
    description: "Frequently Asked Questions",
    process: function(bot, msg) {
        var embed = {
            color: 1741945,
            /*
                       timestamp: new Date(),
                       footer: {
                           icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                           text: "\u00A9 CHCBot"
                       }, */
            fields: [{
                    name: "1. How do I create a master node?",
                    value: "A master node not only earns you an income, it provides a valuable service to the ChainCoin network. As such, it needs to be hosted on a computer that is online 24/7 and has a static IP address. This is not normally your home computer. We strongly recommend you use a hosted VPS such as those provided by [vultr](www.vultr.com). We have developed a written guide and a set of tutorial videos to help you deploy a masternode. You should have some level of computer ability before attempting this. You should also follow the guide EXACTLY, checking that you have file and pathnames correct (for example, ~/.chaincoin is right, ~./chaincoin is wrong. chaincoin.conf is right, chaincoind.conf is wrong).  You can refer tutorial that are provided by using **!tutorial** command."
                },
                {
                    name: "2. What do I do if I run into a problem?",
                    value: "First, check you have followed the setup steps exactly. If you are using the PF< try watching the videos as well, and vice versa. You might see you missed a step or typed something wrong. - Wait. Some actions on the server (starting it, receiving coins etc) can take some time. - Join our Discord team at [**Chaincoin Discord Invite**](https://discord.gg/NabdcJ7) and go to the <#" + supportChannel + "> channel."
                },
                {
                    name: "3. Can I run multiple masternodes from one server?",
                    value: "Masternodes are designed to help the network. As such, each one should be on a separate server. Trying to run more than one on the same server might seem like a good idea for you, but it doesn't really help Chaincoin! Having said that, we havent found a reliable way to run multiple masternodes on one server. Each one would need it's own IP address for a start. This may change in future, with new releases of the code. If so, we'll update the Wiki."
                },
                {
                    name: "4. How do I setup a masternode on Mac/Windows/Raspberry PI/My refrigerator?",
                    value: "We are working with teammembers and developers to create guides for other operating systems. Your masternode should not really be hosted on your Desktop - it really needs to be on a fast network, 24/7, with a static IP address Having said that, as guides for other operating systems are developed, we'll let you know here and at [**ChainCoin**](www.chaincoin.org)."
                },
                {
                    name: "5. How many coins do I need to run a masternode?",
                    value: "To be able to run a masternode you need to have exactly 1000 CHC. These coins have to be transfered in exactly one transaction so if you send 2 x 500 coins to your address it will not work.."
                },
                {
                    name: "6. What is POS_ERROR when I check my IP masternode ? How to fix that?",
                    value: "POS_ERROR — How to fix, stop masternode service. Delete mncache.dat. Start masternode service. Unlock node on wallet, enable again. - sliff2000."
                },
                {
                    name: '7. I get an error "You must set masternode=1 in the configuration file"',
                    value: "This error happens when you don't put masternode=1 in chaincoin.conf file or you put chaincoin.conf file in the wrong directory. Most common problem is omitting . (dot) in front of chaincoin when following the masternode guide. In UNIX systems .chaincoin and chaincoin are two different directories. To check contents of your chaincoin.conf file type nano ~/.chaincoin/chaincoin.conf and add the missing lines to fix the error."
                },
                {
                    name: "8. How to check if my masternode is running?",
                    value: "You can check status of your masternode by typing masternodelist status . If the status is Enabled your masternode is running."
                },
                {
                    name: "9. Does having more coins in the masternode increase reward?",
                    value: "No. If you have multiple thousands of CHC coins you can increase rewards by running multiple masternodes."
                },
                {
                    name: "10. Is there any way i can configure masternode to work with no-ip/dynamic-ip?",
                    value: "No. This is not possible."
                }
            ]
        };
        msg.channel.send({
            embed
        });

        embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                text: "\u00A9 CHCBot"
            },
            fields: [{
                    name: "11. I started my masternode couple of days ago an I still haven't received any rewards is everything ok? What should I do?",
                    value: "First check the status of your masternode by typing masternodelist status. If it says enabled it is ok and you will be receiving your reward soon. If it says expired restart the masternode. Rewards are random so sometimes it can take couple of days before you get your first reward. Sometimes you get multiple rewards on the first day and then it takes forever to get next reward. As the number of masternodes grow it takes more time."
                },
                {
                    name: "12. Where is my wallet.dat located?",
                    value: "For the GUI wallet, you specified this location the first time you ran the program.\n" +
                        "By default:\n" +
                        "```On Windows 7+ it is in C:\\Users<username>\\AppData\\Roaming\\Chaincoin where is your account login\n" +
                        "On Linux (Ubuntu) it is in ~/.chaincoin\n" +
                        "On Mac it is in ~/Library/Application Support/Chaincoin```"
                },
                {
                    name: "13. How to edit the chaincoin.conf on ubuntu VPS?",
                    value: "Type```nano ~/.chaincoin/chaincoin.conf```"
                },
                {
                    name: "14. I sent my coins from cryptopia to my VPS. Cryptopia says that the transfer is complete but I still have 0 CHC when I check balance with chaincoind getinfo? Are my coins lost?",
                    value: "Your coins are not lost. To be able to see the balance on the VPS your VPS wallet has to sync with the network. Once this process is complete you will be able to see your funds. To see if transaction went through on the blockchain copy/paste your receiving address into [**Blockchain Explorer**](http://104.238.153.140:3001/). This will show you your address current balance."
                },
                {
                    name: "15. My wallet is not syncing I have 0 connections for hours is there a solution?",
                    value: "You can solve this problem by adding nodes directly to the chaincoin.conf under listen=1 line. And then restarting the client. Nodes list can be found by typing ```chaincoin-cli```masternode list and then adding them if they are enabled. Alternatively you can find nodes on [**Blockchain explorer**](http://104.238.153.140:3001/network) but keep in mind that some of them are home computers and might be offline. If you are really lazy just copy couple of the nodes from this list. (list is created by randomly copy/pasting 40 of the nodes from masternodelist output on 07/16/2017.)"
                },
                {
                    name: "16. My node has stopped responding to commands. When I type chaincoind getinfo nothing happens and I am unable to shut it down with chaincoind stop?",
                    value: "You will have to kill the process or restart the server."
                },
                {
                    name: "17. When should I backup my wallet?",
                    value: "It is best to backup your wallet.dat before you send the coins to your wallet. If you followed the tutorial best time to do it is just after you generated new address with chaincoind getaccountaddress 0. You can also make additional backup after the transaction."
                },
                {
                    name: "18. How to backup wallet.dat?",
                    value: "The easiest way is by using a FTP client like [Filezilla](https://filezilla-project.org/download.php?show_all=1). To connect to your server type in your server IP address and port 22 and then navigate to .chaincoin folder and download wallet.dat file."
                },
                {
                    name: '19. How to fix "Invalid masternodeprivkey. Please see documenation."?',
                    value: "Please make sure you have pulled the latest code from the github repository, this has been fixed."
                },
                {
                    name: "20. I can't seem to compile the code, what is wrong?",
                    value: "Many things could be wrong, you need to find the specific error and correct that. If you are following a guide and you encounter an error then you need to stop and correct the error before continuing otherwise the process will not complete.\n\n" +
                        "Here are 5 very simple commands which will install all the necessary dependencies to compile the non-gui wallet on Ubuntu:\n" +
                        "```sudo add-apt-repository ppa:bitcoin/bitcoin\n" +
                        "sudo apt-get update\n" +
                        "sudo apt-get install build-essential libtool autotools-dev autoconf automake\n" +
                        "sudo apt-get install pkg-config libssl-dev libdb4.8-dev libdb4.8++-dev\n" +
                        "sudo apt-get install libevent-dev libboost-all-dev libminiupnpc-dev```\n" +
                        "After that, assuming you have cloned the repository and are in the correct folder you need to run the following 4 commands which must all complete without errors:\n" +
                        "```./autogen.sh \n" +
                        "./configure --without-gui --disable-tests \n" +
                        "make \n" +
                        "sudo make install```"
                }
            ]
        };
        msg.channel.send({
            embed
        });
    }
};


exports.tutorial = {
    usage: " ",
    description: "ChainCoin Tutorials & Guides",
    process: function(bot, msg) {
        const embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                text: "\u00A9 CHCBot"
            },
            author: {
                name: "Tutorials & Guides"
            },
            description: "[**How to buy your first CHC (pdf)**](https://www.chaincoin.org/wp-content/uploads/2017/07/How-to-buy-your-first-CHC.pdf)" + "\n" +
                "[**How to set up your CHC wallet (pdf)**](https://www.chaincoin.org/wp-content/uploads/2017/07/How-to-Set-Up-Your-CHC-Wallet.pdf)" + "\n" +
                "[**Setting up a Chaincoin masternode (pdf)**](https://toaster.chaincoin.org/docs/Setting%20up%20a%20Chaincoin%20Masternode%20-%20draft%20v.04.pdf)" + "\n" +
                "[**How to convert your existing masternode from a remote wallet to a local controller wallet (pdf)**](https://toaster.chaincoin.org/docs/convert_masternode_to_controller.pdf)" + "\n" +
                "[**Chaincoin masternode remote controller setup (YouTube)**](https://www.youtube.com/watch?v=KSWfXdmb48c)" + "\n" +
                "[**Chaincoin masternodes recap, remote-controller setup (YouTube)**](https://www.youtube.com/watch?v=W2i311gQiEI)" + "\n" +
                "[**Launching a ChainCoin masternode- made easy (Website)**](https://medium.com/@Crypto_Wizard/launching-a-chaincoin-masternode-made-easy-92fa2f41c195)" + "\n" +
                "[**How to host a Chaincoin masternode on windows. (Website)**](https://steemit.com/chaincoin/@jeffblogs/how-to-host-a-chaincoin-masternode-on-windows)" + "\n" +
                "[**ChainCoin masternode setup guide (Website)**](https://steemit.com/chaincoin/@usncrypto/chaincoin-masternode-setup-guide)" + "\n" +
                "[**How to Install 3 CHAINCOIN MasterNodes on 1 VPS**](https://steemit.com/masternode/@fredyendesigns/tutorial-how-to-install-3-chaincoin-masternodes-on-1-vps)"
        };
        msg.channel.send({
            embed
        });
    }
};

exports.beer = {
    usage: " ",
    description: "Beer emoji",
    process: function(bot, msg) {
        const embed = {
            color: 1741945,
            timestamp: new Date(),
            footer: {
                icon_url: "https://www.chaincoin.org/wp-content/uploads/2017/11/chaincoin.png",
                text: "\u00A9 CHCBot"
            },
            description: "Cheers! :beers:"
        };
        msg.channel.send({
            embed
        });
    }
};

exports.github = {
    usage: " ",
    description: "ChainCoin Github",
    process: function(bot, msg) {
        const embed = {
            description: "<@" + msg.author.id + ">" + "\n" +
                "The official github for ChainCoin is [github.com/chaincoin](https://github.com/chaincoin)",
            color: 1741945,
            author: {
                name: "GitHub",
                url: "https://github.com/chaincoin",
                icon_url: "https://files.coinmarketcap.com/static/img/coins/32x32/chaincoin.png"
            }
        };
        msg.channel.send({
            embed
        });
    }
};

// belum lagi
exports.begging = {
    usage: " ",
    description: "Dont Request Free Coins Message",
    process: function(bot, msg) {
        const embed = {
            description: "**Please don't request free coins or invites, we have a strict policy against begging. Further offenses will result in removal from the chat.**",
            color: 1741945,
            author: {
                name: "BEGGING!",
                icon_url: "https://files.coinmarketcap.com/static/img/coins/32x32/chaincoin.png"
            }
        };
        msg.channel.send({
            embed
        });
    }
};

exports.beta = {
    usage: " ",
    description: "beta message",
    process: function(bot, msg) {
        const embed = {
            description: "<@" + msg.author.id + ">" + "\n" +
                "Even though ChainCoin is in Open Beta, it's still beta software! There will be bugs and issues to be worked out, thanks for your patience!",
            color: 1741945,
            author: {
                name: "Open Beta",
                icon_url: "https://files.coinmarketcap.com/static/img/coins/32x32/chaincoin.png"
            }
        };
        msg.channel.send({
            embed
        });
    }
};

exports.daemondownload = {
    usage: " ",
    description: "ChainCoin Daemon Installers",
    process: function(bot, msg) {
        const embed = {
            description: "<@" + msg.author.id + ">" + "\n" +
                "Installers for the ChainCoin Daemon are available for download [**HERE**](https://github.com/chaincoin/chaincoin/releases) ",
            color: 1741945,
            author: {
                name: "Daemon Download",
                url: "https://github.com/chaincoin/chaincoin/releases",
                icon_url: "https://files.coinmarketcap.com/static/img/coins/32x32/chaincoin.png"
            }
        };
        msg.channel.send({
            embed
        });
    }
};

exports.random = {
    usage: " ",
    description: "Off-Topic Message",
    process: function(bot, msg) {
        var message =
            "<@" + msg.author.id + ">" + "\n" +
            "Please keep conversation on topic, or move random conversations to #" +
            randomChannel +
            " if you wish to continue";
        msg.channel.send(message);
    }
};

exports.name = {
    usage: " ",
    description: "Change Name Message",
    process: function(bot, msg) {
        const embed = {
            description: "Hey, glad to see you love ChainCoin so much, but for the safety of our users we ask that you avoid using discord names that include the word chaincoin. This is to prevent impersonation and scams.",
            color: 1741945,
            author: {
                name: "ChainCoin Bot",
                icon_url: "https://files.coinmarketcap.com/static/img/coins/32x32/chaincoin.png"
            }
        };
        msg.channel.send({
            embed
        });
    }
};

exports.mining = {
    usage: " ",
    description: "Mining ChainCoin (CHC)",
    process: function(bot, msg) {
        var message =
            "<@" + msg.author.id + ">" + "\n" +
            "We have a dedicated channel for mining discussion, feel free to join <#" +
            miningChannel +
            ">";
        msg.channel.send(message);
    }
};