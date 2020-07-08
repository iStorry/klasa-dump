const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'famimaReady',
            enabled: true,
			event: "klasaReady",
			once: true,
        });
    }

    async run() {
        const channels = this.client.guilds.cache.map(guild => guild.settings.prefetchChannel).reduce((r, e) => (r.push(...e), r), [])
        channels.forEach(channel => {
            this.client.channels.resolve(channel).messages.fetch({ limit: 10 })
        });
    }
}