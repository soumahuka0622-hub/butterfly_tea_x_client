// App State
let posts = [];
let categories = [];
let currentPage = 'home';

// DOM Elements
const mainContent = document.getElementById('main-content');
const navItems = document.querySelectorAll('.nav-item');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuBtn = document.getElementById('menu-btn');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const bgmBtn = document.getElementById('bgm-btn');
const bgmAudio = document.getElementById('bgm-audio');
const searchBtn = document.getElementById('search-btn');
const searchOverlay = document.getElementById('search-overlay');
const closeSearchBtn = document.getElementById('close-search-btn');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Init
async function init() {
    setupNavigation();
    setupSidebar();
    setupBGM();
    setupSearch();

    // Show loading state
    mainContent.innerHTML = '<div style="text-align:center; padding: 50px;"><p>Loading articles...</p></div>';

    await fetchPosts();
    renderHome();
}

// Fetch Data
async function fetchPosts() {
    try {
        const apiUrl = `https://butterflyandtea.com/wp-json/wp/v2/posts?_embed&per_page=20&_=${Date.now()}`;
        const response = await fetch(apiUrl, {
            cache: 'no-store'
        });
        const data = await response.json();

        // 重複を削除する魔法のコード
        const uniqueData = data.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        posts = uniqueData.map(post => {
            // Extract category
            const categoryTerm = post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0][0]
                ? post._embedded['wp:term'][0][0].name
                : 'Uncategorized';



            // Extract image
            const imageUrl = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]
                ? post._embedded['wp:featuredmedia'][0].source_url
                : 'https://placehold.co/600x400?text=No+Image';

            // Format date (YYYY-MM-DDTHH:mm:ss -> YYYY.MM.DD)
            const dateObj = new Date(post.date);
            const dateStr = `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;

            return {
                id: post.id,
                title: post.title.rendered,
                excerpt: post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...', // Strip HTML from excerpt
                date: dateStr,
                category: categoryTerm,
                image: imageUrl,
                content: post.content.rendered,
                link: post.link
            };
        });
        // (省略) 前半の fetch 処理など ...

        // Manual Injection (物理的にはみ出しを抑制する版)
        const manualPost = {
            id: 100001,
            title: "【最新】時の重なりを、より鮮明に",
            // 抜粋をあえて極限まで短くして、重なりを防ぐ
            excerpt: "サイトの表示順を最適化しました。ここには常に新しい記録が届きます。",
            date: "2026.02.21",
            category: "お知らせ",
            image: "https://butterflyandtea.com/wp-content/uploads/2026/01/999999.jpg",
            link: "https://butterflyandtea.com/",
            // styleタグを使って、このカード内だけ画像を枠に収める
            content: "<style>img { max-width: 100% !important; height: auto !important; position: static !important; }</style>"
        };

        // 一番上に追加
        posts.unshift(manualPost);

        // 重複を除去（これでWordPress側の同じ記事を消す）
        posts = posts.filter((post, index, self) =>
            index === self.findIndex((t) => (
                t.title === post.title
            ))
        );
        // Extract unique categories
        categories = [...new Set(posts.map(post => post.category))];

    } catch (error) {
        console.error('Error fetching posts:', error);
        mainContent.innerHTML = '<div style="text-align:center; padding: 50px;"><p>Failed to load articles. Please check your connection.</p></div>';
    }
}

// Search
function setupSearch() {
    searchBtn.addEventListener('click', openSearch);
    closeSearchBtn.addEventListener('click', closeSearch);
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
}

function openSearch() {
    searchOverlay.classList.add('open');
    searchInput.focus();
}

function closeSearch() {
    searchOverlay.classList.remove('open');
    searchInput.value = '';
    searchResults.innerHTML = '';
}

function handleSearch(query) {
    if (!query) {
        searchResults.innerHTML = '';
        return;
    }

    const lowerQuery = query.toLowerCase();
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery)
    );

    renderSearchResults(filteredPosts);
}

function renderSearchResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-posts"><p>No results found.</p></div>';
        return;
    }

    const resultsHtml = results.map(post => `
        <div class="search-result-item" onclick="viewPostFromSearch(${post.id})">
            <img src="${post.image}" alt="${post.title}" class="search-result-thumb" onerror="this.src='https://placehold.co/100x100?text=No+Image'">
            <div class="search-result-info">
                <div class="search-result-title">${post.title}</div>
                <div class="search-result-meta">${post.date} | ${post.category}</div>
            </div>
        </div>
    `).join('');

    searchResults.innerHTML = resultsHtml;
}

// Global expose for search result click
window.viewPostFromSearch = function (id) {
    closeSearch();
    viewPost(id);
};

// BGM
function setupBGM() {
    bgmBtn.addEventListener('click', toggleBGM);
}

function toggleBGM() {
    if (bgmAudio.paused) {
        bgmAudio.play().then(() => {
            bgmBtn.classList.add('active');
            bgmBtn.innerHTML = '<i class="ph ph-speaker-high"></i>';
        }).catch(error => {
            console.error("Audio play failed:", error);
            alert("Could not play audio. Please interact with the document first.");
        });
    } else {
        bgmAudio.pause();
        bgmBtn.classList.remove('active');
        bgmBtn.innerHTML = '<i class="ph ph-music-note"></i>';
    }
}

// Router/Navigation
function setupNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const target = e.currentTarget.dataset.target;
            handleNavigation(target);
        });
    });
}

function setupSidebar() {
    menuBtn.addEventListener('click', openSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const target = e.currentTarget.dataset.target;
            handleNavigation(target);
            closeSidebar();
        });
    });
}

function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function handleNavigation(target) {
    setActiveNav(target);
    if (target === 'home') renderHome();
    if (target === 'categories') renderCategories();
    if (target === 'about') renderAbout();
}

function setActiveNav(target) {
    navItems.forEach(item => {
        if (item.dataset.target === target) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Render Functions
function renderHome() {
    if (posts.length === 0) {
        mainContent.innerHTML = '<div class="no-posts"><p>No articles found.</p></div>';
        return;
    }

    const heroPost = posts[0];
    const otherPosts = posts.slice(1);

    const otherPostsHtml = otherPosts.map(post => `
    <article class="post-item" onclick="viewPost(${post.id})">
    <img src="${post.image}" alt="${post.title}" class="post-thumb" onerror="this.src='https://placehold.co/100x100?text=No+Image'">
        <div class="post-info">
            <div class="post-meta">${post.date} | ${post.category}</div>
            <h3 class="post-title">${post.title}</h3>
        </div>
    </article>
    `).join('');

    mainContent.innerHTML = `
    <section class="hero-post" onclick="viewPost(${heroPost.id})">
            <img src="${heroPost.image}" alt="${heroPost.title}" class="hero-image" onerror="this.src='https://placehold.co/600x400?text=No+Image'">
            <div class="hero-content">
                <div class="post-meta">${heroPost.date} | ${heroPost.category}</div>
                <h2 class="hero-title">${heroPost.title}</h2>
                <p class="hero-excerpt">${heroPost.excerpt}</p>
            </div>
        </section>
        <div class="post-list">
            ${otherPostsHtml}
        </div>
    `;
    window.scrollTo(0, 0);
}

function renderPost(post) {
    mainContent.innerHTML = `
    <div class="article-detail">
            <button class="back-btn" onclick="renderHome()">
                <i class="ph ph-arrow-left"></i> Back to Home
            </button>
            <header class="article-header">
                <div class="article-meta-row">
                    <span>${post.date}</span>
                    <span>${post.category}</span>
                </div>
                <h1 class="article-title">${post.title}</h1>
            </header>
            <img src="${post.image}" alt="${post.title}" class="article-image" onerror="this.src='https://placehold.co/600x400?text=No+Image'">
            <div class="article-body">
                ${post.content}
                <p style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                    <a href="${post.link}" target="_blank" style="color: var(--accent-purple); text-decoration: underline; font-weight: bold;">
                        公式サイトでこの記事を読む <i class="ph ph-arrow-square-out"></i>
                    </a>
                </p>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

function renderCategories() {
    const categoriesHtml = categories.map(cat => `
    <div class="category-card" onclick="viewCategory('${cat}')">
    <div class="category-name">${cat}</div>
        </div>
    `).join('');

    mainContent.innerHTML = `
    <div class="categories-view">
            <h2 class="section-title">Categories</h2>
            <div class="category-grid">
                ${categoriesHtml}
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

function renderCategoryPosts(categoryName) {
    const filteredPosts = posts.filter(post => post.category === categoryName);

    if (filteredPosts.length === 0) {
        mainContent.innerHTML = `
    <div class="categories-view">
                <button class="back-btn" onclick="renderCategories()">
                    <i class="ph ph-arrow-left"></i> Back to Categories
                </button>
                <h2 class="section-title">${categoryName}</h2>
                <div class="no-posts">
                    <p>No posts found in this category.</p>
                </div>
            </div>
    `;
    } else {
        const postsHtml = filteredPosts.map(post => `
    <article class="post-item" onclick="viewPost(${post.id})">
        <img src="${post.image}" alt="${post.title}" class="post-thumb" onerror="this.src='https://placehold.co/100x100?text=No+Image'">
            <div class="post-info">
                <div class="post-meta">${post.date} | ${post.category}</div>
                <h3 class="post-title">${post.title}</h3>
            </div>
        </article>
`).join('');

        mainContent.innerHTML = `
    <div class="post-list-view">
                <button class="back-btn" onclick="renderCategories()">
                    <i class="ph ph-arrow-left"></i> Back to Categories
                </button>
                <h2 class="section-title">${categoryName}</h2>
                <div class="post-list">
                    ${postsHtml}
                </div>
            </div>
    `;
    }
    window.scrollTo(0, 0);
}

function renderAbout() {
    mainContent.innerHTML = `
    <div class="article-detail">
            <h1 class="article-title">About</h1>
            <div class="article-body">
                <p><strong>Blog Title:</strong> with the dawn breaking</p>
                <p><strong>Theme:</strong> スピリチュアル×哲学×神話で読み解く現代の魂</p>
                
                <h3>Administrator</h3>
                <p><strong>Name:</strong> ma_（ま）</p>
                <p>趣味は絵を描くこと。</p>

                <h3>Publication</h3>
                <div style="text-align: center; margin: 20px 0;">
                    <img src="https://m.media-amazon.com/images/I/81rjGtj99IL._SX445_.jpg" alt="Book Cover" style="width: 150px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <p style="margin-top: 10px; font-size: 0.9rem;">
                        『蝶とお茶の間で考える、心と世界』<br>
                        <a href="https://www.amazon.co.jp/dp/B0FSF24GB4" target="_blank" style="color: var(--accent-purple);">Amazonで見る</a>
                    </p>
                </div>

                <p style="margin-top: 30px; font-size: 0.8rem; color: var(--text-secondary);">
                    This is a reader prototype for <a href="https://butterflyandtea.com/" target="_blank" style="color: var(--accent-purple);">butterflyandtea.com</a>.
                </p>
            </div>
        </div>
    `;
}

// Global expose for onclick handlers
window.viewPost = function (id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        renderPost(post);
    }
};

window.viewCategory = function (categoryName) {
    renderCategoryPosts(categoryName);
};

window.renderHome = renderHome;
window.renderCategories = renderCategories;

// Start
init();
