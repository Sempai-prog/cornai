'use client'

import { useState, useTransition } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ajouterEnginGarage } from '@/app/actions/garage'
import { SchemaAjoutEngin, type InputAjoutEngin } from '@/lib/validations/garage'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { Plus } from 'lucide-react'

export function DialogAjoutEngin() {
  const [ouvert, setOuvert] = useState(false)
  const [isPending, startTransition] = useTransition()
  
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<InputAjoutEngin>({
    resolver: zodResolver(SchemaAjoutEngin),
    defaultValues: {
      designation: '',
      marque: '',
      modele: '',
      annee: new Date().getFullYear(),
      numeroCarteGrise: '',
      etat: 'bon',
      proprietaire: 'propre'
    }
  })
  
  const onSubmit = (data: InputAjoutEngin) => {
    startTransition(async () => {
      const resultat = await ajouterEnginGarage(data)
      
      if (resultat.succes) {
        toast.success('Engin ajouté au Garage', {
          description: `${data.designation} a été enregistré avec succès.`
        })
        reset()
        setOuvert(false)
      } else {
        toast.error('Erreur d\'enregistrement', {
          description: resultat.erreur
        })
      }
    })
  }
  
  return (
    <Dialog open={ouvert} onOpenChange={setOuvert}>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          className="rounded-[4px] h-9 px-4 text-xs gap-1.5 font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          Ajouter Matériel
        </Button>
      </DialogTrigger>
      
      <DialogContent className="rounded-[4px] max-w-md bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-foreground/80 flex items-center gap-2">
            <div className="w-6 h-6 rounded-[4px] bg-primary/10 flex items-center justify-center">
               <Plus className="w-3.5 h-3.5 text-primary" />
            </div>
            Ajouter un Engin
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-3">
             <div>
               <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">
                 Désignation métier <span className="text-primary">*</span>
               </label>
               <Input 
                 {...register('designation')}
                 placeholder="Ex: Camion-Benne 10T"
                 className="rounded-[4px] h-9 text-xs font-medium placeholder:uppercase"
               />
               {errors.designation && (
                 <p className="text-[10px] text-red-500 font-medium mt-1">
                   {errors.designation.message}
                 </p>
               )}
             </div>
             <div>
               <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">N° Carte Grise <span className="text-primary">*</span></label>
               <Input 
                 {...register('numeroCarteGrise')}
                 placeholder="AB-123-CD"
                 className="rounded-[4px] h-9 text-xs font-medium uppercase"
               />
                {errors.numeroCarteGrise && (
                 <p className="text-[10px] text-red-500 font-medium mt-1">
                   {errors.numeroCarteGrise.message}
                 </p>
               )}
             </div>
          </div>
          
          <div className="h-px bg-border/40 w-full my-4" />
          
          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-3">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Marque <span className="text-primary">*</span></label>
              <Input 
                {...register('marque')}
                placeholder="Caterpillar"
                className="rounded-[4px] h-9 text-xs font-medium"
              />
              {errors.marque && (
                 <p className="text-[10px] text-red-500 font-medium mt-1">
                   {errors.marque.message}
                 </p>
               )}
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Modèle</label>
              <Input 
                {...register('modele')}
                placeholder="320D"
                className="rounded-[4px] h-9 text-xs font-medium"
              />
            </div>
             <div className="col-span-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Année</label>
              <Input 
                type="number"
                {...register('annee', { valueAsNumber: true })}
                className="rounded-[4px] h-9 text-[11px] font-medium px-2 text-center"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">État / VGP <span className="text-primary">*</span></label>
              <Controller
                 control={control}
                 name="etat"
                 render={({ field }) => (
                     <Select onValueChange={field.onChange} value={field.value}>
                       <SelectTrigger className="rounded-[4px] h-9 text-xs font-bold uppercase tracking-tight">
                         <SelectValue placeholder="Sélectionner" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="excellent"><span className="text-emerald-500">A</span> - EXCELLENT</SelectItem>
                         <SelectItem value="bon"><span className="text-emerald-500/50">B</span> - BON</SelectItem>
                         <SelectItem value="moyen"><span className="text-amber-500">C</span> - MOYEN</SelectItem>
                         <SelectItem value="a_reviser"><span className="text-red-500">D</span> - À RÉVISER</SelectItem>
                       </SelectContent>
                     </Select>
                 )}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Propriété <span className="text-primary">*</span></label>
              <Controller
                 control={control}
                 name="proprietaire"
                 render={({ field }) => (
                     <Select onValueChange={field.onChange} value={field.value}>
                       <SelectTrigger className="rounded-[4px] h-9 text-xs font-bold uppercase tracking-tight">
                         <SelectValue placeholder="Sélectionner" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="propre">PROPRIÉTÉ</SelectItem>
                         <SelectItem value="loue">LOCATION</SelectItem>
                         <SelectItem value="credit_bail">LEASING</SelectItem>
                       </SelectContent>
                     </Select>
                 )}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-[4px] h-9 text-xs font-bold uppercase tracking-widest px-6"
              onClick={() => setOuvert(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              size="sm"
              className="rounded-[4px] h-9 text-xs font-bold uppercase tracking-widest px-6 bg-primary"
              disabled={isPending}
            >
              {isPending ? 'ENREGISTREMENT...' : 'VALIDER & AJOUTER'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
