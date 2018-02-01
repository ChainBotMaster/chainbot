let config = require("config");
let role = config.get("role");

// Checks if user is allowed to use a command only for Chainster user
exports.hasPermsChainster = function(msg) {
    if (msg.member.roles.some(r => role.chainster.includes(r.name))) {
        return true;
    } else {
        return false;
    }
};

// Checks if user is allowed to use a command only for Support user
exports.hasPermsSupport = function(msg) {
    if (msg.member.roles.some(r => role.support.includes(r.name))) {
        return true;
    } else {
        return false;
    }
};

// Check if command was sent in dm
exports.inPrivate = function(msg) {
    if (msg.channel.type == "dm") {
        return true;
    } else {
        return false;
    }
};