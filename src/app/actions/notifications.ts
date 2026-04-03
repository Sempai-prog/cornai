"use server";

import { revalidatePath } from "next/cache";
import { getNotifications, markNotificationRead, markAllNotificationsRead, getUnreadNotificationsCount } from "@/database/queries/notifications";

const DEMO_ENTREPRISE_ID = "cf83af70-d49b-4a72-8222-201f08a05a8a";

export async function fetchNotifications() {
  const data = await getNotifications(DEMO_ENTREPRISE_ID);
  return data;
}

export async function toggleRead(id: string) {
  const result = await markNotificationRead(id);
  revalidatePath("/dashboard/notifications");
  return result;
}

export async function clearAll() {
  const result = await markAllNotificationsRead(DEMO_ENTREPRISE_ID);
  revalidatePath("/dashboard/notifications");
  return result;
}
 
export async function getUnreadCount() {
  return await getUnreadNotificationsCount(DEMO_ENTREPRISE_ID);
}
