import React from 'react'
import { VerseDataForm } from './VerseDataForm'
import { VerseDataContextProvider } from 'src/context/VerseDataContext'

export const MantineVerse = () => {
  return (
    <div className='section quill-wrapper'>
      <div className='container'>
        <h3 className='title is-3'>Mantaine Verse Data Demo</h3>
        <div className='box container-box'>
          <VerseDataContextProvider fetchSize={20}>
            <VerseDataForm />
          </VerseDataContextProvider>
        </div>
      </div>
    </div>
  )
}

export default MantineVerse
