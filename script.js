const API_KEY = "289dabbb6d824671a977982a1f12aace";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchnews("India"));

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-text').value;
    fetchnews(query);
});

async function fetchnews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }
        const data = await res.json();
        bindata(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        alert("Failed to fetch news articles. Please try again later.");
    }
}

function bindata(articles) {
    const cardcontainer = document.getElementById('cards-container');
    const newscardtemplate = document.getElementById('template-news-card');
    cardcontainer.innerHTML = '';
    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardclone = newscardtemplate.content.cloneNode(true);
        filldataincard(cardclone, article);
        cardcontainer.appendChild(cardclone);
    });
}

function filldataincard(cardclone, article) {
    const newsimage = cardclone.getElementById('news-img');
    const newstitle = cardclone.getElementById('news-title');
    const newssource = cardclone.getElementById('news-source');
    const newsdesc = cardclone.getElementById('news-desc');
    
    newsimage.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    newssource.innerHTML = `${article.source.name} · ${date}`;
    
    cardclone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curselectednav = null;

function onNavItemClick(id) {
    fetchnews(id);
    const navitem = document.getElementById(id);
    curselectednav?.classList.remove('active');
    curselectednav = navitem;
    curselectednav.classList.add('active');
}
