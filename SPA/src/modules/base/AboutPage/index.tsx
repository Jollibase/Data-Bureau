import { Link } from 'react-router-dom'

import { Footer, Menu } from '@Home/components'

import TEAMPICS from '@Images/team.png'
import TEAMPICS1 from '@Images/team1.png'

import { ReactComponent as LpCircle } from '@Images/lp-round.svg'
import { ReactComponent as LpC } from '@Images/lp-c.svg'
import { ReactComponent as Curve } from '@Images/bezier_curve.svg'
import { ReactComponent as Girl } from '@Images/girl_studying.svg'
import { ReactComponent as Payment } from '@Images/payment.svg'
import { ReactComponent as Gift } from '@Images/gift.svg'
import { ReactComponent as Leadership } from '@Images/leadership.svg'
import style from './AboutPage.styl'

const TEAM = [
  { image: TEAMPICS, name: 'Koray Okumus', role: 'Sr Developer' },
  { image: TEAMPICS1, name: 'Noah Pierre', role: 'Sr Developer' },
  { image: TEAMPICS, name: 'Koray Okumus', role: 'Sr Developer' },
]

export const AboutPage = () => {
  return (
    <div className={style.AboutPage}>
      <div className="about-us">
        <div className="about-us__hero-page">
          <LpC className="lp__C" />
          <LpCircle className="lp__circle" />
          <Menu classname="about-us__hero-page__menu" />
          <div className="about-us__hero-page__elems">
            <div className="about-us__hero-page__elems__left">
              <div className="about-us__hero-page__elems__left__breadcrumbs">
                <Link to="/">Home</Link> / About{' '}
              </div>
              <h1>INTRODUCTION</h1>
              <p>
                Welcome to Jolibase, the data analytics solution that helps
                financial institutions mitigate flight risks by accurately
                determining financial credibility. Our powerful platform
                analyses vast amounts of data to provide valuable insights that
                help lenders and investors make informed decisions about their
                clients' financial health.
              </p>
            </div>
            <div className="about-us__hero-page__elems__right desktop_view">
              <Girl />
            </div>
          </div>
          <div className="s">
            <Curve fill="#003b33" className="curve" />
          </div>
        </div>
        <div className="about-us__breakdown">
          <div className="about-us__breakdown__mission">
            <div className="description">
              <div className="description__title">
                <h5>MISSION/VISION</h5>
              </div>
              <div className="description__body">
                Welcome to Jollibase, the data analytics solution that helps
                financial institutions mitigate flight risks by accurately
                determining financial credibility. Our powerful platform
                analyses vast amounts of data to provide valuable insights that
                help lenders and investors make informed decisions about their
                clients' financial health.
              </div>
            </div>
            <div className="image">
              <Leadership />
            </div>
          </div>
          <div className="about-us__breakdown__process">
            <div className="description">
              <div className="description__title">
                <h5>OUR PROCESS</h5>
              </div>
              <div className="description__body">
                Our platform utilizes advanced data analytics and machine
                learning algorithms to process large amounts of financial data
                and provide accurate and timely insights. We collect data from a
                variety of sources, including credit reports, bank statements,
                tax records, and more. Our platform then analyses this data to
                create a comprehensive financial profile for each client. Our
                proprietary algorithms consider a wide range of factors to
                determine financial credibility, including credit history,
                debt-to-income ratio, payment history, and more. We also take
                into account external factors such as industry trends and
                economic indicators, which can provide valuable context for
                evaluating financial risk.
              </div>
            </div>
            <div className="image">
              <Payment />
            </div>
          </div>
          <div className="about-us__breakdown__benefits">
            <div className="description">
              <div className="description__title">
                <h5>OUR BENEFITS</h5>
              </div>
              <div className="description__body">
                By using Jollibase financial institutions can enjoy a number of
                benefits, including, but not limited to the following:
                <ol>
                  <li>
                    <span>Improved decision-making</span>: Our data-driven
                    insights help lenders and investors make more informed
                    decisions about their clients' financial health, reducing
                    the risk of defaults and other financial losses.
                  </li>
                  <li>
                    <span>Reduced risk</span>: By accurately assessing financial
                    risk, our platform helps financial institutions reduce their
                    exposure to risk and improve their overall financial
                    stability.
                  </li>
                  <li>
                    <span>Increased efficiency</span>: Our platform automates
                    much of the data collection and analysis process, freeing up
                    valuable time and resources for financial institutions.
                  </li>
                </ol>
              </div>
            </div>
            <div className="image">
              <Gift />
            </div>
          </div>
        </div>
        <div className="about-us__the-team">
          <div>
            <h4>Meet our team</h4>
            <p>
              At Jolibase, we are proud to have a team of experienced data
              analysts, developers, designers and financial experts who are
              dedicated to helping our clients succeed. Our team has a deep
              understanding of financial data analytics and is committed to
              providing the best possible solutions to our clients.
            </p>
          </div>
          <div className="about-us__the-team__images">
            {TEAM.map((person, index) => (
              <div key={index}>
                <img src={person.image} alt="the team" />
                <p className="full_name">{person.name}</p>
                <p className="role">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
