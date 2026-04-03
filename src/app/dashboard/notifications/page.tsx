import { StandardPageHeader } from "@/components/layout/standard-page-header";
import { fetchNotifications } from "@/app/actions/notifications";
import { NotificationList } from "@/components/dashboard/notification-list";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const notifications = await fetchNotifications();
  const unreadCount = notifications.filter(n => !n.lu).length;

  return (
    <div className="flex flex-col h-full bg-background animate-in fade-in duration-500">
      <div className="p-4 lg:p-10 max-w-7xl mx-auto w-full">
        <StandardPageHeader
          metadata="CENTRE D'ALERTES"
          title="Notifications"
          description={
            <>
              Suivez en temps réel les <span className="text-primary font-bold italic tracking-tight underline underline-offset-4 decoration-primary/30 decoration-2">nouveaux appels d'offres</span> et l'avancement de vos dossiers administratifs.
            </>
          }
          cardA={{
            label: "NON LUES",
            value: unreadCount.toString(),
            subtext: unreadCount > 0 ? "Actions requises" : "Tout est à jour",
            color: unreadCount > 0 ? "red" : "emerald",
            progress: unreadCount > 0 ? 35 : 100
          }}
          cardB={{
            label: "FRÉQUENCE",
            value: "2h",
            subtext: "Mise à jour temps réel",
            color: "blue"
          }}
        />

        <div className="mt-8 rounded-[4px] border border-border/10 bg-card/10 overflow-hidden shadow-none">
          <NotificationList initialNotifications={notifications} />
        </div>
      </div>
    </div>
  );
}
