import React from 'react'
import PageBanner from '@/components/PageBanner'

export const metadata = {
  title: 'Incoterms 2020',
  description: 'A quick guide to Incoterms 2020 — the standard international trade terms (EXW, FCA, FOB, CIF, DAP, DDP and more) that define buyer and seller responsibilities.',
  alternates: { canonical: '/incoterms' },
}

const TERMS = [
  ['EXW', 'Ex Works', 'Seller makes goods available at their premises; buyer bears all costs and risk from that point.', 'Any mode'],
  ['FCA', 'Free Carrier', 'Seller delivers goods, cleared for export, to the carrier nominated by the buyer at a named place.', 'Any mode'],
  ['CPT', 'Carriage Paid To', 'Seller pays carriage to the named destination; risk transfers when goods are handed to the first carrier.', 'Any mode'],
  ['CIP', 'Carriage & Insurance Paid To', 'As CPT, but the seller also arranges insurance to the named destination.', 'Any mode'],
  ['DAP', 'Delivered At Place', 'Seller delivers when goods are ready for unloading at the named destination.', 'Any mode'],
  ['DPU', 'Delivered At Place Unloaded', 'Seller delivers and unloads goods at the named destination.', 'Any mode'],
  ['DDP', 'Delivered Duty Paid', 'Seller bears all costs and risks, including import duties, to the named destination.', 'Any mode'],
  ['FAS', 'Free Alongside Ship', 'Seller delivers when goods are placed alongside the vessel at the named port.', 'Sea & inland waterway'],
  ['FOB', 'Free On Board', 'Seller delivers goods on board the vessel; risk transfers once on board.', 'Sea & inland waterway'],
  ['CFR', 'Cost & Freight', 'Seller pays cost and freight to the destination port; risk transfers on board.', 'Sea & inland waterway'],
  ['CIF', 'Cost Insurance & Freight', 'As CFR, but the seller also arranges marine insurance.', 'Sea & inland waterway'],
]

export default function Page() {
  return (
    <>
      <PageBanner title="Incoterms 2020" crumb="Incoterms" />
      <section className="incoterms-area pt-120 pb-90 wow fadeInUp">
        <div className="container">
          <div className="row justify-content-center mb-50">
            <div className="col-lg-9 text-center">
              <div className="section__title mb-25">
                <span className="sub-title">trade terms</span>
                <h2 className="title">Understanding Incoterms 2020</h2>
              </div>
              <p>Incoterms&reg; are a set of internationally recognised trade terms published by the International Chamber of Commerce. They define the responsibilities of buyers and sellers for the delivery of goods, clarifying who arranges and pays for transport, insurance, export and import clearance, and where risk passes from seller to buyer. Choosing the right Incoterm helps avoid disputes and unexpected costs in international trade.</p>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead style={{ background: '#e3232a', color: '#fff' }}>
                <tr>
                  <th>Term</th>
                  <th>Full Name</th>
                  <th>Responsibility Summary</th>
                  <th>Mode</th>
                </tr>
              </thead>
              <tbody>
                {TERMS.map((t) => (
                  <tr key={t[0]}>
                    <td><strong>{t[0]}</strong></td>
                    <td>{t[1]}</td>
                    <td>{t[2]}</td>
                    <td>{t[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-30 text-muted"><small>Incoterms&reg; is a registered trademark of the International Chamber of Commerce. This guide is provided for general information only — always confirm terms in your contract of sale.</small></p>
        </div>
      </section>
    </>
  )
}
