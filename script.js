document.getElementById("themeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");
  document.getElementById("themeLabel").innerText = this.checked
    ? "Dark Mode"
    : "Light Mode";
});

function generateResume() {
  // Show the preview section
  document.getElementById("resumePreview").style.display = "block";

  // Get the input values
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value;
  const skills = document.getElementById("skills").value;

  // Set the preview values
  document.getElementById("previewFullName").innerText = fullName;
  document.getElementById("previewEmail").innerText = email;
  document.getElementById("previewPhone").innerText = phone;
  document.getElementById("previewAddress").innerText = address;
  document.getElementById("previewEducation").innerText = education;
  document.getElementById("previewExperience").innerText = experience;
  document.getElementById("previewSkills").innerText = skills;

  // Handle profile image
  const profileImageInput = document.getElementById("profileImage");
  const previewImage = document.getElementById("previewImage");
  if (profileImageInput.files && profileImageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(profileImageInput.files[0]);
  } else {
    previewImage.style.display = "none";
  }
}

function downloadResume() {
  const resumeElement = document.getElementById("resumePreview");

  // Use html2canvas to capture the resume preview with styles
  html2canvas(resumeElement).then((canvas) => {
    const imgData = canvas.toDataURL("image/png"); // Convert canvas to image data

    // Create a PDF using jsPDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4"); // 'p' for portrait, 'mm' for millimeters, 'a4' size

    // Adjust the width and height of the image to fit the PDF page
    const imgWidth = 190; // A4 page width in mm minus margins
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image to PDF
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    // Save the PDF
    pdf.save("resume.pdf");
  });
}

function generateShareableLink() {
  const resumeElement = document.getElementById("resumePreview");
  resumeElement.style.display = "block"; // Ensure the resume is visible before converting to image

  html2canvas(resumeElement, {
    scale: 2, // Ensure good resolution
    useCORS: true, // Handle cross-origin if needed
  }).then((canvas) => {
    canvas.toBlob(function (blob) {
      const url = URL.createObjectURL(blob); // Create object URL for the blob

      // Create a shareable link
      const linkContainer = document.getElementById("shareableLinkContainer");
      linkContainer.innerHTML = `
                <p>Shareable Resume Link:</p>
                <a href="${url}" target="_blank" class="shareable-link">Open Resume</a>
            `;
    }, "image/png");
  });
}
