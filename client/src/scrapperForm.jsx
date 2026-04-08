
// import React, { useState } from 'react';

// const ScraperForm = () => {
//   const [category, setCategory] = useState('');
//   const [city, setCity] = useState('Douala');
//   const [area, setArea] = useState('');
//   const [depth, setDepth] = useState('basic');
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState('');

//   // Modal states
//   const [showResultModal, setShowResultModal] = useState(false);
//   const [allLeads, setAllLeads] = useState([]);
//   const [showAllLeadsModal, setShowAllLeadsModal] = useState(false);
//   const [loadingAllLeads, setLoadingAllLeads] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!category.trim()) {
//       setError('Please enter a business category (e.g., Salons, Restaurants)');
//       return;
//     }

//     setIsLoading(true);
//     setError('');
//     setResult(null);

//     try {
//       const response = await fetch('http://localhost:3030/api/jobs/scrape', {
//       // const response = await fetch('https://webscrapping-jm2m.onrender.com/api/jobs/scrape', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           country: 'Cameroon',
//           city: city,
//           area: area.trim(),
//           category: category.trim(),
//           depth: depth
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setResult(data);
//         setShowResultModal(true);        // Open immediate results modal
//       } else {
//         setError(data.error || 'Failed to start scraping');
//       }
//     } catch (err) {
//       setError('Network error. Make sure your backend server is running.');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch ALL leads from database
//   const fetchAllLeads = async () => {
//     setLoadingAllLeads(true);
//     setError('');

//     try {
//       const response = await fetch('http://localhost:3030/api/jobs/leads'); // ← Correct endpoint
//       // const response = await fetch('https://webscrapping-jm2m.onrender.com/api/jobs/leads'); // ← Correct endpoint

//       if (!response.ok) throw new Error('Failed to fetch leads');

//       const data = await response.json();
//       console.log('All Leads Response:', data); // For debugging

//       if (data.success) {
//         setAllLeads(data.leads || []);
//         setShowAllLeadsModal(true);
//       } else {
//         setError(data.error || 'Failed to load leads');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Could not load all leads. Check if backend is running.');
//     } finally {
//       setLoadingAllLeads(false);
//     }
//   };

//   return (
//     <div className="scraper-container">
//       <div className="scraper-card">
//         <h1 className="title">Lead Scraper System</h1>
//         <p className="subtitle">WhatsApp-Focused Lead Generator for Africa</p>

//         {/* Original Form */}
//         <form onSubmit={handleSubmit} className="scraper-form">
//           <div className="form-group">
//             <label>Business Category <span className="required">*</span></label>
//             <input
//               type="text"
//               className="input-field"
//               placeholder="e.g. Salons, Barbershops, Restaurants, Boutiques"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>City <span className="required">*</span></label>
//             <input
//               type="text"
//               className="input-field"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Area / Neighborhood (Optional)</label>
//             <input
//               type="text"
//               className="input-field"
//               placeholder="e.g. Bonamoussadi, Deido, Akwa"
//               value={area}
//               onChange={(e) => setArea(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label>Scraping Depth</label>
//             <select 
//               className="select-field"
//               value={depth}
//               onChange={(e) => setDepth(e.target.value)}
//             >
//               <option value="basic">Basic (Fast - Phone & WhatsApp only)</option>
//               <option value="advanced">Advanced (Slower - Emails + Social Links)</option>
//             </select>
//           </div>

//           <button 
//             type="submit" 
//             className="scrape-button"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <span className="spinner"></span>
//                 Scraping in Progress...
//               </>
//             ) : (
//               '🚀 Start Scraping Leads'
//             )}
//           </button>
//         </form>

//         {/* Error Message */}
//         {error && <div className="error-message">{error}</div>}

//         {/* View All Leads Button */}
//         <button 
//           onClick={fetchAllLeads}
//           className="view-all-button"
//           disabled={loadingAllLeads}
//           style={{ marginTop: '15px', width: '100%' }}
//         >
//           {loadingAllLeads ? 'Loading All Leads...' : '📋 View All Scraped Leads'}
//         </button>
//       </div>

//       {/* ====================== IMMEDIATE RESULTS MODAL ====================== */}
//       {showResultModal && result && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>✅ Scraping Completed!</h2>
//             <p><strong>Total Businesses Found:</strong> {result.totalFound}</p>
//             <p><strong>New Leads Saved:</strong> {result.totalProcessed}</p>

//             {result.leads && result.leads.length > 0 ? (
//               <>
//                 <h3>Newly Scraped Leads ({result.leads.length})</h3>
//                 <table className="leads-table">
//                   <thead>
//                     <tr>
//                       <th>Business Name</th>
//                       <th>Phone</th>
//                       <th>WhatsApp</th>
//                       <th>Facebook</th>
//                       <th>LinkedIn</th>
//                       <th>Country</th>
//                       <th>Email</th>
//                       <th>Quality</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {result.leads.map((lead, index) => (
//                       <tr key={lead._id || index}>
//                         <td>{lead.businessName}</td>
//                         <td>{lead.phone || '-'}</td>
//                         <td>{lead.whatsappNumber ? '✅ Yes' : '-'}</td>
                      
// <td>
//   {lead.facebook ? (
//     <a href={lead.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
//   ) : '—'}
// </td>
// <td>
//   {lead.linkedin ? (
//     <a href={lead.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
//   ) : '—'}
// </td>
// <td>{lead.country}</td>
//                         {/* <td>{lead.facebook || '-'}</td>
//                         <td>{lead.linkedIn || '-'}</td> */}
//                         <td>{lead.email || '-'}</td>
//                         <td>
//                           <span className={`quality-badge ${lead.leadQuality?.toLowerCase() || 'incomplete'}`}>
//                             {lead.leadQuality || 'INCOMPLETE'}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </>
//             ) : (
//               <div style={{ textAlign: 'center', padding: '30px 20px', color: '#64748b' }}>
//                 <p><strong>No new leads were saved.</strong></p>
//                 <p style={{ fontSize: '14px' }}>
//                   Leads may already exist in the database (duplicates skipped).
//                 </p>
//               </div>
//             )}

//             <div className="modal-buttons">
//               <button 
//                 onClick={() => setShowResultModal(false)} 
//                 className="close-modal-btn"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ====================== ALL LEADS MODAL ====================== */}
//       {showAllLeadsModal && (
//         <div className="modal-overlay">
//           <div className="modal-content large-modal">
//             <h2>📋 All Scraped Leads ({allLeads.length})</h2>

//             {allLeads.length > 0 ? (
//               <table className="leads-table">
//                 <thead>
//                   <tr>
//                     <th>Business Name</th>
//                     <th>Category</th>
//                     <th>City</th>
//                     <th>Phone / WhatsApp</th>
//                     <th>Email</th>
//                     <th>Quality</th>
//                     <th>Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {allLeads.map((lead) => (
//                     <tr key={lead._id}>
//                       <td>{lead.businessName}</td>
//                       <td>{lead.category}</td>
//                       <td>{lead.city}{lead.area ? `, ${lead.area}` : ''}</td>
//                       <td>
//                         {lead.whatsappNumber 
//                           ? `WhatsApp: ${lead.whatsappNumber}` 
//                           : lead.phone || '-'}
//                       </td>
//                       <td>{lead.email || '-'}</td>
//                       <td>
//                         <span className={`quality-badge ${lead.leadQuality?.toLowerCase() || 'incomplete'}`}>
//                           {lead.leadQuality || 'INCOMPLETE'}
//                         </span>
//                       </td>
//                       <td>{new Date(lead.scrapedAt).toLocaleDateString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
//                 No leads found in the database yet.
//               </p>
//             )}

//             <div className="modal-buttons">
//               <button 
//                 onClick={() => setShowAllLeadsModal(false)} 
//                 className="close-modal-btn"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ScraperForm;




































import React, { useState } from 'react';


const ScraperForm = () => {
  const [formData, setFormData] = useState({
    country: 'Cameroon',
    city: 'Douala',
    area: '',
    category: '',
    depth: 'basic'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Modal states
  const [showResultModal, setShowResultModal] = useState(false);
  const [allLeads, setAllLeads] = useState([]);
  const [showAllLeadsModal, setShowAllLeadsModal] = useState(false);
  const [loadingAllLeads, setLoadingAllLeads] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category.trim() || !formData.city.trim()) {
      setError('Category and City are required');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      // const response = await fetch('http://localhost:3030/api/jobs/scrape', {
        const response = await fetch('https://webscrapping-jm2m.onrender.com/api/jobs/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: formData.country,
          city: formData.city.trim(),
          area: formData.area.trim(),
          category: formData.category.trim(),
          depth: formData.depth
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        setShowResultModal(true);
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

  // Fetch ALL leads from database
  const fetchAllLeads = async () => {
    setLoadingAllLeads(true);
    setError('');

    try {
      // const response = await fetch('http://localhost:3030/api/jobs/leads');
      const response = await fetch('https://webscrapping-jm2m.onrender.com/api/jobs/leads');

      if (!response.ok) throw new Error('Failed to fetch leads');

      const data = await response.json();

      if (data.success) {
        setAllLeads(data.leads || []);
        setShowAllLeadsModal(true);
      } else {
        setError(data.error || 'Failed to load leads');
      }
    } catch (err) {
      console.error(err);
      setError('Could not load all leads. Check if backend is running.');
    } finally {
      setLoadingAllLeads(false);
    }
  };

  return (
    <div className="scraper-container">
      <div className="scraper-card">
        <h1 className="title">Lead Scraper System</h1>
        <p className="subtitle">WhatsApp-Focused Lead Generator for Africa</p>

        <form onSubmit={handleSubmit} className="scraper-form">

       
          {/* Category */}
          <div className="form-group">
            <label>Business Category <span className="required">*</span></label>
            <input
              type="text"
              name="category"
              className="input-field"
              placeholder="e.g. Salons, Barbershops, Restaurants, Boutiques"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          {/* Depth */}
          <div className="form-group">
            <label>Scraping Depth</label>
            <select 
              name="depth"
              className="select-field"
              value={formData.depth}
              onChange={handleChange}
            >
              <option value="basic">Basic (Fast - Phone & WhatsApp only)</option>
              <option value="advanced">Advanced (Emails + Social Links)</option>
            </select>
          </div>

             {/* Country */}
          <div className="form-group">
            <label>Country <span className="required">*</span></label>
            <select 
              name="country"
              className="select-field"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="Cameroon">Cameroon</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Ivory Coast">Ivory Coast</option>
              <option value="Kenya">Kenya</option>
              <option value="Senegal">Senegal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* City */}
          <div className="form-group">
            <label>City <span className="required">*</span></label>
            <input
              type="text"
              name="city"
              className="input-field"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          {/* Area */}
          <div className="form-group">
            <label>Area / Neighborhood (Optional)</label>
            <input
              type="text"
              name="area"
              className="input-field"
              placeholder="e.g. Bonamoussadi, Deido, Akwa"
              value={formData.area}
              onChange={handleChange}
            />
          </div>


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

        {/* View All Leads Button */}
        <button 
          onClick={fetchAllLeads}
          className="view-all-button"
          disabled={loadingAllLeads}
        >
          {loadingAllLeads ? 'Loading All Leads...' : '📋 View All Scraped Leads'}
        </button>
      </div>

      {/* ====================== RESULTS MODAL (After Scraping) ====================== */}
      {showResultModal && result && (
        <div className="modal-overlay" onClick={() => setShowResultModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>✅ Scraping Completed!</h2>
            <p><strong>Total Businesses Found:</strong> {result.totalFound}</p>
            <p><strong>New Leads Saved:</strong> {result.totalProcessed}</p>

            {result.leads && result.leads.length > 0 ? (
              <div className="table-wrapper">
                <table className="leads-table">
                  <thead>
                    <tr>
                      <th>Business Name</th>
                      <th>Phone</th>
                      <th>WhatsApp</th>
                      <th>Facebook</th>
                      <th>LinkedIn</th>
                      <th>Country</th>
                      <th>Email</th>
                      <th>Quality</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.leads.map((lead, index) => (
                      <tr key={lead._id || index}>
                        <td>{lead.businessName}</td>
                        <td>{lead.phone || '-'}</td>
                        <td>{lead.whatsappNumber ? '✅ Yes' : '-'}</td>
                        <td>
                          {lead.facebook ? (
                            <a href={lead.facebook} target="_blank" rel="noopener noreferrer">View</a>
                          ) : '—'}
                        </td>
                        <td>
                          {lead.linkedin ? (
                            <a href={lead.linkedin} target="_blank" rel="noopener noreferrer">View</a>
                          ) : '—'}
                        </td>
                        <td>{lead.country || 'Cameroon'}</td>
                        <td>{lead.email || '-'}</td>
                        <td>
                          <span className={`quality-badge ${lead.leadQuality?.toLowerCase() || 'incomplete'}`}>
                            {lead.leadQuality || 'INCOMPLETE'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-leads-message">
                <p><strong>No new leads were saved.</strong></p>
                <p>Leads may already exist in the database (duplicates were skipped).</p>
              </div>
            )}

            <div className="modal-buttons">
              <button 
                onClick={() => setShowResultModal(false)} 
                className="close-modal-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================== ALL LEADS MODAL ====================== */}
      {showAllLeadsModal && (
        <div className="modal-overlay" onClick={() => setShowAllLeadsModal(false)}>
          <div className="modal-content large-modal" onClick={e => e.stopPropagation()}>
            <h2>📋 All Scraped Leads ({allLeads.length})</h2>

            {allLeads.length > 0 ? (
              <div className="table-wrapper">
                <table className="leads-table">
                  <thead>
                    <tr>
                      <th>Business Name</th>
                      <th>Category</th>
                      <th>City</th>
                      <th>Phone / WhatsApp</th>
                      <th>Email</th>
                      <th>Quality</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allLeads.map((lead) => (
                      <tr key={lead._id}>
                        <td>{lead.businessName}</td>
                        <td>{lead.category}</td>
                        <td>{lead.city}{lead.area ? `, ${lead.area}` : ''}</td>
                        <td>
                          {lead.whatsappNumber 
                            ? `WhatsApp: ${lead.whatsappNumber}` 
                            : lead.phone || '-'}
                        </td>
                        <td>{lead.email || '-'}</td>
                        <td>
                          <span className={`quality-badge ${lead.leadQuality?.toLowerCase() || 'incomplete'}`}>
                            {lead.leadQuality || 'INCOMPLETE'}
                          </span>
                        </td>
                        <td>{new Date(lead.scrapedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-leads-message">No leads found in the database yet.</p>
            )}

            <div className="modal-buttons">
              <button 
                onClick={() => setShowAllLeadsModal(false)} 
                className="close-modal-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScraperForm;


