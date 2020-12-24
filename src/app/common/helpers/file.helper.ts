export function imgShow(img: any) {
  const image = new Image();
  const reader = new FileReader();
  const link = document.createElement('a');
  if (img.file) {
    if (img.file.type.split('/')[0] === 'image') {
      reader.addEventListener('load', function () {
        image.src = reader.result as string;
        const w = window.open('');
        w.document.write(image.outerHTML);
      }, false);
      reader.readAsDataURL(img.file);
    } else {
      const blob = new Blob([img.file]);
      const url  = URL.createObjectURL(blob);
      link.download = img.name;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  } else {
    const extension = ['jpg', 'jpeg', 'png', 'gif', 'tif'];
    if (extension.includes(img.name.split('.').pop().toLowerCase()) ) {
      image.src = img.url;
      const w = window.open('');
      w.document.write(image.outerHTML);
    } else {
      link.download = img.name;
      link.href = img.url;
      document.body.appendChild(link);
      if (img.name.split('.').pop().toLowerCase() === 'pdf') {
        window.open(link.href, '_blank');
        link.remove();
        return;
      }
      link.click();
      link.remove();
    }
  }
}
