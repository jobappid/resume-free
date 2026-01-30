import type { Resume } from "../lib/resume";
import { PreviewClassic } from "./templates/PreviewClassic";
import { PreviewModern } from "./templates/PreviewModern";
import { PreviewMinimal } from "./templates/PreviewMinimal";

export function Preview({ r }: { r: Resume }) {
  switch (r.template) {
    case "modern":
      return <PreviewModern r={r} />;
    case "minimal":
      return <PreviewMinimal r={r} />;
    case "classic":
    default:
      return <PreviewClassic r={r} />;
  }
}
