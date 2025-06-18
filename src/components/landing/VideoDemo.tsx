import React, { useEffect, useRef } from "react";
import { FaChartLine, FaRobot, FaHashtag } from "react-icons/fa";
import { motion, useAnimation, useInView } from "framer-motion";
import { useScrollContext } from "@/lib/scroll-context";

const VideoDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const isAutoScrolling = useRef(false);
  const scrollAnimationId = useRef<number | null>(null);
  const { disableAutoScroll } = useScrollContext();

  const features = [
    {
      icon: <FaChartLine className="w-12 h-12 text-blue-400" />,
      title: "Everything in One Dashboard",
      description:
        "View videos, track performance, and manage campaigns all in a single, easy-to-use place.",
    },
    {
      icon: <FaRobot className="w-12 h-12 text-purple-400" />,
      title: "Zero Skills Needed",
      description:
        "Just tell our AI Agent about your business once–no design or editing skills required.",
    },
    {
      icon: <FaHashtag className="w-12 h-12 text-teal-400" />,
      title: "Building Your Brand",
      description:
        "Create consistent, branded videos that boost recognition, attract followers, and grow your audience.",
    },
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      startAutoScroll();
    }

    return () => {
      if (scrollAnimationId.current) {
        cancelAnimationFrame(scrollAnimationId.current);
      }
    };
  }, [controls, isInView]);

  const startAutoScroll = () => {
    if (disableAutoScroll) return;
    if (!containerRef.current || isAutoScrolling.current) return;
    if (scrollAnimationId.current) {
      cancelAnimationFrame(scrollAnimationId.current);
    }

    isAutoScrolling.current = true;

    // Scroll to the top of the page
    const targetPosition = containerRef.current.offsetTop;
    window.scrollTo(0, targetPosition);

    isAutoScrolling.current = false;
    scrollAnimationId.current = null;
  };

  return (
    <motion.div
      ref={containerRef}
      className="w-full min-h-screen flex flex-col items-center justify-center py-24 md:py-36 px-0 overflow-hidden"
      style={{
        background: `
    radial-gradient(ellipse 100% 40% at top, #111827, #000000),
    #000000
  `,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="w-full max-w-7xl px-4 sm:px-6">
        {/* Title Section*/}
        <div className="max-w-4xl mx-auto mb-16 md:mb-20">
          <motion.h1
            className="text-4xl md:text-[3.75rem] font-semibold text-white leading-tight md:leading-[1.1]"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="hidden"
            animate={controls}
          >
            <div className="relative pl-6 md:pl-10">
              <motion.span
                className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-blue-400/80 to-transparent"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              />
              <div className="flex flex-col gap-y-3 text-left">
                <motion.span
                  className="text-gray-200 font-medium tracking-tight"
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                >
                  Introducing the world's first
                </motion.span>
                <motion.span
                  className="text-white font-bold pb-1"
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.2,
                      },
                    },
                  }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                    Multi-Agent Platform
                  </span>
                </motion.span>
                <motion.span
                  className="text-white font-bold"
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.4,
                      },
                    },
                  }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                    for Video Ads
                  </span>
                </motion.span>
              </div>
            </div>
          </motion.h1>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full mb-24 md:mb-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="rounded-2xl transition-all duration-300"
              style={{
                minHeight: "320px",
                background: "linear-gradient(145deg, #0d0d0d, #151515)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
              }}
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.6 + index * 0.2,
                  },
                },
              }}
              initial="hidden"
              animate={controls}
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(100, 200, 255, 0.3)",
                boxShadow: "0 0 30px rgba(100, 150, 255, 0.3)",
                transition: { duration: 0.01, ease: "easeOut" },
              }}
            >
              <div className="h-full flex flex-col p-8 md:p-10">
                <div className="mx-auto mb-8 mt-10">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-base leading-relaxed tracking-normal flex-grow">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      {/* <motion.div
        className="group/video relative aspect-video w-full max-w-4xl mx-auto rounded-none md:rounded-xl overflow-hidden mt-2 md:mt-2"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 1,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t to-transparent z-[1] pointer-events-none transition-all duration-300 group-hover/video:opacity-0"></div>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/VGa1imApfdg?si=xyEedkVh7ZZUkNQc`}
          title="AI Video Ad Platform"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full relative z-0"
        ></iframe>
      </motion.div> */}
    </motion.div>
  );
};

export default VideoDemo;
