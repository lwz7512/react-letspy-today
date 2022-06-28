import React, { useLayoutEffect } from 'react'
import ReactMarkdown from 'react-markdown'

/**
 * parse markdown content and render into react content
 * Features:
 * - h2/## as group
 * - markdown content support `details/summary` tag
 * - responsive layout, default 3 columns
 * - support yaml metadata
 */

const CheatsheetViewer = ({content, metadata}) => {

  const defaultCoverImage = '/assets/backgrounds/peek_sm.png'

  useLayoutEffect(() => {
    if (!metadata) return

    const { snippets } = metadata

    const createSection = element => {
      if (element.tagName !== 'H2') return null

      const icon = document.createElement('i')
      icon.classList.add('pi', 'pi-compass', 'text-2xl')
      // head icon
      const span = document.createElement('span')
      span.classList.add('inline-block')
      span.appendChild(icon)

      // h2, card header
      const sectionTitle = element.cloneNode(true)
      sectionTitle.classList.add('card-title', 'mb-0', 'select-none')
      // copy icon
      const copyBtn = document.createElement('span')
      copyBtn.classList.add('pi', 'pi-copy', 'text-2xl')

      sectionTitle.prepend(span)
      sectionTitle.appendChild(copyBtn)

      const section = document.createElement('div')
      section.classList.add('grid-item', 'zoom')
      section.appendChild(sectionTitle)

      return section
    }
    // innclude image
    const createParagraph = (element, cards) => {
      if (element.tagName !== 'P') return

      const parentSection = cards.slice(-1)[0]
      if (!parentSection) return // could be undefined
      const paragraph = element.cloneNode(true)
      paragraph.classList.add('p-3', 'mb-0')
      const link = paragraph.querySelector('a')
      if (link) {
        link.setAttribute('target', '_blank')
      }
      parentSection.appendChild(paragraph)
    }

    const createPreBlock = (element, cards) => {
      if (element.tagName !== 'PRE') return

      const parentSection = cards.slice(-1)[0]
      if (!parentSection) return // could be undefined
      const preBlock = element.cloneNode(true)
      parentSection.appendChild(preBlock)
    }

    const cards = []
    const processor = element => {
      const section = createSection(element)
      section && cards.push(section)
      createParagraph(element, cards)
      createPreBlock(element, cards)
    }

    const main = document.querySelector('.md-wrapper')
    const elements = [...main.children]
    elements.forEach(processor)
    
    if (!cards.length) return

    // add card interaction
    cards.forEach(card => {
      const codeImage = card.querySelector('img')
      if (!codeImage) { // just plan text or link content in this card
        card.querySelector('span.pi-copy').classList.remove('pi-copy')
        return
      }
      const snippetKey = codeImage.getAttribute('alt')
      const imageSource = codeImage.getAttribute('src')
      const cardClickHandler = event => {
        // handle copy
        if (event.target.tagName === 'SPAN') {
          const codeSnippet = snippets[snippetKey] || 'No Key Found'
          // copy to clipboard
          navigator.clipboard.writeText(codeSnippet)
          // show toast
          const snackbar = document.querySelector('.snackbar')
          snackbar.classList.add('show')
          setTimeout(() => snackbar.classList.remove('show'), 2000)
        }
        // handle popup image
        if (event.target.tagName === 'IMG') {
          const popImage = new CustomEvent('popImage', { 'detail': imageSource })
          document.dispatchEvent(popImage)
        }
      }
      if (codeImage) {
        card.addEventListener('click', cardClickHandler)
      }
    })

    const cardGrid = document.createElement('div')
    cardGrid.classList.add('masonry')
    cardGrid.append(...cards)

    const targetContainer = document.querySelector('.cheat-sheet-cards')
    targetContainer.appendChild(cardGrid)

    // hide react-markdown
    main.classList.add('hidden')

    // enlarge masonry to reveal bottom card shadow
    setTimeout(() => {
      const masonryBox = document.querySelector('.masonry')
      const mHeight = masonryBox.clientHeight
      masonryBox.setAttribute("style", `height: ${mHeight + 10}px`)
    }, 200);

    return () => {
      // restore react-markdown
      main.classList.remove('hidden')
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren
      // replaceChildren() provides a very convenient mechanism for emptying a node of all its children.
      // You call it on the parent node without any argument specified:
      targetContainer.replaceChildren() // clear all
    }

  }, [content, metadata])

  return (
    <div className="cheat-sheet-viewer">
      <div className="snackbar">Copied!</div>
      <img 
        src={(metadata && metadata.cover) || defaultCoverImage}
        alt="cover" 
        className="cover max-w-full mt-8 md:mt-0"
      />
      <h1 className="mb-5">
        {metadata && metadata.title}
      </h1>
      <pre className="bg-white text-xl p-4 line-height-3 border-1 border-indigo-100">
        <code className="pre-line">
          {metadata && metadata.description}
        </code>
      </pre>
      <div className="flex my-5 px-3 justify-content-between align-items-center">
        <blockquote className="text-2xl ">
          {metadata?.download && (
            <a href={metadata.download} target="_blank" rel="noreferrer">
              Download Here! 🧨 
            </a>
          )}
        </blockquote>
        <p className="ml-3">
          {metadata && metadata.date}
        </p>
      </div>
      <div className="md-wrapper mb-7">
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
      {/* hold all the cards here */}
      <div className="cheat-sheet-cards mb-7"/>
    </div>
  )
}

export default CheatsheetViewer