export interface Message {
    id: number,
    sender: {
        id: number,
        firstName: string,
        lastName: string,
        phone: string,
        email: string,
        nationalID: string,
        profilePic: string,
        status: string
    },
    type: string,
    room_id: number,
    content: string,
    timestamp: string
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

export interface chatData {
  chatRooms: ChatRoom[];
  selectedChatRoom: ChatRoom | null;
}