// メニューの表示/非表示を切り替える関数
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    menu.classList.toggle('open');
}

// ニュースを取得して表示する
async function fetchNews() {
    const apiKey = '440f439297b7463f9411a7ef46cf4cd4'; // 実際のAPIキーをここに入力してください
    const url = ` https://api.worldnewsapi.com/top-news?source-country=us&date=2024-08-30`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('ニュースの取得に失敗しました:', error);
    }
}

// ニュースをHTMLに追加する
function displayNews(articles) {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = ''; // 既存のニュースをクリア
    articles.forEach(article => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">続きを読む</a>
        `;
        newsList.appendChild(listItem);
    });
}

// 株価データを取得して表示する (例)
async function fetchStocks() {
    const url = 'YOUR_STOCKS_API_URL'; // 株価APIのURLをここに入力してください
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayStocks(data);
    } catch (error) {
        console.error('株価の取得に失敗しました:', error);
    }
}

// 株価をHTMLに追加する
function displayStocks(stocks) {
    const stocksList = document.getElementById('stocksList');
    stocksList.innerHTML = ''; // 既存の株価をクリア
    stocks.forEach(stock => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${stock.name}</h3>
            <p>現在の価格: ${stock.price}</p>
        `;
        stocksList.appendChild(listItem);
    });
}

// チャートを描画する関数
function createChart() {
    const weatherChart = document.getElementById('weatherChart').getContext('2d');
    const stockChart = document.getElementById('stockChart').getContext('2d');

    // 天気チャートの例
    new Chart(weatherChart, {
        type: 'line',
        data: {
            labels: ['日', '月', '火', '水', '木', '金', '土'],
            datasets: [{
                label: '気温',
                data: [20, 22, 19, 24, 25, 27, 28],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // 株価チャートの例
    new Chart(stockChart, {
        type: 'bar',
        data: {
            labels: ['AAPL', 'GOOGL', 'AMZN', 'MSFT'],
            datasets: [{
                label: '株価',
                data: [145, 2730, 3340, 298],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// ページ読み込み時にニュースと株価データを取得する
window.onload = function() {
    fetchNews();
    fetchStocks();
    createChart();
};

