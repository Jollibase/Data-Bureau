import { useEffect, useState } from 'react'
import ClassNames from 'classnames'

import styles from './Carousel.styl'

interface CarouselProps {
  showButton?: boolean
  images: React.FunctionComponent[]
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
        2000,
      )
      return () => clearInterval(interval)
    }
  })

  const CurrentImage = images[currentIndex]

  return (
    <div className={ClassNames(styles.Carousel, classname)}>
      <CurrentImage />
    </div>
  )
}
