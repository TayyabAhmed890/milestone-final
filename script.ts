// Import necessary libraries
declare const html2canvas: any;
declare const jsPDF: any;

// Toggle Dark/Light Mode
document.getElementById("themeToggle")?.addEventListener("change", function (this: HTMLInputElement) {
  document.body.classList.toggle("dark-mode");
  const themeLabel = document.getElementById("themeLabel");
  if (themeLabel) {
    themeLabel.innerText = this.checked ? "Dark Mode" : "Light Mode";
  }
});

// Generate Resume
function generateResume(): void {
  // Show the preview section
  const resumePreview = document.getElementById("resumePreview") as HTMLElement;
  if (resumePreview) {
    resumePreview.style.display = "block";
  }

  // Get the input values
  const fullName = (document.getElementById("fullName") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const address = (document.getElementById("address") as HTMLTextAreaElement).value;
  const education = (document.getElementById("education") as HTMLTextAreaElement).value;
  const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

  // Set the preview values
  const setPreviewValue = (id: string, value: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.innerText = value;
    }
  };

  setPreviewValue("previewFullName", fullName);
  setPreviewValue("previewEmail", email);
  setPreviewValue("previewPhone", phone);
  setPreviewValue("previewAddress", address);
  setPreviewValue("previewEducation", education);
  setPreviewValue("previewExperience", experience);
  setPreviewValue("previewSkills", skills);

  // Handle profile image
  const profileImageInput = document.getElementById("profileImage") as HTMLInputElement;
  const previewImage = document.getElementById("previewImage") as HTMLImageElement;

  if (profileImageInput?.files && profileImageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      if (e.target && previewImage) {
        previewImage.src = e.target.result as string;
        previewImage.style.display = "block";
      }
    };
    reader.readAsDataURL(profileImageInput.files[0]);
  } else if (previewImage) {
    previewImage.style.display = "none";
  }
}

// Download Resume
function downloadResume(): void {
  const resumeElement = document.getElementById("resumePreview") as HTMLElement;
  if (!resumeElement) return;

  // Use html2canvas to capture the resume preview with styles
  html2canvas(resumeElement, { scale: 2, useCORS: true })
    .then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL("image/png");

      // Create a PDF using jsPDF
      const pdf = new jsPDF("p", "mm", "a4");

      // Adjust the width and height of the image to fit the PDF page
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

      // Save the PDF
      pdf.save("resume.pdf");
    })
    .catch((error: Error) => {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    });
}

// Generate Shareable Link
function generateShareableLink(): void {
  const resumeElement = document.getElementById("resumePreview") as HTMLElement;
  if (!resumeElement) return;

  resumeElement.style.display = "block";

  html2canvas(resumeElement, {
    scale: 2,
    useCORS: true,
  })
    .then((canvas: HTMLCanvasElement) => {
      canvas.toBlob(function (blob: Blob | null) {
        if (blob) {
          const url = URL.createObjectURL(blob);

          const linkContainer = document.getElementById("shareableLinkContainer");
          if (linkContainer) {
            linkContainer.innerHTML = `
              <p>Shareable Resume Link:</p>
              <a href="${url}" target="_blank" class="shareable-link">Open Resume</a>
            `;
          }
        }
      }, "image/png");
    })
    .catch((error: Error) => {
      console.error("Error generating shareable link:", error);
      alert("An error occurred while generating the shareable link. Please try again.");
    });
}
