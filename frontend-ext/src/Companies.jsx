import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCopy } from 'react-icons/fa';

const Companies = () => {
  const [companies, setCompanies] = useState(null);
  const [copiedText, setCopiedText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [copyField, setCopyField] = useState('');

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await axios.get('http://localhost:3000/api/companies/');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    }

    fetchCompanies();
  }, []);

  // Calculate index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display based on pagination
  const currentCompanies = companies && companies.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages
  const totalPages = Math.ceil((companies?.length || 0) / itemsPerPage);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => {
        setCopiedText('');
      }, 2000);
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
    }
  };

  const handleRowSelect = (index) => {
    const updatedSelectedRows = [...selectedRows];
    if (updatedSelectedRows.includes(index)) {
      const indexToRemove = updatedSelectedRows.indexOf(index);
      updatedSelectedRows.splice(indexToRemove, 1);
    } else {
      updatedSelectedRows.push(index);
    }
    setSelectedRows(updatedSelectedRows);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allIndices = currentCompanies.map((company, index) => index);
      setSelectedRows(allIndices);
    }
    setSelectAll(!selectAll);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = async () => {
    if (selectedRows.length === 0) {
      // If no rows are selected, do nothing
      return;
    }

    // Get the IDs of selected companies to delete
    const companyIdsToDelete = selectedRows.map((index) => companies[index]._id);

    try {
      // Send a request to delete the selected companies
      await axios.post('http://localhost:3000/api/companies/delete', { companyIds: companyIdsToDelete });

      // Filter out the deleted companies from the local state
      const updatedCompanies = companies.filter((company, index) => !selectedRows.includes(index));
      setCompanies(updatedCompanies);

      // Clear selected rows
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting companies:', error);
    }
  };

  const handleExportCsv = () => {
    // Implement CSV export functionality here
    // You can use a library like 'react-csv' or build your own CSV export logic
  };

  const selectedCountText = selectedRows.length > 0 ? `${selectedRows.length} selected` : '0 selected';

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <p>{selectedCountText}</p> &nbsp; &nbsp;
        <button
          onClick={handleDeleteClick}
          disabled={selectedRows.length === 0}
          style={{
            padding: '10px',
            backgroundColor: 'white',
            color: '#D1D5DB',
            borderRadius: '5px',
            border: '1px solid #D1D5DB',
            marginRight: '10px',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
        <button
          onClick={handleExportCsv}
          style={{
            padding: '10px',
            backgroundColor: 'white',
            color: '#D1D5DB',
            borderRadius: '5px',
            border: '1px solid #D1D5DB',
            cursor: 'pointer',
          }}
        >
          Export as CSV
        </button>
      </div>
      <table style={{ border: '1px solid #D1D5DB', borderCollapse: 'collapse', width: '1400px', fontSize: '15px' }}>
        <thead style={{ backgroundColor: '#F9FAFB' }}>
          <tr>
            <th style={{ padding: '10px' }}>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                style={{ cursor: 'pointer', color: '#A2A2A2' }}
              />
            </th>
            <th style={{ padding: '10px' }}>Logo</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Headquarters</th>
            <th style={{ padding: '10px' }}>Employees</th>
            <th style={{ padding: '10px' }}>Industry</th>
            <th style={{ padding: '10px' }}>Founded</th>
            <th style={{ padding: '10px' }}>Website</th>
            <th style={{ padding: '10px' }}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentCompanies && currentCompanies.map((company, index) => (
            <React.Fragment key={index}>
              <tr>
                <td style={{ padding: '10px' }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleRowSelect(index)}
                    style={{ cursor: 'pointer', color: '#A2A2A2' }}
                  />
                </td>
                <td style={{ padding: '10px' }}>
                  <img src={company.logo} alt="Company Logo" style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
                </td>
                <td style={{ padding: '10px', color: 'rgb(108, 43, 217)' }}>{company.name}</td>
                <td style={{ padding: '10px' }}>{company.headquarters}</td>
                <td style={{ padding: '10px' }}>{company.employees}</td>
                <td style={{ padding: '10px' }}>{company.industry}</td>
                <td style={{ padding: '10px' }}>{company.founded}</td>
                <td style={{ padding: '10px' }}>
                  <span
                    onMouseEnter={() => setCopyField(company.website)}
                    onMouseLeave={() => setCopyField('')}
                    style={{ position: 'relative', color: '#6C2BD9', cursor: 'pointer' }}
                  >
                    {company.website}
                    {copyField === company.website && (
                      <FaCopy
                        className="copy-icon"
                        onClick={() => handleCopy(company.website)}
                        style={{ position: 'absolute', left: '100%', top: '50%', transform: 'translate(-100%, -50%)', cursor: 'pointer' }}
                      />
                    )}
                  </span>
                </td>
                <td style={{ padding: '10px' }}>
                  <span
                    onMouseEnter={() => setCopyField(company.phone)}
                    onMouseLeave={() => setCopyField('')}
                    style={{ position: 'relative', color: '#6C2BD9', cursor: 'pointer' }}
                  >
                    {company.phone}
                    {copyField === company.phone && (
                      <FaCopy
                        className="copy-icon"
                        onClick={() => handleCopy(company.phone)}
                        style={{ position: 'absolute', left: '100%', top: '50%', transform: 'translate(-100%, -50%)', cursor: 'pointer' }}
                      />
                    )}
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan="9" style={{ borderBottom: '1px solid #D1D5DB' }}></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px' }}>
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div>
            {[...Array(totalPages).keys()].map((page) => (
              <button 
                key={page + 1} 
                onClick={() => paginate(page + 1)} 
                style={{ 
                  marginRight: '5px', 
                  backgroundColor: currentPage === page + 1 ? 'white' : 'white', 
                  color: currentPage === page + 1 ? '#6C2BD9' : '#000', 
                  border: currentPage === page + 1 ? ' 1px solid #6C2BD9' : '1px solid #D1D5DB', 
                  padding: '10px',
                  cursor: 'pointer'
                }} 
                disabled={currentPage === page + 1}
              >
                {page + 1}
              </button>
            ))}
            <span>Showing {currentPage} of {totalPages}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
