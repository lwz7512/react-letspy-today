import React, { useLayoutEffect } from 'react'
import ReactMarkdown from 'react-markdown'

/**
 * TODO: parse markdown content and render into react content
 * Features:
 * - h2/## as group
 * - markdown content support `details/summary` tag
 * - responsive layout, default 3 columns
 * - support yaml metadata
 */

const CheatsheetViewer = ({content, metadata}) => {

  useLayoutEffect(() => {
    if (!metadata) return

    const createSection = element => {
      if (element.tagName !== 'H2') return null

      const icon = document.createElement("i")
      icon.classList.add('pi', 'pi-compass', 'text-2xl')
      
      const span = document.createElement("span")
      span.classList.add('inline-block')
      span.appendChild(icon)

      const sectionTitle = element.cloneNode(true)
      sectionTitle.prepend(span)
      sectionTitle.classList.add('card-title', 'mb-0')

      const section = document.createElement('div')
      section.classList.add('grid-item', 'zoom')
      section.appendChild(sectionTitle)

      return section
    }

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

    const cardGrid = document.createElement('div')
    // cardGrid.classList.add('grid-container')
    cardGrid.classList.add('masonry')
    cardGrid.append(...cards)

    const targetContainer = document.querySelector('.cheat-sheet-cards')
    targetContainer.appendChild(cardGrid)

    // hide react-markdown
    main.classList.add('hidden')

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
      <img 
        src={metadata && metadata.cover}
        alt="cover" 
        className="max-w-full mt-8 md:mt-0 "
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
          {metadata && (
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
      <div className="cheat-sheet-cards mb-7"/>
    </div>
  )
}

export default CheatsheetViewer