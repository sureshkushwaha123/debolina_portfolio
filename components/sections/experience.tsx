"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, Briefcase, Award } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

const getIcon = (title: string) => {
  if (title.toLowerCase().includes('student') || title.toLowerCase().includes('nift')) {
    return GraduationCap
  }
  if (title.toLowerCase().includes('intern') || title.toLowerCase().includes('studio')) {
    return Briefcase
  }
  return Award
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey in fashion design, from academic excellence to professional growth 
            and industry recognition.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {portfolioData.experience.map((item, index) => {
              const Icon = getIcon(item.title)
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Timeline Icon */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10">
                    <Icon className="h-4 w-4 text-primary-foreground" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                    <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                            {item.year}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <h4 className="text-primary font-semibold mb-3">{item.organization}</h4>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}