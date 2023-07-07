import { Link } from 'react-router-dom'

import { Button } from '@Home/components'

import { ReactComponent as Twitter } from '@Images/twitter.svg'
import { ReactComponent as Facebook } from '@Images/facebook.svg'
import { ReactComponent as Mail } from '@Images/mail_fill.svg'
import { ReactComponent as Linkedin } from '@Images/linkedin.svg'
import { ReactComponent as LogoGreen } from '@Images/logo_green.svg'
import { ReactComponent as ThankYouClap } from '@Images/thankyou.svg'
import style from './ThankYou.styl'

export const ThankYou = () => {
  return (
    <div className={style.ThankYou}>
      <div className="thank-you">
        <div className="thank-you__logo">
          <Link to="/">
            <LogoGreen />
          </Link>
        </div>
        <div className="thank-you__clap">
          <ThankYouClap />
        </div>
        <div className="thank-you__text">
          <h2>Thank you for your interest in our waitlist</h2>
          <p>We have added your email address to the signup queue.</p>
        </div>
        <div className="thank-you__banner">
          <div className="thank-you__banner__with__logo">
            <h3>
              <span>200</span> Companies are ahead of you
            </h3>
            <p>This reservation is held for femi.harley@GlobalMoney.com</p>
          </div>
        </div>
        <div className="thank-you__priority">
          <p>Interested in priority access?</p>
          <p>Get early access by contacting us @jollibase.com</p>
          <div className="thank-you__priority__socials">
            <Button
              text={<span>Tweet</span>}
              onclick={() => null}
              logo={<Twitter />}
            />
            <Button
              text={<span>Share</span>}
              onclick={() => null}
              logo={<Facebook />}
            />
            <Button
              text={<span>Email</span>}
              onclick={() => null}
              logo={<Mail />}
            />
            <Button
              text={<span>Share</span>}
              onclick={() => null}
              logo={<Linkedin />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
