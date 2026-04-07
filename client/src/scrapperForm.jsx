import React, { useState } from 'react';


const ScraperForm = () => {
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('Douala');           // Default for Cameroon
  const [area, setArea] = useState('');
  const [depth, setDepth] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      setError('Please enter a business category (e.g., Salons, Restaurants)');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('https://webscrapping-jm2m.onrender.com/api/jobs/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: 'Cameroon',
          city: city,
          area: area.trim(),
          category: category.trim(),
          depth: depth
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to start scraping');
      }
    } catch (err) {
      setError('Network error. Make sure your backend server is running.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="scraper-container">
      <div className="scraper-card">
        <h1 className="title">Lead Scraper System</h1>
        <p className="subtitle">WhatsApp-Focused Lead Generator for Africa</p>

        <form onSubmit={handleSubmit} className="scraper-form">
          
          {/* Category Input - Main Field */}
          <div className="form-group">
            <label>Business Category <span className="required">*</span></label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Salons, Barbershops, Restaurants, Boutiques"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          {/* City */}
          <div className="form-group">
            <label>City <span className="required">*</span></label>
            <input
              type="text"
              className="input-field"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          {/* Area / Neighborhood (Optional) */}
          <div className="form-group">
            <label>Area / Neighborhood (Optional)</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Bonamoussadi, Deido, Akwa"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          {/* Scraping Depth */}
          <div className="form-group">
            <label>Scraping Depth</label>
            <select 
              className="select-field"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
            >
              <option value="basic">Basic (Fast - Phone & WhatsApp only)</option>
              <option value="advanced">Advanced (Slower - Emails + Social Links)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="scrape-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Scraping in Progress...
              </>
            ) : (
              '🚀 Start Scraping Leads'
            )}
          </button>
        </form>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Results Summary */}
        {result && (
          <div className="result-card">
            <h3>✅ Scraping Completed Successfully!</h3>
            <p><strong>Total Businesses Found:</strong> {result.totalFound}</p>
            <p><strong>Leads Processed:</strong> {result.totalProcessed}</p>
            
            {result.totalProcessed > 0 && (
              <div className="success-note">
                Leads have been saved to database.<br />
                Check your backend or build the results table next.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScraperForm;