export type Experience = {
  company: string;
  title: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
};

export type TemplateId = "classic" | "modern" | "minimal";

export type Resume = {
  template: TemplateId;

  name: string;
  phone: string;
  email: string;
  location: string;
  headline: string;

  summary: string;
  skills: string[];
  experience: Experience[];
  education: { school: string; degree: string; year?: string }[];

    // Optional: general accountability / re-entry statement (no details)
  additional_info_enabled: boolean;
  additional_info: string;
};
