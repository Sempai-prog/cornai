"use client"

import * as React from "react"
import { Check, X, Pencil, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { updateEntrepriseField } from "@/app/actions/entreprise"

interface EditableFieldProps {
  label: string
  fieldName: string
  initialValue: string | number
  type?: "text" | "number"
  className?: string
  onUpdate?: (newValue: string | number) => void
}

export function EditableField({ 
  label, 
  fieldName, 
  initialValue, 
  type = "text",
  className,
  onUpdate
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [value, setValue] = React.useState(initialValue)
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSave = async () => {
    if (value === initialValue) {
      setIsEditing(false)
      return
    }

    setIsSaving(true)
    try {
      const res = await updateEntrepriseField(fieldName, type === "number" ? Number(value) : value)
      if (res.success) {
        setIsEditing(false)
        onUpdate?.(value)
      } else {
        // Simple error handling for demo
        alert(res.error)
        setValue(initialValue)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setValue(initialValue)
    setIsEditing(false)
  }

  return (
    <div className={cn("flex flex-col space-y-1 group/row transition-all", className)}>
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-[0.2em]">{label}</span>
        {!isEditing && !isSaving && (
          <button 
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover/row:opacity-100 p-1 text-primary/40 hover:text-primary transition-all"
          >
            <Pencil size={10} />
          </button>
        )}
      </div>
      
      {isEditing ? (
        <div className="flex items-center gap-2 mt-0.5">
          <input 
            autoFocus
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isSaving}
            className="flex-1 bg-muted/20 border border-primary/20 rounded-[4px] px-2 py-1 text-[13px] font-medium text-foreground outline-none focus:border-primary/50 transition-colors"
          />
          <div className="flex items-center gap-1">
            <button 
              disabled={isSaving}
              onClick={handleSave}
              className="p-1 text-emerald-500 hover:bg-emerald-500/10 rounded-[4px] transition-colors"
            >
              {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
            </button>
            <button 
              disabled={isSaving}
              onClick={handleCancel}
              className="p-1 text-red-500 hover:bg-red-500/10 rounded-[4px] transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      ) : (
        <span className="text-[13px] font-medium text-foreground/70 group-hover/row:text-foreground">
          {value || "Non renseigné"}
        </span>
      )}
    </div>
  )
}
