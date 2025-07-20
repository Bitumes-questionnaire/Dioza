async function loadMedia() {
  try {
    const response = await fetch('media.json');
    if (!response.ok) throw new Error('Fichier introuvable');
    const media = await response.json();

    const seen = new Set();
    const gallery = document.getElementById('gallery');

    for (let item of media) {
      if (seen.has(item.file)) continue;
      seen.add(item.file);

      const div = document.createElement('div');
      div.className = 'gallery-item';

      if (item.type === 'image') {
        const img = document.createElement('img');
        img.src = item.file;
        img.alt = 'Souvenir';
        img.onclick = () => showLightbox(img.cloneNode());
        div.appendChild(img);
      } else if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.file;
        video.controls = true;

        // Vérifie la durée maximale (60 secondes)
        video.addEventListener('loadedmetadata', () => {
          if (video.duration <= 60) {
            video.onclick = () => showLightbox(video.cloneNode(true));
            div.appendChild(video);
          }
        });
      }

      gallery.appendChild(div);
    }

  } catch (e) {
    console.error(e);
    document.getElementById('error').style.display = 'block';
  }
}

function showLightbox(element) {
  const box = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');
  content.innerHTML = '';
  content.appendChild(element);
  box.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('media');
  const file = input.files[0];
  const formData = new FormData();
  formData.append('media', file);

  const res = await fetch('upload.php', {
    method: 'POST',
    body: formData
  });

  if (res.ok) {
    alert('Fichier uploadé avec succès !');
    location.reload();
  } else {
    alert("Échec de l'envoi du fichier.");
  }
});

loadMedia();
