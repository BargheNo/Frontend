export interface Message {
  id: string;
  content: string;
  type: "self" | "other";
  timestamp: Date;
  replyTo?: string; // ID of the message being replied to
}
