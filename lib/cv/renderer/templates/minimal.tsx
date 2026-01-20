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
    fontSize: 10.5,
    lineHeight: 1.6,
    color: "#222222",
    padding: "48px 56px",
  },
  header: {
    textAlign: "center",
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#222222",
  },
  name: {
    fontFamily: "Times-Roman",
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    color: "#555555",
    fontWeight: 400,
    marginBottom: 12,
  },
  contactLine: {
    fontSize: 9,
    color: "#444444",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  contactItem: {
    color: "#444444",
  },
  contactLink: {
    color: "#222222",
    textDecoration: "underline",
  },
  section: {
    marginVertical: 24,
  },
  sectionTitle: {
    fontFamily: "Times-Roman",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  summary: {
    fontSize: 10.5,
    color: "#333333",
    textAlign: "justify",
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
  },
  jobPeriod: {
    fontSize: 9,
    color: "#666666",
  },
  jobCompany: {
    fontSize: 10,
    color: "#555555",
    fontStyle: "italic",
  },
  bullets: {
    paddingLeft: 20,
    color: "#333333",
  },
  bullet: {
    marginVertical: 4,
    flexDirection: "row",
    textAlign: "justify",
  },
  bulletPoint: {
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
  },
  skillsText: {
    fontSize: 10,
    color: "#333333",
    lineHeight: 1.8,
  },
  project: {
    marginBottom: 16,
  },
  projectName: {
    fontWeight: 600,
    fontSize: 10.5,
  },
  projectLink: {
    fontSize: 9,
    marginLeft: 8,
    color: "#222222",
    textDecoration: "underline",
  },
  projectDescription: {
    color: "#444444",
    fontSize: 10,
    marginTop: 2,
  },
  projectTech: {
    fontSize: 9,
    color: "#666666",
    marginTop: 4,
    fontStyle: "italic",
  },
  blogPost: {
    marginBottom: 12,
  },
  blogPostTitle: {
    fontWeight: 500,
    color: "#222222",
    textDecoration: "underline",
  },
  blogPostDescription: {
    fontSize: 9.5,
    color: "#555555",
    marginTop: 2,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 40,
  },
  column: {
    flex: 1,
  },
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontWeight: 500,
  },
  eduDetails: {
    fontSize: 9.5,
    color: "#555555",
  },
});

export function MinimalTemplate({ cv }: { cv: CV }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{cv.name}</Text>
          <Text style={styles.title}>{cv.title}</Text>
          <View style={styles.contactLine}>
            <Text style={styles.contactItem}>{cv.contact.email}</Text>
            {cv.contact.phone && (
              <Text style={styles.contactItem}>{cv.contact.phone}</Text>
            )}
            {cv.contact.location && (
              <Text style={styles.contactItem}>{cv.contact.location}</Text>
            )}
            {cv.contact.linkedin && (
              <Link src={cv.contact.linkedin} style={styles.contactLink}>
                LinkedIn
              </Link>
            )}
            {cv.contact.github && (
              <Link src={cv.contact.github} style={styles.contactLink}>
                GitHub
              </Link>
            )}
            {cv.contact.website && (
              <Link src={cv.contact.website} style={styles.contactLink}>
                Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Profile */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <Text style={styles.summary}>{cv.summary}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
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

        {/* Projects */}
        {cv.projects && cv.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {cv.projects.map((project, index) => (
              <View key={index} style={styles.project} wrap={false}>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
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

        {/* Blog Posts / Writing */}
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

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.skillsText}>{cv.skills.join(", ")}</Text>
        </View>

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
                <Text style={styles.skillsText}>{cv.languages.join(", ")}</Text>
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
