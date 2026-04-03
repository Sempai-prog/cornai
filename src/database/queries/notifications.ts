import { db } from "../client";
import { notifications, appelsOffres } from "../schema";
import { eq, and, desc } from "drizzle-orm";

/**
 * Récupère les notifications d'une entreprise
 */
export async function getNotifications(entrepriseId: string, limit = 50) {
  try {
    return await db.query.notifications.findMany({
      where: eq(notifications.entrepriseId, entrepriseId),
      orderBy: [desc(notifications.createdAt)],
      limit: limit,
      with: {
        referenceAo: true
      }
    });
  } catch (error) {
    console.error("Error in getNotifications:", error);
    return [];
  }
}

/**
 * Marque une notification comme lue
 */
export async function markNotificationRead(notificationId: string) {
  try {
    await db.update(notifications)
      .set({ lu: true })
      .where(eq(notifications.id, notificationId));
    return { success: true };
  } catch (error) {
    console.error("Error in markNotificationRead:", error);
    return { success: false };
  }
}

/**
 * Marque toutes les notifications comme lues pour une entreprise
 */
export async function markAllNotificationsRead(entrepriseId: string) {
  try {
    await db.update(notifications)
      .set({ lu: true })
      .where(and(
        eq(notifications.entrepriseId, entrepriseId),
        eq(notifications.lu, false)
      ));
    return { success: true };
  } catch (error) {
    console.error("Error in markAllNotificationsRead:", error);
    return { success: false };
  }
}
 
/**
 * Compte le nombre de notifications non lues
 */
export async function getUnreadNotificationsCount(entrepriseId: string) {
  try {
    const results = await db.query.notifications.findMany({
      where: and(
        eq(notifications.entrepriseId, entrepriseId),
        eq(notifications.lu, false)
      ),
    });
    return results.length;
  } catch (error) {
    console.error("Error in getUnreadNotificationsCount:", error);
    return 0;
  }
}
