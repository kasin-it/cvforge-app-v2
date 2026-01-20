import { renderToBuffer } from "@react-pdf/renderer";
import type { CV, RenderOptions } from "@/lib/cv/schemas";
import { templates, type TemplateName } from "@/lib/cv/renderer/templates";

export class CVRendererService {
  async renderPDF(cv: CV, options: RenderOptions = {}): Promise<Buffer> {
    const { template = "modern" } = options;
    const templateName = template as TemplateName;
    const TemplateComponent = templates[templateName];

    const buffer = await renderToBuffer(<TemplateComponent cv={cv} />);
    return Buffer.from(buffer);
  }
}
