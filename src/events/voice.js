const { client, Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'voice',
            enabled: true,
            event: 'voiceStateUpdate',
            emitter: client,
            once: false
        });
    }

    run(oldMember, newMember) {
        if (newMember.channel) {
            if (newMember.guild.settings.autovoice.includes(newMember.channel.parentID)) {
                const children = newMember.guild.channels.resolve(newMember.channel.parentID).children;
                const child = children.filter(child => child.members.array().length === 0);
                if (child.size > 1) {
                    for (let j = 1; j < child.array().length; j++) {
                        children.array()[j].delete();
                    }
                } else if (child.size === 0) {
                    if (children.array()[0].name !== undefined && children.array()[0].parentID !== undefined) {
                        newMember.guild.channels.create(children.array()[0].name, {
                            type: "voice",
                            parent: children.array()[0].parentID,
                            userLimit: children.array()[0].userLimit
                        });
                    }
                }
            }
        }

        if (oldMember.channel) {
            if (oldMember.guild.settings.autovoice.includes(oldMember.channel.parentID)) {
                const children = oldMember.guild.channels.resolve(oldMember.channel.parentID).children;
                const child = children.filter(child => child.members.array().length === 0);
                if (child.size > 1) {
                    for (let j = 1; j < child.array().length; j++) {
                        children.array()[j].delete();
                    }
                } else if (child.size === 0) {
                    if (children.array()[0].name !== undefined && children.array()[0].parentID !== undefined) {
                        oldMember.guild.channels.create(children.array()[0].name, {
                            type: "voice",
                            parent: children.array()[0].parentID,
                            userLimit: children.array()[0].userLimit
                        });
                    }
                }
            }
        }
    }

    async init() {
    }

}