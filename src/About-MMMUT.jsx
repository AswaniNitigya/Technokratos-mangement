"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from 'next/head';
import { metadata } from './metadata';
import {
    BookOpen,
    Target,
    Compass,
    Heart,
    ChevronRight,
    School,
    GraduationCap,
    ChevronLeft
} from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const AboutMMMUT = () => {
    const navigationLinks = [
        { title: "Vision", href: "#vision", icon: Target },
        { title: "Mission", href: "#mission", icon: Compass },
        { title: "Core Values", href: "#core-values", icon: Heart },
        { title: "About MMMUT", href: "#about", icon: School },
    ];

    const universityImages = [
        {
            src: "https://www.mmmut.ac.in/images/a61.jpg",
            alt: "MMMUT Main Building",
            caption: "Main Administrative Building"
        },
        {
            src: "https://www.mmmut.ac.in/images/Lib_in.jpg",
            alt: "MMMUT Library",
            caption: "Central Library"
        },
        {
            src: "https://www.mmmut.ac.in/images/b7.jpg",
            alt: "",
            caption: "Department of Information Technology"
        },
        {
            src: "https://www.mmmut.ac.in/images/b8.jpg",
            alt: "MMMUT Hostel",
            caption: "Student Hostels"
        },
        {
            src: "https://www.mmmut.ac.in/images/Mix-Hostel.jpg",
            alt: "MMMUT Hostel",
            caption: "Student Hostels"
        },
        {
            src: "https://mmmut.ac.in/images/Guest_House.jpg",
            alt: "Guest House",
            caption: "Guest House"
        },
        // Add more images as needed
    ];

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="keywords" content={metadata.keywords} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content={metadata.openGraph.type} />
                <meta property="og:title" content={metadata.openGraph.title} />
                <meta property="og:description" content={metadata.openGraph.description} />
                <meta property="og:image" content={metadata.openGraph.images[0]} />

                {/* Twitter */}
                <meta name="twitter:card" content={metadata.twitter.card} />
                <meta name="twitter:title" content={metadata.twitter.title} />
                <meta name="twitter:description" content={metadata.twitter.description} />
                <meta name="twitter:image" content={metadata.twitter.images[0]} />
            </Head>

            {/* Add structured data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "EducationalOrganization",
                        "name": "Madan Mohan Malaviya University of Technology",
                        "alternateName": "MMMUT",
                        "url": "https://www.mmmut.ac.in",
                        "logo": "https://www.mmmut.ac.in/images/a61.jpg",
                        "sameAs": [
                            "https://www.facebook.com/mmmut.ac.in",
                            "https://twitter.com/MMMUTGkp",
                            // Add other social media links
                        ],
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Gorakhpur-Deoria Road",
                            "addressLocality": "Gorakhpur",
                            "addressRegion": "Uttar Pradesh",
                            "postalCode": "273010",
                            "addressCountry": "IN"
                        },
                        "description": metadata.description,
                        "foundingDate": "1962",
                        "numberOfStudents": "5000+",
                        "educationalCredentialAwarded": [
                            "B.Tech", "M.Tech", "MCA", "MBA", "Ph.D"
                        ]
                    })
                }}
            />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" role="main">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row">
                        {/* Main Content - Left Section */}
                        <article className="w-full lg:w-3/4 py-8 lg:p-16 lg:pr-12">
                            <div className="max-w-5xl">
                                <header className="mb-8 lg:mb-12">
                                    <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
                                        <GraduationCap className="w-8 h-8 lg:w-10 lg:h-10 text-blue-500" />
                                        <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                                            About MMMUT
                                        </h1>
                                    </div>
                                    <p className="text-sm lg:text-base text-gray-400">
                                        Established 1962 | Upgraded to University 2013
                                    </p>
                                    <div className="h-1 w-24 lg:w-32 bg-blue-500/20 rounded-full mt-3 lg:mt-4"></div>
                                </header>

                                {/* Image Carousel Section */}
                                <section className="mb-8 lg:mb-16">
                                    <Carousel className="w-full">
                                        <CarouselContent>
                                            {universityImages.map((image, index) => (
                                                <CarouselItem key={index}>
                                                    <Card className="border-0 bg-transparent">
                                                        <CardContent className="p-0">
                                                            <div className="relative h-[200px] lg:h-[300px] overflow-hidden rounded-xl">
                                                                <Image
                                                                    src={image.src}
                                                                    alt={image.alt}
                                                                    fill
                                                                    className="object-cover"
                                                                    priority={index === 0}
                                                                />
                                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 lg:p-4">
                                                                    <p className="text-xs lg:text-sm font-medium text-white">
                                                                        {image.caption}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="left-1 lg:left-2 bg-white/10 hover:bg-white/20 border-0 h-7 w-7 lg:h-8 lg:w-8">
                                            <ChevronLeft className="w-4 h-4 text-white" />
                                        </CarouselPrevious>
                                        <CarouselNext className="right-1 lg:right-2 bg-white/10 hover:bg-white/20 border-0 h-7 w-7 lg:h-8 lg:w-8">
                                            <ChevronRight className="w-4 h-4 text-white" />
                                        </CarouselNext>
                                    </Carousel>
                                </section>

                                {/* Vision Section */}
                                <section id="vision" className="mb-8 lg:mb-16 transform hover:scale-[1.01] transition-all duration-300">
                                    <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                                        <div className="w-6 h-6 lg:w-7 lg:h-7 text-blue-500">
                                            <Target />
                                        </div>
                                        <h2 className="text-2xl lg:text-3xl font-semibold text-white capitalize">
                                            Vision
                                        </h2>
                                    </div>
                                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                        <p className="text-gray-300 leading-relaxed text-lg">
                                            To facilitate and promote studies, research, technology incubation, product innovation and extension work in Science, Technology and Management Education, and also to achieve excellence in higher technical education.
                                        </p>
                                    </div>
                                </section>

                                {/* Mission Section */}
                                <section id="mission" className="mb-8 lg:mb-16 transform hover:scale-[1.01] transition-all duration-300">
                                    <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                                        <div className="w-6 h-6 lg:w-7 lg:h-7 text-blue-500">
                                            <Compass />
                                        </div>
                                        <h2 className="text-2xl lg:text-3xl font-semibold text-white capitalize">
                                            Mission
                                        </h2>
                                    </div>
                                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                        <div className="space-y-4 text-gray-300">
                                            <p className="text-lg font-medium text-blue-400">The distinctive mission of the MMMUT is:</p>
                                            <ul className="list-none space-y-4">
                                                <li className="flex items-start gap-3">
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                    </span>
                                                    <span className="text-gray-300 leading-relaxed">
                                                        To serve society as a center of higher learning, providing long-term societal benefits through transmitting advanced knowledge, discovering new knowledge and functioning as an active working repository of organized knowledge.
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                    </span>
                                                    <span className="text-gray-300 leading-relaxed">
                                                        To take leadership role by providing need-based programs in engineering and technology, applied sciences, management, humanities, architecture, pharmacy, retail and fashion design, mass-communication, agriculture and other employable courses in emerging areas.
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                    </span>
                                                    <span className="text-gray-300 leading-relaxed">
                                                        To promote compassionate care of the highest quality that translates new knowledge into meaningful improvements in technological outcomes through interdisciplinary collaboration, fiscal responsibility, support of diversity, a focus on quality and a culture of professionalism.
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                    </span>
                                                    <span className="text-gray-300 leading-relaxed">
                                                        To establish value creating networks and foster relationship with other leading institutes of higher learning and research, alumni and industries in order to provide significant contribution to national and international development.
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                    </span>
                                                    <span className="text-gray-300 leading-relaxed">
                                                        To create an intellectually stimulating Infrastructure and conducive environment for technology research, scholarship, creativity, innovation, entrepreneurship, and professional activity for service to community and economy.
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                {/* Core Values Section */}
                                <section id="core-values" className="mb-8 lg:mb-16 transform hover:scale-[1.01] transition-all duration-300">
                                    <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                                        <div className="w-6 h-6 lg:w-7 lg:h-7 text-blue-500">
                                            <Heart />
                                        </div>
                                        <h2 className="text-2xl lg:text-3xl font-semibold text-white capitalize">
                                            Core Values
                                        </h2>
                                    </div>
                                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                "Academic integrity",
                                                "Accountability with transparency",
                                                "Social responsibilities",
                                                "Creative excellence",
                                                "Spirit of innovation",
                                                "Holistic knowledge"
                                            ].map((value, index) => (
                                                <li key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/20 hover:bg-gray-700/30 transition-colors">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                    <span className="text-gray-300">{value}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </section>

                                {/* About Section */}
                                <section id="about" className="mb-8 lg:mb-16 transform hover:scale-[1.01] transition-all duration-300">
                                    <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                                        <div className="w-6 h-6 lg:w-7 lg:h-7 text-blue-500">
                                            <School />
                                        </div>
                                        <h2 className="text-2xl lg:text-3xl font-semibold text-white capitalize">
                                            About MMMUT-Gorakhpur
                                        </h2>
                                    </div>
                                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                        <div className="space-y-6 text-gray-300">
                                            <p className="leading-relaxed">
                                                Madan Mohan Malaviya University of Technology, Gorakhpur has been established in year 2013 by the Government of Uttar Pradesh in the form of a non-affiliating, teaching and research University after reconstituting the Madan Mohan Malaviya Engineering College, Gorakhpur which was established in 1962.
                                            </p>
                                            <p className="leading-relaxed">
                                                Fifty-Four batches of students have entered its portals to emerge after four years of rigorous education under the tutelage of some of the most venerable teachers, engineers ready to face the world and create new worlds. The University is located in the Gorakhpur-Deoria road about 9 Km away from Gorakhpur Railway Station.
                                            </p>
                                            <p className="leading-relaxed">
                                                In addition to UG in Civil Engineering, Chemical Engineering, Computer Science & Engineering, Mechanical Engineering, Electrical Engineering and Electronics & Communication Engineering, Information Technology, University also offers MCA, BBA, MBA, M. Tech, M.Sc. and Ph.D. courses in various specializations.
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </article>

                        {/* Navigation - Right Section - Hidden on Mobile */}
                        <aside className="hidden lg:block lg:w-1/4 bg-gray-800/30 backdrop-blur-md border-l border-gray-700/50" role="complementary">
                            <div className="sticky top-24 p-8">
                                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                                    <h3 className="text-xl font-semibold mb-8 flex items-center gap-2 text-white">
                                        <BookOpen className="w-5 h-5 text-blue-500" />
                                        Quick Navigation
                                    </h3>
                                    <nav className="space-y-2">
                                        {navigationLinks.map((link) => (
                                            <Link
                                                key={link.title}
                                                href={link.href}
                                                className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-blue-400 transition-all duration-200 group"
                                            >
                                                <link.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                <span className="font-medium">{link.title}</span>
                                                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </aside>

                        {/* Mobile Navigation - Fixed Bottom */}
                        <nav className="fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-md border-t border-gray-700/50 p-2 lg:hidden z-50">
                            <div className="flex justify-around">
                                {navigationLinks.map((link) => (
                                    <a
                                        key={link.title}
                                        href={link.href}
                                        className="flex flex-col items-center p-2 text-gray-400 hover:text-blue-400"
                                    >
                                        <link.icon className="w-5 h-5" />
                                        <span className="text-xs mt-1">{link.title}</span>
                                    </a>
                                ))}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutMMMUT;

