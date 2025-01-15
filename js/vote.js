document.addEventListener('DOMContentLoaded', () => {
    const openAllVotesBtn = document.getElementById('open-all-votes');
    
    const voteLinks = [
        'https://tinyurl.com/rkpmc',
        'https://tinyurl.com/rkmcsl',
        'https://tinyurl.com/rkmcmp',
        'https://tinyurl.com/rkmsog',
        'https://tinyurl.com/rkmcsn',
        'https://tinyurl.com/rktopg',
        'https://tinyurl.com/rktmcs'
    ];

    openAllVotesBtn.addEventListener('click', () => {
        voteLinks.forEach(link => {
            window.open(link, '_blank');
        });
    });
});
