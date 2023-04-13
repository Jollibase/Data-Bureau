import React, { useEffect, useState } from 'react'
import ClassNames from 'classnames'

import styles from './Carousel.styl'

interface CarouselProps {
  showButton?: boolean
  images: React.ReactElement<SVGElement>[]
  auto?: boolean
  classname?: string
}

export const Carousel = ({
  showButton,
  classname,
  images,
  auto,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (auto) {
      const interval = setInterval(
        () =>
          setCurrentIndex(prev => (prev >= images.length - 1 ? 0 : prev + 1)),
        3000,
      )
      return () => clearInterval(interval)
    }
  })

  return (
    <div className={ClassNames(styles.Carousel, classname)}>
      {images.map((image, index) => {
        return (
          <div
            className={ClassNames('carousel__image', {
              active: index === currentIndex,
            })}>
            {image}
          </div>
        )
      })}
    </div>
  )
}
