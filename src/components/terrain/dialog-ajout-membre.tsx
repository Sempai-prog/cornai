'use client'

import { useState, useTransition } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ajouterMembreEquipe } from '@/app/actions/equipe'
import { SchemaAjoutMembre, InputAjoutMembre } from '@/lib/validations/equipe'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { UserPlus, Briefcase, GraduationCap, Link2 } from 'lucide-react'

export function DialogAjoutMembre() {
  const [ouvert, setOuvert] = useState(false)
  const [isPending, startTransition] = useTransition()
  
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<InputAjoutMembre>({
    resolver: zodResolver(SchemaAjoutMembre),
    defaultValues: {
      nom: '',
      prenom: '',
      poste: '',
      diplome: '',
      anneeExperience: 0,
      disponible: true,
      cvUrl: ''
    }
  })
  
  const onSubmit = (data: InputAjoutMembre) => {
    startTransition(async () => {
      const resultat = await ajouterMembreEquipe(data)
      
      if (resultat.succes) {
        toast.success("Expert ajouté à l'équipe", {
          description: `${data.prenom} ${data.nom.toUpperCase()} a été enregistré avec succès.`
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
          <UserPlus className="w-3.5 h-3.5" />
          Ajouter Expert
        </Button>
      </DialogTrigger>
      
      <DialogContent className="rounded-[4px] max-w-md bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-sm font-black uppercase tracking-widest text-foreground/80 flex items-center gap-2">
            <div className="w-6 h-6 rounded-[4px] bg-primary/10 flex items-center justify-center">
               <UserPlus className="w-3.5 h-3.5 text-primary" />
            </div>
            Intégrer à l'Équipe
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          {/* Prénom + Nom */}
          <div className="grid grid-cols-2 gap-3">
             <div>
               <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Prénom <span className="text-primary">*</span></label>
               <Input 
                 {...register('prenom')}
                 placeholder="Ex: Jean"
                 className="rounded-[4px] h-9 text-xs font-medium"
               />
                {errors.prenom && (
                 <p className="text-[10px] text-red-500 font-medium mt-1">
                   {errors.prenom.message}
                 </p>
               )}
             </div>
             <div>
               <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Nom <span className="text-primary">*</span></label>
               <Input 
                 {...register('nom')}
                 placeholder="Dupont"
                 className="rounded-[4px] h-9 text-xs font-medium uppercase"
               />
               {errors.nom && (
                 <p className="text-[10px] text-red-500 font-medium mt-1">
                   {errors.nom.message}
                 </p>
               )}
             </div>
          </div>
          
          <div className="h-px bg-border/40 w-full my-4" />
          
          {/* Rôle Projet + Expérience */}
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-3">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 flex items-center gap-1.5 ">
                <Briefcase className="w-3 h-3" /> Rôle sur le Projet <span className="text-primary">*</span>
              </label>
              <Input 
                {...register('poste')}
                placeholder="Ingénieur VRD / Topographe..."
                className="rounded-[4px] h-9 text-xs font-medium"
              />
              {errors.poste && (
                 <p className="text-[10px] text-red-500 font-medium mt-1">
                   {errors.poste.message}
                 </p>
               )}
            </div>
             <div className="col-span-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Années Exp.</label>
              <Input 
                type="number"
                {...register('anneeExperience', { valueAsNumber: true })}
                className="rounded-[4px] h-9 text-[11px] font-medium px-2 text-center"
              />
            </div>
          </div>
          
          {/* Diplôme Principal */}
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3 h-3" /> Diplôme Principal
            </label>
            <Input 
              {...register('diplome')}
              placeholder="Ex: Master II - École Polytechnique..."
              className="rounded-[4px] h-9 text-xs font-medium"
            />
          </div>

          <div className="h-px bg-border/40 w-full my-4" />

          {/* CV URL & Dispo */}
          <div className="grid grid-cols-5 gap-3 items-end">
            <div className="col-span-4">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Link2 className="w-3 h-3" /> Lien du CV (PDF)
              </label>
              <Input 
                {...register('cvUrl')}
                placeholder="https://drive.google.com/..."
                className="rounded-[4px] h-9 text-xs font-medium"
              />
               {errors.cvUrl && (
                 <p className="text-[10px] text-red-500 font-medium mt-1">
                   {errors.cvUrl.message}
                 </p>
               )}
            </div>
            
            <div className="col-span-1 flex flex-col items-start justify-end h-9">
              <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block whitespace-nowrap">Dispo.</label>
              <Controller
                control={control}
                name="disponible"
                render={({ field }) => (
                  <Select 
                    onValueChange={(val) => field.onChange(val === 'true')}
                    value={field.value ? 'true' : 'false'}
                  >
                     <SelectTrigger className="rounded-[4px] h-9 text-xs font-bold uppercase tracking-tight w-full px-2">
                       <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="true">OUI</SelectItem>
                       <SelectItem value="false">NON</SelectItem>
                     </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          
          {/* Actions */}
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
              {isPending ? 'CRÉATION...' : 'VALIDER & AJOUTER'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
