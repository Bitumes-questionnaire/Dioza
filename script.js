async function loadMedia() {
  const response = await fetch('media.json');
  const data = await response.json();
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item';

    const dlBtn = document.createElement('a');
    dlBtn.href = item.file;
    dlBtn.className = 'download-btn';
    dlBtn.innerText = '⤓';
    dlBtn.download = "";

    if (item.type === 'image') {
      const img = document.createElement('img');
      img.src = item.file;
      img.onclick = () => showLightbox('image', item.file);
      div.appendChild(img);
    } else if (item.type === 'video') {
      const video = document.createElement('video');
      video.src = item.file;
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.onclick = () => showLightbox('video', item.file);
      div.appendChild(video);
    }

    div.appendChild(dlBtn);
    gallery.appendChild(div);
  });
}

function showLightbox(type, file) {
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');
  content.innerHTML = '';

  if (type === 'image') {
    const img = document.createElement('img');
    img.src = file;
    content.appendChild(img);
  } else if (type === 'video') {
    const video = document.createElement('video');
    video.src = file;
    video.controls = true;
    video.autoplay = true;
    content.appendChild(video);
  }

  lb.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.getElementById('lightbox-content').innerHTML = '';
}

document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  const res = await fetch('upload.php', {
    method: 'POST',
    body: formData
  });

  const result = await res.json();
  if (result.success) {
    await loadMedia();
    this.reset();
  } else {
    alert('Erreur : ' + result.message);
  }
});

loadMedia();

