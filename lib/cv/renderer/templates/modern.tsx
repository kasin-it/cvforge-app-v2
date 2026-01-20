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
    lineHeight: 1.5,
    color: "#1a1a1a",
    padding: "40px 50px",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  title: {
    fontSize: 11,
    color: "#2563eb",
    marginTop: 4,
    fontWeight: 500,
  },
  links: {
    fontSize: 9,
    color: "#4b5563",
    marginTop: 6,
    flexDirection: "row",
    gap: 8,
  },
  link: {
    color: "#4b5563",
    textDecoration: "none",
  },
  linkSeparator: {
    color: "#4b5563",
  },
  contact: {
    textAlign: "right",
    fontSize: 9,
    color: "#4b5563",
  },
  contactItem: {
    marginVertical: 1,
  },
  section: {
    marginVertical: 18,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  summary: {
    color: "#4b5563",
    fontSize: 10,
  },
  job: {
    marginBottom: 14,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  jobRole: {
    fontWeight: 600,
    fontSize: 10.5,
  },
  jobCompany: {
    color: "#2563eb",
    fontWeight: 500,
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
    marginVertical: 2,
    flexDirection: "row",
  },
  bulletPoint: {
    marginRight: 6,
  },
  bulletText: {
    flex: 1,
  },
  skillsList: {
    color: "#4b5563",
    fontSize: 10,
    lineHeight: 1.6,
  },
  project: {
    marginBottom: 12,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginBottom: 2,
  },
  projectName: {
    fontWeight: 600,
    fontSize: 10.5,
  },
  projectLink: {
    fontSize: 9,
    color: "#2563eb",
    textDecoration: "none",
  },
  projectDescription: {
    color: "#4b5563",
    fontSize: 9.5,
    marginBottom: 4,
  },
  projectTech: {
    fontSize: 9,
    color: "#6b7280",
  },
  blogPost: {
    marginBottom: 10,
  },
  blogPostName: {
    fontWeight: 500,
    fontSize: 10,
    color: "#2563eb",
    textDecoration: "none",
  },
  blogPostDescription: {
    color: "#6b7280",
    fontSize: 9,
    marginTop: 2,
  },
  eduItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  eduDegree: {
    fontWeight: 500,
  },
  eduSchool: {
    color: "#6b7280",
  },
});

export function ModernTemplate({ cv }: { cv: CV }) {
  const links = [
    cv.contact.linkedin ? { label: "LinkedIn", url: cv.contact.linkedin } : null,
    cv.contact.github ? { label: "GitHub", url: cv.contact.github } : null,
    cv.contact.website ? { label: "Website", url: cv.contact.website } : null,
  ].filter(Boolean) as Array<{ label: string; url: string }>;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{cv.name}</Text>
            <Text style={styles.title}>{cv.title}</Text>
            {links.length > 0 && (
              <View style={styles.links}>
                {links.map((link, index) => (
                  <View key={link.label} style={{ flexDirection: "row" }}>
                    {index > 0 && <Text style={styles.linkSeparator}> · </Text>}
                    <Link src={link.url} style={styles.link}>
                      {link.label}
                    </Link>
                  </View>
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

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>{cv.summary}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {cv.experience.map((job, index) => (
            <View key={index} style={styles.job} wrap={false}>
              <View style={styles.jobHeader}>
                <View>
                  <Text>
                    <Text style={styles.jobRole}>{job.role}</Text>
                    <Text style={styles.jobCompany}> · {job.company}</Text>
                  </Text>
                </View>
                <Text style={styles.jobPeriod}>{job.period}</Text>
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
                  <Text style={styles.projectTech}>
                    {project.technologies.join(" · ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Blog Posts */}
        {cv.blogPosts && cv.blogPosts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Blog Posts</Text>
            {cv.blogPosts.map((post, index) => (
              <View key={index} style={styles.blogPost} wrap={false}>
                {post.url ? (
                  <Link src={post.url} style={styles.blogPostName}>
                    {post.name}
                  </Link>
                ) : (
                  <Text style={styles.blogPostName}>{post.name}</Text>
                )}
                <Text style={styles.blogPostDescription}>
                  {post.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.skillsList}>{cv.skills.join(" · ")}</Text>
        </View>

        {/* Education */}
        {cv.education && cv.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {cv.education.map((edu, index) => (
              <View key={index} style={styles.eduItem} wrap={false}>
                <View>
                  <Text>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}> · {edu.school}</Text>
                  </Text>
                </View>
                <Text style={styles.jobPeriod}>{edu.year}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {cv.languages && cv.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.skillsList}>{cv.languages.join(" · ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
