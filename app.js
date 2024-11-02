import { jsPDF } from "jspdf";

console.log("app.js is loaded"); // Verification line

// Function to generate PDF with user-provided details
function generatePDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Retrieve user input from the form fields
    const name = document.getElementById("name").value || "[Your Name]";
    const about = document.getElementById("about").value || "This is a short bio.";
    const contactInfo = document.getElementById("contact-info").value || "Contact Info";

    // Add user details to the PDF
    doc.setFontSize(16);
    doc.text("Resume of " + name, 10, 10);
    doc.setFontSize(12);
    doc.text("About Me", 10, 20);
    doc.text(about, 10, 30);
    doc.text("Contact Information", 10, 40);
    doc.text(contactInfo, 10, 50);

    // Retrieve the photo file from the input
    const photoInput = document.getElementById("photo");
    if (photoInput && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            // Add photo to PDF if available
            const imgData = event.target.result;
            doc.addImage(imgData, "JPEG", 10, 60, 50, 50); // Adjust position and size as needed
            doc.save("resume.pdf");
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        // Save PDF without photo if none uploaded
        doc.save("resume.pdf");
    }
}

// Check for app element and set initial text
const appElement = document.getElementById("app");
if (appElement) {
    appElement.innerText = "Hello, this is my portfolio!";
}

// Create a button to trigger PDF generation (optional: remove if button is already in HTML)
const pdfButton = document.createElement("button");
pdfButton.innerText = "Download PDF";
pdfButton.onclick = generatePDF;

// Append the button to the contact section
const contactSection = document.getElementById("contact");
if (contactSection) {
    contactSection.appendChild(pdfButton);
}
