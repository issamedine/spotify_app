import Library from '@/components/(body)/library'
import React from 'react'
import styles from './library.module.scss'

function LibraryPage() {
  return (
    <div className={styles.container_library}>
      <Library />
    </div>
  )
}

export default LibraryPage
