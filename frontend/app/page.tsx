import { HeroSection } from "@/components/hero-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { ResultsSection } from "@/components/results-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { Footer } from "@/components/footer"
import { InteractiveBackgroundSection } from "@/components/interactive-background-section"
import type { Project, Client } from "@/lib/types"
import { getProjects, getClients } from "@/util/publicApi"
import { ProjectsSection } from "@/components/projects-section"
import { ClientsSection } from "@/components/clients-section"

/* const mockProjects: Project[] = [
  {
    id: "1",
    name: "Consultation",
    description: "Project Name, Location",
    imageUrl: "/consultation-project-office.jpg",
  },
  {
    id: "2",
    name: "Design",
    description: "Project Name, Location",
    imageUrl: "/modern-design-architecture.jpg",
  },
  {
    id: "3",
    name: "Marketing & Design",
    description: "Project Name, Location",
    imageUrl: "/marketing-campaign-design.jpg",
  },
  {
    id: "4",
    name: "Consultation & Marketing",
    description: "Project Name, Location",
    imageUrl: "/business-consultation.png",
  },
  {
    id: "5",
    name: "Consultation",
    description: "Project Name, Location",
    imageUrl: "/professional-consultation.jpg",
  },
]

const mockClients: Client[] = [
  {
    id: "1",
    name: "Rowhan Smith",
    designation: "CEO, Foursquare",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempore incididunt ut labore",
    imageUrl: "/professional-man-headshot.png",
  },
  {
    id: "2",
    name: "Shipra Kayak",
    designation: "Brand Designer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempore incididunt ut labore",
    imageUrl: "/professional-woman-headshot.png",
  },
  {
    id: "3",
    name: "John Lepore",
    designation: "CEO, Foursquare",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempore incididunt ut labore",
    imageUrl: "/professional-headshot.png",
  },
  {
    id: "4",
    name: "Merry Freeman",
    designation: "Marketing Manager at Mult",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempore incididunt ut labore",
    imageUrl: "/professional-woman-headshot.png",
  },
  {
    id: "5",
    name: "Lucy",
    designation: "Sales Rep at Alibaba",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempore incididunt ut labore",
    imageUrl: "/professional-headshot.png",
  },
] */

  

export default async function Home() {
  const [projects, clients] = await Promise.all([
    getProjects(),
    getClients(),
  ])

  return (
    <main>
      <HeroSection />
      <ResultsSection />
      <WhyChooseUsSection />
      <InteractiveBackgroundSection />
      <ProjectsSection projects={projects} />
      <ClientsSection clients={clients} />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
