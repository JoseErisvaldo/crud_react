import React from 'react'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'
function Img() {
  const [imageUrl, setImageUrl] = useState(null)
  const supabase = createClient(
    'https://ummrcakwdaeufujhnvrv.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtbXJjYWt3ZGFldWZ1amhudnJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg0MzEyMjIsImV4cCI6MjAwNDAwNzIyMn0.XON0aKDBeWpk40kBuzH3Kagqg1FU-hJFQbkMWxhd1xQ'
  )
  const id = 1
  async function uploadImage(file) {
    const folderPath = 'imagensProfile' // Nome da pasta onde deseja armazenar as imagens
    try {
      const { data, error } = await supabase.storage
        .from(folderPath)
        .upload(file.name, file)

      if (error) {
        console.error('Erro ao fazer upload da imagem:', error)
      } else {
        console.log('Upload bem-sucedido:', data)
        const imageUrl = data[0]?.url
        setImageUrl(imageUrl)
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error.message)
    }
  }

  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      uploadImage(file)
    }
  }

  return (
    <div className="Img">
      <input type="file" id="seletor-de-arquivo" onChange={handleFileChange} />
      {imageUrl && <img src={imageUrl} alt="Imagem" />}
      <p>Oii</p>
    </div>
  )
}

export default Img
