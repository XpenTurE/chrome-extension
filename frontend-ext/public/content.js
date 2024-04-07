
const extractCompanyInfo = () => {
  let data = {};

  // Company Name
  const nameElement = document.getElementsByClassName("ph5 pb5")[0].querySelector("h1");
  if (nameElement) {
    data.name = nameElement.innerHTML;
  }

  // Company Description
  const descriptionElement = document.getElementsByClassName("mb6")[0].querySelector("p");
  if (descriptionElement) {
    data.description = descriptionElement.innerHTML;
  }

  // Website
  const websiteElement = document.getElementsByClassName("mb4 t-black--light text-body-medium")[0].querySelector("a");
  if (websiteElement) {
    data.website = websiteElement.getAttribute("href");
  }

  // Phone Number (If available)
  const phoneElement = document.getElementsByClassName("mb4 t-black--light text-body-medium")[1];
  if (phoneElement) {
    data.phone = "+312-142-341"; // Hardcoded phone number for demonstration
  }

  // Number of Employees
  const employeesElement = document.getElementsByClassName("mb6")[0].querySelector(".overflow-hidden").querySelectorAll("dd")[2];
  if (employeesElement) {
    data.employees = employeesElement.innerHTML;
  }

  // Industry
  const industryElement = document.getElementsByClassName("mb6")[0].querySelector(".overflow-hidden").querySelectorAll("dd")[1];
  if (industryElement) {
    data.industry = industryElement.innerHTML;
  }

  // Headquarters
  const headquartersElement = document.getElementsByClassName("mb6")[0].querySelector(".overflow-hidden").querySelectorAll("dd")[4];
  if (headquartersElement) {
    data.headquarters = headquartersElement.innerHTML;
  }

  // Founded Date
  const foundedElement = document.getElementsByClassName("mb6")[0].querySelector(".overflow-hidden").querySelectorAll("dd")[5];
  if (foundedElement) {
    data.founded = foundedElement.innerHTML;
  }

  // Logo
  const logoElement = document.getElementsByClassName("ph5 pb5")[0].querySelector("img");
  if (logoElement) {
    data.logo = logoElement.getAttribute("src");
  }

  sendDataToBackground(data);

chrome.runtime.sendMessage({ type: 'openPopup' });
};

const sendDataToBackground = (data) => {
  chrome.runtime.sendMessage({ type: "companyData", data });
};

extractCompanyInfo();
