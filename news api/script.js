const API_KEY = 'pub_a69dcccba9ae43949e38465c1cb041f8';

  async function fetchNews(category = 'world') {
    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${category}&language=en`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const articles = data.results || [];

      const newsGrid = document.getElementById('newsGrid');
      newsGrid.innerHTML = '';

      articles.forEach((article, index) => {
        if (!article.title || !article.link || !article.description) return;
        const card = document.createElement('div');
        card.className = 'col-md-4';

        card.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <img src="${article.image_url || 'https://via.placeholder.com/300x180'}" class="card-img-top" alt="News Image">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description.slice(0, 100)}...</p>
              <a href="#" class="btn btn-primary btn-sm" onclick="viewDetails(${index})">Read More</a>
            </div>
          </div>
        `;
        newsGrid.appendChild(card);

        // Save article in localStorage
        localStorage.setItem('news_${index}', JSON.stringify(article));
      });

      if (articles.length === 0) {
        newsGrid.innerHTML = '<p class="text-center">No news found for this category.</p>';
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
      document.getElementById('newsGrid').innerHTML = '<p class="text-danger">Failed to load news.</p>';
    }
  }

  function viewDetails(index) {
    localStorage.setItem('selectedNews', 'news_$ {index}');
    window.open('details.html', '_blank');
  }

  fetchNews(); // Initial load