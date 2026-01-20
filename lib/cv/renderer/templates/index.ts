import { ModernTemplate } from "@/lib/cv/renderer/templates/modern";
import { MinimalTemplate } from "@/lib/cv/renderer/templates/minimal";
import { CreativeTemplate } from "@/lib/cv/renderer/templates/creative";
import { ExecutiveTemplate } from "@/lib/cv/renderer/templates/executive";

export const templates = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  executive: ExecutiveTemplate,
} as const;

export type TemplateName = keyof typeof templates;
