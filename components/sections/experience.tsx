'use client'

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
    <section id="experience" className="relative py-24 overflow-hidden">
      {/* Moodboard Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/experience_backgrounnd.png"
          alt="Moodboard Background"
          className="w-full h-full object-cover opacity-50 blur-sm"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey in fashion design—from academic excellence to professional growth and industry recognition.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary to-transparent" />

          <div className="space-y-16">
            {portfolioData.experience.map((item, index) => {
              const Icon = getIcon(item.title)
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Icon */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-10 h-10 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10 shadow-lg">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 mt-12 md:mt-0 ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                    <Card className="bg-card/60 backdrop-blur-md border border-border shadow-xl hover:shadow-2xl transition-all duration-300">
                      <CardContent className="p-6 space-y-4">
                        {/* Year Badge & Thumbnail */}
                        <div className="flex items-center justify-between">
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                            {item.year}
                          </Badge>
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded-full border border-border"
                            />
                          )}
                        </div>

                        {/* Title & Organization */}
                        <div>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <h4 className="text-primary font-semibold">{item.organization}</h4>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>

                        {/* Skills/Tags */}
                        {item.skills && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {item.skills.map((skill: string, i: number) => (
                              <Badge key={i} className="bg-muted/20 text-muted-foreground hover:bg-muted/30">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
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
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${className}`}>
      {children}
    </span>
  )
}
