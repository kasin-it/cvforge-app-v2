import type { CV } from "@/lib/cv/schemas";

export const minimalCV: CV = {
  name: "Jane Doe",
  title: "Software Engineer",
  contact: {
    email: "jane.doe@example.com",
    phone: null,
    location: null,
    linkedin: null,
    github: null,
    website: null,
  },
  summary: "Experienced software engineer with a passion for building great products.",
  experience: [
    {
      role: "Senior Developer",
      company: "Tech Corp",
      period: "2020 - Present",
      bullets: ["Led development of core features", "Mentored junior developers"],
    },
  ],
  skills: ["TypeScript", "React", "Node.js"],
  education: null,
  projects: null,
  blogPosts: null,
  languages: null,
  certifications: null,
};

export const fullCV: CV = {
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
    {
      role: "Junior Developer",
      company: "Digital Agency",
      period: "2016 - 2018",
      bullets: [
        "Built responsive websites for various clients",
        "Collaborated with designers to implement pixel-perfect UIs",
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
    {
      degree: "AWS Solutions Architect",
      school: "Amazon Web Services",
      year: "2020",
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
    {
      name: "Real-time Dashboard",
      description:
        "An analytics dashboard with real-time data visualization and alerting",
      url: null,
      technologies: ["React", "D3.js", "WebSocket", "PostgreSQL"],
    },
  ],
  blogPosts: [
    {
      name: "Building Scalable APIs with Node.js",
      description:
        "A comprehensive guide to building production-ready APIs with best practices",
      url: "https://johnsmith.dev/blog/scalable-apis",
    },
    {
      name: "React Performance Optimization Tips",
      description: "Practical techniques for improving React application performance",
      url: "https://johnsmith.dev/blog/react-performance",
    },
  ],
  languages: ["English (Native)", "Spanish (Conversational)", "Japanese (Basic)"],
  certifications: ["AWS Solutions Architect", "Google Cloud Professional"],
};
