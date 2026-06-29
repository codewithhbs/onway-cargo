import AboutHome from '@/components/AboutHome'
import BlogHome from '@/components/BlogHome'
import CountHome from '@/components/CountHome'
import GalleryHome from '@/components/GalleryHome'
import Hero from '@/components/Hero'
import QuotesHome from '@/components/QuotesHome'
import ServiceHome from '@/components/ServiceHome'
import TeamHome from '@/components/TeamHome'
import TestimonialHome from '@/components/TestimonialHome'
import React from 'react'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutHome />
      <ServiceHome />
      <QuotesHome />
      <GalleryHome />
      <TestimonialHome />
      {/* <CountHome /> */}
      <TeamHome />
      <BlogHome />
    </>
  )
}
