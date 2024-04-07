// Scrapper.jsx
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { CiGlobe } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { FaBuilding } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { PiPaperPlaneFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios library

const Scrapper = () => {
    const [companyData, setCompanyData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === "companyData") {
                console.log("From scrapper.js")
                console.log("message.data", message.data)
                setCompanyData(message.data);
            }
        });

        return () => {
            chrome.runtime.onMessage.removeListener(handleMessage);
        };
    }, []);

    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length > 50) {
            return words.slice(0, 50).join(' ') + '...';
        }
        return description;
    };

    const handleSave = async () => {
        if (!companyData) return;

        try {
            const response = await axios.post('http://localhost:3000/api/companies', companyData);
            console.log('Company data saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving company data:', error);
        }
    };

    return (
        <div>
            {companyData ? (
                <div id='container'>


                    <div className="logo-title-container">
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <img src={companyData.logo} alt="Company Logo" style={{ width: '70px', borderRadius: "8px" }} className="company-logo" />
                            <div style={{ height: "18px", width: "18px", border: '2px solid #6C2BD9', padding: '4px', backgroundColor: 'white', cursor: 'pointer' }} onClick={handleSave}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6C2BD9" className="bi bi-bookmark" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12l-5-3-5 3V2z" />
                                </svg>
                            </div>
                        </div>
                        <h1 id='title'>{companyData.name}</h1>
                    </div>
                    <p style={{ fontWeight: "600", fontSize: "13px" }}> {truncateDescription(companyData.description)}</p>
                    <div className='title_value'>
                        <div className='icon_title'>
                            <CiGlobe className='sub-title subtitle-font' />
                            <p className='violet sub-title subtitle-font'>{companyData.website}</p>
                        </div>
                        <p className='sub-title subtitle-font'>Website</p>
                    </div>
                    <div className='title_value'>
                        <div className='icon_title'>
                            <FaPhoneAlt className='sub-title subtitle-font' />
                            <p className='violet sub-title subtitle-font'>{companyData.phone}</p>
                        </div>
                        <p className='sub-title subtitle-font'>Phone</p>
                    </div>
                    <div className='title_value'>
                        <div className='icon_title'>
                            <MdPeople className='sub-title subtitle-font' />
                            <p className='sub-title subtitle-font'>Employees</p>
                        </div>
                        <p className='subtitle-font' style={{ fontWeight: "900" }}>{companyData.employees}</p>
                    </div>
                    <div className='title_value'>
                        <div className='icon_title'>
                            <FaBuilding className='subtitle-font sub-title' />
                            <p className='sub-title subtitle-font'>Industry</p>
                        </div>
                        <p className='subtitle-font' style={{ fontWeight: "900" }}>{companyData.industry}</p>
                    </div>
                    <div className='title_value'>
                        <div className='icon_title'>
                            <FaLocationDot className='sub-title subtitle-font' />
                            <p className='sub-title subtitle-font'>Headquarters</p>
                        </div>
                        <p className='subtitle-font' style={{ fontWeight: "900" }}>{companyData.headquarters}</p>
                    </div>
                    <div className='title_value'>
                        <div className='icon_title'>
                            <PiPaperPlaneFill className='sub-title subtitle-font' />
                            <p className='sub-title subtitle-font' >Founded</p>
                        </div>
                        <p className='subtitle-font' style={{ fontWeight: "900" }} >{companyData.founded}</p>
                    </div>
                    {/* <p>Specialties: {companyData.specialties.join(', ')}</p> */}
                </div>
            ) : (
                <p>Loading company data...</p>
            )}
        </div>
    );
};

export default Scrapper;
