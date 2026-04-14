








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
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 20;
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
      // const response = await fetch('https://webscrapping-jm2m.onrender.com/api/jobs/scrape', {
      const response = await fetch('http://localhost:3030/api/jobs/scrape', {
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
    setCurrentPage(1);
    setError('');

    try {
      // const response = await fetch('https://webscrapping-jm2m.onrender.com/api/jobs/leads');
      const response = await fetch('http://localhost:3030/api/jobs/leads');

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

  // ==================== EXPORT FUNCTIONS ====================

  // Export to Excel (.xlsx)
  const exportToExcel = (data, filename) => {
    import('xlsx').then((xlsx) => {
      const ws = xlsx.utils.json_to_sheet(data);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "Leads");
      xlsx.writeFile(wb, `${filename}.xlsx`);
    });
  };

  // Export to PDF (using jsPDF)
  const exportToPDF = (data, filename) => {
    import('jspdf').then((jsPDF) => {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(filename, 14, 20);

      let y = 30;
      data.forEach((lead, index) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.setFontSize(11);
        doc.text(`${index + 1}. ${lead.businessName}`, 14, y);
        doc.text(`Phone: ${lead.phone || '-'} | WhatsApp: ${lead.whatsappNumber || '-'}`, 14, y + 7);
        doc.text(`Email: ${lead.email || '-'} | Country: ${lead.country || 'Cameroon'}`, 14, y + 14);
        y += 25;
      });

      doc.save(`${filename}.pdf`);
    });
  };

  // Export Current Result
  const exportCurrentResult = (type) => {
    if (!result?.leads || result.leads.length === 0) {
      alert("No leads to export!");
      return;
    }

    const filename = `Leads_${formData.category}_${formData.city}`;
    
    if (type === 'excel') {
      exportToExcel(result.leads, filename);
    } else if (type === 'pdf') {
      exportToPDF(result.leads, filename);
    }
  };

  // Export All History
  const exportAllLeads = (type) => {
    if (!allLeads || allLeads.length === 0) {
      alert("No leads in history to export!");
      return;
    }

    const filename = `All_Leads_History`;

    if (type === 'excel') {
      exportToExcel(allLeads, filename);
    } else if (type === 'pdf') {
      exportToPDF(allLeads, filename);
    }
  };

  // Pagination logic for All Leads
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = allLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(allLeads.length / leadsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };


//   return (
//     <div className="scraper-container">
//       <div className="scraper-card">
//         <h1 className="title">Lead Scraper System</h1>
//         <p className="subtitle">WhatsApp-Focused Lead Generator for Africa</p>

//         <form onSubmit={handleSubmit} className="scraper-form">

//           {/* Country */}
//           <div className="form-group">
//             <label>Country <span className="required">*</span></label>
//             <select 
//               name="country"
//               className="select-field"
//               value={formData.country}
//               onChange={handleChange}
//               required
//             >
//               <option value="Cameroon">Cameroon</option>
//               <option value="Nigeria">Nigeria</option>
//               <option value="Ghana">Ghana</option>
//               <option value="Ivory Coast">Ivory Coast</option>
//               <option value="Kenya">Kenya</option>
//               <option value="Senegal">Senegal</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           {/* City */}
//           <div className="form-group">
//             <label>City <span className="required">*</span></label>
//             <input
//               type="text"
//               name="city"
//               className="input-field"
//               value={formData.city}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Area */}
//           <div className="form-group">
//             <label>Area / Neighborhood (Optional)</label>
//             <input
//               type="text"
//               name="area"
//               className="input-field"
//               placeholder="e.g. Bonamoussadi, Deido, Akwa"
//               value={formData.area}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Category */}
//           <div className="form-group">
//             <label>Business Category <span className="required">*</span></label>
//             <input
//               type="text"
//               name="category"
//               className="input-field"
//               placeholder="e.g. Salons, Barbershops, Restaurants, Boutiques"
//               value={formData.category}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Depth */}
//           <div className="form-group">
//             <label>Scraping Depth</label>
//             <select 
//               name="depth"
//               className="select-field"
//               value={formData.depth}
//               onChange={handleChange}
//             >
//               <option value="basic">Basic (Fast - Phone & WhatsApp only)</option>
//               <option value="advanced">Advanced (Emails + Social Links)</option>
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

//         {error && <div className="error-message">{error}</div>}

//         <button 
//           onClick={fetchAllLeads}
//           className="view-all-button"
//           disabled={loadingAllLeads}
//         >
//           {loadingAllLeads ? 'Loading All Leads...' : '📋 View All Scraped Leads'}
//         </button>
//       </div>

//       {/* ====================== RESULTS MODAL ====================== */}
//       {showResultModal && result && (
//         <div className="modal-overlay" onClick={() => setShowResultModal(false)}>
//           <div className="modal-content" onClick={e => e.stopPropagation()}>
//             <h2>✅ Scraping Completed!</h2>
//             <p><strong>Total Businesses Found:</strong> {result.totalFound}</p>
//             <p><strong>New Leads Saved:</strong> {result.totalProcessed}</p>

//             {/* Export Buttons for Current Result */}
//             {result.leads && result.leads.length > 0 && (
//               <div className="export-buttons">
//                 <button onClick={() => exportCurrentResult('excel')} className="export-btn excel">
//                   📊 Export to Excel
//                 </button>
//                 <button onClick={() => exportCurrentResult('pdf')} className="export-btn pdf">
//                   📄 Export to PDF
//                 </button>
//               </div>
//             )}

//             {result.leads && result.leads.length > 0 ? (
//               <div className="table-wrapper">
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
//                         <td>
//                           {lead.facebook ? <a href={lead.facebook} target="_blank" rel="noopener noreferrer">View</a> : '—'}
//                         </td>
//                         <td>
//                           {lead.linkedin ? <a href={lead.linkedin} target="_blank" rel="noopener noreferrer">View</a> : '—'}
//                         </td>
//                         <td>{lead.country || 'Cameroon'}</td>
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
//               </div>
//             ) : (
//               <div className="no-leads-message">
//                 <p><strong>No new leads were saved.</strong></p>
//                 <p>Leads may already exist in the database.</p>
//               </div>
//             )}

//             <div className="modal-buttons">
//               <button onClick={() => setShowResultModal(false)} className="close-modal-btn">
//                 Close
//               </button>
//             </div>
//               {result.leads && result.leads.length > 0 && (
//             <p style={{ marginTop: '15px', color: '#64748b' }}>
//               Showing {result.leads.length} leads (Google limit: max 60 per search)
//             </p>
//           )}
//           </div>
//         </div>
//       )}

//       {/* ====================== ALL LEADS MODAL ====================== */}
//       {showAllLeadsModal && (
//         <div className="modal-overlay" onClick={() => setShowAllLeadsModal(false)}>
//           <div className="modal-content large-modal" onClick={e => e.stopPropagation()}>
//             <h2>📋 All Scraped Leads ({allLeads.length})</h2>

       
//             {allLeads.length > 0 && (
//               <div className="export-buttons">
//                 <button onClick={() => exportAllLeads('excel')} className="export-btn excel">
//                   📊 Export All to Excel
//                 </button>
//                 <button onClick={() => exportAllLeads('pdf')} className="export-btn pdf">
//                   📄 Export All to PDF
//                 </button>
//               </div>
//             )}

//             {allLeads.length > 0 ? (
//               <>
//                  <div className="table-wrapper">
//                 <table className="leads-table">
//                   <thead>
//                     <tr>
//                       <th>Business Name</th>
//                       <th>Category</th>
//                       <th>City</th>
//                       <th>Phone / WhatsApp</th>
//                       <th>Email</th>
//                       <th>Quality</th>
//                       <th>Date</th>
//                     </tr>
//                   </thead>
         
// <tbody>
//   {currentLeads.map((lead) => (       
//     <tr key={lead._id}>
//       <td>{lead.businessName}</td>
//       <td>{lead.category}</td>
//       <td>{lead.city}{lead.area ? `, ${lead.area}` : ''}</td>
//       <td>
//         {lead.whatsappNumber ? `WhatsApp: ${lead.whatsappNumber}` : lead.phone || '-'}
//       </td>
//       <td>{lead.email || '-'}</td>
//       <td>
//         <span className={`quality-badge ${lead.leadQuality?.toLowerCase() || 'incomplete'}`}>
//           {lead.leadQuality || 'INCOMPLETE'}
//         </span>
//       </td>
//       <td>{new Date(lead.scrapedAt).toLocaleDateString()}</td>
//     </tr>
//   ))}
// </tbody>
//                 </table>
//               </div>
//                 <div className="pagination">
//                 <button 
//                   onClick={() => goToPage(currentPage - 1)} 
//                   disabled={currentPage === 1}
//                 >
//                   ← Previous
//                 </button>
                
//                 <span>Page {currentPage} of {totalPages}</span>
                
//                 <button 
//                   onClick={() => goToPage(currentPage + 1)} 
//                   disabled={currentPage === totalPages}
//                 >
//                   Next →
//                 </button>
//               </div>
//               </>
           
//             ) : (
//               <p className="no-leads-message">No leads found in the database yet.</p>
//             )}

//             <div className="modal-buttons">
//               <button onClick={() => setShowAllLeadsModal(false)} className="close-modal-btn">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

  
//     </div>
//   );

  return (
    <div className="scraper-container">
      <div className="scraper-card">
        <h1 className="title">Lead Scraper System</h1>
        <p className="subtitle">WhatsApp-Focused Lead Generator for Africa</p>

        <form onSubmit={handleSubmit} className="scraper-form">
          {/* Country, City, Area, Category, Depth - unchanged */}
          <div className="form-group">
            <label>Country <span className="required">*</span></label>
            <select name="country" className="select-field" value={formData.country} onChange={handleChange} required>
              <option value="Cameroon">Cameroon</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Ivory Coast">Ivory Coast</option>
              <option value="Kenya">Kenya</option>
              <option value="Senegal">Senegal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>City <span className="required">*</span></label>
            <input type="text" name="city" className="input-field" value={formData.city} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Area / Neighborhood (Optional)</label>
            <input type="text" name="area" className="input-field" placeholder="e.g. Bonamoussadi, Deido, Akwa" value={formData.area} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Business Category <span className="required">*</span></label>
            <input type="text" name="category" className="input-field" placeholder="e.g. Salons, Barbershops, Restaurants, Boutiques" value={formData.category} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Scraping Depth</label>
            <select name="depth" className="select-field" value={formData.depth} onChange={handleChange}>
              <option value="basic">Basic (Fast - Phone & WhatsApp only)</option>
              <option value="advanced">Advanced (Emails + Social Links)</option>
            </select>
          </div>

          <button type="submit" className="scrape-button" disabled={isLoading}>
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

        {error && <div className="error-message">{error}</div>}

        <button onClick={fetchAllLeads} className="view-all-button" disabled={loadingAllLeads}>
          {loadingAllLeads ? 'Loading All Leads...' : '📋 View All Scraped Leads'}
        </button>
      </div>

      {/* ====================== RESULTS MODAL ====================== */}
      {showResultModal && result && (
        <div className="modal-overlay" onClick={() => setShowResultModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>✅ Scraping Completed!</h2>
            <p><strong>Total Businesses Found:</strong> {result.totalFound}</p>
            <p><strong>New Leads Saved:</strong> {result.totalProcessed}</p>

            {result.leads && result.leads.length > 0 && (
              <div className="export-buttons">
                <button onClick={() => exportCurrentResult('excel')} className="export-btn excel">📊 Export to Excel</button>
                <button onClick={() => exportCurrentResult('pdf')} className="export-btn pdf">📄 Export to PDF</button>
              </div>
            )}

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
                        <td>{lead.facebook ? <a href={lead.facebook} target="_blank" rel="noopener noreferrer">View</a> : '—'}</td>
                        <td>{lead.linkedin ? <a href={lead.linkedin} target="_blank" rel="noopener noreferrer">View</a> : '—'}</td>
                        <td>{lead.country || 'Cameroon'}</td>
                        <td>{lead.email || '-'}</td>
                        <td><span className={`quality-badge ${lead.leadQuality?.toLowerCase() || 'incomplete'}`}>{lead.leadQuality || 'INCOMPLETE'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-leads-message">
                <p><strong>No new leads were saved.</strong></p>
                <p>Leads may already exist in the database.</p>
              </div>
            )}

            <div className="modal-buttons">
              <button onClick={() => setShowResultModal(false)} className="close-modal-btn">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ====================== ALL LEADS MODAL (FINAL FIXED) ====================== */}
      {showAllLeadsModal && (
        <div className="modal-overlay" onClick={() => setShowAllLeadsModal(false)}>
          <div className="modal-content large-modal" onClick={e => e.stopPropagation()}>
            <h2>📋 All Scraped Leads ({allLeads.length})</h2>

            {allLeads.length > 0 && (
              <div className="export-buttons">
                <button onClick={() => exportAllLeads('excel')} className="export-btn excel">📊 Export All to Excel</button>
                <button onClick={() => exportAllLeads('pdf')} className="export-btn pdf">📄 Export All to PDF</button>
              </div>
            )}

            {allLeads.length > 0 ? (
              <>
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
                      {currentLeads.map((lead) => (
                        <tr key={lead._id || lead.businessName}>
                          <td>{lead.businessName}</td>
                          <td>{lead.category}</td>
                          <td>{lead.city}{lead.area ? `, ${lead.area}` : ''}</td>
                          <td>
                            {lead.whatsappNumber ? `WhatsApp: ${lead.whatsappNumber}` : lead.phone || '-'}
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

                {totalPages > 1 && (
                  <div className="pagination">
                    <button 
                      onClick={() => goToPage(currentPage - 1)} 
                      disabled={currentPage === 1}
                      className="pagination-btn"
                    >
                      ← Previous
                    </button>
                    <span className="page-info">Page {currentPage} of {totalPages}</span>
                    <button 
                      onClick={() => goToPage(currentPage + 1)} 
                      disabled={currentPage === totalPages}
                      className="pagination-btn"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="no-leads-message">No leads found in the database yet.</p>
            )}

            <div className="modal-buttons">
              <button onClick={() => setShowAllLeadsModal(false)} className="close-modal-btn">
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































