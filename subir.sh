#!/bin/bash

echo "🚀 Subiendo a GitHub..."

# 1. Init + Rama main (solo si no existe .git)
[ ! -d ".git" ] && git init && git branch -M main

# 2. Remote (solo si no existe origin)
if ! git remote | grep -q "^origin$"; then
    read -p "URL de GitHub: " url
    [ -n "$url" ] && git remote add origin "$url" || { echo "❌ URL inválida"; exit 1; }
fi

# 3. Add y comprobación de cambios
git add .
git diff-index --quiet HEAD -- 2>/dev/null && { echo "✨ Sin cambios pendientes."; exit 0; }

# 4. Commit (con mensaje personalizado o por defecto)
read -p "Mensaje de commit (Enter = por defecto): " msg
git commit -m "${msg:-Actualización automática del proyecto}" || { echo "❌ Error en commit"; exit 1; }

# 5. Push y control de resultado final
git push -u origin main && echo "🎉 ¡Subido con éxito!" || echo "❌ Error en el push. Revisa las credenciales o la conexión."
