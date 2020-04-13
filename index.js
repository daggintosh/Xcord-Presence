const RPC = require('discord-rpc');
let client = new RPC.Client({ transport: 'ipc' });

const applescript = require('applescript');

const startTimestamp = new Date()

async function setRP() {
    if (!client) {
        return;
    };
    applescript.execFile('./getdetails.scpt', (err, rtn) => {
        if (err) {
            console.log(err);
        };
        if (rtn == "xcna") {
            client.setActivity({
                details: `Offline`,
                state: `Xcode is offline`,
                startTimestamp,
                largeImageKey: "xcode",
                largeImageText: "Xcode",
                instance: false
            })
        }
        else if (rtn == "nwa") {
            client.setActivity({
                details: `Inactive`,
                state: `Xcode is waiting patiently in the background`,
                startTimestamp,
                largeImageKey: "xcode",
                largeImageText: "Xcode",
                instance: false
            })
        }
        else if (rtn == "npj") {
            client.setActivity({
                details: `Browsing`,
                state: `Finding the perfect project`,
                startTimestamp,
                largeImageKey: "xcode",
                largeImageText: "Xcode",
                instance: false
            })
        }
        else if (rtn[1] == "nwsp") {
            client.setActivity({
                details: `${rtn[0]}`,
                state: `Editing a file`,
                startTimestamp,
                largeImageKey: "xcode",
                largeImageText: "Xcode",
                instance: false
            })
        }
        else {
            let extraw = rtn[0].split(".");
            let ext = extraw[1]
            let language
            switch (ext) {
                case "swift":
                    language = "Swift"
                    break
                case "storyboard":
                    language = "Storyboard"
                    break
                case "xcodeproj":
                    language = "project settings"
                    break
                case "plist":
                    language = "properties"
                    break
                case "xcdatamodel":
                    language = "Core Data container"
                    break
                case "xcassets":
                    language = "xcassets"
                default:
                    language = "miscellaneous"
            };
            let details = [
                rtn[0], // Current document
                rtn[1][0], // Project title
                rtn[2][0], // Target
                rtn[3], // Flavour
                language
            ];
            let target = details[2]
            let friendlytext
            if (target == "My Mac") {
                target = "imac"
                friendlytext = "macOS"
            }
            else if(target.includes("iphoneos")) {
                target = "iphone"
                friendlytext = "iOS"
            }
            else {
                target = "imac"
                friendlytext = "misc device"
            }

            
            client.setActivity({
                details: `${details[0]}`,
                state: `${details[1]}`,
                startTimestamp,
                largeImageKey: `${details[4].replace(/\s+/g, '').toLowerCase()}`,
                largeImageText: `Editing a ${details[4]} file`,
                smallImageKey: `${target.replace(/\s+/g, '').toLowerCase()}`,
                smallImageText: `Targeting ${friendlytext}`,
                instance: false
            });
        };
    });
};

client.on('ready', () => {
    console.log("[Success!] Connected to Discord\nYou *might* be able to run this headless, but I'd advise to leave it visible in case of errors.")
    setRP();

    setInterval(() => {
        setRP();
    }, 15000);
});

const clientId = '699124177319231531';
const scopes = ['rpc'];

client.login({ clientId: clientId, scopes: scopes }).catch(console.error)