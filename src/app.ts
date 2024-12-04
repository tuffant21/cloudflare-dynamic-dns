import 'dotenv/config';
import axios from 'axios';
import { networkInterfaces } from 'node:os';

function getIpAddress(): string {
    const nets = networkInterfaces();
    const results= Object.create(null);
    
    for (const name of Object.keys(nets)) {
        for (const net of nets[name] ?? []) {
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4

            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }

    return results["en0"]?.[0] ?? results["eno1"]?.[0] ?? results["eth0"]?.[0] ?? '';
}

async function updateDns(ipAddress: string): Promise<void> {
    const zoneId = process.env.CLOUDFLARE_ZONE_ID;
    const dnsRecordId = process.env.CLOUDFLARE_DNS_RECORD_ID;
    const authEmail = process.env.CLOUDFLARE_AUTH_EMAIL;
    const authKey = process.env.CLOUDFLARE_AUTH_KEY;
    const domainName = process.env.DOMAIN_NAME;

    const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${dnsRecordId}`;

    console.debug(`[PUT] ${url}`);

    try {
        await axios({
            method: 'put',
            url,
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Email': authEmail,
                'X-Auth-Key': authKey
            },
            data: {
                comment: "Domain verification record",
                name: domainName,
                proxied: false,
                settings: {},
                tags: [],
                ttl: 3600,
                content: ipAddress,
                type: 'A'
            }
        });

        console.log('Request completed successfully');
    } catch (e) {
        console.error(`There was an error from cloudflare: ${e}`);
    } finally {
        process.exit(0);
    }
}

const ipAddress = getIpAddress();
updateDns(ipAddress);
