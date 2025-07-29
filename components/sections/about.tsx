"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json";
import { useEffect, useState } from "react";

export function AboutSection() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <section id="about" className="relative py-16 sm:py-20 bg-muted/30 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/experience_backgrounnd.png"
          alt="Moodboard Background"
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">About Me</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto">
            Every design of mine reflects stories that moulded me the way I am.
            How I see, feel, talk, and perceive things around me takes enormous
            observation skills.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-2">
                <Image
                  src="/photos/img1.jpg"
                  alt="Debolina Burman - Fashion Designer"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 bg-secondary/10 rounded-full blur-xl" />
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">My Design Philosophy</h3>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                Hello! I'm Debolina, an aspiring Fashion Designer who's
                highly inclined towards Fashion and Aesthetics. One who believes
                in Kindness! Every design of mine has a reflection of stories
                which moulded me the way I am. How I see, feel, talk, and
                perceive things around me takes enormous observation skills.
                After brainstorming my life's design process, one thing that I
                have always been true to is my roots. I often try to incorporate
                the essence of my genesis in every piece I create.
              </p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Currently pursuing my degree at NIFT, I specialize in
                sustainable fashion practices, hand-embroidery techniques, and
                innovative pattern-making that celebrates both artistry and
                functionality.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Core Skills</h4>
              <div className="space-y-3 sm:space-y-4">
                {portfolioData.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5 sm:h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        className="bg-primary h-1.5 sm:h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
