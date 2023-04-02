import { useNavigate } from 'react-router-dom'

import { Button, Menu } from '@Components'

import { ReactComponent as CaretLeft } from '@Images/caret_left.svg'
import { ReactComponent as LpDot } from '@Images/lp-dots.svg'
import { ReactComponent as Astronaut } from '@Images/astronaut.svg'
import styles from './ErrorPage.styl'

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.ErrorPage}>
      <LpDot className="error__dot" />

      <Menu classname="error__menu" />
      <div className="error">
        <div className="error__text">
          <h2>Oops! We can't seem to find the page you're looking for.</h2>
          <div className="error__text__btns">
            <Button
              inverse
              classname="btn_inverse"
              text="Back to Home Page"
              onclick={() => navigate('/')}
            />
            <Button
              classname="btn_previous"
              text={
                <p className="btn_text">
                  <CaretLeft fill="#FFF" /> Back to Previous Page
                </p>
              }
              onclick={() => navigate(-1)}
            />
          </div>
        </div>
        <div className="error__image">
          <Astronaut />
        </div>
      </div>
    </div>
  )
}
