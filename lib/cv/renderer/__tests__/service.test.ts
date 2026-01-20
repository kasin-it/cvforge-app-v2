import { describe, expect, it, beforeAll } from "vitest";
import { CVRendererService } from "@/lib/cv/renderer/service";
import { minimalCV, fullCV } from "@/lib/cv/renderer/__tests__/fixtures";
import type { RenderOptions } from "@/lib/cv/schemas";

describe("CVRendererService", () => {
  let service: CVRendererService;

  beforeAll(() => {
    service = new CVRendererService();
  });

  describe("renderPDF", () => {
    describe("with minimal CV data", () => {
      it("renders PDF with modern template (default)", async () => {
        const buffer = await service.renderPDF(minimalCV);

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.length).toBeGreaterThan(0);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });

      it("renders PDF with minimal template", async () => {
        const buffer = await service.renderPDF(minimalCV, { template: "minimal" });

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.length).toBeGreaterThan(0);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });

      it("renders PDF with creative template", async () => {
        const buffer = await service.renderPDF(minimalCV, { template: "creative" });

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.length).toBeGreaterThan(0);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });

      it("renders PDF with executive template", async () => {
        const buffer = await service.renderPDF(minimalCV, { template: "executive" });

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.length).toBeGreaterThan(0);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });
    });

    describe("with full CV data", () => {
      it("renders PDF with modern template", async () => {
        const buffer = await service.renderPDF(fullCV, { template: "modern" });

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.length).toBeGreaterThan(0);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });

      it("renders PDF with minimal template", async () => {
        const buffer = await service.renderPDF(fullCV, { template: "minimal" });

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.length).toBeGreaterThan(0);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });

      it("renders PDF with creative template", async () => {
        const buffer = await service.renderPDF(fullCV, { template: "creative" });

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.length).toBeGreaterThan(0);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });

      it("renders PDF with executive template", async () => {
        const buffer = await service.renderPDF(fullCV, { template: "executive" });

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.length).toBeGreaterThan(0);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });
    });

    describe("PDF content validation", () => {
      it("produces valid PDF structure", async () => {
        const buffer = await service.renderPDF(fullCV, { template: "modern" });
        const pdfContent = buffer.toString("utf8");

        // PDF should contain standard markers
        expect(pdfContent).toContain("%PDF-");
        expect(pdfContent).toContain("%%EOF");
      });

      it("produces larger PDFs for full CV data", async () => {
        const minimalBuffer = await service.renderPDF(minimalCV, {
          template: "modern",
        });
        const fullBuffer = await service.renderPDF(fullCV, { template: "modern" });

        expect(fullBuffer.length).toBeGreaterThan(minimalBuffer.length);
      });
    });

    describe("template variations", () => {
      const templates: Array<RenderOptions["template"]> = [
        "modern",
        "minimal",
        "creative",
        "executive",
      ];

      it.each(templates)(
        "produces different output for %s template",
        async (template) => {
          const buffer = await service.renderPDF(fullCV, { template });

          expect(buffer).toBeInstanceOf(Buffer);
          expect(buffer.length).toBeGreaterThan(1000);
        }
      );

      it("produces different sizes for different templates", async () => {
        const buffers = await Promise.all(
          templates.map((template) => service.renderPDF(fullCV, { template }))
        );

        const sizes = buffers.map((b) => b.length);
        const uniqueSizes = new Set(sizes);

        // Different templates should produce different file sizes
        expect(uniqueSizes.size).toBeGreaterThan(1);
      });
    });

    describe("options handling", () => {
      it("uses modern template when no options provided", async () => {
        const buffer = await service.renderPDF(fullCV);

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });

      it("uses modern template when empty options provided", async () => {
        const buffer = await service.renderPDF(fullCV, {});

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });
    });

    describe("edge cases", () => {
      it("handles CV with empty optional arrays", async () => {
        const cvWithEmptyArrays = {
          ...fullCV,
          projects: [],
          blogPosts: [],
          languages: [],
          certifications: [],
        };

        const buffer = await service.renderPDF(cvWithEmptyArrays);

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });

      it("handles CV with special characters in text", async () => {
        const cvWithSpecialChars = {
          ...minimalCV,
          name: "José García-López",
          title: "Développeur & Designer",
          summary: 'Experienced with "quotes" and <tags> & special chars',
          experience: [
            {
              role: "Senior Developer™",
              company: "Acme® Corp",
              period: "2020–2024",
              bullets: ["Worked on © projects", "Implemented ™ features"],
            },
          ],
        };

        const buffer = await service.renderPDF(cvWithSpecialChars);

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });

      it("handles CV with long text content", async () => {
        const longSummary = "A".repeat(2000);
        const cvWithLongText = {
          ...minimalCV,
          summary: longSummary,
          experience: [
            {
              role: "Developer",
              company: "Company",
              period: "2020 - Present",
              bullets: Array.from({ length: 20 }, (_, i) => `Bullet point ${i + 1}: ${"X".repeat(100)}`),
            },
          ],
        };

        const buffer = await service.renderPDF(cvWithLongText);

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });

      it("handles CV with URLs in all fields", async () => {
        const cvWithUrls = {
          ...fullCV,
          contact: {
            email: "test@example.com",
            phone: "+1-555-0123",
            location: "New York, NY",
            linkedin: "https://linkedin.com/in/test",
            github: "https://github.com/test",
            website: "https://test.dev",
          },
        };

        const buffer = await service.renderPDF(cvWithUrls);

        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      });
    });
  });

  describe("service instantiation", () => {
    it("creates a new instance successfully", () => {
      const newService = new CVRendererService();
      expect(newService).toBeInstanceOf(CVRendererService);
    });

    it("multiple instances can render independently", async () => {
      const service1 = new CVRendererService();
      const service2 = new CVRendererService();

      const [buffer1, buffer2] = await Promise.all([
        service1.renderPDF(minimalCV, { template: "modern" }),
        service2.renderPDF(fullCV, { template: "executive" }),
      ]);

      expect(buffer1).toBeInstanceOf(Buffer);
      expect(buffer2).toBeInstanceOf(Buffer);
      expect(buffer1.length).not.toBe(buffer2.length);
    });
  });

  describe("concurrent rendering", () => {
    it("handles multiple concurrent render requests", async () => {
      const renderPromises = [
        service.renderPDF(minimalCV, { template: "modern" }),
        service.renderPDF(minimalCV, { template: "minimal" }),
        service.renderPDF(fullCV, { template: "creative" }),
        service.renderPDF(fullCV, { template: "executive" }),
      ];

      const buffers = await Promise.all(renderPromises);

      expect(buffers).toHaveLength(4);
      for (const buffer of buffers) {
        expect(buffer).toBeInstanceOf(Buffer);
        expect(buffer.toString("utf8", 0, 5)).toBe("%PDF-");
      }
    });
  });
});
