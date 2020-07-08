/* eslint-disable no-inline-comments */
const { KlasaClient } = require("klasa");

KlasaClient.defaultGuildSchema.add('roles', schema => schema
.add('everyone', 'role'));

module.exports = KlasaClient.defaultGuildSchema
    .add("autovoice", "CategoryChannel", { array: true } )
    .add("platformMessageId", "integer")
    .add("rankMessageId", "integer")

    // Fetcher
    .add("prefetchChannel", "TextChannel", { array: true } )
