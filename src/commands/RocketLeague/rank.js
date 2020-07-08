const { Command, RichDisplay, util: { isFunction } } = require("klasa");
const { get } = require("snekfetch");
const path = require('path');
const { Canvas } = require("canvas-constructor");

Canvas.registerFont(`${path.resolve(__dirname, '..', '..', '..')}/assets/fonts/Roboto-Regular.ttf`, "Roboto");
Canvas.registerFont(`${path.resolve(__dirname, '..', '..', '..')}/assets/fonts/RobotoCondensed-Regular.ttf`, "Roboto Condensed");
Canvas.registerFont(`${path.resolve(__dirname, '..', '..', '..')}/assets/fonts/RobotoMono-Light.ttf`, "Roboto Mono");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["ranks", "rank"],
            guarded: true,
            permissionLevel: 1,
            runIn: ["text", "dm"],
            typing: true,
            description: "Grab Rocket League Ranks.",
            usage: "<platform:string> <username:string> <type:string>",
            usageDelim: " ",
        });
    }

    async run(message, [platform ,username, type]) {
        const code = this.platformCode(platform);
        const uri = `https://rocketleague.tracker.network/api/appstats?platform=${code}&name=${username}`;
        console.log(uri)

        const { body } = await get(uri).catch(error => {
            return error;
        });
        console.log(body.platformUserId)
        if (body.platformUserId == undefined) return message.send(`Oops, The rank cannot be specified.`);
        // Get Data
        const rawname = body.platformUserHandle;
        const userID = body.platformUserId;
        const data = body.stats.filter(data => data.label == this.typeCode(type));
        if (!data[0]) return message.send(`Oops, No rank data found`);

        const rankLabel = data[0].subLabel.split("]");
        const rankMain = rankLabel[1] ? rankLabel[1] + ` (${data[0].displayValue})` : "Unknown";
        const fontColor = "#FFFFFF";

        try {
            const bg = `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/bg/black.png`;
            const rank = this.ranksIcon(data[0].subLabel);
            const img = await new Canvas(400, 100).addImage(bg, 0, 0, 400, 180).setColor(fontColor).setTextFont("25px Roboto")
                .addText(rawname ? rawname : "Unknown", 25, 50).setTextFont("16px Roboto").addText(rankMain ? rankMain : "", 22, 72.5)
                .addImage(rank, 290, 5, 100, 100).setTextFont("18px 'Roboto Condensed'").addText(data[0].subLabel, 35, 140).toBufferAsync();
            return message.send({ files: [{ attachment: img, name: `${userID}.png` }] });
        } catch (error) {
            console.log(error)
            message.send(`Oops, No rank data found`)
        }
    }
    

    platformCode(platform) {
        switch (platform) {
            case "ps": case "ps4": case "Ps4": case "PS4": case "Ps": return 2;
            case "steam": case "pc": case "Pc": case "PC": return 3;
            case "xbox": case "xbx": case "Xbox": return 1;
        }
    }

    typeCode(type) {
        switch (type) {
            case "1s": case "1v1": case "solo": case "duel": return "Ranked Duel 1v1";
            case "2s": case "2v2": case "double": return "Ranked Doubles 2v2";
            case "3solo": return "Ranked Solo Standard 3v3";
            case "3s": case "3v3": case "standard": case "duel": return "Ranked Standard 3v3";
            case "dropshot": return "Dropshot";
            case "hoops": return "Hoops";
            case "rumble": return "Rumble";
            case "snowday": return "Snowday";
        }
    }
    
    ranksIcon(label) {
        switch (label) {
            /// Grand Champion
            case "[I] Grand Champion": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/champion/grandchampion.png`;
            /// Champion
            case "[IV] Champion III": case "[III] Champion III": case "[II] Champion III": case "[I] Champion III": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/champion/champion3.png`;
            case "[IV] Champion II": case "[III] Champion II": case "[II] Champion II": case "[I] Champion II": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/champion/champion2.png`;
            case "[IV] Champion I": case "[III] Champion I": case "[II] Champion I": case "[I] Champion I": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/champion/champion1.png`;
            /// Diamond
            case "[IV] Diamond III": case "[III] Diamond III": case "[II] Diamond III": case "[I] Diamond III": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/diamond/diamond3.png`;
            case "[IV] Diamond II": case "[III] Diamond II": case "[II] Diamond II": case "[I] Diamond II": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/diamond/diamond2.png`;
            case "[IV] Diamond I": case "[III] Diamond I": case "[II] Diamond I": case "[I] Diamond I": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/diamond/diamond1.png`;
            /// Platinum
            case "[IV] Platinum III": case "[III] Platinum III": case "[II] Platinum III": case "[I] Platinum III": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/platinum/platinum3.png`;
            case "[IV] Platinum II": case "[III] Platinum II": case "[II] Platinum II": case "[I] Platinum II": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/platinum/platinum2.png`;
            case "[IV] Platinum I": case "[III] Platinum I": case "[II] Platinum I": case "[I] Platinum I": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/platinum/platinum1.png`;
            /// Gold
            case "[IV] Gold III": case "[III] Gold III": case "[II] Gold III": case "[I] Gold III": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/gold/gold3.png`;
            case "[IV] Gold II": case "[III] Gold II": case "[II] Gold II": case "[I] Gold III": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/gold/gold2.png`;
            case "[IV] Gold I": case "[III] Gold I": case "[II] Gold I": case "[I] Gold I": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/gold/gold1.png`;
            /// Silver
            case "[IV] Silver III": case "[III] Silver III": case "[II] Silver III": case "[I] Silver III": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/silver/silver3.png`;
            case "[IV] Silver II": case "[III] Silver II": case "[II] Silver II": case "[I] Silver II": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/silver/silver2.png`;
            case "[IV] Silver I": case "[III] Silver I": case "[II] Silver I": case "[I] Silver I": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/silver/silver1.png`;
            /// Bronze
            case "[IV] Bronze III": case "[III] Bronze III": case "[II] Bronze III": case "[I] Bronze III": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/bronze/bronze3.png`;
            case "[IV] Bronze II": case "[III] Bronze II": case "[II] Bronze II": case "[I] Bronze II": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/bronze/bronze2.png`;
            case "[IV] Bronze I": case "[III] Bronze I": case "[II] Bronze I": case "[I] Bronze I": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/bronze/bronze1.png`;
            /// Unranked
            case "[I] Unranked": return `${path.resolve(__dirname, '..', '..', '..')}/assets/rocketleague/ranks/unranked/unranked.png`;
        }
    }

}