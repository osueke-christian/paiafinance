import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import Footer from '../Footer'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-responsive-modal/styles.css";
import { Modal } from 'react-responsive-modal'

function Services() {
  const heroContentRef:any = useRef(null)
  const licensesRef = useRef(null)
  const howItWorksRef = useRef(null)
  const endToEndRef = useRef(null)

  const [open, setOpen] = useState(false);
  const [brochureType, setBrochureType] = useState(''); // 'forex' or 'crypto'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onOpenModal = (type:any) => {
    setBrochureType(type);
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setBrochureType('');
    setFormData({
      fullName: '',
      email: '',
      phone: ''
    });
    setIsSubmitting(false);
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to trigger PDF download
  const downloadPDF = (type:any) => {
    const pdfUrl = type === 'forex' 
      ? '/pdfs/forex-brochure.pdf'  // Make sure this file exists in your public/pdfs folder
      : '/pdfs/crypto-brochure.pdf'; // Make sure this file exists in your public/pdfs folder
    
    const fileName = type === 'forex' 
      ? 'Comoros-Forex-License-Brochure.pdf'
      : 'Comoros-Crypto-License-Brochure.pdf';

    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendBrochure = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;

    // Encode form data for Netlify
        const encode = (data:any) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
                .join("&");
        };

        const netlifyFormData = {
          "form-name": "brochure-download",
          "fullName": form.fullName.value,     
          "email": form.email.value,           
          "phone": form.phone.value || '',     
          "brochureType": brochureType,
          "timestamp": new Date().toISOString()
        };

    try {

      
    

     const response = await fetch("/", {
                  method: "POST",
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: encode(netlifyFormData)
              });

              if (!response.ok) {
                const responseText = await response.text();
                console.error('Response error:', responseText);
                throw new Error(`HTTP error! status: ${response.status}`);
              }


      // Trigger PDF download after successful form submission
      downloadPDF(brochureType);

      // Show success message
      alert(`Thank you! Your ${brochureType === 'forex' ? 'Forex' : 'Crypto'} brochure is downloading now. We'll also send additional resources to your email.`);

      // Close modal after successful submission
      onCloseModal();

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error processing your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry:any) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
          
          // Special handling for license cards
          if (entry.target === licensesRef.current) {
            const cards = entry.target.querySelectorAll('.license-card')
            cards.forEach((card:any, index:any) => {
              setTimeout(() => {
                card.classList.add('animate-scale-in')
              }, index * 200)
            })
          }

          // Special handling for process steps
          if (entry.target === howItWorksRef.current) {
            const steps = entry.target.querySelectorAll('.process-step')
            steps.forEach((step:any, index:any) => {
              setTimeout(() => {
                step.classList.add('animate-slide-in-left')
              }, index * 150)
            })
          }

          // Special handling for accordion items
          if (entry.target === endToEndRef.current) {
            const accordionItems = entry.target.querySelectorAll('.accordion-item')
            accordionItems.forEach((item:any, index:any) => {
              setTimeout(() => {
                item.classList.add('animate-fade-in-up')
              }, index * 100)
            })
          }
        }
      })
    }, observerOptions)

    const refs = [licensesRef, howItWorksRef, endToEndRef]
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
      <Helmet>
        <title>Comoros Forex &amp; Crypto Licensing Services | Paia Finance</title>
        <meta name="description" content="End-to-end Comoros Forex/Crypto licensing—KYC, due diligence, app prep, MoF filing, regulator follow-up. Flexible structures + fast-track option." />
        <meta name="keywords" content="Comoros forex license, Comoros crypto license, forex licensing services, crypto licensing services, Union of Comoros license, Ministry of Finance Comoros filing, KYC due diligence, name check, application preparation, document review, regulator follow up, fast track licensing, corporate governance framework, compliance stack setup, banking and safeguarding, compliance monitoring systems, policy procedure manuals, risk management documentation, training and compliance" />
        <link rel="canonical" href="https://www.paiafinance.com/services" />
      </Helmet>
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

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .step-hover {
          transition: all 0.3s ease;
        }

        .step-hover:hover {
          transform: translateX(10px);
          background-color: rgba(59, 130, 246, 0.05);
          border-radius: 12px;
          padding: 12px;
          margin: -12px;
        }

        .accordion-hover {
          transition: all 0.3s ease;
        }

        .accordion-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
                <div className="bg-[#25375B] text-white px-6 py-2 rounded-full text-sm font-medium hover-lift">
                  Our Services
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-[40px] font-semibold text-[#141416] leading-tight lg:leading-tight-[50px] mb-8 max-w-5xl mx-auto">
                Comprehensive licensing solutions for Forex and <br />Crypto
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Our Licenses Overview Section */}
      <section 
        ref={licensesRef}
        className="py-16 bg-white initial-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Licenses Overview
            </h2>
          </div>

          {/* License Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

            {/* Forex License Card */}
            <div className="license-card relative rounded-3xl p-6 overflow-hidden border border-[#ABD2FA] bg-[#ECF4FC] initial-hidden card-hover">
              <div className="relative z-10">
                {/* Icon */}
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 hover:scale-110">
                  <circle cx="40" cy="40" r="40" fill="#DEEBF8" />
                  <g clipPath="url(#clip0_155_1500)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M40.0001 41.6667C42.2102 41.6667 44.3298 40.7887 45.8926 39.2259C47.4554 37.6631 48.3334 35.5435 48.3334 33.3333C48.3334 31.1232 47.4554 29.0036 45.8926 27.4408C44.3298 25.878 42.2102 25 40.0001 25C37.7899 25 35.6703 25.878 34.1075 27.4408C32.5447 29.0036 31.6667 31.1232 31.6667 33.3333C31.6667 35.5435 32.5447 37.6631 34.1075 39.2259C35.6703 40.7887 37.7899 41.6667 40.0001 41.6667ZM53.3334 33.3333C53.334 35.57 52.7719 37.7708 51.699 39.7332C50.626 41.6957 49.0766 43.3567 47.1934 44.5634L48.9168 54.04L50.0001 60L44.4668 57.53L40.0001 55.5334L35.5334 57.53L30.0001 60L31.0834 54.04L32.8067 44.5634C30.8582 43.3148 29.2682 41.5807 28.193 39.5314C27.1179 37.4821 26.5946 35.1882 26.6747 32.8754C26.7548 30.5626 27.4355 28.3104 28.6499 26.3404C29.8642 24.3704 31.5704 22.7504 33.6006 21.6397C35.6309 20.5289 37.9152 19.9658 40.2291 20.0055C42.543 20.0453 44.8066 20.6866 46.7975 21.8664C48.7884 23.0462 50.4379 24.7238 51.5839 26.7344C52.7299 28.7449 53.3328 31.0191 53.3334 33.3333ZM37.5067 46.6667H42.4934L43.3867 51.5667L42.0401 50.9667L40.0001 50.0567L37.9601 50.9667L36.6134 51.5667L37.5067 46.6667ZM40.0001 36.6667C40.8841 36.6667 41.732 36.3155 42.3571 35.6904C42.9822 35.0653 43.3334 34.2174 43.3334 33.3333C43.3334 32.4493 42.9822 31.6014 42.3571 30.9763C41.732 30.3512 40.8841 30 40.0001 30C39.116 30 38.2682 30.3512 37.6431 30.9763C37.0179 31.6014 36.6667 32.4493 36.6667 33.3333C36.6667 34.2174 37.0179 35.0653 37.6431 35.6904C38.2682 36.3155 39.116 36.6667 40.0001 36.6667Z" fill="#0D7FF2" />
                  </g>
                  <defs>
                    <clipPath id="clip0_155_1500">
                      <rect width="40" height="40" fill="white" transform="translate(20 20)" />
                    </clipPath>
                  </defs>
                </svg>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-2">
                  Comoros Forex License
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Looking for low-capital requirements and a fast-track process?
                </p>

                {/* Download Link */}
                <button 
                  onClick={() => onOpenModal('forex')}
                  className="inline-flex items-center text-[#1680EB] font-semibold hover:text-blue-700 underline underline-offset-2 transition-all duration-300 hover:translate-x-2 cursor-pointer"
                >
                  Download Forex Brochure
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Crypto License Card */}
            <div className="license-card relative rounded-3xl p-6 overflow-hidden border border-[#AFEFF3] bg-[#ECFDFA] initial-hidden card-hover">
              <div className="relative z-10">
                {/* Icon */}
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 hover:scale-110">
                  <circle cx="40" cy="40" r="40" fill="#DBF5F0" />
                  <g clipPath="url(#clip0_155_1534)">
                    <path d="M55.36 47.3833C55.2856 47.3082 55.1971 47.2486 55.0996 47.2079C55.002 47.1672 54.8974 47.1463 54.7917 47.1463C54.686 47.1463 54.5813 47.1672 54.4838 47.2079C54.3862 47.2486 54.2977 47.3082 54.2233 47.3833L51.0233 50.5833C50.9073 50.6942 50.8281 50.838 50.7965 50.9954C50.7649 51.1528 50.7824 51.3161 50.8467 51.4633C50.9087 51.608 51.0112 51.7317 51.1419 51.8196C51.2726 51.9074 51.4259 51.9555 51.5833 51.9583H52.48C52.5472 51.9608 52.6127 51.9796 52.671 52.013C52.7294 52.0463 52.7788 52.0933 52.815 52.1499C52.8512 52.2045 52.8705 52.2686 52.8705 52.3341C52.8705 52.3996 52.8512 52.4637 52.815 52.5183C52.2563 53.6151 51.3931 54.5276 50.3289 55.1464C49.2647 55.7651 48.0447 56.0637 46.815 56.0066C46.3907 56.0066 45.9837 56.1752 45.6836 56.4752C45.3836 56.7753 45.215 57.1822 45.215 57.6066C45.215 58.0309 45.3836 58.4379 45.6836 58.738C45.9837 59.038 46.3907 59.2066 46.815 59.2066C51.615 59.2066 55.52 56.1833 56.255 52.2949C56.2765 52.2047 56.3276 52.1242 56.4 52.0662C56.4725 52.0082 56.5622 51.9761 56.655 51.9749H58C58.1586 51.9765 58.314 51.9298 58.4456 51.8411C58.5771 51.7524 58.6786 51.6259 58.7367 51.4783C58.7996 51.3337 58.8164 51.1732 58.7848 51.0187C58.7532 50.8642 58.6747 50.7232 58.56 50.6149L55.36 47.3833ZM23.8517 32.5799C23.9983 32.7316 24.2017 32.8133 24.4117 32.8049C24.5155 32.8082 24.6189 32.79 24.7153 32.7512C24.8117 32.7125 24.899 32.6542 24.9717 32.5799L28.1717 29.3799C28.2822 29.2672 28.3569 29.1243 28.3863 28.9692C28.4158 28.8141 28.3987 28.6538 28.3372 28.5084C28.2757 28.363 28.1726 28.239 28.0409 28.1521C27.9091 28.0652 27.7545 28.0192 27.5967 28.0199H26.7C26.6342 28.019 26.5695 28.0026 26.5113 27.9719C26.453 27.9411 26.4029 27.8971 26.365 27.8433C26.3343 27.784 26.3183 27.7183 26.3183 27.6516C26.3183 27.5849 26.3343 27.5192 26.365 27.4599C26.9294 26.3663 27.7971 25.4585 28.8642 24.8454C29.9313 24.2323 31.1526 23.9399 32.3817 24.0033C32.806 24.0033 33.213 23.8347 33.513 23.5346C33.8131 23.2346 33.9817 22.8276 33.9817 22.4033C33.9817 21.9789 33.8131 21.5719 33.513 21.2719C33.213 20.9718 32.806 20.8033 32.3817 20.8033C30.2548 20.7033 28.1579 21.3348 26.44 22.5926C24.7221 23.8505 23.4869 25.6588 22.94 27.7166C22.9185 27.8069 22.8674 27.8874 22.795 27.9453C22.7225 28.0033 22.6328 28.0354 22.54 28.0366H21.1967C21.0387 28.0372 20.8845 28.0845 20.7534 28.1726C20.6223 28.2607 20.5202 28.3856 20.46 28.5316C20.4001 28.6793 20.3847 28.8414 20.4158 28.9978C20.4469 29.1542 20.5231 29.298 20.635 29.4116L23.8517 32.5799ZM36.7983 44.8066C36.794 44.4897 36.6662 44.1869 36.4421 43.9628C36.218 43.7387 35.9153 43.6109 35.5983 43.6066H31.5983C31.4923 43.6066 31.3905 43.6487 31.3155 43.7237C31.2405 43.7988 31.1983 43.9005 31.1983 44.0066V45.6066C31.1983 45.8266 31.3767 46.0066 31.5983 46.0066H35.5983C35.9153 46.0023 36.218 45.8745 36.4421 45.6503C36.6662 45.4262 36.794 45.1235 36.7983 44.8066ZM35.5967 48.3899H31.5967C31.5441 48.3899 31.4921 48.4003 31.4436 48.4204C31.3951 48.4405 31.351 48.4699 31.3138 48.5071C31.2767 48.5442 31.2472 48.5883 31.2271 48.6368C31.207 48.6854 31.1967 48.7374 31.1967 48.7899V50.3899C31.1967 50.6116 31.3767 50.7899 31.5967 50.7899H35.5967C35.9149 50.7899 36.2202 50.6635 36.4452 50.4384C36.6702 50.2134 36.7967 49.9082 36.7967 49.5899C36.7967 49.2717 36.6702 48.9664 36.4452 48.7414C36.2202 48.5163 35.9149 48.3899 35.5967 48.3899Z" fill="#00BBA7" />
                    <path d="M33.5966 35.205C24.3582 35.205 18.5849 45.205 23.2032 53.205C27.8216 61.205 39.3699 61.2083 43.9899 53.2066C45.0433 51.3825 45.598 49.3131 45.5982 47.2066C45.5899 44.0264 44.323 40.9789 42.0744 38.73C39.8258 36.4811 36.7784 35.2138 33.5982 35.205M30.3982 54.4066V53.6066C30.3982 53.5005 30.3561 53.3988 30.2811 53.3238C30.2061 53.2488 30.1043 53.2066 29.9982 53.2066C29.8386 53.2089 29.6801 53.1789 29.5324 53.1184C29.3847 53.0579 29.2507 52.968 29.1386 52.8544C29.0265 52.7407 28.9385 52.6055 28.88 52.457C28.8215 52.3084 28.7937 52.1496 28.7982 51.99V42.39C28.7982 42.0717 28.9247 41.7665 29.1497 41.5414C29.3747 41.3164 29.68 41.19 29.9982 41.19C30.1043 41.19 30.2061 41.1478 30.2811 41.0728C30.3561 40.9978 30.3982 40.896 30.3982 40.79V40.0066C30.3982 39.6884 30.5247 39.3831 30.7497 39.1581C30.9747 38.9331 31.28 38.8066 31.5982 38.8066C31.9165 38.8066 32.2217 38.9331 32.4468 39.1581C32.6718 39.3831 32.7982 39.6884 32.7982 40.0066V40.8066C32.7982 41.0266 32.9782 41.2066 33.1982 41.2066H33.9982C34.1043 41.2066 34.2061 41.1645 34.2811 41.0895C34.3561 41.0145 34.3982 40.9127 34.3982 40.8066V40.0066C34.3982 39.6884 34.5247 39.3831 34.7497 39.1581C34.9747 38.9331 35.28 38.8066 35.5982 38.8066C35.9165 38.8066 36.2217 38.9331 36.4468 39.1581C36.6718 39.3831 36.7982 39.6884 36.7982 40.0066V41.1566C36.798 41.2349 36.8208 41.3116 36.8638 41.3771C36.9067 41.4425 36.968 41.494 37.0399 41.525C37.5403 41.7368 37.9854 42.0608 38.3408 42.4718C38.6963 42.8828 38.9527 43.3699 39.0902 43.8957C39.2277 44.4214 39.2427 44.9717 39.134 45.5041C39.0253 46.0365 38.7958 46.5369 38.4632 46.9666C38.4086 47.0347 38.3788 47.1194 38.3788 47.2066C38.3788 47.2939 38.4086 47.3786 38.4632 47.4466C38.9323 48.0699 39.1904 48.8266 39.1999 49.6066C39.1971 50.3063 38.9914 50.9902 38.6077 51.5754C38.224 52.1605 37.6788 52.6218 37.0382 52.9033C36.9694 52.9333 36.9104 52.982 36.868 53.0438C36.8255 53.1057 36.8014 53.1783 36.7982 53.2533V54.4066C36.7982 54.7249 36.6718 55.0301 36.4468 55.2552C36.2217 55.4802 35.9165 55.6066 35.5982 55.6066C35.28 55.6066 34.9747 55.4802 34.7497 55.2552C34.5247 55.0301 34.3982 54.7249 34.3982 54.4066V53.6066C34.3982 53.5005 34.3561 53.3988 34.2811 53.3238C34.2061 53.2488 34.1043 53.2066 33.9982 53.2066H33.1982C33.0921 53.2066 32.9904 53.2488 32.9154 53.3238C32.8404 53.3988 32.7982 53.5005 32.7982 53.6066V54.4066C32.7982 54.7249 32.6718 55.0301 32.4468 55.2552C32.2217 55.4802 31.9165 55.6066 31.5982 55.6066C31.28 55.6066 30.9747 55.4802 30.7497 55.2552C30.5247 55.0301 30.3982 54.7249 30.3982 54.4066ZM50.7999 38.405C57.5732 38.405 61.8082 31.0716 58.4199 25.205C55.0332 19.3366 46.5649 19.3366 43.1766 25.205C42.4042 26.5428 41.9976 28.0603 41.9976 29.6051C41.9976 31.1499 42.4043 32.6675 43.1767 34.0052C43.9492 35.343 45.0601 36.4539 46.398 37.2262C47.7359 37.9985 49.2551 38.4051 50.7999 38.405ZM52.7982 24.3883C53.1165 24.3883 53.4217 24.5147 53.6468 24.7398C53.8718 24.9648 53.9982 25.27 53.9982 25.5883C53.9982 25.9066 53.8718 26.2118 53.6468 26.4368C53.4217 26.6619 53.1165 26.7883 52.7982 26.7883H50.0766C49.9226 26.7926 49.7763 26.8569 49.6689 26.9674C49.5615 27.0779 49.5015 27.2259 49.5016 27.38C49.5012 27.4968 49.536 27.6111 49.6014 27.708C49.6667 27.8049 49.7597 27.8799 49.8682 27.9233L52.6216 29.0283C53.7549 29.4866 54.4982 30.5883 54.4932 31.8116C54.4932 33.1583 53.5866 34.335 52.2849 34.6766C52.2019 34.7008 52.1289 34.7512 52.0769 34.8203C52.0249 34.8894 51.9967 34.9735 51.9966 35.06V35.205C51.9966 35.5232 51.8701 35.8284 51.6451 36.0535C51.42 36.2785 51.1148 36.405 50.7966 36.405C50.4783 36.405 50.1731 36.2785 49.948 36.0535C49.723 35.8284 49.5966 35.5232 49.5966 35.205C49.5966 35.1524 49.5862 35.1004 49.5661 35.0519C49.546 35.0034 49.5166 34.9593 49.4794 34.9221C49.4423 34.885 49.3982 34.8555 49.3496 34.8354C49.3011 34.8153 49.2491 34.805 49.1966 34.805H48.7966C48.639 34.805 48.4829 34.7739 48.3373 34.7136C48.1918 34.6533 48.0595 34.5649 47.948 34.4535C47.8366 34.3421 47.7482 34.2098 47.6879 34.0642C47.6276 33.9186 47.5966 33.7625 47.5966 33.605C47.5966 33.4474 47.6276 33.2913 47.6879 33.1457C47.7482 33.0002 47.8366 32.8679 47.948 32.7564C48.0595 32.645 48.1918 32.5566 48.3373 32.4963C48.4829 32.436 48.639 32.405 48.7966 32.405H51.5016C51.5785 32.407 51.6552 32.3935 51.7269 32.3654C51.7986 32.3374 51.8639 32.2952 51.9191 32.2415C51.9742 32.1877 52.018 32.1235 52.0479 32.0525C52.0779 31.9815 52.0933 31.9053 52.0932 31.8283C52.0958 31.7088 52.0621 31.5914 51.9967 31.4915C51.9313 31.3915 51.8371 31.3137 51.7266 31.2683L48.9732 30.18C46.8332 29.325 46.4232 26.475 48.2332 25.05C48.5466 24.8033 48.9082 24.6216 49.2932 24.5166C49.3819 24.4946 49.4603 24.4429 49.5155 24.3701C49.5706 24.2974 49.5993 24.2079 49.5966 24.1166V24.0033C49.5966 23.685 49.723 23.3798 49.948 23.1548C50.1731 22.9297 50.4783 22.8033 50.7966 22.8033C51.1148 22.8033 51.42 22.9297 51.6451 23.1548C51.8701 23.3798 51.9966 23.685 51.9966 24.0033C51.9966 24.225 52.1766 24.4033 52.3966 24.4033L52.7982 24.3883Z" fill="#00BBA7" />
                  </g>
                  <defs>
                    <clipPath id="clip0_155_1534">
                      <rect width="40" height="40" fill="white" transform="translate(20 20)" />
                    </clipPath>
                  </defs>
                </svg>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-2">
                  Comoros Crypto License
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Looking for low-capital requirements and a fast-track process?
                </p>

                {/* Download Link */}
                <button 
                  onClick={() => onOpenModal('crypto')}
                  className="inline-flex items-center text-[#00BBA7] font-semibold hover:text-green-700 transition-all duration-300 underline underline-offset-2 hover:translate-x-2 cursor-pointer"
                >
                  Download Crypto Brochure
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        ref={howItWorksRef}
        className="py-16 initial-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left side - Process Steps */}
            <div>
              {/* Section Header */}
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                Flexible partnership structures aligned with your investment profile
              </p>

              {/* Steps */}
              <div className="">

                {/* Step 1 - Active */}
                <div className="process-step flex items-start space-x-4 initial-hidden step-hover cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500 text-lg font-medium">Step</span>
                    <div className="w-10 h-10 bg-[#1680EB] text-white rounded-full flex items-center justify-center text-lg font-normal transition-transform duration-300 hover:scale-110">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Collection of information
                    </h3>
                    <p className="text-[#5F6578] mb-1">
                      Due diligence, KYC, Name Check
                    </p>
                    <p className="text-[#5F6578] text-sm">
                      (2 weeks).
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                <div className="ml-16 w-px h-8 bg-[#DEE1E7]"></div>

                {/* Step 2 */}
                <div className="process-step flex items-start space-x-4 initial-hidden step-hover cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 text-lg font-medium">Step</span>
                    <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-lg font-normal transition-all duration-300 hover:bg-[#1680EB] hover:text-white hover:scale-110">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-400 mb-2 transition-colors duration-300 hover:text-gray-900">
                      Application Preparation
                    </h3>
                    <p className="text-gray-400 mb-1 transition-colors duration-300 hover:text-[#5F6578]">
                      Guidance, Document Preparation, Document Review
                    </p>
                    <p className="text-gray-400 text-sm transition-colors duration-300 hover:text-[#5F6578]">
                      (2 weeks).
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                <div className="ml-16 w-px h-8 bg-gray-300"></div>

                {/* Step 3 */}
                <div className="process-step flex items-start space-x-4 initial-hidden step-hover cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 text-lg font-medium">Step</span>
                    <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-lg font-normal transition-all duration-300 hover:bg-[#1680EB] hover:text-white hover:scale-110">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-400 mb-2 transition-colors duration-300 hover:text-gray-900">
                      Filing Application
                    </h3>
                    <p className="text-gray-400 mb-1 transition-colors duration-300 hover:text-[#5F6578]">
                      Submission to Ministry of Finance, Comoros
                    </p>
                    <p className="text-gray-400 text-sm transition-colors duration-300 hover:text-[#5F6578]">
                      (4 weeks).
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                <div className="ml-16 w-px h-8 bg-gray-300"></div>

                {/* Step 4 */}
                <div className="process-step flex items-start space-x-4 initial-hidden step-hover cursor-pointers">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 text-lg font-medium">Step</span>
                    <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-lg font-normal transition-all duration-300 hover:bg-[#1680EB] hover:text-white hover:scale-110">
                      4
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-400 mb-2 transition-colors duration-300 hover:text-gray-900">
                      Regulator Follow-up
                    </h3>
                    <p className="text-gray-400 mb-1 transition-colors duration-300 hover:text-[#5F6578]">
                      Liasing and Decision
                    </p>
                    <p className="text-gray-400 text-sm transition-colors duration-300 hover:text-[#5F6578]">
                      (4 weeks).
                    </p>
                  </div>
                </div>
              </div>

              {/* Fast Track Note */}
              <div className="mt-6">
                <p className="text-lg font-semibold text-gray-900">
                  Fast track option available on request
                </p>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl hover-lift">
                <img
                  src="/images/bitcoin-chess.png"
                  alt="Bitcoin with chess pieces representing strategic planning"
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* End-to-End Scope Section */}
      <section 
        ref={endToEndRef}
        className="py-16 bg-white initial-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left side - Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl hover-lift">
                <img
                  src="/images/end-to-end.png"
                  alt="Person using tablet with trading interface"
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </div>

            {/* Right side - Accordion Content */}
            <div>
              {/* Section Header */}
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                End-to-End Scope: What You Get
              </h2>

              {/* Accordion */}
              <Accordion allowZeroExpanded preExpanded={['documentation']}>

                {/* Documentation & Governance */}
                <AccordionItem uuid="documentation" className="accordion-item px-6 py-4 border border-[#E7E7E7] bg-[#F6F8F9] overflow-hidden rounded-[12px] mb-[15px] initial-hidden accordion-hover">
                  <AccordionItemHeading>
                    <AccordionItemState>
                      {({ expanded }) => (
                        <AccordionItemButton
                          className="flex items-center justify-between transition-colors"
                        >
                          <span className="text-lg font-[500] text-[#141416]">
                            Documentation & Governance
                          </span>
                          {expanded ?
                            <span className="transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m18 15l-6-6l-6 6" /></svg>
                            </span>
                            :
                            <span className="transition-transform duration-300">
                              <svg className="w-5 h-5 text-[#141416] accordion-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </span>}
                        </AccordionItemButton>
                      )}
                    </AccordionItemState>
                  </AccordionItemHeading>
                  <AccordionItemPanel className="pt-5 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Corporate governance framework</span>
                      </div>

                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Policy and procedure manuals</span>
                      </div>

                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Risk management documentation</span>
                      </div>

                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Compliance monitoring systems</span>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>

                {/* Regulator Interface */}
                <AccordionItem className="accordion-item px-6 py-4 border border-[#E7E7E7] bg-[#F6F8F9] overflow-hidden rounded-[12px] mb-[15px] initial-hidden accordion-hover">
                  <AccordionItemHeading>
                    <AccordionItemState>
                      {({ expanded }) => (
                        <AccordionItemButton
                          className="flex items-center justify-between transition-colors"
                        >
                          <span className="text-lg font-[500] text-[#141416]">
                            Regulator Interface
                          </span>
                          {expanded ?
                            <span className="transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m18 15l-6-6l-6 6" /></svg>
                            </span>
                            :
                            <span className="transition-transform duration-300">
                              <svg className="w-5 h-5 text-[#141416] accordion-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </span>}
                        </AccordionItemButton>
                      )}
                    </AccordionItemState>
                  </AccordionItemHeading>
                  <AccordionItemPanel className="pt-5 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Application preparation and submission</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Approval process navigation</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Regulator meetings and presentations</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">License activation support</span>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>

                {/* Compliance Stack Setup */}
                <AccordionItem className="accordion-item px-6 py-4 border border-[#E7E7E7] bg-[#F6F8F9] overflow-hidden rounded-[12px] mb-[15px] initial-hidden accordion-hover">
                  <AccordionItemHeading>
                    <AccordionItemState>
                      {({ expanded }) => (
                        <AccordionItemButton
                          className="flex items-center justify-between transition-colors"
                        >
                          <span className="text-lg font-[500] text-[#141416]">
                            Compliance Stack Setup
                          </span>
                          {expanded ?
                            <span className="transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m18 15l-6-6l-6 6" /></svg>
                            </span>
                            :
                            <span className="transition-transform duration-300">
                              <svg className="w-5 h-5 text-[#141416] accordion-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </span>}
                        </AccordionItemButton>
                      )}
                    </AccordionItemState>
                  </AccordionItemHeading>
                  <AccordionItemPanel className="pt-5 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">AML/CTF compliance framework</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Transaction monitoring systems</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Regulatory reporting infrastructures</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Risk assessment procedures</span>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>

                {/* Banking & Safeguarding */}
                <AccordionItem className="accordion-item px-6 py-4 border border-[#E7E7E7] bg-[#F6F8F9] overflow-hidden rounded-[12px] mb-[15px] initial-hidden accordion-hover">
                  <AccordionItemHeading>
                    <AccordionItemState>
                      {({ expanded }) => (
                        <AccordionItemButton
                          className="flex items-center justify-between transition-colors"
                        >
                          <span className="text-lg font-[500] text-[#141416]">
                            Banking & Safeguarding
                          </span>
                          {expanded ?
                            <span className="transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m18 15l-6-6l-6 6" /></svg>
                            </span>
                            :
                            <span className="transition-transform duration-300">
                              <svg className="w-5 h-5 text-[#141416] accordion-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </span>}
                        </AccordionItemButton>
                      )}
                    </AccordionItemState>
                  </AccordionItemHeading>
                  <AccordionItemPanel className="pt-5 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Account opening facilitation</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Liquidity provider connections</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Financial infrastructure optimization</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Payment processor integration</span>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>

                {/* People & Training */}
                <AccordionItem className="accordion-item px-6 py-4 border border-[#E7E7E7] bg-[#F6F8F9] overflow-hidden rounded-[12px] mb-[15px] initial-hidden accordion-hover">
                  <AccordionItemHeading>
                    <AccordionItemState>
                      {({ expanded }) => (
                        <AccordionItemButton
                          className="flex items-center justify-between transition-colors"
                        >
                          <span className="text-lg font-[500] text-[#141416]">
                            People & Training
                          </span>
                          {expanded ?
                            <span className="transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m18 15l-6-6l-6 6" /></svg>
                            </span>
                            :
                            <span className="transition-transform duration-300">
                              <svg className="w-5 h-5 text-[#141416] accordion-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </span>}
                        </AccordionItemButton>
                      )}
                    </AccordionItemState>
                  </AccordionItemHeading>
                  <AccordionItemPanel className="pt-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Compliance officer placement</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Staff training programs</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Regulatory knowledge transfer</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded transition-colors duration-300">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.3126 10.9376C17.6876 14.0626 15.3315 17.0046 12.0242 17.6625C8.71702 18.3203 5.36092 16.782 3.70046 13.8471C2.04 10.9123 2.44992 7.24324 4.71716 4.74721C6.9844 2.25118 10.8126 1.56258 13.9376 2.81258" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7.6875 9.6875L10.8125 12.8125L18.3125 4.6875" stroke="#1680EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#5F6578] text-[14px]">Ongoing advisory support</span>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>

              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <Footer />


      {/* Modal */}
      <Modal 
        open={open} 
        onClose={onCloseModal} 
        center 
        styles={{
          modal: {
            borderRadius: '15px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            width: '90%',
            padding: '0',
          },
        }}
      >
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Download Licensing Pack
            </h2>
            <p className="text-gray-600">
              Get our comprehensive guide to Comoros {brochureType === 'forex' ? 'Forex' : 'Crypto'} licensing delivered to your inbox
            </p>
          </div>

          {/* Form */}
          <form name="brochure-download"
            method="POST" 
            data-netlify="true" 
            data-netlify-honeypot="bot-field"
            onSubmit={handleSendBrochure}  className="space-y-6">
              {/* Hidden fields for Netlify */}
            <input type="hidden" name="form-name" value="brochure-download" />
            <input type="hidden" name="brochureType" value={brochureType} />
            
            {/* Honeypot field for spam protection */}
            <div style={{ display: 'none' }}>
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </div>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0002 10C12.3013 10 14.1668 8.13454 14.1668 5.83335C14.1668 3.53217 12.3013 1.66669 10.0002 1.66669C7.69898 1.66669 5.8335 3.53217 5.8335 5.83335C5.8335 8.13454 7.69898 10 10.0002 10Z" stroke="#B1B5C3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.1585 18.3333C17.1585 15.1083 13.9501 12.5 10.0001 12.5C6.05013 12.5 2.8418 15.1083 2.8418 18.3333" stroke="#B1B5C3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.8335 2.79169H14.1665C15.5922 2.79169 16.6488 3.2 17.3491 3.90009C18.0494 4.60037 18.4585 5.65776 18.4585 7.08368V12.9167C18.4585 14.3426 18.0494 15.399 17.3491 16.0993C16.6488 16.7996 15.5924 17.2087 14.1665 17.2087H5.8335C4.40757 17.2087 3.35018 16.7996 2.6499 16.0993C1.94982 15.399 1.5415 14.3424 1.5415 12.9167V7.08368C1.5415 5.65776 1.94962 4.60037 2.6499 3.90009C3.35018 3.19981 4.40757 2.79169 5.8335 2.79169ZM5.8335 3.04169C4.56834 3.04169 3.53105 3.34901 2.81494 4.06512C2.09883 4.78124 1.7915 5.81852 1.7915 7.08368V12.9167C1.7915 14.1818 2.09883 15.2191 2.81494 15.9352C3.53105 16.6512 4.56844 16.9587 5.8335 16.9587H14.1665C15.4317 16.9587 16.4689 16.6514 17.1851 15.9352C17.9012 15.2191 18.2085 14.1818 18.2085 12.9167V7.08368C18.2085 5.81862 17.9011 4.78123 17.1851 4.06512C16.4689 3.34901 15.4317 3.04169 14.1665 3.04169H5.8335Z" fill="#292D32" stroke="#B1B5C3"/>
<path d="M14.0898 7.39648C14.144 7.35252 14.2187 7.36795 14.251 7.41016L14.2568 7.41699L14.2617 7.42383C14.2947 7.46449 14.2946 7.51659 14.2744 7.55371L14.248 7.58496L14.2383 7.59277L11.6299 9.67578L11.623 9.68164C11.1935 10.0373 10.6033 10.2246 10 10.2246C9.39754 10.2246 8.80591 10.0372 8.36621 9.67871L8.3623 9.67578L5.75488 7.59375C5.69376 7.54244 5.69622 7.46507 5.72949 7.42383C5.78088 7.36058 5.85976 7.36268 5.90137 7.39648L5.9043 7.39941L8.5127 9.48242C8.93392 9.82013 9.47778 9.97266 9.99609 9.97266C10.5142 9.9726 11.0574 9.81993 11.4785 9.48242L14.0869 7.39941L14.0898 7.39648Z" fill="#292D32" stroke="#B1B5C3"/>
</svg>

                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 0000 0000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>

            {/* Download Notice */}
            {/* <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-700">
                  After submitting this form, your {brochureType === 'forex' ? 'Forex' : 'Crypto'} license brochure will automatically download, and we'll also send you additional resources via email.
                </p>
              </div>
            </div> */}

            {/* Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onCloseModal}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-[#1680EB] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {isSubmitting ? (
                  <>
                    
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    
                    <span>Send Brochure</span>
                  </>
                )}
                {/* Send Brochure */}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      
    </>
  )
}

export default Services