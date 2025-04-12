import { Message } from "@/types/chat";

export const mockMessages: Message[] = [
  {
    id: "1", 
    content: "سلام! حالت چطوره؟",
    type: "self",
    timestamp: new Date("2024-03-20T10:00:00"),
  },
  {
    id: "2",
    content: "ممنون، خیلی خوبم!",
    type: "other", 
    timestamp: new Date("2024-03-20T10:01:00"),
  },
  {
    id: "3",
    content: "برنامه‌ات برای امروز چیه؟",
    type: "self",
    timestamp: new Date("2024-03-20T10:02:00"),
  },
  {
    id: "4",
    content: "امروز باید برم دانشگاه، کلاس دارم",
    type: "other",
    timestamp: new Date("2024-03-20T10:03:00"),
  },
  {
    id: "5",
    content: "چه خوب! چه درسی داری؟",
    type: "self",
    timestamp: new Date("2024-03-20T10:04:00"),
  },
  {
    id: "6", 
    content: "ریاضی و فیزیک",
    type: "other",
    timestamp: new Date("2024-03-20T10:05:00"),
  },
  {
    id: "7",
    content: "موفق باشی! بعداً میبینمت",
    type: "self",
    timestamp: new Date("2024-03-20T10:06:00"),
  },
  {
    id: "8",
    content: "راستی، برای فردا برنامه‌ای داری؟",
    type: "other",
    timestamp: new Date("2024-03-20T10:07:00"),
  },
  {
    id: "9",
    content: "نه هنوز، چطور مگه؟",
    type: "self",
    timestamp: new Date("2024-03-20T10:08:00"),
  },
  {
    id: "10",
    content: "میخواستم بریم کافه، پایه‌ای؟",
    type: "other",
    timestamp: new Date("2024-03-20T10:09:00"),
  },
  // Continuing with more messages...
  {
    id: "11",
    content: "آره حتماً! چه ساعتی؟",
    type: "self",
    timestamp: new Date("2024-03-20T10:10:00"),
  },
  {
    id: "12",
    content: "عصر حدود ساعت ۵ خوبه؟",
    type: "other",
    timestamp: new Date("2024-03-20T10:11:00"),
  },
  {
    id: "13",
    content: "عالیه! کدوم کافه بریم؟",
    type: "self",
    timestamp: new Date("2024-03-20T10:12:00"),
  },
  {
    id: "14",
    content: "کافه جدید که تو خیابون ولیعصر باز شده چطوره؟",
    type: "other",
    timestamp: new Date("2024-03-20T10:13:00"),
  },
  {
    id: "15",
    content: "آره شنیدم خیلی خوبه",
    type: "self",
    timestamp: new Date("2024-03-20T10:14:00"),
  },
  // Adding more messages with different topics
  // {
  //   id: "16",
  //   content: "دیشب فیلم جدید دیدی؟",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:15:00"),
  // },
  // {
  //   id: "17",
  //   content: "نه هنوز وقت نکردم، تو دیدی؟",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:16:00"),
  // },
  // {
  //   id: "18",
  //   content: "آره خیلی قشنگ بود، حتماً ببین",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:17:00"),
  // },
  // {
  //   id: "19",
  //   content: "باشه حتماً، ممنون بابت پیشنهاد",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:18:00"),
  // },
  // {
  //   id: "20",
  //   content: "خواهش میکنم! نظرت رو بهم بگو",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:19:00"),
  // },
  // // Continue with more messages...
  // {
  //   id: "21",
  //   content: "از کتاب جدیدی که خریدم خیلی خوشم اومده",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:20:00"),
  // },
  // {
  //   id: "22",
  //   content: "چه کتابی؟ منم دنبال یه کتاب خوب میگردم",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:21:00"),
  // },
  // {
  //   id: "23",
  //   content: "صد سال تنهایی، خیلی جذابه",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:22:00"),
  // },
  // {
  //   id: "24",
  //   content: "آره، من قبلاً خوندم. واقعاً شاهکاره",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:23:00"),
  // },
  // {
  //   id: "25",
  //   content: "پیشنهاد دیگه‌ای هم داری؟",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:24:00"),
  // },
  // // Adding more variety to conversations
  // {
  //   id: "26",
  //   content: "برای تعطیلات عید چه برنامه‌ای داری؟",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:25:00"),
  // },
  // {
  //   id: "27",
  //   content: "احتمالاً میرم شمال، تو چی؟",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:26:00"),
  // },
  // {
  //   id: "28",
  //   content: "من هم شیراز میرم دیدن خانواده",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:27:00"),
  // },
  // {
  //   id: "29",
  //   content: "خوش بگذره! چند روز میمونی؟",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:28:00"),
  // },
  // {
  //   id: "30",
  //   content: "یک هفته‌ای هستم",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:29:00"),
  // },
  // // Continue with more messages...
  // {
  //   id: "31",
  //   content: "از رستوران جدید که رفتی راضی بودی؟",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:30:00"),
  // },
  // {
  //   id: "32",
  //   content: "آره عالی بود، غذاهاش خیلی خوشمزه بود",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:31:00"),
  // },
  // {
  //   id: "33",
  //   content: "چی سفارش دادی؟",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:32:00"),
  // },
  // {
  //   id: "34",
  //   content: "قرمه سبزی و قیمه، هر دو عالی بودن",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:33:00"),
  // },
  // {
  //   id: "35",
  //   content: "پس حتماً باید امتحان کنم",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:34:00"),
  // },
  // // More messages...
  // {
  //   id: "36",
  //   content: "امروز هوا خیلی خوبه، نه؟",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:35:00"),
  // },
  // {
  //   id: "37",
  //   content: "آره، بهاری شده کاملاً",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:36:00"),
  // },
  // {
  //   id: "38",
  //   content: "بریم پارک قدم بزنیم؟",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:37:00"),
  // },
  // {
  //   id: "39",
  //   content: "الان نمیتونم، ولی عصر شاید بتونم",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:38:00"),
  // },
  // {
  //   id: "40",
  //   content: "باشه، پس عصر هماهنگ میکنیم",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:39:00"),
  // },
  // // Final set of messages
  // {
  //   id: "41",
  //   content: "از نمایشگاه کتاب خبر داری؟",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:40:00"),
  // },
  // {
  //   id: "42",
  //   content: "آره، از هفته دیگه شروع میشه",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:41:00"),
  // },
  // {
  //   id: "43",
  //   content: "بریم با هم؟",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:42:00"),
  // },
  // {
  //   id: "44",
  //   content: "حتماً! کی بریم؟",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:43:00"),
  // },
  // {
  //   id: "45",
  //   content: "روز اول شلوغه، آخر هفته بریم؟",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:44:00"),
  // },
  // {
  //   id: "46",
  //   content: "موافقم، پنجشنبه خوبه؟",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:45:00"),
  // },
  // {
  //   id: "47",
  //   content: "آره عالیه!",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:46:00"),
  // },
  // {
  //   id: "48",
  //   content: "پس میبینمت",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:47:00"),
  // },
  // {
  //   id: "49",
  //   content: "فعلاً خداحافظ",
  //   type: "self",
  //   timestamp: new Date("2024-03-20T10:48:00"),
  // },
  // {
  //   id: "50",
  //   content: "خداحافظ، روز خوبی داشته باشی",
  //   type: "other",
  //   timestamp: new Date("2024-03-20T10:49:00"),
  // }
];
