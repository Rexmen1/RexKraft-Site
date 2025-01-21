document.addEventListener('DOMContentLoaded', () => {
    const topVotersList = document.getElementById('top-voters-list');

    // Placeholder data for top 10 Rexmen voters with Minecraft player skins
    const topVoters = [
        { username: 'Rexmen', votes: 500, skinUrl: 'https://skins.danielraybone.com/v1/render/body/Rexmen' },
        { username: 'Subratrix', votes: 450, skinUrl: 'https://skins.danielraybone.com/v1/render/body/Subratrix' },
        { username: 'Ceruleanowl', votes: 400, skinUrl: 'https://skins.danielraybone.com/v1/render/body/Ceruleanowl' },
        { username: 'Elmo76', votes: 350, skinUrl: 'https://skins.danielraybone.com/v1/render/body/Elmo76' },
        { username: 'Micjoseph', votes: 300, skinUrl: 'https://skins.danielraybone.com/v1/render/body/Micjoseph' },
        
        { username: 'Foxycat58', votes: 250, skinUrl: 'https://skins.danielraybone.com/v1/render/body/Foxycat58' },
        { username: 'xmisszeldax', votes: 200, skinUrl: 'https://skins.danielraybone.com/v1/render/body/xmisszeldax' },
        { username: 'bigj1187', votes: 150, skinUrl: 'https://skins.danielraybone.com/v1/render/body/bigj1187' },
        { username: 'Killosabby', votes: 100, skinUrl: 'https://skins.danielraybone.com/v1/render/body/Killosabby' },
        { username: 'glassbiscuits', votes: 50, skinUrl: 'https://skins.danielraybone.com/v1/render/body/glassbiscuits' }
    ];

    // Function to display top voters
    function displayTopVoters(voters) {
        // Create two rows: first row with top 5, second row with next 5
        const topVotersRows = [
            voters.slice(0, 5),   // First row: top 1-5
            voters.slice(5, 10)   // Second row: top 6-10
        ];

        // Generate HTML for the two rows
        const topVotersHtml = topVotersRows.map((row, rowIndex) => `
            <div class="top-voters-row">
                ${row.map((voter, index) => `
                    <div class="top-voter-card">
                        <img 
                            src="${voter.skinUrl}" 
                            alt="${voter.username}" 
                            class="top-voter-avatar"
                        />
                        <div class="top-voter-info">
                            <div class="top-voter-name">${voter.username}</div>
                            <div class="top-voter-votes">${voter.votes} Votes</div>
                        </div>
                        <div class="top-voter-rank">${rowIndex * 5 + index + 1}</div>
                    </div>
                `).join('')}
            </div>
        `).join('');

        topVotersList.innerHTML = topVotersHtml;
    }

    // Display top voters
    displayTopVoters(topVoters);
});
