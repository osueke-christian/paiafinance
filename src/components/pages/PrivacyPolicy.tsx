import React, { useEffect, useRef } from 'react'
import Footer from '../Footer'


function PrivacyPolicy() {
    const heroContentRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
    
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in-up')
            }
          })
        }, observerOptions)
    
        if (contentRef.current) {
          observer.observe(contentRef.current)
        }
    
        if (heroContentRef.current) {
            const heroElement = heroContentRef.current  // Capture the value
            setTimeout(() => {
              heroElement.classList.add('animate-fade-in-up')  // Use the captured value
            }, 200)
          }
    
        return () => observer.disconnect()
      }, [])

       

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .initial-hidden {
          opacity: 0;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .privacy-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #141416;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }

        .privacy-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #25375B;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .privacy-content p {
          color: #4B5563;
          line-height: 1.75;
          margin-bottom: 1rem;
        }

        .privacy-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          color: #4B5563;
        }

        .privacy-content li {
          margin-bottom: 0.5rem;
          line-height: 1.75;
        }

        .privacy-content a {
          color: #3B82F6;
          text-decoration: underline;
        }

        .privacy-content a:hover {
          color: #2563EB;
        }

        .contact-box {
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
        }

        .contact-box h3 {
          margin-top: 0;
        }
      `}</style>

      {/* Hero Section */}
      <div className="h-[500px] relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/images/servicesBg.png" 
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              ref={heroContentRef}
              className="text-center pt-20 md:pt-32 initial-hidden"
            >
              {/* Badge */}
              <div className="inline-flex items-center justify-center mb-8">
                <div className="bg-[#25375B] text-white px-6 py-2 rounded-full text-sm font-medium hover-lift">
                  Privacy Policy
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-[40px] font-semibold text-[#141416] leading-tight mb-4 max-w-5xl mx-auto">
                Your Privacy Matters to Us
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Learn how we protect and manage your personal information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div 
        ref={contentRef}
        className="py-16 bg-white initial-hidden"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="privacy-content">
            
            <p className="text-xl font-semibold text-[#25375B] mb-2">
              Effective Date: 15th August 2025
            </p>
            
            <p className="text-lg mb-8">
              Welcome to PAIA Finance ("we", "our", "us"). We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit and interact with our website at <a href="https://paiafinance.com" target="_blank" rel="noopener noreferrer">https://paiafinance.com</a>.
            </p>

            <h2>1. Information We Collect</h2>
            
            <h3>1.1 Personal Information You Provide</h3>
            <p>You may voluntarily provide us with personal information, including:</p>
            <ul>
              <li>Name, email address, phone number, and other contact details.</li>
              <li>Financial, employment, or loan-related information necessary for service provision.</li>
              <li>Messages and correspondence submitted via forms or support channels.</li>
            </ul>

            <h3>1.2 Automatically Collected Data</h3>
            <p>Through cookies and analytics tools, we automatically collect data such as:</p>
            <ul>
              <li>IP address, device and browser type, pages visited, timestamps, and referring URLs.</li>
              <li>Usage patterns such as clicks, scrolls, and navigation behavior.</li>
            </ul>

            <h3>1.3 Cookies and Tracking Technologies</h3>
            <p>We use various cookies and tracking technologies:</p>
            <ul>
              <li>Necessary cookies for essential Site functions.</li>
              <li>Analytics cookies (e.g., Google Analytics) to monitor traffic and improve your experience.</li>
            </ul>
            <p>You may opt out or manage cookies via your browser settings—but please note this may limit certain Site functions. This aligns with standard practices observed in similar policies.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul>
              <li>Provide, maintain, and improve our services.</li>
              <li>Communicate with you, respond to inquiries, and send updates (with your consent).</li>
              <li>Personalize your experience and remember your preferences.</li>
              <li>Facilitate any services or loan applications you initiate with us.</li>
              <li>Monitor and secure our Site, ensuring its proper operation.</li>
            </ul>

            <h2>3. Legal Basis for Processing</h2>
            <p>Under GDPR, we process personal data based on:</p>
            <ul>
              <li><strong>Contractual necessity:</strong> To fulfill services you request (e.g., loan applications).</li>
              <li><strong>Legitimate interests:</strong> For improving Site functionality, marketing, analytics, or security.</li>
              <li><strong>Consent:</strong> When required, such as for email updates—withdrawable at any time.</li>
            </ul>

            <h2>4. Sharing Your Information</h2>
            <p>We may share your data with:</p>
            <ul>
              <li>Service providers helping us operate the Site (e.g., analytics, hosting).</li>
              <li>Legal or regulatory entities when required.</li>
              <li>Third parties with your explicit consent (e.g., referring agents).</li>
            </ul>
            <p>We do not sell or rent your personal information.</p>

            <h2>5. International Transfers</h2>
            <p>Your data may be transferred and processed outside the EU (e.g., by service providers in other countries). We ensure appropriate protections are in place.</p>

            <h2>6. Data Retention</h2>
            <p>We retain personal data only as long as necessary to:</p>
            <ul>
              <li>Fulfill the purposes outlined (e.g., loan processing, customer support).</li>
              <li>Comply with legal, regulatory, or reporting requirements.</li>
              <li>In some cases, aggregate and anonymize data for analysis—no longer identifiable to you.</li>
            </ul>

            <h2>7. Your Rights</h2>
            <p>Under applicable data protection laws (e.g., GDPR), you have the right to:</p>
            <ul>
              <li>Access your personal data and request a copy.</li>
              <li>Rectify inaccurate or incomplete data.</li>
              <li>Erase your data ("right to be forgotten") where applicable.</li>
              <li>Restrict or object to processing based on legitimate interest.</li>
              <li>Withdraw consent for processing and direct marketing.</li>
              <li>Data portability: Receive your data in a structured, machine-readable format.</li>
              <li>Lodge a complaint with a supervisory authority if needed.</li>
            </ul>

            <h2>8. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your data from unauthorized access, alteration, disclosure, or destruction. While we strive for strong safeguards, no systems are 100% secure.</p>

            <h2>9. Links to Other Websites</h2>
            <p>Our Site may contain links to external websites with separate privacy practices. This Policy covers only our Sites. We encourage you to review the privacy notices of any linked sites.</p>

            <h2>10. Updates to This Privacy Policy</h2>
            <p>We may update this Privacy Policy periodically. We will post changes on the Site and, if needed, notify you by email. Please check back regularly for latest versions.</p>

            <h2>11. Contact Us</h2>
            <p>If you have questions about this Policy, wish to exercise your rights, or file a complaint, please contact us:</p>
            <h3>PAIA Finance</h3>
              <p><strong>Email:</strong> <a href="mailto:info@paiafinance.com">info@paiafinance.com</a></p>
              <p><strong>Address:</strong> Meydan Grandstand, 6th floor, Meydan Road, Nad El Sheba Dubai United Arab Emirates</p>
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PrivacyPolicy