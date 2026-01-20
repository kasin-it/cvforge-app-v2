/* eslint-disable no-console */
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { CVRendererService } from "@/lib/cv/renderer/service";
import type { CV } from "@/lib/cv/schemas";

const testCV: CV = {
  name: "John Smith",
  title: "Full Stack Developer",
  contact: {
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/johnsmith",
    github: "https://github.com/johnsmith",
    website: "https://johnsmith.dev",
  },
  summary:
    "Full stack developer with 8+ years of experience building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers.",
  experience: [
    {
      role: "Senior Full Stack Developer",
      company: "Innovation Labs",
      period: "2021 - Present",
      bullets: [
        "Architected and built a microservices platform serving 1M+ daily users",
        "Led a team of 5 engineers, implementing agile methodologies",
        "Reduced deployment time by 70% through CI/CD pipeline optimization",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2018 - 2021",
      bullets: [
        "Developed core product features using React and Node.js",
        "Implemented real-time collaboration features using WebSockets",
        "Optimized database queries resulting in 50% faster page loads",
      ],
    },
  ],
  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "GraphQL",
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      school: "University of California, Berkeley",
      year: "2016",
    },
  ],
  projects: [
    {
      name: "Open Source CLI Tool",
      description:
        "A command-line tool for automating development workflows with 5k+ GitHub stars",
      url: "https://github.com/johnsmith/cli-tool",
      technologies: ["TypeScript", "Node.js", "Commander.js"],
    },
  ],
  blogPosts: [
    {
      name: "Building Scalable APIs with Node.js",
      description:
        "A comprehensive guide to building production-ready APIs with best practices",
      url: "https://johnsmith.dev/blog/scalable-apis",
    },
  ],
  languages: ["English (Native)", "Spanish (Conversational)"],
  certifications: ["AWS Solutions Architect"],
};

async function main() {
  const outputDir = path.join(__dirname, "..", ".cv-output");
  mkdirSync(outputDir, { recursive: true });

  const service = new CVRendererService();
  const templates = ["modern", "minimal", "creative", "executive"] as const;

  console.log(`Rendering PDFs to ${outputDir}...`);

  for (const template of templates) {
    console.log(`  Rendering ${template}...`);
    const buffer = await service.renderPDF(testCV, { template });
    const filename = `${outputDir}/cv-${template}.pdf`;
    writeFileSync(filename, buffer);
    console.log(`  Created: ${filename}`);
  }

  console.log("\nDone! Open the PDFs in your PDF viewer.");
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main().catch(console.error);
