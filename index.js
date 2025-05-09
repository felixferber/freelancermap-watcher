import axios from 'axios';

const QUERY = process.env.QUERY || 'angular';
const PUSH_TOPIC = `freelancermap-${QUERY.replace(/[^a-z0-9]/gi, '').toLowerCase()}`;
const URL = `https://www.freelancermap.de/project/search/ajax?projectContractTypes%5B0%5D=contracting&query=${QUERY}&countries%5B%5D=%5B%5D&continents%5B0%5D=-1&sort=1&pagenr=1`;

console.log(`Starte Projektüberwachung für Suchbegriff: "${QUERY}"`);
console.log(`Lade Projekte von: ${URL}`);

(async () => {
    try {
        const response = await axios.get(URL);
        console.log('Projekte erfolgreich geladen.');

        const projects = response.data.projects;
        const now = new Date();
        const threshold = new Date(now.getTime() - 15 * 60000); // 15 Minuten zurück

        console.log(`Verarbeite Projekte, Grenze: ${threshold.toISOString()}`);
        const newProjects = projects.filter(p => new Date(p.created) > threshold);

        for (const p of newProjects) {
            const url = `https://www.freelancermap.de${p.links.project}`;
            const city = p.city || null;
            const startDate = (p.beginningMonth && p.beginningYear) ? `${p.beginningMonth}/${p.beginningYear}` : null;
            const desc = p.description ? p.description.replace(/\r\n|\n|\r/g, ' ').slice(0, 280) : null;

            let message = '';
            if (city) message += `📍 ${city}`;
            if (startDate) message += (message ? ' · ' : '') + `📅 ${startDate}`;
            if (desc) message += (message ? '\n' : '') + `📝 ${desc}`;

            console.log(`Neues Projekt gefunden: ${p.title}`);
            console.log(`→ ${message}`);

            await axios.post(`https://ntfy.sh/${PUSH_TOPIC}`, message || 'Jetzt ansehen', {
                headers: {
                    Title: p.title,
                    Click: url,
                    Tags: 'rocket'
                }
            });

            console.log(`Push gesendet für: ${p.title}`);
        }

        if (newProjects.length === 0) {
            console.log(`Keine neuen Projekte für "${QUERY}" gefunden.`);
        }
    } catch (err) {
        console.error(`Fehler beim Verarbeiten: ${err.message}`);
        process.exit(1);
    }
})();
