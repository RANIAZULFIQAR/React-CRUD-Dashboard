import React, { useState, useEffect } from 'react';
import './NewsDashboard.css';

// --- MOCK DATA FOR SIMULATING POST/PUT/DELETE ---
// These articles can be edited/deleted. Real API articles (GET) cannot.
const initialMockNews = [
  { id: 1, title: "Lab Status: Project Setup Complete", source: "Local Admin", date: "2025-11-14", content: "This article is a mock entry to test POST, PUT, and DELETE operations." },
];

function NewsDashboard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(null); // ID of the article being edited
  const [form, setForm] = useState({ title: '', source: '', content: '' });

  // --- GET Operation: Fetching Real News ---
  useEffect(() => {
    const fetchRealNews = async () => {
      // ⚠️ IMPORTANT: Replace 'YOUR_API_KEY'
      const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=YOUR_API_KEY`;

      try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Map real news to a simple structure
        const realArticles = data.articles.map((article, index) => ({
          // Use a string ID for real articles to distinguish them from mock numeric IDs
          id: `real-${index + 1}`,
          title: article.title,
          source: article.source.name,
          date: new Date(article.publishedAt).toLocaleDateString(),
          content: article.description,
        }));
        
        // Combine mock articles (for CRUD practice) and real articles (for GET practice)
        setNews([...initialMockNews, ...realArticles]); 
        setError(null);

      } catch (err) {
        console.error("Error fetching real news:", err);
        // Fallback: Use only mock data if API call fails
        setNews(initialMockNews); 
        setError("Could not fetch real news (API Key/Network Issue). Displaying mock data only.");
      } finally {
        setLoading(false);
      }
    };

    fetchRealNews();
  }, []); 

  // --- Form Input Handler ---
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- POST Operation (Simulated) ---
  const handlePost = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    // Simulate POST request success
    const newArticle = {
      id: Date.now(), // Use timestamp as unique ID
      title: form.title,
      source: form.source || 'Local Draft',
      date: new Date().toLocaleDateString(),
      content: form.content,
    };

    setNews([newArticle, ...news]); // Add new article to the state
    setForm({ title: '', source: '', content: '' }); // Clear form
    alert('✅ POST Simulated: New local article created!');
  };

  // --- PUT Operation (Simulated) ---
  const handleEdit = (id) => {
    const articleToEdit = news.find(n => n.id === id);
    if (articleToEdit) {
      // Load current data into form and enter editing mode
      setForm({ title: articleToEdit.title, source: articleToEdit.source, content: articleToEdit.content });
      setIsEditing(id);
    }
  };

  const handlePut = (e) => {
    e.preventDefault();
    if (!isEditing || !form.title || !form.content) return;

    // Simulate PUT request success by updating the article in the array
    const updatedNews = news.map(article =>
      article.id === isEditing
        ? { ...article, title: form.title, source: form.source, content: form.content, date: new Date().toLocaleDateString() }
        : article
    );

    setNews(updatedNews);
    setIsEditing(null); // Exit editing mode
    setForm({ title: '', source: '', content: '' }); // Clear form
    alert(`✏️ PUT Simulated: Article ID ${isEditing} updated!`);
  };

  // --- DELETE Operation (Simulated) ---
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this article (ID: ${id})?`)) {
      // Simulate DELETE request success by filtering the article out of the array
      const updatedNews = news.filter(article => article.id !== id);
      setNews(updatedNews);
      alert(`🗑️ DELETE Simulated: Article ID ${id} removed.`);
    }
  };

  // --- Render ---
  if (loading) return <div className="loading-state">Loading news...</div>;

  return (
    <div className="news-dashboard">
      <header className="header">
        <h1>Global News Feed 📰</h1>
        <p>Lab Project: Practicing **GET** (Real API) and simulating **POST, PUT, DELETE**.</p>
      </header>
      
      {/* Article Creation/Edit Form (POST/PUT) */}
      <section className="form-section">
        <h2>{isEditing ? 'Edit Existing Article (PUT)' : 'Create New Article (POST)'}</h2>
        {error && <div className="error-message">⚠️ {error}</div>}
        <form onSubmit={isEditing ? handlePut : handlePost} className="news-form">
          <input
            type="text"
            name="title"
            placeholder="Article Title (Required)"
            value={form.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="source"
            placeholder="Source (e.g., Local Draft)"
            value={form.source}
            onChange={handleInputChange}
          />
          <textarea
            name="content"
            placeholder="Article Content (Required)"
            value={form.content}
            onChange={handleInputChange}
            required
          />
          <div className='form-actions'>
            <button type="submit" className={isEditing ? 'btn-update' : 'btn-create'}>
              {isEditing ? 'Save Changes (PUT)' : 'Publish Article (POST)'}
            </button>
            {isEditing && (
              <button 
                type="button" 
                onClick={() => { setIsEditing(null); setForm({ title: '', source: '', content: '' }); }} 
                className="btn-cancel"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </section>

      {/* News List (GET) */}
      <section className="news-list-section">
        <h2>All Articles ({news.length})</h2>
        <div className="news-grid">
          {news.map((article) => (
            <div key={article.id} className="news-card">
              <span className="news-source">{article.source} | {article.date}</span>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
              
              {/* Allow editing/deleting only for mock articles (those with numeric IDs) */}
              {(typeof article.id === 'number') && (
                <div className="card-actions">
                  <button onClick={() => handleEdit(article.id)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(article.id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              )}
              {/* Show a label for real articles that cannot be manipulated */}
              {(typeof article.id === 'string' && article.id.startsWith('real')) && (
                <div className="card-actions">
                    <span className="read-only-tag">Read-Only (API Data)</span>
                </div>
              )}
            </div>
          ))}
        </div>
        {news.length === 0 && <p>No articles found.</p>}
      </section>
    </div>
  );
}

export default NewsDashboard;