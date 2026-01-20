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
    lineHeight: 1.6,
    color: "#1f2937",
    backgroundColor: "#ffffff",
  },
  accentBar: {
    height: 8,
    backgroundColor: "#8b5cf6",
  },
  header: {
    padding: "36px 50px 28px",
    backgroundColor: "#faf5ff",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    color: "#8b5cf6",
    lineHeight: 1.1,
  },
  title: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: 500,
    marginTop: 6,
  },
  links: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  linkPill: {
    backgroundColor: "#f3e8ff",
    color: "#7c3aed",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 9,
    textDecoration: "none",
  },
  contact: {
    textAlign: "right",
    fontSize: 9,
    color: "#6b7280",
  },
  contactItem: {
    marginVertical: 2,
  },
  content: {
    padding: "32px 50px 40px",
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: "#8b5cf6",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 14,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: "#e9d5ff",
  },
  summary: {
    color: "#4b5563",
    fontSize: 10.5,
    lineHeight: 1.75,
    paddingLeft: 2,
  },
  job: {
    marginBottom: 22,
    paddingLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: "#e9d5ff",
  },
  jobHeader: {
    marginBottom: 8,
  },
  jobRole: {
    fontWeight: 600,
    fontSize: 11,
    color: "#1f2937",
  },
  jobMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 2,
  },
  jobCompany: {
    color: "#8b5cf6",
    fontWeight: 500,
    fontSize: 10,
  },
  jobPeriod: {
    color: "#9ca3af",
    fontSize: 9,
  },
  bullets: {
    paddingLeft: 18,
    color: "#4b5563",
    fontSize: 9.5,
  },
  bullet: {
    marginVertical: 3,
    flexDirection: "row",
  },
  bulletPoint: {
    color: "#c4b5fd",
    marginRight: 6,
  },
  bulletText: {
    flex: 1,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillPill: {
    backgroundColor: "#f3e8ff",
    color: "#7c3aed",
    fontSize: 9,
    fontWeight: 500,
    padding: "6px 14px",
    borderRadius: 20,
  },
  project: {
    marginBottom: 18,
    padding: "14px 18px",
    backgroundColor: "#faf5ff",
    borderRadius: 10,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
    marginBottom: 6,
  },
  projectName: {
    fontWeight: 600,
    fontSize: 10.5,
    color: "#1f2937",
  },
  projectLink: {
    fontSize: 8,
    color: "#a78bfa",
    textDecoration: "none",
  },
  projectDescription: {
    color: "#4b5563",
    fontSize: 9.5,
    marginBottom: 8,
  },
  projectTech: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  techTag: {
    fontSize: 8,
    color: "#7c3aed",
    backgroundColor: "#ede9fe",
    padding: "3px 10px",
    borderRadius: 12,
  },
  blogPost: {
    marginBottom: 14,
    paddingLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: "#fce7f3",
  },
  blogPostTitle: {
    fontWeight: 500,
    fontSize: 10,
    color: "#1f2937",
    textDecoration: "none",
  },
  blogPostDescription: {
    fontSize: 9,
    color: "#6b7280",
    marginTop: 3,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 50,
  },
  column: {
    flex: 1,
  },
  eduItem: {
    marginBottom: 10,
  },
  eduDegree: {
    fontWeight: 500,
    fontSize: 10,
    color: "#1f2937",
  },
  eduDetails: {
    fontSize: 9,
    color: "#6b7280",
    marginTop: 2,
  },
  languageList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  languageTag: {
    backgroundColor: "#fce7f3",
    color: "#be185d",
    fontSize: 9,
    fontWeight: 500,
    padding: "5px 12px",
    borderRadius: 16,
  },
});

export function CreativeTemplate({ cv }: { cv: CV }) {
  const links = [
    cv.contact.linkedin ? { label: "LinkedIn", url: cv.contact.linkedin } : null,
    cv.contact.github ? { label: "GitHub", url: cv.contact.github } : null,
    cv.contact.website ? { label: "Portfolio", url: cv.contact.website } : null,
  ].filter(Boolean) as Array<{ label: string; url: string }>;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Accent Bar */}
        <View style={styles.accentBar} />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.name}>{cv.name}</Text>
              <Text style={styles.title}>{cv.title}</Text>
              {links.length > 0 && (
                <View style={styles.links}>
                  {links.map((link) => (
                    <Link key={link.label} src={link.url} style={styles.linkPill}>
                      {link.label}
                    </Link>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.contact}>
              <Text style={styles.contactItem}>{cv.contact.email}</Text>
              {cv.contact.phone && (
                <Text style={styles.contactItem}>{cv.contact.phone}</Text>
              )}
              {cv.contact.location && (
                <Text style={styles.contactItem}>{cv.contact.location}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* About Me */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.summary}>{cv.summary}</Text>
          </View>

          {/* Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {cv.experience.map((job, index) => (
              <View key={index} style={styles.job} wrap={false}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobRole}>{job.role}</Text>
                  <View style={styles.jobMeta}>
                    <Text style={styles.jobCompany}>{job.company}</Text>
                    <Text style={styles.jobPeriod}>• {job.period}</Text>
                  </View>
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

          {/* Skills */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {cv.skills.map((skill, index) => (
                <Text key={index} style={styles.skillPill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>

          {/* Projects */}
          {cv.projects && cv.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
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
                    <View style={styles.projectTech}>
                      {project.technologies.map((tech, techIndex) => (
                        <Text key={techIndex} style={styles.techTag}>
                          {tech}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Writing */}
          {cv.blogPosts && cv.blogPosts.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Writing</Text>
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

          {/* Two Column: Education & Languages */}
          <View style={styles.twoColumn}>
            {cv.education && cv.education.length > 0 && (
              <View style={styles.column}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Education</Text>
                  {cv.education.map((edu, index) => (
                    <View key={index} style={styles.eduItem} wrap={false}>
                      <Text style={styles.eduDegree}>{edu.degree}</Text>
                      <Text style={styles.eduDetails}>
                        {edu.school}, {edu.year}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {cv.languages && cv.languages.length > 0 && (
              <View style={styles.column}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Languages</Text>
                  <View style={styles.languageList}>
                    {cv.languages.map((lang, index) => (
                      <Text key={index} style={styles.languageTag}>
                        {lang}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
