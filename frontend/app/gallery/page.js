import React from 'react'
import PageBanner from '@/components/PageBanner'
import GalleryGrid from '@/components/GalleryGrid'
import { getGallery } from '@/lib/api'

export const metadata = {
  title: 'Gallery',
  description: 'Explore the Onwayy Cargo gallery — a look at our logistics operations, warehousing, freight handling and global cargo movement.',
  alternates: { canonical: '/gallery' },
}

export default async function Page() {
  const items = await getGallery()
  return (
    <>
      <PageBanner title="Gallery" crumb="Gallery" />
      <section className="gallery-area pt-120 pb-90 wow fadeInUp">
        <div className="container">
          <GalleryGrid items={items} />
        </div>
      </section>
    </>
  )
}
