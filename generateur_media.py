import os
import json

# 🔧 Spécifie ici le chemin de ton dossier d’images
DOSSIER_IMAGES = "images"

# Types de fichiers à inclure
EXTENSIONS_IMAGES = {"jpg", "jpeg", "png", "gif"}
EXTENSIONS_VIDEOS = {"mp4", "webm"}

# Liste finale des médias
media = []

# 🔁 Parcourir récursivement tous les fichiers
for root, _, files in os.walk(DOSSIER_IMAGES):
    for file in files:
        ext = file.split('.')[-1].lower()
        chemin_relatif = os.path.join(root, file).replace("\\", "/")
        if ext in EXTENSIONS_IMAGES:
            media.append({"file": chemin_relatif, "type": "image"})
        elif ext in EXTENSIONS_VIDEOS:
            media.append({"file": chemin_relatif, "type": "video"})

# 💾 Sauvegarde du fichier JSON
with open("media.json", "w", encoding="utf-8") as f:
    json.dump(media, f, indent=2, ensure_ascii=False)

print(f"{len(media)} fichiers trouvés et enregistrés dans media.json.")
