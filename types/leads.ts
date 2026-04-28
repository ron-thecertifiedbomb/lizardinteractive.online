// types/Lead.ts
export interface ILead {
  title: string;
  description: string;
  link: string;
  score: number;
  match: boolean;
  suggestedHook: string;
  source: "jobbers.io";
  createdAt: Date;
  status: "new" | "contacted" | "ignored";
}
