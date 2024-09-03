// função principal de uplod
const env = {
	URL_AUTOCENTER: 'http://localhost:3001', // api autocenter
	URL_BUCKET: 'url-bucket', // url bucket 
}
async function uploadFile(
) {
	const folder = ''
	const fileInput = document.getElementById('fileInput')

	// validações (pensar nas possibilidades)
 if (!fileInput.files || fileInput.files.length === 0) {
  alert('Nenhum arquivo selecionado');
  return;
 }

 const file = fileInput.files[0];


	// cabeçalho da primemira requisão (req comum para api)
	const headerAutocenter ={
  method: 'POST',
  body: JSON.stringify({
   filename: `${file.name}`,
   folder: folder || undefined,
  }),
  headers: {
   'Content-Type': 'application/json',
  },
 }
	
 // Solicitar a URL assinada do backend para a proxima requisão
 const response = await fetch(`${env.URL_AUTOCENTER}/image`, headerAutocenter);

 if (!response.ok) {
  console.error('Falha ao obter URL assinada:', response.statusText);
  return;
 }

 const data = await response.json();

	// URL pré assinada com duração de 5 minutos
 const presignedUrl = data.url;


	// header para a requisição put direto para o bucket
	const headerBucket = {
  method: 'PUT',
  body: file,
		// esse trecho garante a publicidade da imagem então é obrigatório
		headers: {
			'Content-Type': file.type,
			'Cache-Control': 'public,max-age=31536000,immutable',
			'x-amz-acl': 'public-read',
		},
 }

 // Fazer o upload da imagem, metodo PUT ()
 const uploadResponse = await fetch(presignedUrl, headerBucket);

 if (uploadResponse.ok) {
		const urlBucket = folder ? `${env.URL_BUCKET}/${folder}/${file.name}` : `${env.URL_BUCKET}/${file.name}`
		document.querySelector('img').src = urlBucket
  console.log('Upload bem-sucedido!');
 } else {
  console.error('Falha no upload:', uploadResponse.statusText);
 }
}

document.getElementById('upload').addEventListener('click', uploadFile);
