"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import portfolioData from "@/data/portfolio.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Maximize2, X } from "lucide-react";

const categories = ["all", "men's wear", "women's wear"];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [subModalType, setSubModalType] = useState<
    "moodBoard" | "inspiration" | null
  >(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? portfolioData.projects
      : portfolioData.projects.filter(
          (project) =>
            project.category.toLowerCase() === activeCategory.toLowerCase()
        );

  // Handle fullscreen toggle
  const handleFullscreen = (img: string) => {
    setFullscreenImage(img);
    const elem = document.getElementById("fullscreen-image");
    if (elem && elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  return (
    <section id="portfolio" className="relative py-20">
      {/* Background Image for whole section */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/experience_backgrounnd.png" 
          alt="Portfolio Background"
          fill
          className="w-full h-full object-cover opacity-50 blur-sm"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Portfolio
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto drop-shadow">
            A curated collection of my fashion design work for men and women.
          </p>
        </motion.div>

        {/* Category Filter */}
        {/* Category Filter */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2, duration: 0.8 }}
  className="flex justify-center mb-8 sm:mb-12"
>
  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full max-w-full">
    {categories.map((category) => (
      <Button
        key={category}
        variant={activeCategory === category ? "default" : "ghost"}
        onClick={() => setActiveCategory(category)}
        className="px-3 py-1 sm:px-6 sm:py-2 text-sm sm:text-base rounded-full capitalize transition-all duration-300"
      >
        {category}
      </Button>
    ))}
  </div>
</motion.div>


        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                  setSubModalType(null);
                }}
              >
                <Card className="overflow-hidden bg-black/50 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <div className="relative w-full">
                      <Image
                        src={project.moodBoard.images[0]}
                        alt={project.title}
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-lg font-semibold mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/80">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {project.category}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* --- Modals --- */}

        {/* Main Project Modal */}
        <AnimatePresence>
          {selectedProject && !subModalType && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-black/70 backdrop-blur-lg rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="mb-6 rounded-xl overflow-hidden"
                >
                  {selectedProject.moodBoard.images
                    .slice(0, 3)
                    .map((img: string, idx: number) => (
                      <SwiperSlide
                        key={idx}
                        className="relative flex items-center justify-center bg-black"
                      >
                        <div className="relative z-10 flex justify-center items-center max-h-[80vh] w-full">
                          <Image
                            src={img}
                            alt={`${selectedProject.title} ${idx + 1}`}
                            width={1200}
                            height={800}
                            className="object-contain max-h-[80vh] w-auto rounded-lg"
                            id="fullscreen-image"
                          />
                          <button
                            onClick={() => handleFullscreen(img)}
                            className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/80 transition"
                          >
                            <Maximize2 className="text-white w-5 h-5" />
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>

                <h3 className="text-2xl font-bold mb-4 text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-white/80 mb-6">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4 mb-6">
                  <Button onClick={() => setSubModalType("moodBoard")}>
                    View Mood Board
                  </Button>
                  <Button onClick={() => setSubModalType("inspiration")}>
                    View Concept
                  </Button>
                </div>

                <Button
                  onClick={() => setSelectedProject(null)}
                  className="w-full"
                >
                  Close
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mood Board Sub-Modal */}
        <AnimatePresence>
          {selectedProject && subModalType === "moodBoard" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              onClick={() => setSubModalType(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-black/70 backdrop-blur-lg rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button at top-right */}
                <button
                  onClick={() => setSubModalType(null)}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/80 transition"
                >
                  <X className="text-white w-5 h-5" />
                </button>

                <h3 className="text-2xl font-bold mb-4 text-white pr-10">
                  Mood Board
                </h3>
                <p className="text-white/80 mb-6">
                  {selectedProject.moodBoard.text}
                </p>

                <div className="space-y-6">
                  {selectedProject.moodBoard.images.map(
                    (img: string, idx: number) => (
                      <div
                        key={idx}
                        className="relative flex items-center justify-center bg-black rounded-xl overflow-hidden"
                      >
                        <div className="relative z-10 flex justify-center items-center max-h-[80vh] w-full">
                          <Image
                            src={img}
                            alt={`Mood Board Image ${idx + 1}`}
                            width={1200}
                            height={800}
                            className="object-contain max-h-[80vh] w-auto rounded-lg"
                            id="fullscreen-image"
                          />
                          {/* Fullscreen button at bottom-right */}
                          <button
                            onClick={() => handleFullscreen(img)}
                            className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/80 transition"
                          >
                            <Maximize2 className="text-white w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inspiration Sub-Modal */}
        <AnimatePresence>
          {selectedProject && subModalType === "inspiration" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              onClick={() => setSubModalType(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-black/70 backdrop-blur-lg rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Inspiration
                </h3>
                <p className="text-white/80 whitespace-pre-line">
                  {selectedProject.inspiration}
                </p>

                <Button
                  onClick={() => setSubModalType(null)}
                  className="mt-6 w-full"
                >
                  Close Inspiration
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
