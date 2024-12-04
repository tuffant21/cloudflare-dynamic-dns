import axios from 'axios';
import 'dotenv/config';

async function updateDns() {
    const zoneId = process.env.CLOUDFLARE_ZONE_ID;
    const dnsRecordId = process.env.CLOUDFLARE_DNS_RECORD_ID;
    const authEmail = process.env.CLOUDFLARE_AUTH_EMAIL;
    const authKey = process.env.CLOUDFLARE_AUTH_KEY;
    const domainName = process.env.DOMAIN_NAME;

    try {
        await axios({
            method: 'put',
            url: `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${dnsRecordId}`,
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Email': authEmail,
                'X-Auth-Key': authKey
            },
            data: {
                comment: "Domain verification record",
                name: domainName,
                proxied: true,
                settings: {},
                tags: [],
                ttl: 3600,
                content: '',
                type: 'A'
            }
        });
    } catch (e) {
        console.error(`There was an error from cloudflare: ${e}`);
    }
}

//curl --request PUT \
// --url https://api.cloudflare.com/client/v4/zones/zone_id/dns_records/dns_record_id \
// --header 'Content-Type: application/json' \
// --header 'X-Auth-Email: ' \
// --data '{
// "comment": "Domain verification record",
// "name": "example.com",
// "proxied": true,
// "settings": {},
// "tags": [],
// "ttl": 3600,
// "content": "198.51.100.4",
// "type": "A"
// }'
