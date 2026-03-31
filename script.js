// ===== GLOBAL STATE =====
let photoDataURL = null; // Stores uploaded photo as base64

// ===== TOGGLE SECTIONS BASED ON FIELD TYPE =====
function toggleSections() {
  const type = document.getElementById("fieldType").value;
  const projectSection = document.getElementById("projectSection");
  // Show Projects only for Engineering/IT and Other
  if (type === "it" || type === "other") {
    projectSection.style.display = "block";
  } else {
    projectSection.style.display = "none";
  }
}

// Run on page load
toggleSections();

// ===== PHOTO PREVIEW =====
function previewPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    photoDataURL = e.target.result;
    const img = document.getElementById("photoPreview");
    const placeholder = document.getElementById("photoPlaceholder");
    img.src = photoDataURL;
    img.style.display = "block";
    placeholder.style.display = "none";
  };
  reader.readAsDataURL(file);
}

// ===== DYNAMIC: ADD EDUCATION =====
let eduCount = 0;
function addEducation() {
  eduCount++;
  const id = "edu_" + eduCount;
  const container = document.getElementById("educationList");
  const div = document.createElement("div");
  div.className = "entry-card";
  div.id = id;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('${id}')">✕ Remove</button>
    <div class="field-group">
      <label>Degree / Course</label>
      <input type="text" class="edu-degree" placeholder="e.g. B.Sc. IT / B.Tech Computer Science" />
    </div>
    <div class="row-2">
      <div class="field-group">
        <label>Institution</label>
        <input type="text" class="edu-institute" placeholder="e.g. ABC College, Mumbai" />
      </div>
      <div class="field-group">
        <label>Year / Duration</label>
        <input type="text" class="edu-year" placeholder="e.g. 2022 – 2026" />
      </div>
    </div>
    <div class="field-group">
      <label>Score / CGPA / Percentage</label>
      <input type="text" class="edu-score" placeholder="e.g. CGPA: 8.5 / 85%" />
    </div>
  `;
  container.appendChild(div);
}

// ===== DYNAMIC: ADD EXPERIENCE =====
let expCount = 0;
function addExperience() {
  expCount++;
  const id = "exp_" + expCount;
  const container = document.getElementById("experienceList");
  const div = document.createElement("div");
  div.className = "entry-card";
  div.id = id;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('${id}')">✕ Remove</button>
    <div class="row-2">
      <div class="field-group">
        <label>Job Title / Role</label>
        <input type="text" class="exp-title" placeholder="e.g. Web Developer Intern" />
      </div>
      <div class="field-group">
        <label>Company / Organisation</label>
        <input type="text" class="exp-company" placeholder="e.g. XYZ Pvt. Ltd." />
      </div>
    </div>
    <div class="field-group">
      <label>Duration</label>
      <input type="text" class="exp-duration" placeholder="e.g. Jan 2024 – Apr 2024" />
    </div>
    <div class="field-group">
      <label>Key Responsibilities / Achievements (one per line)</label>
      <textarea class="exp-points" rows="3" placeholder="e.g. Built REST APIs using Node.js&#10;Worked on React frontend for dashboard"></textarea>
    </div>
  `;
  container.appendChild(div);
}

// ===== DYNAMIC: ADD PROJECT =====
let projCount = 0;
function addProject() {
  projCount++;
  const id = "proj_" + projCount;
  const container = document.getElementById("projectList");
  const div = document.createElement("div");
  div.className = "entry-card";
  div.id = id;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('${id}')">✕ Remove</button>
    <div class="row-2">
      <div class="field-group">
        <label>Project Name</label>
        <input type="text" class="proj-name" placeholder="e.g. Todo App / E-commerce Website" />
      </div>
      <div class="field-group">
        <label>Tech Stack</label>
        <input type="text" class="proj-tech" placeholder="e.g. React.js, Node.js, MongoDB" />
      </div>
    </div>
    <div class="field-group">
      <label>Project Link (optional)</label>
      <input type="text" class="proj-link" placeholder="https://github.com/yourname/project" />
    </div>
    <div class="field-group">
      <label>Description / Key Points (one per line)</label>
      <textarea class="proj-points" rows="3" placeholder="e.g. Built a full-stack web app with user authentication&#10;Integrated REST APIs for CRUD operations"></textarea>
    </div>
  `;
  container.appendChild(div);
}

// ===== REMOVE ANY ENTRY CARD =====
function removeEntry(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// ===== HELPER: FORMAT LINKS =====
function makeLink(url, label) {
  if (!url || url.trim() === "") return "";
  const display = label || url;
  return `<a href="${url}" target="_blank">${display}</a>`;
}

// ===== HELPER: BULLET LIST FROM TEXTAREA =====
function bulletList(text, cls = "res-bullets") {
  if (!text || text.trim() === "") return "";
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l !== "");
  if (lines.length === 0) return "";
  return `<ul class="${cls}">${lines.map((l) => `<li>${l}</li>`).join("")}</ul>`;
}

// ===== HELPER: COMMA LIST TO BULLET LIST =====
function commaToBullets(text, cls = "res-bullets") {
  if (!text || text.trim() === "") return "";
  const items = text
    .split(",")
    .map((l) => l.trim())
    .filter((l) => l !== "");
  if (items.length === 0) return "";
  return `<ul class="${cls}">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

// ===== READ EDUCATION ENTRIES =====
function getEducationHTML(template) {
  const cards = document.querySelectorAll("#educationList .entry-card");
  if (cards.length === 0) return "";
  let html = "";
  cards.forEach((card) => {
    const degree = card.querySelector(".edu-degree")?.value.trim() || "";
    const institute = card.querySelector(".edu-institute")?.value.trim() || "";
    const year = card.querySelector(".edu-year")?.value.trim() || "";
    const score = card.querySelector(".edu-score")?.value.trim() || "";
    if (!degree && !institute) return;
    html += `
      <div class="res-entry">
        <div class="res-entry-header">
          <span class="res-entry-title">${degree}</span>
          <span class="res-entry-date">${year}</span>
        </div>
        <div class="res-entry-sub">${institute}${score ? " | " + score : ""}</div>
      </div>
    `;
  });
  return html;
}

// ===== READ EXPERIENCE ENTRIES =====
function getExperienceHTML() {
  const cards = document.querySelectorAll("#experienceList .entry-card");
  if (cards.length === 0) return "";
  let html = "";
  cards.forEach((card) => {
    const title = card.querySelector(".exp-title")?.value.trim() || "";
    const company = card.querySelector(".exp-company")?.value.trim() || "";
    const duration = card.querySelector(".exp-duration")?.value.trim() || "";
    const points = card.querySelector(".exp-points")?.value.trim() || "";
    if (!title && !company) return;
    html += `
      <div class="res-entry">
        <div class="res-entry-header">
          <span class="res-entry-title">${company}</span>
          <span class="res-entry-date">${duration}</span>
        </div>
        <div class="res-entry-sub">${title}</div>
        ${bulletList(points)}
      </div>
    `;
  });
  return html;
}

// ===== READ PROJECT ENTRIES =====
function getProjectsHTML() {
  const cards = document.querySelectorAll("#projectList .entry-card");
  if (cards.length === 0) return "";
  let html = "";
  cards.forEach((card) => {
    const name = card.querySelector(".proj-name")?.value.trim() || "";
    const tech = card.querySelector(".proj-tech")?.value.trim() || "";
    const link = card.querySelector(".proj-link")?.value.trim() || "";
    const points = card.querySelector(".proj-points")?.value.trim() || "";
    if (!name) return;
    html += `
      <div class="res-entry">
        <div class="res-entry-header">
          <span class="res-entry-title">${name}</span>
          ${link ? `<span class="res-entry-date"><a href="${link}" target="_blank">View</a></span>` : ""}
        </div>
        ${tech ? `<div class="res-entry-sub">Tech Stack: ${tech}</div>` : ""}
        ${bulletList(points)}
      </div>
    `;
  });
  return html;
}

// ===== BUILD CONTACT ROW =====
function buildContactRow(data, forSidebar = false) {
  const items = [];
  if (data.location) items.push(data.location);
  if (data.phone) items.push(data.phone);
  if (data.email)
    items.push(`<a href="mailto:${data.email}">${data.email}</a>`);
  if (data.linkedin) items.push(makeLink(data.linkedin, "LinkedIn"));
  if (data.github) items.push(makeLink(data.github, "GitHub"));
  if (data.otherLinks) {
    data.otherLinks
      .split(",")
      .map((l) => l.trim())
      .filter((l) => l)
      .forEach((l) => items.push(makeLink(l)));
  }

  if (forSidebar) {
    return items.map((i) => `<div>${i}</div>`).join("");
  }
  return items.join(" &nbsp;|&nbsp; ");
}

// ===== COLLECT ALL FORM DATA =====
function collectData() {
  return {
    name: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    location: document.getElementById("location").value.trim(),
    linkedin: document.getElementById("linkedin").value.trim(),
    github: document.getElementById("github").value.trim(),
    otherLinks: document.getElementById("otherLinks").value.trim(),
    summary: document.getElementById("summary").value.trim(),
    skillLang: document.getElementById("skillLang").value.trim(),
    skillFramework: document.getElementById("skillFramework").value.trim(),
    skillDB: document.getElementById("skillDB").value.trim(),
    skillTools: document.getElementById("skillTools").value.trim(),
    skillConcepts: document.getElementById("skillConcepts").value.trim(),
    certifications: document.getElementById("certifications").value.trim(),
    achievements: document.getElementById("achievements").value.trim(),
    languages: document.getElementById("languages").value.trim(),
    additionalInfo: document.getElementById("additionalInfo").value.trim(),
    template: document.getElementById("templateSelect").value,
    fieldType: document.getElementById("fieldType").value,
  };
}

// ===== GENERATE RESUME =====
function generateResume() {
  const data = collectData();

  // Validation: require at least name
  if (!data.name) {
    alert("Please enter your Full Name to generate the resume.");
    document.getElementById("fullName").focus();
    return;
  }

  const template = data.template;
  const output = document.getElementById("resumeOutput");

  // Remove old classes and empty state
  output.className = "";

  if (template === "classic") {
    output.className = "classic-resume";
    output.innerHTML = buildClassicResume(data);
  } else {
    output.className = "modern-resume";
    output.innerHTML = buildModernResume(data);
  }

  // Scroll preview to top
  document
    .querySelector(".preview-scroll")
    .scrollTo({ top: 0, behavior: "smooth" });
}

// ===== BUILD CLASSIC RESUME =====
function buildClassicResume(data) {
  const photoHTML = photoDataURL
    ? `<img class="resume-photo" src="${photoDataURL}" alt="Profile Photo" />`
    : "";

  const skills = buildSkillsSection(data);
  const eduHTML = getEducationHTML("classic");
  const expHTML = getExperienceHTML();
  const projHTML =
    data.fieldType === "it" || data.fieldType === "other"
      ? getProjectsHTML()
      : "";

  return `
    <!-- HEADER -->
    <div class="resume-header">
      ${photoHTML}
      <div class="resume-name">${data.name}</div>
      <div class="resume-contact">${buildContactRow(data, false)}</div>
    </div>
 
    <!-- BODY -->
    <div class="resume-body">
 
      ${
        data.summary
          ? `
      <div class="resume-section">
        <div class="res-section-title">Professional Summary</div>
        <div class="res-summary">${data.summary}</div>
      </div>`
          : ""
      }
 
      ${
        skills
          ? `
      <div class="resume-section">
        <div class="res-section-title">Technical Skills</div>
        ${skills}
      </div>`
          : ""
      }
 
      ${
        eduHTML
          ? `
      <div class="resume-section">
        <div class="res-section-title">Education</div>
        ${eduHTML}
      </div>`
          : ""
      }
 
      ${
        expHTML
          ? `
      <div class="resume-section">
        <div class="res-section-title">Experience</div>
        ${expHTML}
      </div>`
          : ""
      }
 
      ${
        projHTML
          ? `
      <div class="resume-section">
        <div class="res-section-title">Projects</div>
        ${projHTML}
      </div>`
          : ""
      }
 
      ${
        data.certifications
          ? `
      <div class="resume-section">
        <div class="res-section-title">Certifications</div>
        ${bulletList(data.certifications, "cert-list")}
      </div>`
          : ""
      }
 
      ${
        data.achievements
          ? `
      <div class="resume-section">
        <div class="res-section-title">Achievements</div>
        ${bulletList(data.achievements, "achieve-list")}
      </div>`
          : ""
      }
 
      ${
        data.languages
          ? `
      <div class="resume-section">
        <div class="res-section-title">Languages Known</div>
        <div class="lang-list">${data.languages}</div>
      </div>`
          : ""
      }
 
      ${
        data.additionalInfo
          ? `
      <div class="resume-section">
        <div class="res-section-title">Additional Information</div>
        ${bulletList(data.additionalInfo, "cert-list")}
      </div>`
          : ""
      }
 
    </div>
  `;
}

// ===== BUILD MODERN RESUME =====
function buildModernResume(data) {
  const photoHTML = photoDataURL
    ? `<img class="resume-photo" src="${photoDataURL}" alt="Profile Photo" />`
    : `<div class="no-photo-icon">👤</div>`;

  const sidebarContact = buildContactRow(data, true);
  const skills = buildModernSkillsSidebar(data);
  const eduHTML = getEducationHTML("modern");
  const expHTML = getExperienceHTML();
  const projHTML =
    data.fieldType === "it" || data.fieldType === "other"
      ? getProjectsHTML()
      : "";

  return `
    <!-- SIDEBAR -->
    <div class="resume-sidebar">
      ${photoHTML}
      <div class="resume-name">${data.name}</div>
      <div class="resume-contact">${sidebarContact}</div>
 
      ${skills}
 
      ${
        data.languages
          ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Languages</div>
        ${data.languages
          .split(",")
          .map((l) => `<div class="sidebar-item">• ${l.trim()}</div>`)
          .join("")}
      </div>`
          : ""
      }
 
      ${
        data.certifications
          ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Certifications</div>
        ${data.certifications
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l)
          .map((l) => `<div class="sidebar-item">• ${l}</div>`)
          .join("")}
      </div>`
          : ""
      }
 
      ${
        data.achievements
          ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Achievements</div>
        ${data.achievements
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l)
          .map((l) => `<div class="sidebar-item">• ${l}</div>`)
          .join("")}
      </div>`
          : ""
      }
    </div>
 
    <!-- MAIN -->
    <div class="resume-main">
 
      ${
        data.summary
          ? `
      <div class="resume-section">
        <div class="res-section-title">Professional Summary</div>
        <div class="res-summary">${data.summary}</div>
      </div>`
          : ""
      }
 
      ${
        eduHTML
          ? `
      <div class="resume-section">
        <div class="res-section-title">Education</div>
        ${eduHTML}
      </div>`
          : ""
      }
 
      ${
        expHTML
          ? `
      <div class="resume-section">
        <div class="res-section-title">Experience</div>
        ${expHTML}
      </div>`
          : ""
      }
 
      ${
        projHTML
          ? `
      <div class="resume-section">
        <div class="res-section-title">Projects</div>
        ${projHTML}
      </div>`
          : ""
      }
 
      ${
        data.additionalInfo
          ? `
      <div class="resume-section">
        <div class="res-section-title">Additional Information</div>
        <ul class="additional-list">
          ${data.additionalInfo
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l)
            .map((l) => `<li>${l}</li>`)
            .join("")}
        </ul>
      </div>`
          : ""
      }
 
    </div>
  `;
}

// ===== BUILD SKILLS SECTION (CLASSIC) =====
function buildSkillsSection(data) {
  const rows = [];
  if (data.skillLang)
    rows.push(
      `<div class="skill-row"><span class="skill-label">Languages:</span> ${data.skillLang}</div>`,
    );
  if (data.skillFramework)
    rows.push(
      `<div class="skill-row"><span class="skill-label">Frameworks/Libraries:</span> ${data.skillFramework}</div>`,
    );
  if (data.skillDB)
    rows.push(
      `<div class="skill-row"><span class="skill-label">Databases:</span> ${data.skillDB}</div>`,
    );
  if (data.skillTools)
    rows.push(
      `<div class="skill-row"><span class="skill-label">Tools:</span> ${data.skillTools}</div>`,
    );
  if (data.skillConcepts)
    rows.push(
      `<div class="skill-row"><span class="skill-label">Concepts:</span> ${data.skillConcepts}</div>`,
    );
  if (rows.length === 0) return "";
  return `<div class="skills-grid">${rows.join("")}</div>`;
}

// ===== BUILD SKILLS SECTION (MODERN SIDEBAR) =====
function buildModernSkillsSidebar(data) {
  const sections = [];
  if (data.skillLang) {
    sections.push(
      `<div class="sidebar-section"><div class="sidebar-title">Languages</div><div>${data.skillLang
        .split(",")
        .map((s) => `<span class="skill-badge">${s.trim()}</span>`)
        .join("")}</div></div>`,
    );
  }
  if (data.skillFramework) {
    sections.push(
      `<div class="sidebar-section"><div class="sidebar-title">Frameworks</div><div>${data.skillFramework
        .split(",")
        .map((s) => `<span class="skill-badge">${s.trim()}</span>`)
        .join("")}</div></div>`,
    );
  }
  if (data.skillDB) {
    sections.push(
      `<div class="sidebar-section"><div class="sidebar-title">Databases</div><div>${data.skillDB
        .split(",")
        .map((s) => `<span class="skill-badge">${s.trim()}</span>`)
        .join("")}</div></div>`,
    );
  }
  if (data.skillTools) {
    sections.push(
      `<div class="sidebar-section"><div class="sidebar-title">Tools</div><div>${data.skillTools
        .split(",")
        .map((s) => `<span class="skill-badge">${s.trim()}</span>`)
        .join("")}</div></div>`,
    );
  }
  if (data.skillConcepts) {
    sections.push(
      `<div class="sidebar-section"><div class="sidebar-title">Concepts</div><div>${data.skillConcepts
        .split(",")
        .map((s) => `<span class="skill-badge">${s.trim()}</span>`)
        .join("")}</div></div>`,
    );
  }
  return sections.join("");
}

// ===== DOWNLOAD PDF =====
function downloadPDF() {
  const output = document.getElementById("resumeOutput");

  // Check if resume has been generated
  if (
    output.classList.contains("resume-empty-state") ||
    (!output.classList.contains("classic-resume") &&
      !output.classList.contains("modern-resume"))
  ) {
    alert("Please generate the resume first before downloading PDF.");
    return;
  }

  const name = document.getElementById("fullName").value.trim() || "Resume";

  const opt = {
    margin: [0, 0, 0, 0],
    filename: `${name}_Resume.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      scrollY: 0,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  // Temporarily expand to full A4 width for PDF
  const prevWidth = output.style.width;
  output.style.width = "794px";

  html2pdf()
    .set(opt)
    .from(output)
    .save()
    .then(() => {
      output.style.width = prevWidth;
    });
}

// ===== DOWNLOAD DOCX =====
async function downloadDOCX() {
  const output = document.getElementById("resumeOutput");

  if (
    output.classList.contains("resume-empty-state") ||
    (!output.classList.contains("classic-resume") &&
      !output.classList.contains("modern-resume"))
  ) {
    alert("Please generate the resume first before downloading DOCX.");
    return;
  }

  // Check if docx library is available
  if (typeof docx === "undefined") {
    alert("DOCX library not loaded. Please check your internet connection.");
    return;
  }

  const data = collectData();
  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    BorderStyle,
    UnderlineType,
  } = docx;

  const children = [];

  // Helper: section heading
  function sectionHeading(text) {
    return new Paragraph({
      text: text.toUpperCase(),
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 80 },
      border: {
        bottom: {
          color: "111111",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
      run: { bold: true },
    });
  }

  // Helper: bullet paragraph
  function bulletPara(text) {
    return new Paragraph({
      text: text,
      bullet: { level: 0 },
      spacing: { after: 40 },
    });
  }

  // --- NAME ---
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({ text: data.name, bold: true, size: 44, font: "Arial" }),
      ],
    }),
  );

  // --- CONTACT LINE ---
  const contactParts = [];
  if (data.location) contactParts.push(data.location);
  if (data.phone) contactParts.push(data.phone);
  if (data.email) contactParts.push(data.email);
  if (data.linkedin) contactParts.push(data.linkedin);
  if (data.github) contactParts.push(data.github);
  if (data.otherLinks) contactParts.push(data.otherLinks);

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 160 },
        children: [
          new TextRun({
            text: contactParts.join("  |  "),
            size: 18,
            font: "Arial",
          }),
        ],
      }),
    );
  }

  // --- PROFESSIONAL SUMMARY ---
  if (data.summary) {
    children.push(sectionHeading("Professional Summary"));
    children.push(
      new Paragraph({
        text: data.summary,
        spacing: { after: 80 },
        run: { size: 20 },
      }),
    );
  }

  // --- TECHNICAL SKILLS ---
  const hasSkills =
    data.skillLang ||
    data.skillFramework ||
    data.skillDB ||
    data.skillTools ||
    data.skillConcepts;
  if (hasSkills) {
    children.push(sectionHeading("Technical Skills"));
    if (data.skillLang)
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Languages: ", bold: true }),
            new TextRun(data.skillLang),
          ],
          spacing: { after: 40 },
        }),
      );
    if (data.skillFramework)
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Frameworks/Libraries: ", bold: true }),
            new TextRun(data.skillFramework),
          ],
          spacing: { after: 40 },
        }),
      );
    if (data.skillDB)
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Databases: ", bold: true }),
            new TextRun(data.skillDB),
          ],
          spacing: { after: 40 },
        }),
      );
    if (data.skillTools)
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Tools: ", bold: true }),
            new TextRun(data.skillTools),
          ],
          spacing: { after: 40 },
        }),
      );
    if (data.skillConcepts)
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Concepts: ", bold: true }),
            new TextRun(data.skillConcepts),
          ],
          spacing: { after: 40 },
        }),
      );
  }

  // --- EDUCATION ---
  const eduCards = document.querySelectorAll("#educationList .entry-card");
  if (eduCards.length > 0) {
    children.push(sectionHeading("Education"));
    eduCards.forEach((card) => {
      const degree = card.querySelector(".edu-degree")?.value.trim() || "";
      const institute =
        card.querySelector(".edu-institute")?.value.trim() || "";
      const year = card.querySelector(".edu-year")?.value.trim() || "";
      const score = card.querySelector(".edu-score")?.value.trim() || "";
      if (!degree && !institute) return;
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: degree, bold: true }),
            new TextRun({ text: year ? "  |  " + year : "", color: "555555" }),
          ],
          spacing: { after: 40 },
        }),
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: institute + (score ? "  |  " + score : ""),
              italics: true,
              color: "444444",
              size: 19,
            }),
          ],
          spacing: { after: 80 },
        }),
      );
    });
  }

  // --- EXPERIENCE ---
  const expCards = document.querySelectorAll("#experienceList .entry-card");
  if (expCards.length > 0) {
    children.push(sectionHeading("Experience"));
    expCards.forEach((card) => {
      const title = card.querySelector(".exp-title")?.value.trim() || "";
      const company = card.querySelector(".exp-company")?.value.trim() || "";
      const duration = card.querySelector(".exp-duration")?.value.trim() || "";
      const points = card.querySelector(".exp-points")?.value.trim() || "";
      if (!title && !company) return;
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: company, bold: true }),
            new TextRun({
              text: duration ? "  |  " + duration : "",
              color: "555555",
            }),
          ],
          spacing: { after: 40 },
        }),
      );
      if (title)
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: title,
                italics: true,
                size: 19,
                color: "444444",
              }),
            ],
            spacing: { after: 40 },
          }),
        );
      if (points) {
        points
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l)
          .forEach((line) => children.push(bulletPara(line)));
      }
      children.push(new Paragraph({ spacing: { after: 80 } }));
    });
  }

  // --- PROJECTS ---
  if (data.fieldType === "it" || data.fieldType === "other") {
    const projCards = document.querySelectorAll("#projectList .entry-card");
    if (projCards.length > 0) {
      children.push(sectionHeading("Projects"));
      projCards.forEach((card) => {
        const name = card.querySelector(".proj-name")?.value.trim() || "";
        const tech = card.querySelector(".proj-tech")?.value.trim() || "";
        const points = card.querySelector(".proj-points")?.value.trim() || "";
        if (!name) return;
        children.push(
          new Paragraph({
            children: [new TextRun({ text: name, bold: true })],
            spacing: { after: 40 },
          }),
        );
        if (tech)
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: "Tech Stack: " + tech,
                  italics: true,
                  size: 19,
                  color: "444444",
                }),
              ],
              spacing: { after: 40 },
            }),
          );
        if (points) {
          points
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l)
            .forEach((line) => children.push(bulletPara(line)));
        }
        children.push(new Paragraph({ spacing: { after: 80 } }));
      });
    }
  }

  // --- CERTIFICATIONS ---
  if (data.certifications) {
    children.push(sectionHeading("Certifications"));
    data.certifications
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l)
      .forEach((line) => children.push(bulletPara(line)));
  }

  // --- ACHIEVEMENTS ---
  if (data.achievements) {
    children.push(sectionHeading("Achievements"));
    data.achievements
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l)
      .forEach((line) => children.push(bulletPara(line)));
  }

  // --- LANGUAGES ---
  if (data.languages) {
    children.push(sectionHeading("Languages Known"));
    children.push(
      new Paragraph({ text: data.languages, spacing: { after: 80 } }),
    );
  }

  // --- ADDITIONAL INFO ---
  if (data.additionalInfo) {
    children.push(sectionHeading("Additional Information"));
    data.additionalInfo
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l)
      .forEach((line) => children.push(bulletPara(line)));
  }

  // ---- BUILD DOCUMENT ----
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children: children,
      },
    ],
  });

  // ---- SAVE ----
  try {
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name || "Resume"}_Resume.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    alert("Error generating DOCX: " + err.message);
    console.error(err);
  }
}
