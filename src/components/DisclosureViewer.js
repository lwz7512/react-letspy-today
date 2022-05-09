import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'


const DisclosureViewer = ({ content, mode, onAnchorClick }) => {


  useEffect(() => {
    if(!content) return
    if(mode === 'code') return

    const linkClickHandler = (event) => {
      event.preventDefault()

      const href = event.target.getAttribute('href')
      const lineNumber = +href.substr(href.indexOf('=')+1)
      onAnchorClick(lineNumber)
    }

    const selector = '.game-doc-code > h4 > a'
    const headerH4Nodes = document.querySelectorAll(selector)
    const headerH4Elements = [...headerH4Nodes]
    headerH4Elements.forEach(header => {
      header.addEventListener('click', linkClickHandler)
    })

    const imageSelector = '.game-doc-code img'
    const imageNodes = document.querySelectorAll(imageSelector)
    const imageElements = [...imageNodes]
    const toggleImageDisplay = event => {
      const hiddenImage = document.querySelector('.game-doc-code img.hidden')
      hiddenImage.classList.remove('hidden') // first, display hidden image
      event.target.classList.add('hidden') // then, hide me!
    }
    imageElements.forEach(image => {
      const altProp = image.getAttribute('alt')
      if (altProp.indexOf('toggle') === -1) return
      // add show/hide toggle
      image.addEventListener('click', toggleImageDisplay)
      image.classList.add('reactive')
      // hide the raw image
      if (altProp.indexOf('hide') > -1) {
        image.classList.add('hidden')
      }
    })

    return () => {
      imageElements.forEach(image => {
        image.removeEventListener('click', toggleImageDisplay)
      })
      headerH4Elements.forEach(header => {
        header.removeEventListener('click', linkClickHandler)
      })
    }

  }, [content, mode, onAnchorClick])

  return (
    <ReactMarkdown>
      {content || ''}
    </ReactMarkdown>
  )
}

export default DisclosureViewer