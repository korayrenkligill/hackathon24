import React, { useState, useEffect } from "react";

// Tipler
export type Badge = {
  id: string;
  name: string;
  emoji: string;
  point: number;
  details: string;
  eventType?: "duyuru" | "katılım" | "bağlantı";
  createdAt?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: "genc" | "sirket" | "kurum" | "topluluk";
  badges: Badge[];
  blogs: string[];
  createdAt: string;
  socialMedias: Record<string, string>;
  profile?: string;
};

export type EventType =
  | "Atölye Çalışmaları"
  | "Seminerler ve Konferanslar"
  | "Sosyal Sorumluluk Projeleri"
  | "Spor Etkinlikleri"
  | "Kültürel Geziler"
  | "Networking Etkinlikleri"
  | "Sanat ve Yaratıcılık Atölyeleri"
  | "Müzik ve Eğlence"
  | "Lise Öğrencileri"
  | "Üniversite Öğrencileri"
  | "Yeni Mezunlar"
  | "Ücretsiz"
  | "Ücretli";

export type Event = {
  id: string;
  title: string;
  description: string;
  organizer: string;
  type: "duyuru" | "katılım" | "bağlantı";
  url?: string;
  badge?: string;
  participants?: string[];
  qrCode?: string;
  status: "beklemede" | "onaylandı";
  createdAt: string;
  updatedAt?: string;
  image: string;
  categories: EventType[];
  date: string;
};

export type Forum = {
  id: string;
  title: string;
  content: string;
  author: string;
  comments: Comment[];
  likes: number;
  dislikes: number;
  createdAt: string;
};

export type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};

// Veri Yönetim Fonksiyonları
export const initializeData = <T>(key: string, data: T[]) => {
  const existingData = localStorage.getItem(key);
  if (!existingData) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const saveData = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const addEvent = (newEvent: Event) => {
  // LocalStorage'daki mevcut etkinlikleri al
  const events = JSON.parse(localStorage.getItem("events") || "[]");

  // Yeni etkinliği listeye ekle
  events.push(newEvent);

  // Güncellenmiş listeyi localStorage'a kaydet
  localStorage.setItem("events", JSON.stringify(events));

  console.log("Yeni etkinlik başarıyla eklendi!", newEvent);

  return {
    isOk: true,
    message: "Yeni etkinlik başarıyla eklendi!",
  };
};

export const addParticipantToEvent = (
  eventId: string,
  userId: string
): { isOk: boolean; message: string } => {
  // LocalStorage'dan mevcut etkinlikleri al
  const events = JSON.parse(localStorage.getItem("events") || "[]");

  // Hedef etkinliği bul
  const eventIndex = events.findIndex((event: any) => event.id === eventId);
  if (eventIndex === -1) {
    return {
      isOk: false,
      message: "Etkinlik bulunamadı.",
    };
  }

  // Hedef etkinliğin participants alanına userId ekle
  const event = events[eventIndex];
  if (!event.participants.includes(userId)) {
    event.participants.push(userId);
  } else {
    return {
      isOk: false,
      message: "Kullanıcı zaten bu etkinliğe katılmış.",
    };
  }

  // Güncellenmiş listeyi LocalStorage'a kaydet
  events[eventIndex] = event;
  localStorage.setItem("events", JSON.stringify(events));

  return {
    isOk: true,
    message: "Katılımcı başarıyla eklendi.",
  };
};

export const getLastAddedEvents = (count: number = 6) => {
  // LocalStorage'dan mevcut etkinlikleri al
  const events = JSON.parse(localStorage.getItem("events") || "[]");

  // Etkinlikleri `createdAt` tarihine göre sırala (en yeni en başta olacak şekilde)
  const sortedEvents = events.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Son `count` kadar etkinliği al
  return sortedEvents.slice(0, count);
};

export const getEventsByOrganizer = (
  organizerId: string
): { isOk: boolean; events?: any[]; message: string } => {
  // LocalStorage'daki etkinlikleri al
  const events = JSON.parse(localStorage.getItem("events") || "[]");

  // Organizator ID'sine göre etkinlikleri filtrele
  const organizerEvents = events.filter(
    (event: any) => event.organizer === organizerId
  );

  if (organizerEvents.length === 0) {
    return {
      isOk: false,
      message: "Bu organizatör tarafından oluşturulmuş etkinlik bulunamadı.",
    };
  }

  return {
    isOk: true,
    events: organizerEvents,
    message: "Etkinlikler başarıyla bulundu.",
  };
};

export const removeEventById = (
  eventId: string
): { isOk: boolean; message: string } => {
  // LocalStorage'daki etkinlikleri al
  const events = JSON.parse(localStorage.getItem("events") || "[]");

  // Etkinliği ID'ye göre bul
  const eventIndex = events.findIndex((event: any) => event.id === eventId);

  if (eventIndex === -1) {
    return {
      isOk: false,
      message: "Etkinlik bulunamadı.",
    };
  }

  // Etkinliği kaldır
  events.splice(eventIndex, 1);

  // Güncellenmiş listeyi LocalStorage'a kaydet
  localStorage.setItem("events", JSON.stringify(events));

  return {
    isOk: true,
    message: "Etkinlik başarıyla kaldırıldı.",
  };
};

export const getEventsByParticipant = (
  userId: string
): { isOk: boolean; events?: any[]; message: string } => {
  // LocalStorage'daki etkinlikleri al
  const events = JSON.parse(localStorage.getItem("events") || "[]");

  // Katılımcı olduğu etkinlikleri filtrele
  const participantEvents = events.filter((event: any) =>
    event.participants?.includes(userId)
  );

  if (participantEvents.length === 0) {
    return {
      isOk: false,
      message: "Kullanıcının katıldığı etkinlik bulunamadı.",
    };
  }

  return {
    isOk: true,
    events: participantEvents,
    message: "Katıldığı etkinlikler başarıyla bulundu.",
  };
};

export const addUser = (newUser: User): { isOk: boolean; message: string } => {
  // LocalStorage'daki mevcut kullanıcıları al
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // E-posta ile çakışma kontrolü
  const existingUser = users.find((user: User) => user.email === newUser.email);
  if (existingUser) {
    return {
      isOk: false,
      message: "Bu e-posta adresiyle zaten bir kullanıcı mevcut.",
    };
  }

  // Yeni kullanıcıyı listeye ekle
  users.push(newUser);

  // Güncellenmiş listeyi localStorage'a kaydet
  localStorage.setItem("users", JSON.stringify(users));

  return {
    isOk: true,
    message: "Kullanıcı başarıyla kaydedildi!",
  };
};

// Blog ekleme fonksiyonu
export const addBlogToUser = (userId: string, blog: string) => {
  // Kullanıcı listesini localStorage'tan al
  const storedUsers = localStorage.getItem("users");

  if (!storedUsers) {
    console.log("Kullanıcılar bulunamadı.");
    return;
  }

  // JSON verisini User[] olarak çöz
  const users: User[] = JSON.parse(storedUsers);

  // Kullanıcıyı bul
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    console.log("Kullanıcı bulunamadı.");
    return;
  }

  // Blog ekle
  users[userIndex].blogs.push(blog);

  localStorage.setItem("lu", JSON.stringify(users[userIndex]));
  // Güncellenmiş kullanıcı listesini localStorage'a kaydet
  localStorage.setItem("users", JSON.stringify(users));

  console.log(`Blog "${blog}" başarıyla eklendi.`);
};

export const getUserById = (
  userId: string
): { isOk: boolean; user?: User; message: string } => {
  // LocalStorage'daki kullanıcıları al
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Kullanıcıyı ID'ye göre bul
  const user = users.find((user: User) => user.id === userId);

  if (!user) {
    return {
      isOk: false,
      message: "Kullanıcı bulunamadı.",
    };
  }

  return {
    isOk: true,
    user,
    message: "Kullanıcı başarıyla bulundu.",
  };
};

export const updateUserById = (
  userId: string,
  updates: { profile?: Partial<User>; password?: string }
): { isOk: boolean; message: string } => {
  // LocalStorage'daki kullanıcıları al
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Kullanıcıyı ID ile bul
  const userIndex = users.findIndex((user: User) => user.id === userId);

  if (userIndex === -1) {
    return {
      isOk: false,
      message: "Kullanıcı bulunamadı.",
    };
  }

  // Mevcut kullanıcıyı al
  const user = users[userIndex];

  // Profil bilgilerini güncelle (eğer gönderildiyse)
  if (updates.profile) {
    users[userIndex] = {
      ...user,
      ...updates.profile,
    };
  }

  // Şifreyi güncelle (eğer gönderildiyse ve boş değilse)
  if (updates.password && updates.password.trim() !== "") {
    users[userIndex].password = updates.password;
  }

  // Güncellenmiş kullanıcı listesini LocalStorage'a kaydet
  localStorage.setItem("users", JSON.stringify(users));

  return {
    isOk: true,
    message: "Kullanıcı başarıyla güncellendi.",
  };
};
export const updateUserProfile = (
  userId: string,
  updates: { profile?: string; password?: string }
): { isOk: boolean; message: string } => {
  // LocalStorage'daki kullanıcıları al
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Kullanıcıyı ID ile bul
  const userIndex = users.findIndex((user: User) => user.id === userId);

  if (userIndex === -1) {
    return {
      isOk: false,
      message: "Kullanıcı bulunamadı.",
    };
  }

  // Mevcut kullanıcıyı al
  const user = users[userIndex];

  // Profil fotoğrafını güncelle (eğer gönderildiyse ve boş değilse)
  if (updates.profile && updates.profile.trim() !== "") {
    users[userIndex].profile = updates.profile;
  }

  // Şifreyi güncelle (eğer gönderildiyse ve boş değilse)
  if (updates.password && updates.password.trim() !== "") {
    users[userIndex].password = updates.password;
  }

  localStorage.setItem("lu", JSON.stringify(users[userIndex]));
  // Güncellenmiş kullanıcı listesini LocalStorage'a kaydet
  localStorage.setItem("users", JSON.stringify(users));

  return {
    isOk: true,
    message: "Kullanıcı başarıyla güncellendi.",
  };
};

export const addBadge = (
  newBadge: Badge
): { isOk: boolean; message: string } => {
  // LocalStorage'daki mevcut rozetleri al
  const badges = JSON.parse(localStorage.getItem("badges") || "[]");

  // Aynı ID'ye sahip bir rozetin olup olmadığını kontrol et
  const existingBadge = badges.find((badge: Badge) => badge.id === newBadge.id);
  if (existingBadge) {
    return {
      isOk: false,
      message: "Bu ID ile zaten bir rozet mevcut.",
    };
  }

  // Yeni rozeti listeye ekle
  badges.push(newBadge);

  // Güncellenmiş listeyi localStorage'a kaydet
  localStorage.setItem("badges", JSON.stringify(badges));

  return {
    isOk: true,
    message: "Rozet başarıyla kaydedildi!",
  };
};

export const addForum = (
  newForum: Forum
): { isOk: boolean; message: string } => {
  // LocalStorage'daki mevcut forumları al
  const forums = JSON.parse(localStorage.getItem("forums") || "[]");

  // Aynı ID'ye sahip bir forumun olup olmadığını kontrol et
  const existingForum = forums.find((forum: Forum) => forum.id === newForum.id);
  if (existingForum) {
    return {
      isOk: false,
      message: "Bu ID ile zaten bir forum mevcut.",
    };
  }

  // Yeni forumu listeye ekle
  forums.push(newForum);

  // Güncellenmiş listeyi LocalStorage'a kaydet
  localStorage.setItem("forums", JSON.stringify(forums));

  return {
    isOk: true,
    message: "Forum başarıyla kaydedildi!",
  };
};

// Forum için beğeni ekleme fonksiyonu
export const likeForum = (
  forumId: string
): { isOk: boolean; message: string } => {
  // LocalStorage'daki forumları al
  const forums = JSON.parse(localStorage.getItem("forums") || "[]");

  // Hedef forumu bul
  const forumIndex = forums.findIndex((forum: Forum) => forum.id === forumId);
  if (forumIndex === -1) {
    return { isOk: false, message: "Forum bulunamadı." };
  }

  // Like sayısını artır
  forums[forumIndex].likes += 1;

  // Güncellenmiş forumları LocalStorage'a kaydet
  localStorage.setItem("forums", JSON.stringify(forums));

  return { isOk: true, message: "Forum beğenildi." };
};

// Forum için beğenmeme ekleme fonksiyonu
export const dislikeForum = (
  forumId: string
): { isOk: boolean; message: string } => {
  // LocalStorage'daki forumları al
  const forums = JSON.parse(localStorage.getItem("forums") || "[]");

  // Hedef forumu bul
  const forumIndex = forums.findIndex((forum: Forum) => forum.id === forumId);
  if (forumIndex === -1) {
    return { isOk: false, message: "Forum bulunamadı." };
  }

  // Dislike sayısını artır
  forums[forumIndex].dislikes += 1;

  // Güncellenmiş forumları LocalStorage'a kaydet
  localStorage.setItem("forums", JSON.stringify(forums));

  return { isOk: true, message: "Forum beğenilmedi." };
};

export const getForumById = (
  forumId: string
): { isOk: boolean; forum?: Forum; message: string } => {
  // LocalStorage'daki forumları al
  const forums = JSON.parse(localStorage.getItem("forums") || "[]");

  // Forumları ID'ye göre bul
  const forum = forums.find((forum: Forum) => forum.id === forumId);

  if (!forum) {
    return {
      isOk: false,
      message: "Forum bulunamadı.",
    };
  }

  return {
    isOk: true,
    forum,
    message: "Forum başarıyla bulundu.",
  };
};

export const getForumsByAuthor = (
  authorId: string
): { isOk: boolean; forums?: Forum[]; message: string } => {
  // LocalStorage'daki forumları al
  const forums = JSON.parse(localStorage.getItem("forums") || "[]");

  // Yazarın forumlarını filtrele
  const authorForums = forums.filter(
    (forum: Forum) => forum.author === authorId
  );

  if (authorForums.length === 0) {
    return {
      isOk: false,
      message: "Bu yazar tarafından oluşturulmuş forum bulunamadı.",
    };
  }

  return {
    isOk: true,
    forums: authorForums,
    message: "Forumlar başarıyla bulundu.",
  };
};

export const addCommentToForum = (
  forumId: string,
  comment: { id: string; author: string; content: string; createdAt: string }
): { isOk: boolean; message: string } => {
  // LocalStorage'daki forumları al
  const forums = JSON.parse(localStorage.getItem("forums") || "[]");

  // Hedef forumu bul
  const forumIndex = forums.findIndex((forum: Forum) => forum.id === forumId);

  if (forumIndex === -1) {
    return {
      isOk: false,
      message: "Forum bulunamadı.",
    };
  }

  // Hedef forumun yorumlarına yeni yorumu ekle
  if (!forums[forumIndex].comments) {
    forums[forumIndex].comments = [];
  }
  forums[forumIndex].comments.push(comment);

  // Güncellenmiş listeyi LocalStorage'a kaydet
  localStorage.setItem("forums", JSON.stringify(forums));

  return {
    isOk: true,
    message: "Yorum başarıyla eklendi.",
  };
};

export const removeForumById = (
  forumId: string
): { isOk: boolean; message: string } => {
  // LocalStorage'daki forumları al
  const forums = JSON.parse(localStorage.getItem("forums") || "[]");

  // Forumun var olup olmadığını kontrol et
  const forumIndex = forums.findIndex((forum: Forum) => forum.id === forumId);

  if (forumIndex === -1) {
    return {
      isOk: false,
      message: "Forum bulunamadı.",
    };
  }

  // Forumu kaldır
  forums.splice(forumIndex, 1);

  // Güncellenmiş listeyi LocalStorage'a kaydet
  localStorage.setItem("forums", JSON.stringify(forums));

  return {
    isOk: true,
    message: "Forum başarıyla kaldırıldı.",
  };
};
