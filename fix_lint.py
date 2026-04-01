import re

with open('src/components/search/search-sidebar.tsx', 'r') as f:
    content = f.read()

# Fix 'any' issues in search-sidebar.tsx
content = content.replace('filters: any', 'filters: Record<string, string[]>')
content = content.replace('onFilterChange: (key: string, value: any) => void', 'onFilterChange: (key: string, value: string[]) => void')

# The `icon` parameter in `FilterListItem` was defined as `any`, change to `React.ElementType` or `any` -> we will use `React.ElementType`
content = content.replace('icon?: any', 'icon?: React.ElementType')

# Unused variables
content = content.replace('import { Filter, Search, MapPin,', 'import { MapPin,')
content = content.replace('ChevronDown,\n  Layers,', 'Layers,')
content = content.replace('import { Badge } from "@/components/ui/badge"', '')
content = content.replace('import { motion, AnimatePresence } from "framer-motion"\n', '')

with open('src/components/search/search-sidebar.tsx', 'w') as f:
    f.write(content)
