import re

with open('src/components/search/search-toolbar.tsx', 'r') as f:
    content = f.read()

# remove imports
content = content.replace(',\n  PanelLeftClose,\n  PanelLeftOpen\n} from "lucide-react"', '\n} from "lucide-react"')

with open('src/components/search/search-toolbar.tsx', 'w') as f:
    f.write(content)
