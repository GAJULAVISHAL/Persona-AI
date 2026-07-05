import Container from '../component/container'
import Hero from '../component/hero'
import Personas from '../component/personas'
import CTA from '../component/cta'
import Footer from '../component/footer'

export default function HomePage() {
  return (
    <Container>
      <Hero />
      <Personas />
      <CTA />
      <Footer />
    </Container>
  )
}