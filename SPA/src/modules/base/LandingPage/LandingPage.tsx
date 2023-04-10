import { Formik } from 'formik'
// import * as Yup from 'yup'

import WaitlistBoth from '@Images/waitlistboth.png'
import WaitlistTwo from '@Images/waitlist2.png'
import {
  Button,
  Input,
  Menu,
  Carousel,
  Card,
  Footer,
  TestimonialCard,
} from '@Components'

import { FEATURE_CARDS_INFO, TESTIMONIALS } from './constants'

import { ReactComponent as LpDot } from '@Images/lp-dots.svg'
import { ReactComponent as LpCircle } from '@Images/lp-round.svg'
import { ReactComponent as LpC } from '@Images/lp-c.svg'
import { ReactComponent as LpCLight } from '@Images/lp_c_light.svg'
import { ReactComponent as HeroImg1 } from '@Images/hero-img1.svg'
import { ReactComponent as HeroImg2 } from '@Images/thinkingman.svg'
import { ReactComponent as HeroImg3 } from '@Images/businessman.svg'
import { ReactComponent as EclipseGreen } from '@Images/eclispe_green.svg'
import { ReactComponent as ElipseGreen } from '@Images/elipse_mini.svg'
import styles from './LandingPage.styl'

const CAROUSEL_IMAGES = [HeroImg1, HeroImg2, HeroImg3]

export const LandingPage = () => {
  return (
    <div className={styles.LP}>
      <div className="lp__hero">
        <LpDot className="lp__dot" />
        <LpCircle className="lp__circle" />
        <LpC className="lp__C" fill="#003B33" />
        <EclipseGreen className="lp__eclipse" />
        <Menu showButton />
        <div className="lp__hero__elems">
          <div className="lp__hero__left">
            <h5 className="protect">PROTECT YOUR BUSINESS</h5>
            <h1 className="heading-text">
              Powering Smart Lending Decisions with Data Analytics
            </h1>
            <p>
              Make informed lending decisions with our powerful platform that
              analyses all forms of data to assess the financial credibility of
              borrowers. Our cutting-edge technology detects potential flight
              risks, providing lenders with greater peace of mind and helping to
              prevent financial loss. Sign up now to start making smart lending
              decisions and drive growth for your business.
            </p>
            <div className="lp__hero__input-group">
              <Formik
                initialValues={{ email: '' }}
                onSubmit={() => {}}
                // validationSchema={Yup.object({
                //   email: Yup.string()
                //     .email('Email address is invalid')
                //     .required('Email is required'),
                // })}
              >
                {({ getFieldProps, isSubmitting, handleSubmit }) => (
                  <form>
                    <Input
                      containerClassName="lp__hero__input-group__container"
                      type="email"
                      placeholder="Enter Email Address here..."
                      {...getFieldProps('email')}
                    />
                    <Button
                      text={isSubmitting ? 'Joining....' : 'Join our Waitlist'}
                      classname="hero-btn"
                      onclick={handleSubmit}
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      secondary
                    />
                  </form>
                )}
              </Formik>
            </div>
          </div>
          <div className="lp__hero__right">
            <Carousel classname="desktop_view" images={CAROUSEL_IMAGES} auto />
          </div>
        </div>
        <div className="lp__circle_ m desktop_view"></div>
        <ElipseGreen className="elipse_green desktop_view" />
        <div className="lp__circle_ d desktop_view"></div>
      </div>

      {/* FEATURES */}
      <div className="lp__feature">
        <div className="lp__feature__heading">
          <h3>FEATURES</h3>
          <p>
            Unlock the Full Potential of Your Business with Our Powerful
            Features.
          </p>
        </div>
        <div className="lp__feature__boxes">
          {FEATURE_CARDS_INFO.map(item => {
            return (
              <Card classname="lp__feature_cards" key={item.title}>
                <p className="title">{item.title}</p>
                <p>{item.description}</p>
              </Card>
            )
          })}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="lp__testimonial">
        <div className="lp__testimonial__heading">
          <h3>TESTIMONIAL</h3>
          <p>See what our customers have to say about us!</p>
        </div>
        <div className="lp__testimonial__boxes">
          <TestimonialCard testimonials={TESTIMONIALS} />
        </div>
      </div>

      <div className="lp__waitlist" id="join">
        <div className="lp__waitlist__form">
          <div className="lp__waitlist__form__text">
            <h2>Join the</h2>
            <h2>Waitlist</h2>
          </div>
          <div className="lp__waitlist__form__group">
            <Formik
              onSubmit={() => null}
              initialValues={{ name: '', email: '' }}>
              {({ isSubmitting, handleSubmit, getFieldProps }) => (
                <form>
                  <Input
                    placeholder="Full name *"
                    type="text"
                    classname="lp__waitlist__form__group__input"
                    {...getFieldProps('name')}
                  />
                  <Input
                    placeholder="Email *"
                    type="email"
                    classname="lp__waitlist__form__group__input"
                    {...getFieldProps('email')}
                  />
                  <Button
                    text="Join our waitlist"
                    classname="lp__waitlist__form__group__button"
                    secondary
                    onclick={handleSubmit}
                  />
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="lp__waitlist__image">
          <img src={WaitlistBoth} alt="" className="desktop_view" />
          <img src={WaitlistTwo} alt="" className="mobile_view" />
          <LpCLight className="lp__waitlist__image__C desktop_view" />
        </div>
      </div>

      <div className="lp__insights desktop_view">
        <div className="lp__insights__text">
          <div>
            <p>PROTECT YOUR BUSINESSES</p>
            <h3>
              Data-Driven Insights: How Our SaaS Product Helps Banks Mitigate
              Flight Risks
            </h3>
            <p>
              Discover the Impact of Our SaaS Product's Data Analysis and Risk
              Assessment on Financial Credibility in Banking
            </p>
          </div>
        </div>
        <div className="lp__insights__numbers">
          <div>
            <p>10k</p>
            <p>Customer worldwide</p>
          </div>
          <div>
            <p>100%</p>
            <p>Success rate</p>
          </div>
          <div>
            <p>200</p>
            <p>High risk customers identified</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
