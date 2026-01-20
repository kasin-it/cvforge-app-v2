/* eslint-disable @eslint-react/no-array-index-key */
import {
  Document,
  Page,
  View,
  Text,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import type { CV } from "@/lib/cv/schemas";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.55,
    color: "#1e293b",
    flexDirection: "row",
  },
  sidebar: {
    width: 220,
    backgroundColor: "#1e293b",
    color: "#f1f5f9",
    padding: "40px 24px",
  },
  sidebarName: {
    fontFamily: "Times-Roman",
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 6,
  },
  sidebarTitle: {
    fontSize: 10,
    color: "#94a3b8",
    fontWeight: 400,
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  sidebarSection: {
    marginBottom: 24,
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#64748b",
    marginBottom: 12,
  },
  sidebarItem: {
    fontSize: 9,
    color: "#cbd5e1",
    marginVertical: 3,
  },
  sidebarLink: {
    fontSize: 9,
    color: "#93c5fd",
    textDecoration: "none",
  },
  skillTag: {
    backgroundColor: "#334155",
    color: "#e2e8f0",
    fontSize: 8,
    padding: "4px 10px",
    borderRadius: 3,
    marginRight: 4,
    marginBottom: 6,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  languageItem: {
    fontSize: 9,
    color: "#cbd5e1",
    marginVertical: 2,
  },
  eduSidebar: {
    marginBottom: 12,
  },
  eduSidebarDegree: {
    fontSize: 9,
    color: "#e2e8f0",
    fontWeight: 500,
  },
  eduSidebarDetails: {
    fontSize: 8,
    color: "#94a3b8",
    marginTop: 2,
  },
  main: {
    flex: 1,
    padding: "40px 44px",
    backgroundColor: "#ffffff",
  },
  section: {
    marginBottom: 26,
  },
  sectionTitle: {
    fontFamily: "Times-Roman",
    fontSize: 13,
    fontWeight: 600,
    color: "#0f172a",
    marginBottom: 14,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#1e293b",
  },
  summary: {
    color: "#475569",
    fontSize: 10,
    lineHeight: 1.7,
  },
  job: {
    marginBottom: 20,
  },
  jobHeader: {
    marginBottom: 8,
  },
  jobTitleLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  jobRole: {
    fontFamily: "Times-Roman",
    fontWeight: 600,
    fontSize: 11,
    color: "#0f172a",
  },
  jobPeriod: {
    fontSize: 9,
    color: "#64748b",
  },
  jobCompany: {
    fontSize: 10,
    color: "#475569",
    fontWeight: 500,
    marginTop: 2,
  },
  bullets: {
    paddingLeft: 18,
    color: "#475569",
    fontSize: 9.5,
  },
  bullet: {
    marginVertical: 2,
    flexDirection: "row",
  },
  bulletPoint: {
    marginRight: 6,
  },
  bulletText: {
    flex: 1,
  },
  project: {
    marginBottom: 16,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
    marginBottom: 4,
  },
  projectName: {
    fontFamily: "Times-Roman",
    fontWeight: 600,
    fontSize: 10.5,
    color: "#0f172a",
  },
  projectLink: {
    fontSize: 8,
    color: "#64748b",
    textDecoration: "none",
  },
  projectDescription: {
    color: "#475569",
    fontSize: 9.5,
    marginBottom: 4,
  },
  projectTech: {
    fontSize: 8.5,
    color: "#64748b",
  },
  blogPost: {
    marginBottom: 12,
  },
  blogPostTitle: {
    fontWeight: 500,
    fontSize: 10,
    color: "#0f172a",
    textDecoration: "none",
  },
  blogPostDescription: {
    fontSize: 9,
    color: "#64748b",
    marginTop: 2,
  },
});

export function ExecutiveTemplate({ cv }: { cv: CV }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarName}>{cv.name}</Text>
          <Text style={styles.sidebarTitle}>{cv.title}</Text>

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            <Text style={styles.sidebarItem}>{cv.contact.email}</Text>
            {cv.contact.phone && (
              <Text style={styles.sidebarItem}>{cv.contact.phone}</Text>
            )}
            {cv.contact.location && (
              <Text style={styles.sidebarItem}>{cv.contact.location}</Text>
            )}
            {cv.contact.linkedin && (
              <Link src={cv.contact.linkedin} style={styles.sidebarLink}>
                LinkedIn
              </Link>
            )}
            {cv.contact.github && (
              <Link src={cv.contact.github} style={styles.sidebarLink}>
                GitHub
              </Link>
            )}
            {cv.contact.website && (
              <Link src={cv.contact.website} style={styles.sidebarLink}>
                Website
              </Link>
            )}
          </View>

          {/* Expertise */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Expertise</Text>
            <View style={styles.skillsContainer}>
              {cv.skills.map((skill, index) => (
                <Text key={index} style={styles.skillTag}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>

          {/* Education */}
          {cv.education && cv.education.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Education</Text>
              {cv.education.map((edu, index) => (
                <View key={index} style={styles.eduSidebar}>
                  <Text style={styles.eduSidebarDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSidebarDetails}>
                    {edu.school}, {edu.year}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {cv.languages && cv.languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Languages</Text>
              {cv.languages.map((lang, index) => (
                <Text key={index} style={styles.languageItem}>
                  {lang}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Professional Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{cv.summary}</Text>
          </View>

          {/* Professional Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {cv.experience.map((job, index) => (
              <View key={index} style={styles.job} wrap={false}>
                <View style={styles.jobHeader}>
                  <View style={styles.jobTitleLine}>
                    <Text style={styles.jobRole}>{job.role}</Text>
                    <Text style={styles.jobPeriod}>{job.period}</Text>
                  </View>
                  <Text style={styles.jobCompany}>{job.company}</Text>
                </View>
                <View style={styles.bullets}>
                  {job.bullets.map((bullet, bulletIndex) => (
                    <View key={bulletIndex} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Key Projects */}
          {cv.projects && cv.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Key Projects</Text>
              {cv.projects.map((project, index) => (
                <View key={index} style={styles.project} wrap={false}>
                  <View style={styles.projectHeader}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    {project.url && (
                      <Link src={project.url} style={styles.projectLink}>
                        {project.url}
                      </Link>
                    )}
                  </View>
                  <Text style={styles.projectDescription}>
                    {project.description}
                  </Text>
                  {project.technologies.length > 0 && (
                    <Text style={styles.projectTech}>
                      Technologies: {project.technologies.join(", ")}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Publications & Writing */}
          {cv.blogPosts && cv.blogPosts.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Publications & Writing</Text>
              {cv.blogPosts.map((post, index) => (
                <View key={index} style={styles.blogPost} wrap={false}>
                  {post.url ? (
                    <Link src={post.url} style={styles.blogPostTitle}>
                      {post.name}
                    </Link>
                  ) : (
                    <Text style={styles.blogPostTitle}>{post.name}</Text>
                  )}
                  <Text style={styles.blogPostDescription}>
                    {post.description}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
