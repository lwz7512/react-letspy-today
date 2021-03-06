import React, { useState, useEffect, useRef } from 'react'
import { Link, } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { useTypewriter, Cursor } from 'react-simple-typewriter'

import { drawHeroImageBy } from "../helper/CanvasHelper";

const HeroCard = ({tileA, titleB, route, actionNow}) => {

  const thumbnailImgSrc = 'assets/backgrounds/home_hero_thumbnail.jpg'
  const rawImgSrc = 'assets/backgrounds/home_hero.jpg'
  const demoVideoSrc = 'assets/video/LETPY_joy_0320_640x360.mp4'
  const openDoorSound = 'assets/audio/qubodup-DoorOpen01.ogg'
  const closeDoorSound = 'assets/audio/qubodup-DoorClose01.ogg'

  const [imageLoaded, setImageLoaded] = useState(false)
  const [imgRawWidth, setImgRawWidth] = useState(0)
  const [imgRawHeight, setImgRawHeight] = useState(0)

  const rawImgDataRef = useRef(0)
  const moveDirection = useRef(0)
  const openSoundRef = useRef()
  const closeSoundRef = useRef()

  const {text: typeWriterText } = useTypewriter({
    words: titleB,
    loop: 0, // Infinit
  })

  const openDemoVideoView = (initPercent) => {
    rawImgDataRef.current += initPercent ? 0.014 : -0.014

    drawHeroImageBy(rawImgDataRef.current, imgRawWidth, imgRawHeight)

    if (rawImgDataRef.current > 0 && rawImgDataRef.current < 1) {
      window.requestAnimationFrame(() => openDemoVideoView(moveDirection.current))
    }
  }

  // OPEN VIDEO:
  const runOpenStageAnimation = () => {
    moveDirection.current = 1
    rawImgDataRef.current = 0
    openDemoVideoView(1)
    const videoContainer = document.getElementById('video-container')
    videoContainer.style.display = 'block'
    const contentContainer = document.getElementById('content-container')
    contentContainer.style.display = 'none'
    // sound effect
    openSoundRef.current.play()
  }

  // CLOSE VIDEO:
  const videoPlayingEndHandler = () => {
    moveDirection.current = 0
    rawImgDataRef.current = 1
    openDemoVideoView(0)
    setTimeout(() => {
      const contentContainer = document.getElementById('content-container')
      contentContainer.style.display = 'block'
      // sound effect
      closeSoundRef.current.play()
    }, 1000)
  }

  const closeVideoHandler = event => {
    event.preventDefault()
    const tag = event.target.tagName
    if (tag === 'DIV' || tag === 'I') {
      videoPlayingEndHandler()
    }
  }

  useEffect(() => {
    setImageLoaded(false)
    const img = new Image()
    img.onload = () => {
      setImageLoaded(true)
      setImgRawWidth(img.width)
      setImgRawHeight(img.height)

      img.remove()
    }
    img.src = rawImgSrc
    if (img.complete) img.onload()
  }, [])

  useEffect(() => {
    openSoundRef.current = new Audio(openDoorSound)
    closeSoundRef.current = new Audio(closeDoorSound)
  }, [])

  return (
    <div className="card hero-container border-noround md:border-round">
      <img 
        id="heroImage"
        className="absolute hero-image" 
        src={imageLoaded ? rawImgSrc : thumbnailImgSrc} 
        alt="hero background"
      />
      <div 
        id="video-container" 
        className="video-container absolute"
        onClick={closeVideoHandler}
        >
        <div className="video">
          <ReactPlayer
            url={demoVideoSrc}
            controls={true}
            onEnded={videoPlayingEndHandler}
            width="100%"
            height="100%"
          />
        </div>
        <p className="hint-text right">
          <i className="pi pi-times" style={{'fontSize': '1.0em'}}></i>
        </p>
      </div>
      <canvas id="hero_canvas_black" className="black-canvas"></canvas>
      <div id="content-container" className="absolute content-container">
        <h1 className="intro-title">{tileA}</h1>
        <h2 className="intro-subtitle">
          {typeWriterText}
          <Cursor cursorStyle="_"/>
        </h2>
        <Link to={route} className="action-button">
            {actionNow}
        </Link>
        <button 
          type="button" 
          className="action-button now"
          onClick={runOpenStageAnimation}
          >Demo
        </button>
      </div>
    </div>
  )
}

export default HeroCard