export type MockUser = {
  id: string;
  email: string;
};

export const mockUsers: MockUser[] = [
  { id: "user_1", email: "user1@example.com" },
  { id: "user_2", email: "user2@example.com" },
  { id: "user_3", email: "user3@example.com" },
];

const ACTIVE_USER_KEY = "adi_active_user_id_v1";

export function getActiveUserId() {
  if (typeof window === "undefined") return mockUsers[0]?.id ?? "user_1";
  const raw = window.localStorage.getItem(ACTIVE_USER_KEY);
  return raw || (mockUsers[0]?.id ?? "user_1");
}

export function setActiveUserId(userId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACTIVE_USER_KEY, userId);
}

export function getActiveUser() {
  const id = getActiveUserId();
  return mockUsers.find((u) => u.id === id) ?? mockUsers[0];
}
