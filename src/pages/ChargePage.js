import { useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import withAuth from '../helper/withAuth'

const ChargePage = () => {

  const history = useHistory()
  const { star } = useParams()
  const toastRef = useRef(null)

  useEffect(() => {
    if (!star) return
    
    const savedStar = localStorage.getItem('LETSPY_STAR') ?? 0
    const totalStar = parseInt(star||0) + parseInt(savedStar)
    localStorage.setItem('LETSPY_STAR', totalStar)

    const notification = {
      severity: 'success', summary: 'Congrats', detail: `You got ${totalStar}⭐ totally!`
    }
    // popup toast message
    toastRef.current.show(notification);
  }, [star])

  const goProfle = () => {
    history.push('/profile')
  }

  return (
    <div>
      <Toast ref={toastRef} />
      <h1 className="text-4xl border-left-6 pl-3 border-primary">Charged star manually👌</h1>
      <p className="text-2xl">You got additional <span className="text-4xl">{star||0} ⭐</span> </p>
      <Button label="Check it out" onClick={goProfle} />
    </div>
  )

}

export default withAuth(ChargePage)