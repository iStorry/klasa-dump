const { client, Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'messageReactionRemove',
            enabled: true,
            event: 'messageReactionRemove',
            emitter: client,
            once: false
        });
    }

    async run(reaction, user) {
        const guild = reaction.message.channel.guild;
        /// Platform Reaction
        if (reaction.message.id == guild.settings.platformMessageId) {
            console.log(`${user.username} Reacted To Platform Emoji`)
            const role = guild.roles.resolve(this.client.emotes[reaction.emoji.id])
            return await guild.members.resolve(user).roles.remove(role)
        }
        /// Rank Reaction
        if (reaction.message.id == guild.settings.rankMessageId) {
            console.log(`${user.username} Reacted To Ranks Emoji`)
            const role = guild.roles.resolve(this.client.emotes[reaction.emoji.id])
            return await guild.members.resolve(user).roles.remove(role)
        }
    }
}