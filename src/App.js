// App.js
import React, { useEffect, useState } from 'react'
import './App.css'
import supabase from './supabaseClient'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function App() {
  const [posts, setPosts] = useState([])
  const [excluir, setExcluir] = useState('')
  const [editar, setEditar] = useState('')
  const [description, setDescription] = useState('')
  const [modal, setModal] = useState([])
  const [newDescription, setNewDescription] = useState('')
  async function loading() {
    const { data, error } = await supabase.from('post').select('*')
    setPosts(data)
  }

  useEffect(() => {
    loading()
  }, [])

  async function del(e) {
    try {
      const { error } = await supabase.from('post').delete().eq('idPost', e)

      loading()
    } catch (error) {
      console.log('error')
    }
  }
  async function postar() {
    try {
      const { data, error } = await supabase
        .from('post')
        .insert([{ idUser: 1, description: description }])
        .select()
      console.log(error)
      loading()
    } catch (error) {}
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  let subtitle
  const [modalIsOpen, setIsOpen] = useState(false)

  async function opeModal(e) {
    setIsOpen(true)
    setEditar(e)
  }
  useEffect(() => {
    const filterPost = posts.filter(item => item.idPost === editar)
    setModal(filterPost)
  }, [editar, posts])

  function closeModal() {
    setIsOpen(false)
  }
  async function atualziar() {
    try {
      const { data, error } = await supabase
        .from('post')
        .update({ description: newDescription })
        .eq('idPost', editar)
      loading()
      closeModal()
    } catch (error) {}
  }
  return (
    <div className="App">
      <h1>Postagens</h1>
      <div className="area-post">
        <textarea
          onChange={e => setDescription(e.target.value)}
          className="postagem"
        />
        <button onClick={postar} className="postar">
          Postar
        </button>
      </div>

      <div className="post-list">
        {posts.map(post => (
          <div key={post.idPost} className="post-card">
            <h2>{post.description}</h2>
            <p>{post.content}</p>
            <span className="author">Author: {post.idUser}</span>
            <div>
              <button className="editar" onClick={e => opeModal(post.idPost)}>
                {' '}
                Editar
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLavel="Ex"
              >
                <div>
                  <div></div>
                  <div>
                    {modal ? (
                      <div>
                        {modal.map(item => (
                          <div key={item.idPost}>
                            <div>{item.idPost}</div>
                            <div>{item.description}</div>
                            <br />
                            <input
                              onChange={e => setNewDescription(e.target.value)}
                            />
                            <button onClick={atualziar}>Atualziar</button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>Oi</div>
                    )}
                  </div>
                </div>
              </Modal>
            </div>
            <button onClick={e => del(post.idPost)} className="excluir">
              {' '}
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
