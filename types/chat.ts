export interface Message {
  id: string;
  content: string;
  type: "self" | "other";
  timestamp: Date;
  replyTo?: string; // ID of the message being replied to
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  nationalID: string;
    profilePic: string;
    status: string;
  }

export  interface Corporation {
    id: number;
    name: string;
    logo: string;
    contactInfo: any[];
    addresses: any[];
  }

export  interface ChatRoom {
    roomID: number;
    customer: Customer;
    corporation: Corporation;
    status: string;
    blockedBy: string;
  }