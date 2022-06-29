import { useLayoutEffect } from 'react'

const Modal = () => {

  useLayoutEffect(() => {
    // display new image
    document.addEventListener('popImage', event => {
      const snippet = new Image()
      snippet.classList.add('snippet-img')
      snippet.src = event.detail
      const modal = document.querySelector('.modal')
      modal.classList.remove('hidden')
      modal.replaceChildren(snippet)
    })
    // close me
    const modalElement = document.querySelector('.modal')
    modalElement.addEventListener('click', event => {
      event.currentTarget.classList.add('hidden')
    })

  }, [])

  return (
    <div className="modal hidden" >
      <img src="/cheatsheets/snippets/carbon.png" alt="snippet" />
    </div>
  )

}

export default Modal