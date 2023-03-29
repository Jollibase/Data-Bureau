import { Card } from './index'

import styles from './Card.styl'

interface TestimonialCardProps {
  testimonials: {
    image: string
    name: string
    role: string
    description: string
  }[]
}

export const TestimonialCard = ({ testimonials }: TestimonialCardProps) => {
  return (
    <div className={styles.Testimonial}>
      {testimonials.slice(0, 6).map((testimonial, i) => {
        return (
          <Card classname="testimonial__cards" key={i}>
            <p className="testimonial__cards__description">
              {testimonial.description}
            </p>
            <div className="testimonial__cards__profile">
              <div className="testimonial__cards__profile__image">
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <div className="testimonial__cards__profile__description">
                <p>{testimonial.name}.</p>
                <p>{testimonial.role}</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
