import re

with open('src/components/search/search-toolbar.tsx', 'r') as f:
    content = f.read()

# Remove the PanelLeftOpen / PanelLeftClose button from toolbar since we moved it to the absolute button
# Replace the block:
block_to_replace = '''<Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 hover:bg-secondary rounded-[4px] -ml-1 text-primary"
              onClick={onToggleSidebar}
           >
              {isSidebarOpen ? <PanelLeftClose className="h-3 w-3" /> : <PanelLeftOpen className="h-3 w-3" />}
           </Button>
           <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-border" />'''

if block_to_replace in content:
    content = content.replace(block_to_replace, '')

with open('src/components/search/search-toolbar.tsx', 'w') as f:
    f.write(content)
