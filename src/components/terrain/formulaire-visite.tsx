// ══════════════════════════════════════════
// SABI — Formulaire Visite de Site (Sprint E.2)
// ══════════════════════════════════════════

'use client'

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { MapPin, Save, Map as MapIcon } from "lucide-react"

import { upsertVisiteTerrain } from "@/app/actions/terrain"

const visiteSchema = z.object({
  dateVisite: z.string(),
  heureVisite: z.string(),
  maitreOuvrageRelais: z.string().min(2, "Nom du relais requis"),
  observations: z.string().min(10, "Observations trop courtes"),
  lieu: z.string().optional(),
})

interface FormulaireVisiteProps {
  soumissionId: string
  visiteExistante: any
}

export function FormulaireVisite({ soumissionId, visiteExistante }: FormulaireVisiteProps) {
  const [loading, setLoading] = React.useState(false)

  const form = useForm<z.infer<typeof visiteSchema>>({
    resolver: zodResolver(visiteSchema),
    defaultValues: {
      dateVisite: visiteExistante?.dateVisite ? new Date(visiteExistante.dateVisite).toISOString().split('T')[0] : "",
      heureVisite: visiteExistante?.heureVisite || "",
      maitreOuvrageRelais: visiteExistante?.maitreOuvrageRelais || "",
      observations: visiteExistante?.observations || "",
      lieu: visiteExistante?.visiteLieu || "",
    },
  })

  async function onSubmit(values: z.infer<typeof visiteSchema>) {
    setLoading(true)
    const res = await upsertVisiteTerrain(soumissionId, values)
    setLoading(false)

    if (res.success) {
      toast.success("Rapport de visite enregistré avec succès")
    } else {
      toast.error(res.error || "Une erreur est survenue")
    }
  }

  return (
    <div className="bg-card border border-border/10 rounded-[4px] p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="dateVisite"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Date de Visite</FormLabel>
                  <FormControl>
                    <Input type="date" className="rounded-[4px] border-border/10 bg-muted/5 font-semibold uppercase tracking-tight text-xs" {...field} />
                  </FormControl>
                  <FormMessage className="text-[9px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="heureVisite"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Heure de Visite</FormLabel>
                  <FormControl>
                    <Input type="time" className="rounded-[4px] border-border/10 bg-muted/5 font-semibold uppercase tracking-tight text-xs" {...field} />
                  </FormControl>
                  <FormMessage className="text-[9px]" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="maitreOuvrageRelais"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Contact Relais (Maitre d'Ouvrage)</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du délégué ou représentant présent" className="rounded-[4px] border-border/10 font-semibold text-xs" {...field} />
                </FormControl>
                <FormDescription className="text-[9px] uppercase tracking-tighter">Personne ayant signé le certificat sur place</FormDescription>
                <FormMessage className="text-[9px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="observations"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Observations & Notes de Terrain</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Décrivez l'état du site, l'accessibilité, les contraintes..." 
                    className="min-h-[120px] rounded-[4px] border-border/10 font-semibold text-xs"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[9px]" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between pt-4 border-t border-border/5">
            <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" className="rounded-[4px] text-[10px] font-semibold uppercase tracking-widest gap-2 bg-muted/10 border-border/10">
                    <MapIcon className="w-3.5 h-3.5" />
                    Capturer GPS
                </Button>
            </div>
            <Button type="submit" size="sm" disabled={loading} className="rounded-[4px] text-[10px] font-semibold uppercase tracking-widest gap-2 px-6">
                {loading ? <span className="animate-spin">⌛</span> : <Save className="w-3.5 h-3.5" />}
                {loading ? "Enregistrement..." : "Enregistrer le Rapport"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
