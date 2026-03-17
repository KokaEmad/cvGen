import { jsPDF } from "jspdf";

/**
 * Generate a text-based ATS-friendly PDF from CV state using jsPDF.
 * Every character is real selectable text — no canvas/screenshots.
 */
export function exportPdf(state) {
  const { personalInfo, sections } = state;
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const PAGE_W = 210;
  const MARGIN = 18;
  const CONTENT_W = PAGE_W - MARGIN * 2;
  const PAGE_H = 297;
  const BOTTOM_MARGIN = 16;
  let y = 16;

  /* ── Helpers ────────────────────────────────── */

  function checkPage(needed = 8) {
    if (y + needed > PAGE_H - BOTTOM_MARGIN) {
      doc.addPage();
      y = 16;
    }
  }

  /** Wrap text to fit width and preserve explicit newlines. */
  function wrap(text, fontSize, maxW = CONTENT_W) {
    doc.setFontSize(fontSize);
    return String(text || "")
      .split(/\r?\n/)
      .flatMap((part) => {
        if (part === "") return [""];
        return doc.splitTextToSize(part, maxW);
      });
  }

  function drawText(text, x, fontSize, opts = {}) {
    const {
      font = "times",
      style = "normal",
      color = [26, 26, 26],
      align = "left",
      maxWidth = CONTENT_W,
    } = opts;
    doc.setFont(font, style);
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    const lines = wrap(text, fontSize, maxWidth);
    const lineH = fontSize * 0.5;
    for (const line of lines) {
      checkPage(lineH);
      doc.text(line, x, y, { align });
      y += lineH;
    }
  }

  function drawLine() {
    checkPage(3);
    doc.setDrawColor(120);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 2;
  }

  /* ── Personal info ──────────────────────────── */

  if (personalInfo.name) {
    drawText(personalInfo.name, PAGE_W / 2, 20, {
      style: "bold",
      align: "center",
      maxWidth: CONTENT_W,
    });
    y += 0.5;
  }

  if (personalInfo.title) {
    drawText(personalInfo.title, PAGE_W / 2, 10, {
      align: "center",
      color: [100, 100, 100],
    });
  }

  const contactParts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean);

  if (contactParts.length > 0) {
    y += 0.5;
    drawText(contactParts.join("  |  "), PAGE_W / 2, 8.5, {
      align: "center",
      color: [100, 100, 100],
    });
  }

  if (personalInfo.summary) {
    y += 1;
    drawLine();
    drawText(personalInfo.summary, MARGIN, 9.5, { color: [50, 50, 50] });
  }

  /* ── Section heading ────────────────────────── */

  function sectionHeading(title) {
    y += 4;
    checkPage(10);
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    doc.setTextColor(26, 26, 26);
    doc.text(title.toUpperCase(), MARGIN, y);
    y += 1;
    doc.setDrawColor(100);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 3;
  }

  /* ── Entry helpers ──────────────────────────── */

  function drawEntryHeader(left, right) {
    checkPage(6);
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.setTextColor(26, 26, 26);
    doc.text(left, MARGIN, y);
    if (right) {
      doc.setFont("times", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 100, 100);
      doc.text(right, PAGE_W - MARGIN, y, { align: "right" });
    }
    y += 3.8;
  }

  function drawEntrySubheader(left, right) {
    checkPage(4);
    doc.setFont("times", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(70, 70, 70);
    doc.text(left || "", MARGIN, y);
    if (right) {
      doc.setFont("times", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 100, 100);
      doc.text(right, PAGE_W - MARGIN, y, { align: "right" });
    }
    y += 3.5;
  }

  function drawBullets(bullets) {
    const filled = (bullets || []).filter((b) => b.trim());
    for (const b of filled) {
      const lines = wrap(b, 9.5, CONTENT_W - 7);
      checkPage(lines.length * 3.6 + 0.5);
      doc.setFont("times", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(40, 40, 40);
      // bullet dot
      doc.text("•", MARGIN + 2, y);
      for (let i = 0; i < lines.length; i++) {
        doc.text(lines[i], MARGIN + 7, y);
        y += 3.6;
      }
    }
  }

  /* ── Render each section ────────────────────── */

  for (const section of sections) {
    if (section.items.length === 0) continue;

    sectionHeading(section.title);

    switch (section.type) {
      case "experience":
        for (const it of section.items) {
          const dates = [it.startDate, it.endDate].filter(Boolean).join(" – ");
          drawEntryHeader(it.jobTitle || "Untitled Role", dates);
          drawEntrySubheader(it.company, it.location);
          drawBullets(it.bullets);
          y += 1.5;
        }
        break;

      case "education":
        for (const it of section.items) {
          drawEntryHeader(it.degree || "Untitled Degree", it.graduationDate);
          drawEntrySubheader(it.institution, it.location);
          if (it.gpa) {
            checkPage(4);
            doc.setFont("times", "normal");
            doc.setFontSize(8.5);
            doc.setTextColor(80, 80, 80);
            doc.text("GPA: " + it.gpa, MARGIN, y);
            y += 3.5;
          }
          drawBullets(it.bullets);
          y += 1.5;
        }
        break;

      case "skills":
        for (const it of section.items) {
          checkPage(4);
          if (it.category) {
            doc.setFont("times", "bold");
            doc.setFontSize(9.5);
            doc.setTextColor(26, 26, 26);
            const catW = doc.getTextWidth(it.category + ": ");
            doc.text(it.category + ": ", MARGIN, y);
            doc.setFont("times", "normal");
            doc.setTextColor(40, 40, 40);
            const rest = wrap(it.items, 9.5, CONTENT_W - catW);
            for (let i = 0; i < rest.length; i++) {
              doc.text(rest[i], MARGIN + (i === 0 ? catW : 0), y);
              y += 3.6;
            }
          } else {
            drawText(it.items, MARGIN, 9.5, { color: [40, 40, 40] });
          }
          y += 0.5;
        }
        break;

      case "projects":
        for (const it of section.items) {
          const dates = [it.startDate, it.endDate].filter(Boolean).join(" – ");
          const nameStr =
            (it.name || "Untitled Project") +
            (it.link ? "  (" + it.link + ")" : "");
          drawEntryHeader(nameStr, dates);
          if (it.techStack) {
            drawEntrySubheader(it.techStack);
          }
          drawBullets(it.bullets);
          y += 1.5;
        }
        break;

      case "certifications":
        for (const it of section.items) {
          checkPage(5);
          let line = it.name || "Untitled";
          if (it.issuer) line += " — " + it.issuer;
          if (it.date) line += " (" + it.date + ")";
          if (it.credentialId) line += "  ID: " + it.credentialId;

          doc.setFont("times", "bold");
          doc.setFontSize(9.5);
          doc.setTextColor(26, 26, 26);
          const nameW = doc.getTextWidth((it.name || "Untitled") + " ");
          doc.text(it.name || "Untitled", MARGIN, y);

          doc.setFont("times", "normal");
          doc.setTextColor(60, 60, 60);
          let rest = "";
          if (it.issuer) rest += "— " + it.issuer + " ";
          if (it.date) rest += "(" + it.date + ") ";
          if (it.credentialId) rest += " ID: " + it.credentialId;
          if (rest) doc.text(rest.trim(), MARGIN + nameW, y);
          y += 4;
        }
        break;

      case "languages":
        {
          const parts = section.items
            .map((it) =>
              it.language
                ? it.proficiency
                  ? it.language + " (" + it.proficiency + ")"
                  : it.language
                : null
            )
            .filter(Boolean);
          if (parts.length > 0) {
            drawText(parts.join("  •  "), MARGIN, 9.5);
          }
        }
        break;

      case "volunteer":
        for (const it of section.items) {
          const dates = [it.startDate, it.endDate].filter(Boolean).join(" – ");
          drawEntryHeader(it.role || "Untitled Role", dates);
          if (it.organization) drawEntrySubheader(it.organization);
          drawBullets(it.bullets);
          y += 1.5;
        }
        break;

      default:
        // custom
        for (const it of section.items) {
          if (it.text) {
            drawEntryHeader(it.text);
          }
          drawBullets(it.bullets);
          y += 1.5;
        }
        break;
    }
  }

  /* ── Save ───────────────────────────────────── */

  const filename =
    (personalInfo.name || "resume").replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "_") + "_CV.pdf";
  doc.save(filename);
}
