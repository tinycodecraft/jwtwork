import React from 'react'
import { VerseDataForm } from './VerseDataForm'

export const MantineVerse = () => {
  return (
    <div className='section quill-wrapper'>
      <div className='container'>
        <h3 className='title is-3'>Mantaine Verse Data Demo</h3>
        <div className='box container-box'>
          <VerseDataForm />
        </div>
      </div>
    </div>
  )
}

export default MantineVerse