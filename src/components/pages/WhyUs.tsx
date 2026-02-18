import React, { useEffect, useRef } from 'react'
import Footer from '../Footer'

function WhyUs() {
  const heroContentRef:any = useRef(null)
  const imageRef = useRef(null)
  const storyRef = useRef(null)
  const whyChooseRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry:any) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
          
          // Special handling for story section to animate paragraphs
          if (entry.target === storyRef.current) {
            const paragraphs = entry.target.querySelectorAll('p.initial-hidden')
            paragraphs.forEach((p:any, index:any) => {
              setTimeout(() => {
                p.classList.add('animate-fade-in-up')
              }, index * 100)
            })
          }

          // Special handling for why choose section to animate stagger items
          if (entry.target === whyChooseRef.current) {
            const staggerContainer = entry.target.querySelector('.stagger-animate')
            if (staggerContainer) {
              staggerContainer.classList.add('stagger-animate')
            }
          }
        }
      })
    }, observerOptions)

    const refs = [imageRef, storyRef, whyChooseRef, ctaRef]
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current)
    })

    // Hero content entrance animation
    if (heroContentRef.current) {
      setTimeout(() => {
        heroContentRef.current.classList.add('animate-fade-in-up')
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.8s ease-out forwards;
        }

        .animate-delay-100 {
          animation-delay: 0.1s;
        }

        .animate-delay-200 {
          animation-delay: 0.2s;
        }

        .animate-delay-300 {
          animation-delay: 0.3s;
        }

        .animate-delay-400 {
          animation-delay: 0.4s;
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

        .pulse-button {
          transition: all 0.3s ease;
        }

        .pulse-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
        }

        .stagger-item {
          opacity: 0;
          transform: translateY(20px);
        }

        .stagger-animate .stagger-item:nth-child(1) {
          animation: fadeInUp 0.6s ease-out 0.1s forwards;
        }

        .stagger-animate .stagger-item:nth-child(2) {
          animation: fadeInUp 0.6s ease-out 0.2s forwards;
        }

        .stagger-animate .stagger-item:nth-child(3) {
          animation: fadeInUp 0.6s ease-out 0.3s forwards;
        }

        .stagger-animate .stagger-item:nth-child(4) {
          animation: fadeInUp 0.6s ease-out 0.4s forwards;
        }
      `}</style>

      {/* Hero Section */}
      <div className="min-h-[600px] relative overflow-hidden"
        >

       {/* Background Image */}
<div className="absolute inset-0 overflow-hidden">
                    <img 
                        src="/images/servicesBg.png" 
                        alt="Hero Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

        {/* Main Content */}
        <div className="relative z-10 pt-20 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              ref={heroContentRef}
              className="text-center pt-16 md:pt-24 initial-hidden"
            >

              {/* Services Badge */}
              <div className="inline-flex items-center justify-center mb-8">
                <div className="bg-[#25375B] text-white px-6 py-2 rounded-full text-sm font-medium hover-lift">
                  Why Us
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-[40px] font-semibold text-[#141416] leading-tight lg:leading-tight-[50px] mb-8 max-w-5xl mx-auto">
                Built at the Intersection of Regulation and <br />Growth
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping Image Section */}
      <div 
        ref={imageRef}
        className="relative -mt-32 mb-16 z-20 initial-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='max-w-4xl mx-auto'>
            <img
              src="/images/whyUs.png"
              alt="Comoros locations - flag, traditional building, and modern architecture"
              className="w-full h-auto rounded-2xl shadow-lg hover-lift transition-all duration-700"
            />
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div 
        ref={storyRef}
        className="py-16initial-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#141416] mb-8 animate-slide-in-left">
              Our Story
            </h2>

            <div className="space-y-6 text-[#5F6578] leading-relaxed">
              <p className="text-lg initial-hidden animate-delay-100">
                Once an overlooked archipelago in the Indian Ocean, Comoros is decided to transform itself into a
                thriving and regulated hub for forex and crypto activities by 2025. Comoros consists of three main islands
                —Mohéli, Anjouan, and Grande Comore independent since 6th of July 1975.
              </p>

              <p className="text-lg initial-hidden animate-delay-200">
                For years, the country suffered from the issuance of unrecognized licences of different kind, forex,
                offshore banking etc.
              </p>

              <p className="text-lg initial-hidden animate-delay-300">
                The government of Comoros had informed the public without success which led the Ministry of Finance to
                seek advice from professionals and create a proper framework for the issuance of forex and crypto asset
                licences.
              </p>

              <p className="text-lg initial-hidden animate-delay-400">
               PAIA Finance has received in 2025 the exclusive right to distribute licences for forex brokerage and crypto
                  asset companies in Comoros accompanied by a consortium of expert companies in the field.
              </p>

              <p className="text-lg initial-hidden animate-delay-300">
                A new anti-money laundering (AML) and know-your-customer (KYC) regulation voted in 2025 give
                international clients and partners peace of mind, while simplified compliance requirements allowed
                companies to focus on growth, technology, and customer service coupled with a favourable tax regime.
              </p>

              <p className="text-lg initial-hidden animate-delay-400">
                PAIA Finance is also present in Cyprus, Singapore, Dubai, HongKong and Sydney to serve your needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose PaiaFinance Section */}
      <div 
        ref={whyChooseRef}
        className="py-16 bg-white initial-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column - Content */}
            <div className="animate-slide-in-left">
              <h2 className="text-3xl md:text-4xl font-bold text-[#141416] mb-8">
                Why Choose PaiaFinance?
              </h2>
              <div className=' animate-scale-in'>
              <img 
                src="/images/financeLogo.svg" 
                alt="logo"
                className="h-8 sm:h-16 w-auto"
              />
              </div>
             

              
            </div>

            {/* Right Column - Logo/Badge */}
            <div className="flex justify-center lg:justify-end animate-slide-in-right">
            <div className=" space-y-3 stagger-animate">
                <div className="flex items-start space-x-4 stagger-item  transition-all duration-300 ">
                  <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#141416] rounded-full mt-3"></div>
                  <p className="text-[16px] text-[#141416] font-medium">
                  Sole mandate from Ministry of Finance in Comoros.
                  </p>
                </div>

                <div className="flex items-start space-x-4 stagger-item transition-all duration-300 ">
                  <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#141416] rounded-full mt-3"></div>
                  <p className="text-[16px] text-[#141416] font-medium">
                  Forex and Crypto regime built on international standards
                  </p>
                </div>

                <div className="flex items-start space-x-4 stagger-item transition-all duration-300 ">
                  <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#141416] rounded-full mt-3"></div>
                  <p className="text-[16px] text-[#141416] font-medium">
                  Fast-track option: 6 weeks (over 50% faster).
                  </p>
                </div>

                <div className="flex items-start space-x-4 stagger-item transition-all duration-300 ">
                  <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#141416] rounded-full mt-3"></div>
                  <p className="text-[16px] text-[#141416] font-medium">
                  Cost-efficient setup with structured ongoing compliance.
                   
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <Footer />
    </>
  )
}

export default WhyUs