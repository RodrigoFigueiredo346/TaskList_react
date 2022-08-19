import './style.css'
import Notes from './components/notes/index.js'
import React, { useState, useEffect } from 'react'
import api from './services/api.js'
import RadioButtons from './components/RadioButton'


function App() {

  
  const [selectedValue, setSelectedValue] = useState('a')
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [allNotes, setAllNotes] = useState([])

    const handleChange = (e) => {
      setSelectedValue(e.target.value);
    };


  useEffect(()=>{    
    getAllNotes()
  },[])

  async function getAllNotes(){
    const response = await api.get('/',)
    setAllNotes(response.data)
  }

  async function handleDelete (id) {
    const deletedNote = await api.delete(`/annotations/${id}`)
    if (deletedNote) {           
      setAllNotes( allNotes.filter(x => x._id !== id ))
    }
  }

  async function handlesubmit(e){
    e.preventDefault()

     const response = await api.post('/annotations', {
      title,
      notes,
      priority: false
    })
    setTitle("")
    setNotes("")
    if (selectedValue==="a") {
      let btn = 'aa'
      console.log(btn)
      setAllNotes([...allNotes, response.data])
    } else if (selectedValue==="b"){
      handleShowPrio(selectedValue)     
    } else if (selectedValue==="c"){
      handleShowPrio(selectedValue)     
    }
  }

  async function handlePriority(id){  
    const note = await api.post(`/priorities/${id}`)  
    if (note && selectedValue !=='a'){      
      handleShowPrio(selectedValue)
    } else {
      handleShowPrio(selectedValue)
    }
    
  } 

  async function handleShowPrio(value){
    if (value==='a'){
      getAllNotes()
    } 
    else if (value==='b'){
      const params = {priority: true}
      const noteTrue = await api.get('/priorities', {params})  
      setAllNotes(noteTrue.data)
    } 
    else if (value==='c') {
      const params = {priority: false}
      const noteFalse = await api.get('/priorities', {params})
      setAllNotes(noteFalse.data)
    }
 }

  useEffect(()=>{
    function enableSubmitBut() {
      let btn = document.getElementById('btn_submit')
      btn.style.background = "#80adff"
      if (title && notes) {
        btn.style.background = "#0a61ff"
      }
    }
    enableSubmitBut()
  }, [title, notes])

  return (
    <div id="app">
      <aside>
        <strong>CADERNO DE NOTAS</strong>        
          <form onSubmit={handlesubmit}>
            <div className="input-block">
              <label htmlFor="title">Título da anotação</label>
              <input
                required
                maxLength="30"
                value={title}
                onChange={e=>setTitle(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="nota">Anotação</label>
              <textarea id="text_area"
                required
                value={notes}
                onChange={e=>setNotes(e.target.value)}
              />
            </div>
            <button id="btn_submit" type="submit">Salvar</button>
          </form>
          <RadioButtons
            handleShowPrio={handleShowPrio}
            selectedValue={selectedValue}
            handleChange={handleChange}
            
            
          />      
      </aside>
      <main>
        <ul>
            {allNotes.map(data=>(
              <Notes 
                key={data._id}
                data={data}
                handleDelete={handleDelete}
                handlePriority={handlePriority}
              />
            )

          )}          
          
        </ul>
      </main>
    </div>
  );
}

export default App;
