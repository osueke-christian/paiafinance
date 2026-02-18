import React, { useEffect, useRef } from 'react'
import Footer from '../Footer'

function ContactUs() {
  const heroContentRef:any = useRef(null)
  const contactSectionRef = useRef(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry:any) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
          
          // Special handling for contact section
          if (entry.target === contactSectionRef.current) {
            const cards = entry.target.querySelectorAll('.contact-card')
            cards.forEach((card:any, index:any) => {
              setTimeout(() => {
                card.classList.add('animate-scale-in')
              }, index * 150)
            })

            const officeLinks = entry.target.querySelectorAll('.office-link')
            officeLinks.forEach((link:any, index:any) => {
              setTimeout(() => {
                link.classList.add('animate-bounce-in')
              }, 600 + (index * 100))
            })
          }
        }
      })
    }, observerOptions)

    const refs = [contactSectionRef]
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

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
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

        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
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

        .card-hover {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .card-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(17, 127, 245, 0.1), transparent);
          transition: left 0.6s;
        }

        .card-hover:hover::before {
          left: 100%;
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(17, 127, 245, 0.15);
          border-color: rgba(17, 127, 245, 0.3);
        }

        .icon-hover {
          transition: all 0.3s ease;
        }

        .icon-hover:hover {
          transform: scale(1.1) rotate(5deg);
        }

        .text-glow {
          transition: all 0.3s ease;
        }

        .text-glow:hover {
          text-shadow: 0 0 8px rgba(22, 128, 235, 0.3);
        }

        .office-link {
          transition: all 0.3s ease;
          position: relative;
        }

        .office-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(17, 127, 245, 0.2);
        }

        .contact-link {
          transition: all 0.3s ease;
          position: relative;
        }

        .contact-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 2px;
          background: #117FF5;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .contact-link:hover::after {
          width: 100%;
        }

        .contact-link:hover {
          color: #117FF5;
        }

        .badge-hover {
          transition: all 0.3s ease;
        }

        .badge-hover:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(37, 55, 91, 0.3);
        }

        .gradient-bg {
          background: linear-gradient(135deg, #F5FAFE 0%, #E8F4FD 100%);
        }
      `}</style>

      {/* Hero Section */}
      <div className="h-[600px] relative overflow-hidden"
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
        <div className="relative z-10 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              ref={heroContentRef}
              className="text-center pt-20 md:pt-32 initial-hidden"
            >

              {/* Services Badge */}
              <div className="inline-flex items-center justify-center mb-8">
                <div className="bg-[#25375B] text-white px-6 py-2 rounded-full text-sm font-medium badge-hover">
                  Contact Us
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-[40px] font-semibold text-[#141416] leading-tight lg:leading-tight-[50px] mb-6 max-w-5xl mx-auto text-glow">
                We're here to help.
              </h1>
              <p className='text-[#141416] text-[16px]'>PaiaFinance is ready to provide the right solution according to your needs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <section 
        ref={contactSectionRef}
        className="py-20 initial-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

            {/* Email Address */}
            <div className="contact-card md:col-span-3 gradient-bg rounded-2xl p-8 text-center initial-hidden card-hover border border-transparent">
              <div className="flex items-center justify-center mx-auto mb-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-hover">
                  <path d="M7.69333 31.6667C6.92556 31.6667 6.285 31.41 5.77167 30.8967C5.25833 30.3834 5.00111 29.7423 5 28.9734V11.0267C5 10.2589 5.25722 9.61837 5.77167 9.10504C6.28611 8.59171 6.92611 8.33449 7.69167 8.33337H32.3083C33.075 8.33337 33.715 8.5906 34.2283 9.10504C34.7417 9.61948 34.9989 10.26 35 11.0267V28.975C35 29.7417 34.7428 30.3823 34.2283 30.8967C33.7139 31.4112 33.0739 31.6678 32.3083 31.6667H7.69333ZM20 19.9334C20.1389 19.9334 20.2689 19.9123 20.39 19.87C20.51 19.8278 20.6289 19.7762 20.7467 19.715L32.795 11.8267C32.9528 11.7312 33.0556 11.6006 33.1033 11.435C33.1511 11.2695 33.1422 11.1045 33.0767 10.94C33.0344 10.7256 32.8944 10.57 32.6567 10.4734C32.42 10.3778 32.1906 10.3973 31.9683 10.5317L20 18.3334L8.03333 10.5334C7.81111 10.3978 7.58667 10.3689 7.36 10.4467C7.13333 10.5245 6.98778 10.6778 6.92333 10.9067C6.85889 11.0778 6.85056 11.2517 6.89833 11.4284C6.94611 11.605 7.04833 11.7384 7.205 11.8284L19.2533 19.715C19.3711 19.7762 19.49 19.8278 19.61 19.87C19.7311 19.9112 19.8611 19.9317 20 19.9317" fill="#117FF5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Address</h3>
              <a href="mailto:support@paiafinance.com" className="contact-link text-gray-600 transition-colors">
                support@paiafinance.com
              </a>
            </div>

            {/* Our Offices - Larger Section */}
            <div className="contact-card md:col-span-6 gradient-bg rounded-2xl p-8 text-center initial-hidden card-hover border border-transparent">
              <div className="flex items-center justify-center mx-auto mb-4">
                <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-hover">
                  <path d="M20.5 2.5C13.5992 2.5 8 7.53984 8 13.75C8 23.75 20.5 37.5 20.5 37.5C20.5 37.5 33 23.75 33 13.75C33 7.53984 27.4008 2.5 20.5 2.5ZM20.5 20C19.5111 20 18.5444 19.7068 17.7221 19.1573C16.8999 18.6079 16.259 17.827 15.8806 16.9134C15.5022 15.9998 15.4031 14.9945 15.5961 14.0245C15.789 13.0546 16.2652 12.1637 16.9645 11.4645C17.6637 10.7652 18.5546 10.289 19.5245 10.0961C20.4945 9.90315 21.4998 10.0022 22.4134 10.3806C23.327 10.759 24.1079 11.3999 24.6573 12.2221C25.2068 13.0444 25.5 14.0111 25.5 15C25.4986 16.3256 24.9713 17.5966 24.0339 18.5339C23.0966 19.4713 21.8256 19.9986 20.5 20Z" fill="#117FF5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Offices</h3>
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                <a href="#" className="office-link flex items-center transition-colors bg-[#FFFFFF] px-[8px] py-[4px] rounded-[4px] initial-hidden">
                  Dubai, UAE
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a href="#" className="office-link flex items-center transition-colors bg-[#FFFFFF] px-[8px] py-[4px] rounded-[4px] initial-hidden">
                  Comoros
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a href="#" className="office-link flex items-center transition-colors bg-[#FFFFFF] px-[8px] py-[4px] rounded-[4px] initial-hidden">
                  Cyprus
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a href="#" className="office-link flex items-center transition-colors bg-[#FFFFFF] px-[8px] py-[4px] rounded-[4px] initial-hidden">
                  Sydney
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a href="#" className="office-link flex items-center transition-colors bg-[#FFFFFF] px-[8px] py-[4px] rounded-[4px] initial-hidden">
                  HongKong
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Phone Number */}
            <div className="contact-card md:col-span-3 gradient-bg rounded-2xl p-8 text-center initial-hidden card-hover border border-transparent">
              <div className="flex items-center justify-center mx-auto mb-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-hover">
                  <path d="M34.145 28.5667L27.37 22.4067C27.0499 22.1152 26.629 21.9597 26.1963 21.9731C25.7636 21.9864 25.3531 22.1676 25.0517 22.4783L21.0633 26.58C20.1033 26.3967 18.1733 25.795 16.1867 23.8133C14.2 21.825 13.5983 19.89 13.42 18.9367L17.5183 14.9467C17.829 14.6452 18.0102 14.2347 18.0236 13.802C18.037 13.3693 17.8815 12.9484 17.59 12.6283L11.4317 5.85499C11.1401 5.53392 10.7348 5.33917 10.3019 5.31209C9.86904 5.28502 9.44266 5.42776 9.11333 5.70999L5.49666 8.81166C5.20852 9.10085 5.03653 9.48574 5.01333 9.89332C4.98833 10.31 4.51166 20.18 12.165 27.8367C18.8417 34.5117 27.205 35 29.5083 35C29.845 35 30.0517 34.99 30.1067 34.9867C30.5139 34.9626 30.8981 34.79 31.1867 34.5017L34.2867 30.8833C34.57 30.555 34.7138 30.129 34.6873 29.6962C34.6609 29.2633 34.4662 28.858 34.145 28.5667Z" fill="#117FF5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Number</h3>
              <a href="tel:+26946918338" className="contact-link text-gray-600 transition-colors">
                +269 469 18 38
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ContactUs