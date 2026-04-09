'use client'

import { useQueryState, parseAsInteger, parseAsString } from 'nuqs'
import { useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function useSearchAppelsOffres() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({ shallow: false }))
  const [recherche, setRecherche] = useQueryState('q', parseAsString.withDefault('').withOptions({ shallow: false }))
  const [secteur, setSecteur] = useQueryState('secteur', parseAsString.withDefault('').withOptions({ shallow: false }))
  const [region, setRegion] = useQueryState('region', parseAsString.withDefault('').withOptions({ shallow: false }))
  const [type, setType] = useQueryState('type', parseAsString.withDefault('').withOptions({ shallow: false }))
  
  // Debounce de 300ms pour éviter les appels DB à chaque frappe
  const handleRecherche = useDebouncedCallback(
    useCallback((valeur: string) => {
      setRecherche(valeur)
      setPage(1) // Reset à la page 1 à chaque nouvelle recherche
    }, [setRecherche, setPage]),
    300
  )
  
  return { page, setPage, recherche, handleRecherche, secteur, setSecteur, region, setRegion, type, setType }
}
