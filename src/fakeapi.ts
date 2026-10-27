import type { Book, BookCategory } from "./shared/types/book.type";
import type { Library } from "./shared/types/library.type";
import type {
  Order,
  OrderStatus,
  OrderWithDetails,
} from "./shared/types/order.type";
import { calculateBookPrice } from "./utils/calculateTotalBookPrice";

const STORAGE_KEY = "pixel-app:categories";
const ORDERS_STORAGE_KEY = "pixel-app:myorders";
const API_DELAY_MS = 500;
let myorders: Order[] = [];

const categories: BookCategory[] = [
  {
    id: "english",
    name: "اللغة الإنجليزية",
    books: [
      {
        id: "english-10",
        title: "اللغة الإنجليزية للصف العاشر",
        pages: 210,
        description:
          "كتاب أساسي لتطوير مهارات القراءة والكتابة والمحادثة بالإنجليزية للصف العاشر. ",
        basePrice: 320,
        thumbnailUrl: null,
        rating: 4.2,
      },
      {
        id: "english-11",
        title: "اللغة الإنجليزية للصف الحادي عشر",
        pages: 235,
        description:
          "منهاج متكامل يركز على القواعد المتقدمة والنصوص الأدبية للصف الحادي عشر.",
        basePrice: 360,
        thumbnailUrl: null,
        rating: 4.4,
      },
      {
        id: "english-12",
        title: "اللغة الإنجليزية للصف الثاني عشر",
        pages: 250,
        description:
          "كتاب منهجي شامل في اللغة الإنجليزية لطلاب الصف الثاني عشر.",
        basePrice: 400,
        thumbnailUrl:
          "https://plain-eeur-prod-public.komododecks.com/202610/23/gzV0fF4hgm5Qwnv82k1p/image.jpg",
        rating: 4.5,
      },
    ],
  },
  {
    id: "maths",
    name: "الرياضيات",
    books: [
      {
        id: "maths-10",
        title: "الرياضيات للصف العاشر",
        pages: 280,
        description:
          "مبادئ الجبر والهندسة وحساب المثلثات الأساسية لطلاب الصف العاشر.",
        basePrice: 420,
        thumbnailUrl: null,
        rating: 4.1,
      },
      {
        id: "maths-11",
        title: "الرياضيات للصف الحادي عشر - علمي",
        pages: 310,
        description: "كتاب الرياضيات التخصصية للمرحلة الثانوية الفرع العلمي.",
        basePrice: 480,
        thumbnailUrl: null,
        rating: 4.3,
      },
      {
        id: "maths-12",
        title: "رياضيات الصف الثاني عشر",
        pages: 300,
        description: "كتاب رياضيات متقدم يغطي منهاج الصف الثاني عشر.",
        basePrice: 500,
        thumbnailUrl: null,
        rating: 4,
      },
    ],
  },
  {
    id: "physics",
    name: "الفيزياء",
    books: [
      {
        id: "physics-11",
        title: "الفيزياء للصف الحادي عشر",
        pages: 260,
        description:
          "دراسة الميكانيكا، الحرارة، وخواص المادة لطلاب الصف الحادي عشر.",
        basePrice: 440,
        thumbnailUrl: null,
        rating: 4.2,
      },
      {
        id: "physics-12",
        title: "فيزياء الصف الثاني عشر",
        pages: 280,
        description: "كتاب فيزياء للصف الثاني عشر يتضمن دروسًا وأمثلة وتمارين.",
        basePrice: 475,
        thumbnailUrl: null,
        rating: 4.3,
      },
    ],
  },
  {
    id: "chemistry",
    name: "الكيمياء",
    books: [
      {
        id: "chemistry-11",
        title: "الكيمياء للصف الحادي عشر",
        pages: 245,
        description:
          "أسس الروابط الكيميائية، التفاعلات، والكيمياء غير العضوية.",
        basePrice: 410,
        thumbnailUrl: null,
        rating: 4.0,
      },
      {
        id: "chemistry-12",
        title: "كيمياء الصف الثاني عشر",
        pages: 265,
        description: "مقدمة شاملة في كيمياء الصف الثاني عشر العضوية والحركية.",
        basePrice: 450,
        thumbnailUrl: null,
        rating: 4.2,
      },
    ],
  },
  {
    id: "biology",
    name: "الأحياء",
    books: [
      {
        id: "biology-11",
        title: "الأحياء للصف الحادي عشر",
        pages: 290,
        description: "يتناول تشريح النبات، علم وظائف الأعضاء، والتنوع الحيوي.",
        basePrice: 430,
        thumbnailUrl: null,
        rating: 4.3,
      },
      {
        id: "biology-12",
        title: "أحياء الصف الثاني عشر",
        pages: 320,
        description:
          "اكتشف موضوعات الأحياء من الخلايا إلى النظم البيئية وعلم الوراثة.",
        basePrice: 480,
        thumbnailUrl: null,
        rating: 4.6,
      },
    ],
  },
  {
    id: "arabic",
    name: "العربية",
    books: [
      {
        id: "arabic-10",
        title: "اللغة العربية للصف العاشر",
        pages: 215,
        description: "مهارات النحو والصرف والبلاغة الموجهة لطلاب الصف العاشر.",
        basePrice: 340,
        thumbnailUrl: null,
        rating: 4.3,
      },
      {
        id: "arabic-11",
        title: "اللغة العربية للصف الحادي عشر",
        pages: 220,
        description: "دراسة معمقة في الأدب العربي، النقد، والنصوص الإبداعية.",
        basePrice: 370,
        thumbnailUrl: null,
        rating: 4.2,
      },
      {
        id: "arabic-12",
        title: "العربية للصف الثاني عشر",
        pages: 230,
        description: "اللغة العربية والأدب والكتابة للصف الثاني عشر.",
        basePrice: 390,
        thumbnailUrl: null,
        rating: 4.1,
      },
    ],
  },
  {
    id: "history",
    name: "التاريخ",
    books: [
      {
        id: "history-11",
        title: "التاريخ الحديث والمعاصر للصف الحادي عشر",
        pages: 200,
        description:
          "نظرة شاملة على التحولات السياسية والاجتماعية في العصر الحديث.",
        basePrice: 330,
        thumbnailUrl: null,
        rating: 3.8,
      },
      {
        id: "history-12",
        title: "تاريخ الصف الثاني عشر",
        pages: 210,
        description: "أحداث رئيسية ومنظورات تاريخية لطلاب الصف الثاني عشر.",
        basePrice: 350,
        thumbnailUrl: null,
        rating: 4,
      },
    ],
  },
  {
    id: "geography",
    name: "الجغرافيا",
    books: [
      {
        id: "geography-11",
        title: "الجغرافيا الطبيعية للصف الحادي عشر",
        pages: 185,
        description: "دراسة تضاريس الأرض، المناخ، والموارد البيئية المتنوعة.",
        basePrice: 320,
        thumbnailUrl: null,
        rating: 4.1,
      },
      {
        id: "geography-12",
        title: "جغرافيا الصف الثاني عشر",
        pages: 195,
        description:
          "دليل سهل ومريح للطلاب في الجغرافيا البشرية والطبيعية والخرائط.",
        basePrice: 360,
        thumbnailUrl: null,
        rating: 3.9,
      },
    ],
  },
  {
    id: "computer-science",
    name: "علوم الحاسوب",
    books: [
      {
        id: "cs-10",
        title: "مبادئ الحاسوب وتكنولوجيا المعلومات للصف العاشر",
        pages: 190,
        description: "مقدمة في شبكات الحاسوب، التفكير البرمجي، وأمن المعلومات.",
        basePrice: 350,
        thumbnailUrl: null,
        rating: 4.5,
      },
      {
        id: "cs-11",
        title: "علوم الحاسوب والبرمجة للصف الحادي عشر",
        pages: 220,
        description:
          "تعلم أساسيات الخوارزميات وهياكل البيانات باستخدام لغات البرمجة الحديثة.",
        basePrice: 390,
        thumbnailUrl: null,
        rating: 4.6,
      },
      {
        id: "computer-science-12",
        title: "علوم الحاسوب للصف الثاني عشر",
        pages: 240,
        description: "مفاهيم علوم الحاسوب الأساسية وتمارين برمجة عملية.",
        basePrice: 425,
        thumbnailUrl: null,
        rating: 4.7,
      },
    ],
  },
  {
    id: "philosophy",
    name: "الفلسفة",
    books: [
      {
        id: "philosophy-11",
        title: "مدخل إلى الفلسفة والمنطق للصف الحادي عشر",
        pages: 170,
        description: "مبادئ المنطق الصوري وتاريخ الأفكار الفلسفية القديمة.",
        basePrice: 310,
        thumbnailUrl: null,
        rating: 4.0,
      },
      {
        id: "philosophy-12",
        title: "فلسفة الصف الثاني عشر",
        pages: 180,
        description:
          "مقدمة إلى الأسئلة الفلسفية وطرق التفكير والنظريات المعاصرة.",
        basePrice: 340,
        thumbnailUrl: null,
        rating: 4.2,
      },
    ],
  },
];

const libraries: Library[] = [
  {
    id: "library-1",
    title: "مكتبة العلم",
    coords: [50, 30],
    location: "دمشق",
    pagePrice: 1,
    extraFees: 10,
    rating: 4.5,
  },
  {
    id: "library-2",
    title: "مكتبة الصداقة",
    coords: [50, 31],
    location: "دمشق",
    pagePrice: 1.2,
    extraFees: 9,
    rating: 4.2,
  },
];

export function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function isBook(value: unknown): value is Book {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const book = value as Record<string, unknown>;
  return (
    typeof book.id === "string" &&
    typeof book.title === "string" &&
    typeof book.pages === "number" &&
    typeof book.description === "string" &&
    typeof book.basePrice === "number" &&
    (typeof book.thumbnailUrl === "string" || book.thumbnailUrl === null) &&
    typeof book.rating === "number"
  );
}

function isBookCategory(value: unknown): value is BookCategory {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const category = value as Record<string, unknown>;
  return (
    typeof category.id === "string" &&
    typeof category.name === "string" &&
    Array.isArray(category.books) &&
    category.books.every(isBook)
  );
}

function getStoredCategories(): BookCategory[] {
  const storedCategories = localStorage.getItem(STORAGE_KEY);

  if (storedCategories === null) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    return categories;
  }

  const parsedCategories: unknown = JSON.parse(storedCategories);
  if (
    !Array.isArray(parsedCategories) ||
    !parsedCategories.every(isBookCategory)
  ) {
    throw new Error(
      `Invalid category data in localStorage key "${STORAGE_KEY}".`,
    );
  }

  return parsedCategories;
}

export async function getBooks(): Promise<BookCategory[]> {
  await sleep(API_DELAY_MS);
  return getStoredCategories();
}

export async function getBookById(id: string): Promise<Book | null> {
  await sleep(API_DELAY_MS);
  for (const category of getStoredCategories()) {
    const book = category.books.find((item) => item.id === id);
    if (book) {
      return book;
    }
  }

  return null;
}

export async function getLibraries() {
  await sleep(API_DELAY_MS);
  return libraries;
}

const orderStatuses: OrderStatus[] = [
  "PENDING",
  "ACCEPTED",
  "PAID",
  "FULFILLED",
  "CANCELLED",
  "REJECTED",
];

function isOrder(value: unknown): value is Order {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const order = value as Record<string, unknown>;
  return (
    typeof order.id === "string" &&
    typeof order.bookId === "string" &&
    typeof order.libraryId === "string" &&
    typeof order.sentAt === "string" &&
    !Number.isNaN(Date.parse(order.sentAt)) &&
    typeof order.status === "string" &&
    orderStatuses.includes(order.status as OrderStatus)
  );
}

function getStoredOrders(): Order[] {
  const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
  if (storedOrders === null) {
    return myorders;
  }

  const parsedOrders: unknown = JSON.parse(storedOrders);
  if (!Array.isArray(parsedOrders) || !parsedOrders.every(isOrder)) {
    throw new Error(
      `Invalid order data in localStorage key "${ORDERS_STORAGE_KEY}".`,
    );
  }

  myorders = parsedOrders;
  return myorders;
}

function saveOrders(orders: Order[]): void {
  myorders = orders;
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(myorders));
}

export async function getMyOrders(): Promise<Order[]> {
  await sleep(API_DELAY_MS);
  return [...getStoredOrders()];
}

export async function getOrdersCount(): Promise<number> {
  return (await getMyOrders()).length;
}

export async function getMyOrdersWithDetails(): Promise<OrderWithDetails[]> {
  await sleep(API_DELAY_MS);
  const booksById = new Map(
    getStoredCategories().flatMap((category) =>
      category.books.map((book) => [book.id, book] as const),
    ),
  );

  return getStoredOrders().map((order) => {
    const book = booksById.get(order.bookId);
    const library = libraries.find((item) => item.id === order.libraryId);
    if (!book || !library) {
      throw new Error(
        `Order "${order.id}" refers to a missing book or library.`,
      );
    }

    return {
      ...order,
      book,
      library,
      totalPrice: calculateBookPrice(book, library),
    };
  });
}

export async function getMyOrderById(id: string): Promise<Order | null> {
  await sleep(API_DELAY_MS);
  return getStoredOrders().find((order) => order.id === id) ?? null;
}

export async function createOrder(
  bookId: string,
  libraryId: string,
): Promise<Order> {
  await sleep(API_DELAY_MS);

  const book = await getBookById(bookId);
  if (!book) {
    throw new Error(`Cannot create an order: book "${bookId}" was not found.`);
  }
  if (!libraries.some((library) => library.id === libraryId)) {
    throw new Error(
      `Cannot create an order: library "${libraryId}" was not found.`,
    );
  }

  const order: Order = {
    id: crypto.randomUUID(),
    bookId,
    libraryId,
    sentAt: new Date().toISOString(),
    status: "PENDING",
    paymentId: null,
    senderId: 1,
  };
  saveOrders([...getStoredOrders(), order]);
  return order;
}

export async function updateMyOrderStatus(
  id: string,
  status: "CANCELLED",
): Promise<Order> {
  await sleep(API_DELAY_MS);
  const orders = getStoredOrders();
  const order = orders.find((item) => item.id === id);
  if (!order) {
    throw new Error(`Cannot update order: order "${id}" was not found.`);
  }
  if (status !== "CANCELLED" || order.status !== "PENDING") {
    throw new Error("Only pending orders can be cancelled.");
  }

  const updatedOrder = { ...order, status };
  saveOrders(orders.map((item) => (item.id === id ? updatedOrder : item)));
  return updatedOrder;
}

export async function deleteMyOrder(id: string): Promise<void> {
  await sleep(API_DELAY_MS);
  const orders = getStoredOrders();
  if (!orders.some((order) => order.id === id)) {
    throw new Error(`Cannot delete order: order "${id}" was not found.`);
  }

  saveOrders(orders.filter((order) => order.id !== id));
}
