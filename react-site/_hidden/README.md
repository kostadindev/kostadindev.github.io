Components hidden from the site (user request, Nov 2026). They live outside
src/ so they are not type-checked or bundled. They still use MUI, which the site
no longer depends on: port them to shadcn/ui (see src/components) before moving
them back into src/components and re-enabling them in src/App.tsx.
LazyOnVisible.txt is the lazy-mount wrapper App.tsx used for the Globe.
