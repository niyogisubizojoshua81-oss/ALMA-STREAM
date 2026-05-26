// Initialize the core Plyr Media System
const almaPlayer = new Plyr('#almaEngine'); 

// Global Owner Identification Record
const ADMIN_EMAIL = "niyogisubizoJoshua81@gmail.com"; 

// Configuration URL: Your Preroll Video Ad Link (Change this link anytime to update your ad)
const AD_VIDEO_URL = "https://f000.backblazeb2.com/file/your-ad-bucket/sample-ad.mp4"; 

// Local Storage Array Cache mimicking a real live API payload
let remoteMovieDatabase = []; 

// Fallback Mock Data System representing your cloud links
const fallbackCloudData = [
    {
        title: "The Silent Force (VJ Junior Edition)",
        description: "An explosive high-stakes operation fully translated into Luganda by VJ Junior. Immersive sound design and crisp video clarity.",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500",
        videoUrl: "https://f000.backblazeb2.com/file/your-movie-bucket/action1.mp4",
        category: "vj-translated",
        vj: "VJ Junior"
    },
    {
        title: "Interstellar Horizon",
        description: "A profound sci-fi story breaking down technological thresholds and cosmological shifts across unknown systems.",
        poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
        videoUrl: "https://f000.backblazeb2.com/file/your-movie-bucket/scifi2.mp4",
        category: "trending",
        vj: "Original English"
    }
]; 

// Initialize System Application Framework
document.addEventListener('DOMContentLoaded', () => {
    initializeAdminStatus();
    fetchCloudDatabase();
    setupSearchFilters();
}); 

// 1. Identify and display Administrator ownership parameters
function initializeAdminStatus() {
    const adminIndicator = document.getElementById('adminIndicator');
    // Simulated authentication confirmation for your dashboard identity
    if(ADMIN_EMAIL === "niyogisubizoJoshua81@gmail.com") {
        adminIndicator.innerHTML = "👑 Admin Confirmed";
        adminIndicator.style.borderColor = "#38bdf8";
        adminIndicator.style.color = "#38bdf8";
    }
} 

// 2. Fetch content dynamically from your Cloud API link structure
function fetchCloudDatabase() {
    /* Optimization Note: When ready, you can deploy a json file to your GitHub repository,
       copy its raw link, and use code like this to pull your links live from the cloud:
       
       fetch('https://raw.githubusercontent.com/your-profile/your-repo/main/movies.json')
       .then(res => res.json())
       .then(data => { ... })
    */
    
    // Using local data simulation array mimicking direct server data responses
    remoteMovieDatabase = fallbackCloudData;
    renderShelves(remoteMovieDatabase);
} 

// 3. Build UI Movie Posters dynamically onto the dashboard lanes
function renderShelves(dataList) {
    const trendingShelf = document.getElementById('trendingShelf');
    const vjShelf = document.getElementById('vjShelf');
    
    // Flush UI areas clean
    trendingShelf.innerHTML = "";
    vjShelf.innerHTML = ""; 

    dataList.forEach(movie => {
        const posterCard = document.createElement('div');
        posterCard.classList.add('movie-poster-card');
        posterCard.innerHTML = `
            <div class="image-container">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <span class="vj-tag">${movie.vj}</span>
            </div>
            <div class="poster-meta">
                <h3>${movie.title}</h3>
            </div>
        `; 

        // Bind streaming selection mechanics
        posterCard.addEventListener('click', () => {
            triggerMonetizedPlayback(movie);
        }); 

        if (movie.category === 'trending') {
            trendingShelf.appendChild(posterCard);
        } else if (movie.category === 'vj-translated') {
            vjShelf.appendChild(posterCard);
        }
    });
} 

// 4. Double-Pass Preroll Engine: Play Ad completely before executing Movie Content
function triggerMonetizedPlayback(selectedMovie) {
    const adNotice = document.getElementById('adNotice');
    const activeTitle = document.getElementById('activeTitle');
    const activeDesc = document.getElementById('activeDescription'); 

    // Section A: Execute Video Ad sequence
    adNotice.style.display = "block";
    activeTitle.textContent = "[ADVERTISEMENT] - Loading Premium Stream...";
    activeDesc.textContent = "Please wait while your verified high-definition media pipeline finishes buffering.";
    
    // Feed the Ad link into the player engine
    almaPlayer.source = {
        type: 'video',
        sources: [{ src: AD_VIDEO_URL, type: 'video/mp4' }]
    };
    almaPlayer.play(); 

    // Section B: Intercept standard play progression. When Ad finishes, trigger the true movie link.
    almaPlayer.once('ended', () => {
        adNotice.style.display = "none";
        activeTitle.textContent = selectedMovie.title;
        activeDesc.textContent = selectedMovie.description; 

        // Switch sources securely to point to your Backblaze file url
        almaPlayer.source = {
            type: 'video',
            title: selectedMovie.title,
            sources: [{ src: selectedMovie.videoUrl, type: 'video/mp4' }]
        };
        almaPlayer.play();
    });
} 

// 5. OnStream Style Comprehensive Search Filter Logic
function setupSearchFilters() {
    const searchBar = document.getElementById('movieSearch');
    searchBar.addEventListener('input', (event) => {
        const term = event.target.value.toLowerCase();
        const searchMatches = remoteMovieDatabase.filter(item => 
            item.title.toLowerCase().includes(term) || 
            item.vj.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term)
        );
        renderShelves(searchMatches);
    });
}
