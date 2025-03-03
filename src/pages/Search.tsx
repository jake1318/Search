import React, { useState } from "react";
import axios from "axios";
import "./Search.css"; // Import dedicated CSS for the search page

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
      setResults(res.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
    setLoading(false);
  };

  // Added to trigger search when the Enter key is pressed.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="search-header">
        <h1 className="title">Cerebra Search</h1>
        <p className="description">
          Search the web, videos, and get AI answers.
        </p>
      </div>
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger search on Enter
          placeholder="Enter search term"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      <div className="results-container">
        {results && (
          <>
            <div className="ai-response">
              <h2>AI Answer</h2>
              <div className="content">{results.aiAnswer}</div>
            </div>
            <div>
              <h2>YouTube Videos</h2>
              <div className="video-grid">
                {results.videos.map((video: any) => (
                  <div key={video.videoId} className="video-card">
                    <a
                      href={`https://youtu.be/${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h3>{video.title}</h3>
                    </a>
                    <img src={video.thumbnail} alt={video.title} />
                  </div>
                ))}
              </div>
            </div>
            <div className="web-links">
              <h2>Web Results</h2>
              {results.webResults.map((result: any) => (
                <div key={result.url} className="web-link-card">
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {result.title}
                  </a>
                  <p>{result.snippet}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <footer className="footer">© 2025 Cerebra Network</footer>
    </div>
  );
};

export default Search;
