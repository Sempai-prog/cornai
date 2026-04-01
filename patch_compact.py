import re

with open('src/components/search/search-shell-compact.tsx', 'r') as f:
    content = f.read()

# Add framer-motion import and ChevronLeft icon if not present
if 'import { motion, AnimatePresence }' not in content:
    content = content.replace('import { motion, AnimatePresence } from "framer-motion"', 'import { motion, AnimatePresence } from "framer-motion"')

if 'ChevronLeft' not in content:
    content = content.replace('PanelLeftOpen, Menu,', 'PanelLeftOpen, Menu, ChevronLeft,')

# Add the absolute button right after the Desktop Sidebar definition
sidebar_pattern = r'''(<motion\.div \n            layout\n            animate=\{\{ width: isSidebarOpen \? 208 : 64 \}\}\n            transition=\{\{ duration: 0\.4, ease: \[0\.22, 1, 0\.36, 1\] \}\} \n            className="hidden h-full shrink-0 border-r border-border bg-card md:flex md:flex-col overflow-hidden relative"\n        >\n          <SearchSidebar \n             isCollapsed=\{\!isSidebarOpen\} \n             filters=\{filters\}\n             onFilterChange=\{handleFilterChange\}\n          />\n        </motion\.div>)'''

new_sidebar_with_button = '''<motion.div
            layout
            animate={{ width: isSidebarOpen ? 208 : 64 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden h-full shrink-0 border-r border-border bg-card md:flex md:flex-col overflow-visible relative z-20"
        >
          <SearchSidebar
             isCollapsed={!isSidebarOpen}
             filters={filters}
             onFilterChange={handleFilterChange}
          />

          {/* Bouton de rétractation (Z-Index Absolu) */}
          <motion.button
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
             whileTap={{ scale: 0.95 }}
             className={cn(
               "absolute -right-3 top-1/2 -translate-y-1/2 z-[100] flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/80 shadow-xl backdrop-blur-sm transition-colors duration-500 ease-in-out group",
             )}
          >
             <ChevronLeft className={cn("h-3 w-3 text-slate-500 transition-all duration-500 ease-in-out group-hover:text-white", !isSidebarOpen && "rotate-180")} />
          </motion.button>
        </motion.div>'''

content = content.replace('''<motion.div
            layout
            animate={{ width: isSidebarOpen ? 208 : 64 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden h-full shrink-0 border-r border-border bg-card md:flex md:flex-col overflow-hidden"
        >
          <SearchSidebar
             isCollapsed={!isSidebarOpen}
             filters={filters}
             onFilterChange={handleFilterChange}
          />
        </motion.div>''', new_sidebar_with_button)

with open('src/components/search/search-shell-compact.tsx', 'w') as f:
    f.write(content)
