import React, { useEffect, useRef, useState } from 'react'
import Footer from '../Footer'
import "react-responsive-modal/styles.css";
import { Modal } from 'react-responsive-modal'

function Home() {
    const heroContentRef: any = useRef(null)
    const featuresRef = useRef(null)
    const regulatoryRef = useRef(null)
    const whoWeServeRef = useRef(null)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });

    const onOpenModal = () => setOpen(true);

    const onCloseModal = () => {
        setOpen(false);
        setFormData({
            fullName: '',
            email: '',
            phone: ''
        });
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBookConsultation = async (e: any) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Booking consultation:', formData);

        const form = e.target;

        const encode = (data: any) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
                .join("&");
        };

        const netlifyFormData = {
            "form-name": "book-consultation",
            "fullName": form.fullName.value,
            "email": form.email.value,
            "phone": form.phone.value || '',
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




            // Show success message
            alert(`Thank you! Your imformation has been received our licensing experts will discuss your requirements.`);

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
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up')

                    // Special handling for features section
                    if (entry.target === featuresRef.current) {
                        const features = entry.target.querySelectorAll('.feature-item')
                        features.forEach((feature: any, index: any) => {
                            setTimeout(() => {
                                feature.classList.add('animate-scale-in')
                            }, index * 100)
                        })
                    }

                    // Special handling for regulatory section
                    if (entry.target === regulatoryRef.current) {
                        const image = entry.target.querySelector('.regulatory-image')
                        const content = entry.target.querySelector('.regulatory-content')
                        const items = entry.target.querySelectorAll('.regulatory-item')

                        setTimeout(() => {
                            if (image) image.classList.add('animate-slide-in-left')
                        }, 100)

                        setTimeout(() => {
                            if (content) content.classList.add('animate-slide-in-right')
                        }, 200)

                        items.forEach((item: any, index: any) => {
                            setTimeout(() => {
                                item.classList.add('animate-fade-in-up')
                            }, 400 + (index * 100))
                        })
                    }

                    // Special handling for cards section
                    if (entry.target === whoWeServeRef.current) {
                        const cards = entry.target.querySelectorAll('.service-card')
                        cards.forEach((card: any, index: any) => {
                            setTimeout(() => {
                                card.classList.add('animate-scale-in')
                            }, index * 150)
                        })
                    }
                }
            })
        }, observerOptions)

        const refs = [featuresRef, regulatoryRef, whoWeServeRef]
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
                    animation: bounceIn 0.8s ease-out forwards;
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
                    position: relative;
                    overflow: hidden;
                }

                .pulse-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(22, 128, 235, 0.4);
                }

                .pulse-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s;
                }

                .pulse-button:hover::before {
                    left: 100%;
                }

                .card-hover {
                    transition: all 0.3s ease;
                }

                .card-hover:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                }

                .feature-hover {
                    transition: all 0.3s ease;
                }

                .feature-hover:hover {
                    transform: translateY(-3px);
                }

                .icon-hover {
                    transition: transform 0.3s ease;
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

                .gradient-hover {
                    background-size: 200% 200%;
                    transition: background-position 0.3s ease;
                }

                .gradient-hover:hover {
                    background-position: right center;
                }
            `}</style>

            <div className="min-h-screen relative overflow-hidden"
            >

                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="/images/heroBg.png"
                        alt="Hero Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                {/* Main Hero Content */}
                <div className="relative z-10 pt-20 pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div
                            ref={heroContentRef}
                            className="text-center pt-24 md:pt-24 initial-hidden"
                        >

                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8 text-glow">
                                Enabling Innovation Through<br />
                                Trusted <span className="text-[#1680EB]">Licensing.</span>
                            </h1>

                            {/* Subheading */}
                            <p className="text-lg md:text-xl text-[#383C48] max-w-4xl mx-auto mb-12 leading-relaxed">
                                PaiaFinance is the only exclusive distributor of Crypto and Forex Licenses by the <br />
                                Ministry of Finance, Union of Comoros.
                            </p>

                            {/* CTA Button */}

                            <button
                                onClick={onOpenModal}
                                className="bg-[#1680EB] hover:bg-blue-700 text-white px-[24px] py-2.5 rounded-[12px] text-lg font-semibold pulse-button mb-20"
                            >
                                Connect with Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            
            {/* Features Section */}
            <div
                ref={featuresRef}
                className='bg-[#F6F7F8] py-6 md:py-[24px] initial-hidden'
            >
                <div className="relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Mobile Layout - Vertical Stack */}
                        <div className="md:hidden space-y-4">
                            <div className="feature-item flex items-center justify-center space-x-3 text-gray-700 initial-hidden feature-hover">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-hover flex-shrink-0">
                                    <path d="M11.9095 5.71555C11.9881 5.79393 12.0505 5.88708 12.0931 5.98964C12.1357 6.0922 12.1576 6.20215 12.1576 6.3132C12.1576 6.42425 12.1357 6.53421 12.0931 6.63677C12.0505 6.73933 11.9881 6.83247 11.9095 6.91086L7.97196 10.8484C7.89357 10.927 7.80043 10.9894 7.69787 11.032C7.59531 11.0746 7.48535 11.0965 7.3743 11.0965C7.26325 11.0965 7.15329 11.0746 7.05073 11.032C6.94817 10.9894 6.85503 10.927 6.77664 10.8484L5.08914 9.16086C5.01066 9.08237 4.9484 8.9892 4.90593 8.88665C4.86345 8.78411 4.84159 8.6742 4.84159 8.5632C4.84159 8.45221 4.86345 8.3423 4.90593 8.23975C4.9484 8.13721 5.01066 8.04403 5.08914 7.96555C5.16763 7.88706 5.26081 7.8248 5.36335 7.78233C5.4659 7.73985 5.5758 7.71799 5.6868 7.71799C5.79779 7.71799 5.9077 7.73985 6.01025 7.78233C6.1128 7.8248 6.20597 7.88706 6.28446 7.96555L7.375 9.05469L10.7155 5.71344C10.7941 5.63513 10.8872 5.57306 10.9897 5.53078C11.0922 5.4885 11.2021 5.46684 11.3129 5.46703C11.4238 5.46723 11.5336 5.48928 11.6359 5.53192C11.7383 5.57456 11.8312 5.63696 11.9095 5.71555ZM16.0938 8C16.0938 9.5019 15.6484 10.9701 14.814 12.2189C13.9796 13.4676 12.7936 14.441 11.406 15.0157C10.0184 15.5905 8.49158 15.7408 7.01854 15.4478C5.54549 15.1548 4.19242 14.4316 3.13041 13.3696C2.06841 12.3076 1.34517 10.9545 1.05217 9.48147C0.759159 8.00842 0.90954 6.48157 1.48429 5.094C2.05905 3.70642 3.03236 2.52044 4.28114 1.68603C5.52993 0.851616 6.9981 0.40625 8.5 0.40625C10.5133 0.408483 12.4435 1.20925 13.8671 2.63287C15.2907 4.0565 16.0915 5.9867 16.0938 8ZM14.4063 8C14.4063 6.83185 14.0599 5.68994 13.4109 4.71866C12.7619 3.74739 11.8395 2.99037 10.7602 2.54334C9.681 2.09631 8.49345 1.97934 7.34775 2.20724C6.20205 2.43513 5.14966 2.99765 4.32365 3.82365C3.49765 4.64965 2.93513 5.70205 2.70724 6.84775C2.47935 7.99345 2.59631 9.181 3.04334 10.2602C3.49037 11.3394 4.24739 12.2619 5.21867 12.9109C6.18994 13.5599 7.33186 13.9062 8.5 13.9062C10.0659 13.9046 11.5672 13.2818 12.6745 12.1745C13.7818 11.0672 14.4046 9.56592 14.4063 8Z" fill="#1680EB" />
                                </svg>
                                <span className="font-medium text-[#5F6578] text-sm sm:text-base text-center">Exclusive Distributor</span>
                            </div>

                            <div className="feature-item flex items-center justify-center space-x-3 text-gray-700 initial-hidden feature-hover">
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-hover flex-shrink-0">
                                    <path d="M13.125 0.53125H1.875C1.50204 0.53125 1.14435 0.679408 0.880631 0.943131C0.616908 1.20685 0.46875 1.56454 0.46875 1.9375V5.875C0.46875 9.69227 2.31938 12.0077 3.87188 13.2782C5.53898 14.6416 7.2075 15.1063 7.27781 15.1267C7.42332 15.1661 7.57668 15.1661 7.72219 15.1267C7.7925 15.107 9.46102 14.6416 11.1281 13.2782C12.6806 12.0077 14.5312 9.69227 14.5312 5.875V1.9375C14.5312 1.56454 14.3831 1.20685 14.1194 0.943131C13.8556 0.679408 13.498 0.53125 13.125 0.53125ZM12.8438 5.875C12.8438 8.38586 11.9234 10.4235 10.1079 11.9324C9.32971 12.5745 8.44779 13.0794 7.5 13.4252C6.55213 13.0795 5.67018 12.5747 4.89211 11.9324C3.07664 10.4235 2.15625 8.38586 2.15625 5.875V2.21875H12.8438V5.875Z" fill="#1680EB" />
                                </svg>
                                <span className="font-medium text-[#5F6578] text-sm sm:text-base text-center">Regulatory Liaison</span>
                            </div>

                            <div className="feature-item flex items-center justify-center space-x-3 text-gray-700 initial-hidden feature-hover">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-hover flex-shrink-0">
                                    <path d="M15.0173 6.04324C14.9079 6.06157 14.8032 6.10126 14.7092 6.16006C14.6152 6.21886 14.5338 6.2956 14.4694 6.38591C14.4051 6.47623 14.3592 6.57833 14.3344 6.68638C14.3096 6.79444 14.3063 6.90633 14.3247 7.01567C14.379 7.34098 14.4063 7.67023 14.4062 8.00004C14.4083 9.32527 13.9623 10.6123 13.1406 11.6521C12.5937 10.9565 11.8967 10.3936 11.1016 10.0054C11.6083 9.49221 11.952 8.84066 12.0893 8.13268C12.2267 7.4247 12.1516 6.69191 11.8735 6.0265C11.5954 5.36109 11.1268 4.79277 10.5265 4.39305C9.92625 3.99333 9.22118 3.78005 8.5 3.78005C7.77882 3.78005 7.07375 3.99333 6.47348 4.39305C5.87321 4.79277 5.40456 5.36109 5.12648 6.0265C4.8484 6.69191 4.77332 7.4247 4.91068 8.13268C5.04804 8.84066 5.3917 9.49221 5.89844 10.0054C5.10332 10.3936 4.40626 10.9565 3.85938 11.6521C3.17233 10.7815 2.74449 9.73489 2.62488 8.63231C2.50528 7.52973 2.69876 6.41576 3.18314 5.41808C3.66752 4.4204 4.4232 3.57939 5.36357 2.99143C6.30395 2.40348 7.39095 2.09238 8.5 2.09379C8.82981 2.09377 9.15906 2.12105 9.48438 2.17535C9.70507 2.21265 9.93155 2.16075 10.114 2.03106C10.2964 1.90137 10.4199 1.70453 10.4571 1.48383C10.4944 1.26313 10.4425 1.03665 10.3129 0.854224C10.1832 0.671794 9.98632 0.548353 9.76562 0.511057C8.67679 0.328236 7.5612 0.384818 6.49646 0.676869C5.43171 0.96892 4.44337 1.48943 3.60019 2.20218C2.75701 2.91494 2.07923 3.80283 1.614 4.8041C1.14876 5.80537 0.907248 6.89597 0.90625 8.00004C0.90625 10.014 1.7063 11.9455 3.13041 13.3696C4.55451 14.7937 6.48601 15.5938 8.5 15.5938C10.514 15.5938 12.4455 14.7937 13.8696 13.3696C15.2937 11.9455 16.0938 10.014 16.0938 8.00004C16.0938 7.576 16.0588 7.15267 15.989 6.73442C15.9516 6.51397 15.8283 6.31736 15.6461 6.18777C15.4639 6.05817 15.2378 6.00619 15.0173 6.04324ZM6.53125 7.43754C6.53125 7.04816 6.64672 6.66752 6.86304 6.34376C7.07937 6.02 7.38685 5.76766 7.74659 5.61865C8.10633 5.46964 8.50218 5.43066 8.88408 5.50662C9.26598 5.58258 9.61678 5.77009 9.89212 6.04542C10.1675 6.32076 10.355 6.67156 10.4309 7.05346C10.5069 7.43536 10.4679 7.83121 10.3189 8.19095C10.1699 8.55069 9.91754 8.85817 9.59378 9.0745C9.27002 9.29083 8.88938 9.40629 8.5 9.40629C7.97786 9.40629 7.4771 9.19887 7.10788 8.82966C6.73867 8.46045 6.53125 7.95969 6.53125 7.43754ZM5.09477 12.8214C5.48646 12.2858 5.99896 11.8502 6.59063 11.5499C7.18231 11.2496 7.83648 11.093 8.5 11.093C9.16352 11.093 9.81769 11.2496 10.4094 11.5499C11.001 11.8502 11.5135 12.2858 11.9052 12.8214C10.91 13.5272 9.72008 13.9063 8.5 13.9063C7.27992 13.9063 6.08998 13.5272 5.09477 12.8214ZM16.4095 2.40949L14.1595 4.65949C14.0811 4.73815 13.9879 4.80057 13.8854 4.84315C13.7828 4.88574 13.6728 4.90766 13.5618 4.90766C13.4507 4.90766 13.3408 4.88574 13.2382 4.84315C13.1357 4.80057 13.0425 4.73815 12.9641 4.65949L11.8391 3.53449C11.6806 3.37599 11.5916 3.161 11.5916 2.93684C11.5916 2.71267 11.6806 2.49769 11.8391 2.33918C11.9976 2.18067 12.2126 2.09162 12.4368 2.09162C12.661 2.09162 12.8759 2.18067 13.0345 2.33918L13.5625 2.86723L15.2155 1.21348C15.3741 1.05497 15.589 0.965921 15.8132 0.965921C16.0374 0.965921 16.2524 1.05497 16.4109 1.21348C16.5694 1.37199 16.6584 1.58697 16.6584 1.81113C16.6584 2.0353 16.5694 2.25028 16.4109 2.40879L16.4095 2.40949Z" fill="#1680EB" />
                                </svg>
                                <span className="font-medium text-[#5F6578] text-sm sm:text-base text-center">KYC/AML</span>
                            </div>

                            <div className="feature-item flex items-center justify-center space-x-3 text-gray-700 initial-hidden feature-hover">
                                <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-hover flex-shrink-0">
                                    <path d="M2.1875 6.59379H3.59375V9.96879H2.75C2.52622 9.96879 2.31161 10.0577 2.15338 10.2159C1.99514 10.3742 1.90625 10.5888 1.90625 10.8125C1.90625 11.0363 1.99514 11.2509 2.15338 11.4092C2.31161 11.5674 2.52622 11.6563 2.75 11.6563H16.25C16.4738 11.6563 16.6884 11.5674 16.8466 11.4092C17.0049 11.2509 17.0938 11.0363 17.0938 10.8125C17.0938 10.5888 17.0049 10.3742 16.8466 10.2159C16.6884 10.0577 16.4738 9.96879 16.25 9.96879H15.4062V6.59379H16.8125C16.9962 6.59381 17.1749 6.53386 17.3215 6.42305C17.468 6.31224 17.5744 6.15663 17.6244 5.97986C17.6745 5.80309 17.6654 5.61481 17.5987 5.44363C17.532 5.27246 17.4112 5.12773 17.2548 5.03145L9.94227 0.531449C9.80927 0.449592 9.65617 0.40625 9.5 0.40625C9.34383 0.40625 9.19073 0.449592 9.05773 0.531449L1.74523 5.03145C1.58877 5.12773 1.468 5.27246 1.40128 5.44363C1.33456 5.61481 1.32554 5.80309 1.37558 5.97986C1.42562 6.15663 1.53199 6.31224 1.67853 6.42305C1.82508 6.53386 2.00378 6.59381 2.1875 6.59379ZM5.28125 6.59379H6.96875V9.96879H5.28125V6.59379ZM10.3438 6.59379V9.96879H8.65625V6.59379H10.3438ZM13.7188 9.96879H12.0312V6.59379H13.7188V9.96879ZM9.5 2.24075L13.8313 4.90629H5.16875L9.5 2.24075ZM18.2188 13.625C18.2188 13.8488 18.1299 14.0634 17.9716 14.2217C17.8134 14.3799 17.5988 14.4688 17.375 14.4688H1.625C1.40122 14.4688 1.18661 14.3799 1.02838 14.2217C0.870145 14.0634 0.78125 13.8488 0.78125 13.625C0.78125 13.4013 0.870145 13.1867 1.02838 13.0284C1.18661 12.8702 1.40122 12.7813 1.625 12.7813H17.375C17.5988 12.7813 17.8134 12.8702 17.9716 13.0284C18.1299 13.1867 18.2188 13.4013 18.2188 13.625Z" fill="#1680EB" />
                                </svg>
                                <span className="font-medium text-[#5F6578] text-sm sm:text-base text-center">Banking Setup</span>
                            </div>

                            <div className="feature-item flex items-center justify-center space-x-3 text-gray-700 initial-hidden feature-hover">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-hover flex-shrink-0">
                                    <path d="M8.5 0.40625C6.9981 0.40625 5.52993 0.851616 4.28114 1.68603C3.03236 2.52044 2.05905 3.70642 1.48429 5.094C0.90954 6.48157 0.759159 8.00842 1.05217 9.48147C1.34517 10.9545 2.06841 12.3076 3.13041 13.3696C4.19242 14.4316 5.54549 15.1548 7.01854 15.4478C8.49158 15.7408 10.0184 15.5905 11.406 15.0157C12.7936 14.441 13.9796 13.4676 14.814 12.2189C15.6484 10.9701 16.0938 9.5019 16.0938 8C16.0915 5.9867 15.2907 4.0565 13.8671 2.63287C12.4435 1.20925 10.5133 0.408483 8.5 0.40625ZM8.5 13.5547C7.87829 12.8271 7.39265 11.9935 7.06633 11.0938H9.93649C9.75078 11.6025 9.51526 12.0917 9.23336 12.5541C9.01645 12.907 8.77119 13.2416 8.5 13.5547ZM6.63743 9.40625C6.4982 8.47392 6.4982 7.52608 6.63743 6.59375H10.364C10.5032 7.52608 10.5032 8.47392 10.364 9.40625H6.63743ZM2.59375 8C2.59373 7.52607 2.6511 7.05388 2.76461 6.59375H4.93164C4.81446 7.52759 4.81446 8.47241 4.93164 9.40625H2.76461C2.6511 8.94612 2.59373 8.47393 2.59375 8ZM8.5 2.44531C9.12171 3.17293 9.60735 4.00654 9.93367 4.90625H7.06492C7.25063 4.39748 7.48615 3.90831 7.76805 3.44586C7.98452 3.09306 8.22931 2.75844 8.5 2.44531ZM12.067 6.59375H14.234C14.4618 7.51741 14.4618 8.48259 14.234 9.40625H12.0684C12.1855 8.47241 12.1855 7.52759 12.0684 6.59375H12.067ZM13.5273 4.90625H11.714C11.4606 4.05574 11.0941 3.24315 10.6241 2.49031C11.8294 2.95819 12.8492 3.80639 13.5288 4.90625H13.5273ZM6.37586 2.49031C5.90595 3.24315 5.53939 4.05574 5.28602 4.90625H3.47125C4.15085 3.80639 5.17061 2.95819 6.37586 2.49031ZM3.47125 11.0938H5.28602C5.53939 11.9443 5.90595 12.7569 6.37586 13.5097C5.17061 13.0418 4.15085 12.1936 3.47125 11.0938ZM10.6241 13.5097C11.0941 12.7569 11.4606 11.9443 11.714 11.0938H13.5288C12.8492 12.1936 11.8294 13.0418 10.6241 13.5097Z" fill="#1680EB" />
                                </svg>
                                <span className="font-medium text-[#5F6578] text-sm sm:text-base text-center">Global Client Base</span>
                            </div>
                        </div>

                        {/* Desktop Layout - Horizontal with separators */}
                        <div className="hidden md:flex flex-wrap justify-center items-center gap-5 lg:gap-10">

                            <div className="feature-item flex items-center space-x-3 text-gray-700 initial-hidden feature-hover">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-hover">
                                    <path d="M11.9095 5.71555C11.9881 5.79393 12.0505 5.88708 12.0931 5.98964C12.1357 6.0922 12.1576 6.20215 12.1576 6.3132C12.1576 6.42425 12.1357 6.53421 12.0931 6.63677C12.0505 6.73933 11.9881 6.83247 11.9095 6.91086L7.97196 10.8484C7.89357 10.927 7.80043 10.9894 7.69787 11.032C7.59531 11.0746 7.48535 11.0965 7.3743 11.0965C7.26325 11.0965 7.15329 11.0746 7.05073 11.032C6.94817 10.9894 6.85503 10.927 6.77664 10.8484L5.08914 9.16086C5.01066 9.08237 4.9484 8.9892 4.90593 8.88665C4.86345 8.78411 4.84159 8.6742 4.84159 8.5632C4.84159 8.45221 4.86345 8.3423 4.90593 8.23975C4.9484 8.13721 5.01066 8.04403 5.08914 7.96555C5.16763 7.88706 5.26081 7.8248 5.36335 7.78233C5.4659 7.73985 5.5758 7.71799 5.6868 7.71799C5.79779 7.71799 5.9077 7.73985 6.01025 7.78233C6.1128 7.8248 6.20597 7.88706 6.28446 7.96555L7.375 9.05469L10.7155 5.71344C10.7941 5.63513 10.8872 5.57306 10.9897 5.53078C11.0922 5.4885 11.2021 5.46684 11.3129 5.46703C11.4238 5.46723 11.5336 5.48928 11.6359 5.53192C11.7383 5.57456 11.8312 5.63696 11.9095 5.71555ZM16.0938 8C16.0938 9.5019 15.6484 10.9701 14.814 12.2189C13.9796 13.4676 12.7936 14.441 11.406 15.0157C10.0184 15.5905 8.49158 15.7408 7.01854 15.4478C5.54549 15.1548 4.19242 14.4316 3.13041 13.3696C2.06841 12.3076 1.34517 10.9545 1.05217 9.48147C0.759159 8.00842 0.90954 6.48157 1.48429 5.094C2.05905 3.70642 3.03236 2.52044 4.28114 1.68603C5.52993 0.851616 6.9981 0.40625 8.5 0.40625C10.5133 0.408483 12.4435 1.20925 13.8671 2.63287C15.2907 4.0565 16.0915 5.9867 16.0938 8ZM14.4063 8C14.4063 6.83185 14.0599 5.68994 13.4109 4.71866C12.7619 3.74739 11.8395 2.99037 10.7602 2.54334C9.681 2.09631 8.49345 1.97934 7.34775 2.20724C6.20205 2.43513 5.14966 2.99765 4.32365 3.82365C3.49765 4.64965 2.93513 5.70205 2.70724 6.84775C2.47935 7.99345 2.59631 9.181 3.04334 10.2602C3.49037 11.3394 4.24739 12.2619 5.21867 12.9109C6.18994 13.5599 7.33186 13.9062 8.5 13.9062C10.0659 13.9046 11.5672 13.2818 12.6745 12.1745C13.7818 11.0672 14.4046 9.56592 14.4063 8Z" fill="#1680EB" />
                                </svg>
                                <span className="font-medium text-[#5F6578] text-base lg:text-[18px]">Exclusive Distributor</span>
                            </div>

                            <div className="bg-[#363E4A] w-[5px] h-[5px] rounded-full"></div>

                            <div className="feature-item flex items-center space-x-3 text-gray-700 initial-hidden feature-hover">
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-hover">
                                    <path d="M13.125 0.53125H1.875C1.50204 0.53125 1.14435 0.679408 0.880631 0.943131C0.616908 1.20685 0.46875 1.56454 0.46875 1.9375V5.875C0.46875 9.69227 2.31938 12.0077 3.87188 13.2782C5.53898 14.6416 7.2075 15.1063 7.27781 15.1267C7.42332 15.1661 7.57668 15.1661 7.72219 15.1267C7.7925 15.107 9.46102 14.6416 11.1281 13.2782C12.6806 12.0077 14.5312 9.69227 14.5312 5.875V1.9375C14.5312 1.56454 14.3831 1.20685 14.1194 0.943131C13.8556 0.679408 13.498 0.53125 13.125 0.53125ZM12.8438 5.875C12.8438 8.38586 11.9234 10.4235 10.1079 11.9324C9.32971 12.5745 8.44779 13.0794 7.5 13.4252C6.55213 13.0795 5.67018 12.5747 4.89211 11.9324C3.07664 10.4235 2.15625 8.38586 2.15625 5.875V2.21875H12.8438V5.875Z" fill="#1680EB" />
                                </svg>
                                <span className="font-medium text-[#5F6578] text-base lg:text-[18px]">Regulatory Liaison</span>
                            </div>

                            <div className="bg-[#363E4A] w-[5px] h-[5px] rounded-full"></div>

                            <div className="feature-item flex items-center space-x-3 text-gray-700 initial-hidden feature-hover">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-hover">
                                    <path d="M15.0173 6.04324C14.9079 6.06157 14.8032 6.10126 14.7092 6.16006C14.6152 6.21886 14.5338 6.2956 14.4694 6.38591C14.4051 6.47623 14.3592 6.57833 14.3344 6.68638C14.3096 6.79444 14.3063 6.90633 14.3247 7.01567C14.379 7.34098 14.4063 7.67023 14.4062 8.00004C14.4083 9.32527 13.9623 10.6123 13.1406 11.6521C12.5937 10.9565 11.8967 10.3936 11.1016 10.0054C11.6083 9.49221 11.952 8.84066 12.0893 8.13268C12.2267 7.4247 12.1516 6.69191 11.8735 6.0265C11.5954 5.36109 11.1268 4.79277 10.5265 4.39305C9.92625 3.99333 9.22118 3.78005 8.5 3.78005C7.77882 3.78005 7.07375 3.99333 6.47348 4.39305C5.87321 4.79277 5.40456 5.36109 5.12648 6.0265C4.8484 6.69191 4.77332 7.4247 4.91068 8.13268C5.04804 8.84066 5.3917 9.49221 5.89844 10.0054C5.10332 10.3936 4.40626 10.9565 3.85938 11.6521C3.17233 10.7815 2.74449 9.73489 2.62488 8.63231C2.50528 7.52973 2.69876 6.41576 3.18314 5.41808C3.66752 4.4204 4.4232 3.57939 5.36357 2.99143C6.30395 2.40348 7.39095 2.09238 8.5 2.09379C8.82981 2.09377 9.15906 2.12105 9.48438 2.17535C9.70507 2.21265 9.93155 2.16075 10.114 2.03106C10.2964 1.90137 10.4199 1.70453 10.4571 1.48383C10.4944 1.26313 10.4425 1.03665 10.3129 0.854224C10.1832 0.671794 9.98632 0.548353 9.76562 0.511057C8.67679 0.328236 7.5612 0.384818 6.49646 0.676869C5.43171 0.96892 4.44337 1.48943 3.60019 2.20218C2.75701 2.91494 2.07923 3.80283 1.614 4.8041C1.14876 5.80537 0.907248 6.89597 0.90625 8.00004C0.90625 10.014 1.7063 11.9455 3.13041 13.3696C4.55451 14.7937 6.48601 15.5938 8.5 15.5938C10.514 15.5938 12.4455 14.7937 13.8696 13.3696C15.2937 11.9455 16.0938 10.014 16.0938 8.00004C16.0938 7.576 16.0588 7.15267 15.989 6.73442C15.9516 6.51397 15.8283 6.31736 15.6461 6.18777C15.4639 6.05817 15.2378 6.00619 15.0173 6.04324ZM6.53125 7.43754C6.53125 7.04816 6.64672 6.66752 6.86304 6.34376C7.07937 6.02 7.38685 5.76766 7.74659 5.61865C8.10633 5.46964 8.50218 5.43066 8.88408 5.50662C9.26598 5.58258 9.61678 5.77009 9.89212 6.04542C10.1675 6.32076 10.355 6.67156 10.4309 7.05346C10.5069 7.43536 10.4679 7.83121 10.3189 8.19095C10.1699 8.55069 9.91754 8.85817 9.59378 9.0745C9.27002 9.29083 8.88938 9.40629 8.5 9.40629C7.97786 9.40629 7.4771 9.19887 7.10788 8.82966C6.73867 8.46045 6.53125 7.95969 6.53125 7.43754ZM5.09477 12.8214C5.48646 12.2858 5.99896 11.8502 6.59063 11.5499C7.18231 11.2496 7.83648 11.093 8.5 11.093C9.16352 11.093 9.81769 11.2496 10.4094 11.5499C11.001 11.8502 11.5135 12.2858 11.9052 12.8214C10.91 13.5272 9.72008 13.9063 8.5 13.9063C7.27992 13.9063 6.08998 13.5272 5.09477 12.8214ZM16.4095 2.40949L14.1595 4.65949C14.0811 4.73815 13.9879 4.80057 13.8854 4.84315C13.7828 4.88574 13.6728 4.90766 13.5618 4.90766C13.4507 4.90766 13.3408 4.88574 13.2382 4.84315C13.1357 4.80057 13.0425 4.73815 12.9641 4.65949L11.8391 3.53449C11.6806 3.37599 11.5916 3.161 11.5916 2.93684C11.5916 2.71267 11.6806 2.49769 11.8391 2.33918C11.9976 2.18067 12.2126 2.09162 12.4368 2.09162C12.661 2.09162 12.8759 2.18067 13.0345 2.33918L13.5625 2.86723L15.2155 1.21348C15.3741 1.05497 15.589 0.965921 15.8132 0.965921C16.0374 0.965921 16.2524 1.05497 16.4109 1.21348C16.5694 1.37199 16.6584 1.58697 16.6584 1.81113C16.6584 2.0353 16.5694 2.25028 16.4109 2.40879L16.4095 2.40949Z" fill="#1680EB" />
                                </svg>
                                <span className="font-medium text-[#5F6578] text-base lg:text-[18px]">KYC/AML</span>
                            </div>

                            <div className="bg-[#363E4A] w-[5px] h-[5px] rounded-full"></div>

                            <div className="feature-item flex items-center space-x-3 text-gray-700 initial-hidden feature-hover">
                                <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-hover">
                                    <path d="M2.1875 6.59379H3.59375V9.96879H2.75C2.52622 9.96879 2.31161 10.0577 2.15338 10.2159C1.99514 10.3742 1.90625 10.5888 1.90625 10.8125C1.90625 11.0363 1.99514 11.2509 2.15338 11.4092C2.31161 11.5674 2.52622 11.6563 2.75 11.6563H16.25C16.4738 11.6563 16.6884 11.5674 16.8466 11.4092C17.0049 11.2509 17.0938 11.0363 17.0938 10.8125C17.0938 10.5888 17.0049 10.3742 16.8466 10.2159C16.6884 10.0577 16.4738 9.96879 16.25 9.96879H15.4062V6.59379H16.8125C16.9962 6.59381 17.1749 6.53386 17.3215 6.42305C17.468 6.31224 17.5744 6.15663 17.6244 5.97986C17.6745 5.80309 17.6654 5.61481 17.5987 5.44363C17.532 5.27246 17.4112 5.12773 17.2548 5.03145L9.94227 0.531449C9.80927 0.449592 9.65617 0.40625 9.5 0.40625C9.34383 0.40625 9.19073 0.449592 9.05773 0.531449L1.74523 5.03145C1.58877 5.12773 1.468 5.27246 1.40128 5.44363C1.33456 5.61481 1.32554 5.80309 1.37558 5.97986C1.42562 6.15663 1.53199 6.31224 1.67853 6.42305C1.82508 6.53386 2.00378 6.59381 2.1875 6.59379ZM5.28125 6.59379H6.96875V9.96879H5.28125V6.59379ZM10.3438 6.59379V9.96879H8.65625V6.59379H10.3438ZM13.7188 9.96879H12.0312V6.59379H13.7188V9.96879ZM9.5 2.24075L13.8313 4.90629H5.16875L9.5 2.24075ZM18.2188 13.625C18.2188 13.8488 18.1299 14.0634 17.9716 14.2217C17.8134 14.3799 17.5988 14.4688 17.375 14.4688H1.625C1.40122 14.4688 1.18661 14.3799 1.02838 14.2217C0.870145 14.0634 0.78125 13.8488 0.78125 13.625C0.78125 13.4013 0.870145 13.1867 1.02838 13.0284C1.18661 12.8702 1.40122 12.7813 1.625 12.7813H17.375C17.5988 12.7813 17.8134 12.8702 17.9716 13.0284C18.1299 13.1867 18.2188 13.4013 18.2188 13.625Z" fill="#1680EB" />
                                </svg>
                                <span className="font-medium text-[#5F6578] text-base lg:text-[18px]">Banking Setup</span>
                            </div>

                            <div className="bg-[#363E4A] w-[5px] h-[5px] rounded-full"></div>

                            <div className="feature-item flex items-center space-x-3 text-gray-700 initial-hidden feature-hover">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-hover">
                                    <path d="M8.5 0.40625C6.9981 0.40625 5.52993 0.851616 4.28114 1.68603C3.03236 2.52044 2.05905 3.70642 1.48429 5.094C0.90954 6.48157 0.759159 8.00842 1.05217 9.48147C1.34517 10.9545 2.06841 12.3076 3.13041 13.3696C4.19242 14.4316 5.54549 15.1548 7.01854 15.4478C8.49158 15.7408 10.0184 15.5905 11.406 15.0157C12.7936 14.441 13.9796 13.4676 14.814 12.2189C15.6484 10.9701 16.0938 9.5019 16.0938 8C16.0915 5.9867 15.2907 4.0565 13.8671 2.63287C12.4435 1.20925 10.5133 0.408483 8.5 0.40625ZM8.5 13.5547C7.87829 12.8271 7.39265 11.9935 7.06633 11.0938H9.93649C9.75078 11.6025 9.51526 12.0917 9.23336 12.5541C9.01645 12.907 8.77119 13.2416 8.5 13.5547ZM6.63743 9.40625C6.4982 8.47392 6.4982 7.52608 6.63743 6.59375H10.364C10.5032 7.52608 10.5032 8.47392 10.364 9.40625H6.63743ZM2.59375 8C2.59373 7.52607 2.6511 7.05388 2.76461 6.59375H4.93164C4.81446 7.52759 4.81446 8.47241 4.93164 9.40625H2.76461C2.6511 8.94612 2.59373 8.47393 2.59375 8ZM8.5 2.44531C9.12171 3.17293 9.60735 4.00654 9.93367 4.90625H7.06492C7.25063 4.39748 7.48615 3.90831 7.76805 3.44586C7.98452 3.09306 8.22931 2.75844 8.5 2.44531ZM12.067 6.59375H14.234C14.4618 7.51741 14.4618 8.48259 14.234 9.40625H12.0684C12.1855 8.47241 12.1855 7.52759 12.0684 6.59375H12.067ZM13.5273 4.90625H11.714C11.4606 4.05574 11.0941 3.24315 10.6241 2.49031C11.8294 2.95819 12.8492 3.80639 13.5288 4.90625H13.5273ZM6.37586 2.49031C5.90595 3.24315 5.53939 4.05574 5.28602 4.90625H3.47125C4.15085 3.80639 5.17061 2.95819 6.37586 2.49031ZM3.47125 11.0938H5.28602C5.53939 11.9443 5.90595 12.7569 6.37586 13.5097C5.17061 13.0418 4.15085 12.1936 3.47125 11.0938ZM10.6241 13.5097C11.0941 12.7569 11.4606 11.9443 11.714 11.0938H13.5288C12.8492 12.1936 11.8294 13.0418 10.6241 13.5097Z" fill="#1680EB" />
                                </svg>
                                <span className="font-medium text-[#5F6578] text-base lg:text-[18px]">Global Client Base</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <section
                ref={regulatoryRef}
                className="py-16 bg-white initial-hidden"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left side - Image */}
                        <div className="regulatory-image relative initial-hidden">
                            <div className="rounded-2xl overflow-hidden shadow-2xl hover-lift">
                                <img
                                    src="/images/Trading.png"
                                    alt="Hand holding Bitcoin with trading screens in background"
                                    className="w-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Right side - Content */}
                        <div className="regulatory-content lg:pl-8 initial-hidden">
                            <h2 className="text-3xl lg:text-4xl font-semibold text-[#141416] mb-4 leading-tight text-glow">
                                World-Class Regulatory Standards for Comoros
                            </h2>

                            <p className="text-[16px] text-[#353945] mb-6 leading-relaxed">
                                The Union of Comoros is committed to establishing world-class regulatory
                                standards with global credibility and international recognition.
                            </p>

                            <div className="space-y-4">
                                {/* Comprehensive Legal Framework */}
                                <div className="regulatory-item flex items-start space-x-4 initial-hidden hover-lift p-4 rounded-lg transition-all duration-300 hover:bg-blue-50">
                                    <div className="flex-shrink-0  flex items-center justify-center icon-hover">
                                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="44" height="44" rx="8" fill="#ECF2FD" />
                                            <path d="M17.4288 22H23.1431M17.4288 24.2857H25.4288M17.4288 26.5714H20.8574M28.8574 27.7143V19.7143L23.1431 14H17.4288C16.8226 14 16.2412 14.2408 15.8125 14.6695C15.3839 15.0981 15.1431 15.6795 15.1431 16.2857V27.7143C15.1431 28.3205 15.3839 28.9019 15.8125 29.3305C16.2412 29.7592 16.8226 30 17.4288 30H26.5716C27.1778 30 27.7592 29.7592 28.1879 29.3305C28.6165 28.9019 28.8574 28.3205 28.8574 27.7143Z" stroke="#117FF5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M23.1431 14V17.4286C23.1431 18.0348 23.3839 18.6162 23.8125 19.0448C24.2412 19.4735 24.8226 19.7143 25.4288 19.7143H28.8574" stroke="#117FF5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[16px] font-semibold text-gray-900 mb-1">Comprehensive Legal Framework</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">Developed in line with international best practices to ensure robust compliance.</p>
                                    </div>
                                </div>

                                {/* New AML Regulations */}
                                <div className="regulatory-item flex items-start space-x-4 initial-hidden hover-lift p-4 rounded-lg transition-all duration-300 hover:bg-blue-50">
                                    <div className="flex-shrink-0  flex items-center justify-center icon-hover">
                                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="44" height="44" rx="8" fill="#ECF2FD" />
                                            <path d="M22 31C23.1819 31 24.3522 30.7672 25.4442 30.3149C26.5361 29.8626 27.5282 29.1997 28.364 28.364C29.1997 27.5282 29.8626 26.5361 30.3149 25.4442C30.7672 24.3522 31 23.1819 31 22C31 20.8181 30.7672 19.6478 30.3149 18.5558C29.8626 17.4639 29.1997 16.4718 28.364 15.636C27.5282 14.8003 26.5361 14.1374 25.4442 13.6851C24.3522 13.2328 23.1819 13 22 13M22 31C20.8181 31 19.6478 30.7672 18.5558 30.3149C17.4639 29.8626 16.4718 29.1997 15.636 28.364C14.8003 27.5282 14.1374 26.5361 13.6851 25.4442C13.2328 24.3522 13 23.1819 13 22C13 20.8181 13.2328 19.6478 13.6851 18.5558C14.1374 17.4639 14.8003 16.4718 15.636 15.636C16.4718 14.8003 17.4639 14.1374 18.5558 13.6851C19.6478 13.2328 20.8181 13 22 13M22 31C24.761 31 25.941 25.837 25.941 22C25.941 18.163 24.761 13 22 13M22 31C19.239 31 18.059 25.837 18.059 22C18.059 18.163 19.239 13 22 13M13.5 19H30.5M13.5 25H30.5" stroke="#117FF5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[16px] font-semibold text-gray-900 mb-1">New AML Regulations In-line with International Standards</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">Designed for cross-border acceptance and cooperation with international regulators.</p>
                                    </div>
                                </div>

                                {/* Government Oversight */}
                                <div className="regulatory-item flex items-start space-x-4 initial-hidden hover-lift p-4 rounded-lg transition-all duration-300 hover:bg-blue-50">
                                    <div className="flex-shrink-0 flex items-center justify-center icon-hover">
                                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="44" height="44" rx="8" fill="#ECF2FD" />
                                            <path d="M12.25 31H31.75M13.75 13V31M24.25 13V31M30.25 17.5V31M16.75 16.75H17.5M16.75 19.75H17.5M16.75 22.75H17.5M20.5 16.75H21.25M20.5 19.75H21.25M20.5 22.75H21.25M16.75 31V27.625C16.75 27.004 17.254 26.5 17.875 26.5H20.125C20.746 26.5 21.25 27.004 21.25 27.625V31M13 13H25M24.25 17.5H31M27.25 21.25H27.258V21.258H27.25V21.25ZM27.25 24.25H27.258V24.258H27.25V24.25ZM27.25 27.25H27.258V27.258H27.25V27.25Z" stroke="#117FF5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[16px] font-semibold text-gray-900 mb-1">Government Oversight</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">Direct supervision by the Comoros government ensures transparency and accountability.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                ref={whoWeServeRef}
                className="py-16 initial-hidden"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 text-glow">
                            Who We Serve
                        </h2>
                        <p className="text-lg lg:text-[18px] text-[#5F6578] max-w-3xl mx-auto leading-relaxed">
                            Sophisticated financial services companies requiring regulatory infrastructure
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Multi-Jurisdiction Brokers */}
                        <div className="service-card bg-white rounded-2xl p-8 shadow-sm border border-[#EDEEF2] initial-hidden card-hover">
                            <div className=" flex items-center justify-center mb-6 mx-auto icon-hover">
                                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="40" cy="40" r="40" fill="#ECF2FD" />
                                    <path d="M33.8459 31V29.8C33.8459 27.145 33.8459 25 38.7692 25H41.2292C46.1526 25 46.1526 27.145 46.1526 29.8V31M33.8459 55H46.1526C52.3359 55 53.4442 52.5833 53.7676 49.645L54.9209 37.645C55.3376 33.985 54.2592 31 47.6909 31H32.3076C25.7392 31 24.6626 33.985 25.0776 37.645L26.2309 49.645C26.5542 52.5833 27.6626 55 33.8459 55Z" stroke="#1680EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M36.3525 42.2185C32.447 41.7877 28.6944 40.458 25.3892 38.3335M43.7225 42.2185C47.628 41.7877 51.3805 40.458 54.6858 38.3335M43.3325 42.5002C43.3325 43.3842 42.9813 44.2321 42.3562 44.8572C41.7311 45.4823 40.8832 45.8335 39.9992 45.8335C39.1151 45.8335 38.2673 45.4823 37.6421 44.8572C37.017 44.2321 36.6658 43.3842 36.6658 42.5002C36.6658 41.6161 37.017 40.7683 37.6421 40.1431C38.2673 39.518 39.1151 39.1668 39.9992 39.1668C40.8832 39.1668 41.7311 39.518 42.3562 40.1431C42.9813 40.7683 43.3325 41.6161 43.3325 42.5002Z" stroke="#1680EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>
                            <h3 className="text-[17px] font-semibold text-[#141416] mb-4 text-center">
                                Multi-Jurisdiction Brokers
                            </h3>
                            <p className="text-[#5F6578] text-[14px] text-center leading-relaxed">
                                Expanding into MEA/Asia markets with regulatory compliance
                            </p>
                        </div>

                        {/* Crypto Exchanges & OTC Desks */}
                        <div className="service-card bg-white rounded-2xl p-8 shadow-sm border border-[#EDEEF2] initial-hidden card-hover">
                            <div className=" flex items-center justify-center mb-6 mx-auto icon-hover">
                                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="40" cy="40" r="40" fill="#ECF2FD" />
                                    <path d="M49.8988 27.8971H46.9171C46.4601 27.8974 46.0175 28.0567 45.6651 28.3477C45.3128 28.6387 45.0727 29.0432 44.986 29.4919C44.8992 29.9405 44.9713 30.4054 45.1899 30.8067C45.4084 31.208 45.7598 31.5208 46.1837 31.6913L49.2109 32.9028C49.6349 33.0734 49.9862 33.3861 50.2048 33.7875C50.4233 34.1888 50.4954 34.6536 50.4087 35.1023C50.322 35.5509 50.0819 35.9555 49.7295 36.2464C49.3772 36.5374 48.9346 36.6967 48.4776 36.697H47.6988M47.6988 27.8971V26.7971" stroke="#1680EB" stroke-width="1.75999" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M48.8433 41.0237C50.4716 40.8098 52.0076 40.1446 53.2776 39.1033C54.5476 38.062 55.5009 36.6861 56.0297 35.1313C56.5585 33.5765 56.6418 31.9047 56.2701 30.305C55.8983 28.7053 55.0864 27.2416 53.9262 26.0793C52.7659 24.9169 51.3036 24.1024 49.7046 23.7278C48.1056 23.3533 46.4337 23.4335 44.8779 23.9596C43.3221 24.4856 41.9446 25.4365 40.901 26.7046C39.8574 27.9728 39.1895 29.5076 38.9727 31.1355M45.4993 45.497C45.4993 42.5796 44.3404 39.7817 42.2775 37.7189C40.2147 35.656 37.4168 34.4971 34.4994 34.4971M25.6995 38.897C24.8078 40.0979 24.1705 41.4681 23.8263 42.9237C23.4822 44.3793 23.4386 45.8898 23.6981 47.3628C23.9576 48.8359 24.5147 50.2405 25.3356 51.4909C26.1564 52.7413 27.2236 53.8112 28.4719 54.6351C29.7203 55.459 31.1236 56.0197 32.596 56.2828C34.0684 56.5459 35.579 56.506 37.0354 56.1655C38.4919 55.825 39.8636 55.191 41.0667 54.3023C42.2698 53.4136 43.279 52.2889 44.0327 50.9969" stroke="#1680EB" stroke-width="1.75999" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M35.5994 45.4969C36.1829 45.4969 36.7425 45.2651 37.155 44.8526C37.5676 44.44 37.7994 43.8804 37.7994 43.2969C37.7994 42.7135 37.5676 42.1539 37.155 41.7413C36.7425 41.3287 36.1829 41.097 35.5994 41.097H32.2994V49.8969H35.5994C36.1829 49.8969 36.7425 49.6651 37.155 49.2525C37.5676 48.84 37.7994 48.2804 37.7994 47.6969C37.7994 47.1134 37.5676 46.5539 37.155 46.1413C36.7425 45.7287 36.1829 45.4969 35.5994 45.4969ZM35.5994 45.4969H32.2994M34.4994 41.097V38.897M34.4994 49.8969V52.0969M23.4995 28.9971L26.7995 34.497L32.2994 31.1971" stroke="#1680EB" stroke-width="1.75999" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M34.4103 23.7173C32.3738 24.4594 30.6372 25.8493 29.4669 27.6737C28.2966 29.4982 27.7574 31.6562 27.9321 33.8167M56.4996 50.997L53.1996 45.4971L47.6997 48.7971" stroke="#1680EB" stroke-width="1.75999" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M45.5889 56.2769C47.6248 55.5349 49.3611 54.1454 50.5314 52.3216C51.7016 50.4978 52.2411 48.3404 52.0671 46.1804" stroke="#1680EB" stroke-width="1.75999" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>
                            <h3 className="text-[17px] font-semibold text-[#141416] mb-4 text-center">
                                Crypto Exchanges & OTC Desks
                            </h3>
                            <p className="text-[#5F6578] text-[14px] text-center leading-relaxed">
                                Virtual asset service providers needing regulated presence
                            </p>
                        </div>

                        {/* Cross-Border Fintech Operators */}
                        <div className="service-card bg-white rounded-2xl p-8 shadow-sm border border-[#EDEEF2] initial-hidden card-hover">
                            <div className=" flex items-center justify-center mb-6 mx-auto icon-hover">
                                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="40" cy="40" r="40" fill="#ECF2FD" />
                                    <path d="M39.9995 54.9751C41.9693 54.9751 43.9199 54.5871 45.7398 53.8333C47.5596 53.0795 49.2132 51.9746 50.6061 50.5817C51.999 49.1888 53.1039 47.5352 53.8577 45.7153C54.6115 43.8955 54.9995 41.9449 54.9995 39.9751C54.9995 38.0053 54.6115 36.0547 53.8577 34.2348C53.1039 32.415 51.999 30.7614 50.6061 29.3685C49.2132 27.9756 47.5596 26.8707 45.7398 26.1169C43.9199 25.3631 41.9693 24.9751 39.9995 24.9751M39.9995 54.9751C38.0297 54.9751 36.0791 54.5871 34.2593 53.8333C32.4394 53.0795 30.7858 51.9746 29.3929 50.5817C28 49.1888 26.8951 47.5352 26.1413 45.7153C25.3875 43.8955 24.9995 41.9449 24.9995 39.9751C24.9995 38.0053 25.3875 36.0547 26.1413 34.2348C26.8951 32.415 28 30.7614 29.3929 29.3685C30.7858 27.9756 32.4394 26.8707 34.2593 26.1169C36.0791 25.3631 38.0297 24.9751 39.9995 24.9751M39.9995 54.9751C44.6012 54.9751 46.5678 46.3701 46.5678 39.9751C46.5678 33.5801 44.6012 24.9751 39.9995 24.9751M39.9995 54.9751C35.3978 54.9751 33.4312 46.3701 33.4312 39.9751C33.4312 33.5801 35.3978 24.9751 39.9995 24.9751M25.8328 34.9751H54.1662M25.8328 44.9751H54.1662" stroke="#1680EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>
                            <h3 className="text-[17px] font-semibold text-[#141416] mb-4 text-center">
                                Cross-Border Fintech Operators
                            </h3>
                            <p className="text-[#5F6578] text-[14px] text-center leading-relaxed">
                                Payment and remittance players requiring virtual asset scope
                            </p>
                        </div>

                        {/* Institutional Consolidators */}
                        <div className="service-card bg-white rounded-2xl p-8 shadow-sm border border-[#EDEEF2] initial-hidden card-hover">
                            <div className="flex items-center justify-center mb-6 mx-auto icon-hover">
                                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="40" cy="40" r="40" fill="#ECF2FD" />
                                    <path d="M23.7495 36.2251H27.4995V46.2251H24.9995C24.668 46.2251 24.35 46.3567 24.1156 46.5912C23.8812 46.8256 23.7495 47.1435 23.7495 47.4751C23.7495 47.8066 23.8812 48.1245 24.1156 48.3589C24.35 48.5934 24.668 48.7251 24.9995 48.7251H54.9995C55.331 48.7251 55.649 48.5934 55.8834 48.3589C56.1178 48.1245 56.2495 47.8066 56.2495 47.4751C56.2495 47.1435 56.1178 46.8256 55.8834 46.5912C55.649 46.3567 55.331 46.2251 54.9995 46.2251H52.4995V36.2251H56.2495C56.5215 36.2248 56.786 36.1358 57.0028 35.9716C57.2196 35.8075 57.377 35.577 57.451 35.3153C57.5251 35.0536 57.5117 34.7749 57.4131 34.5215C57.3144 34.268 57.1357 34.0537 56.9042 33.911L40.6542 23.911C40.4573 23.7899 40.2307 23.7258 39.9995 23.7258C39.7684 23.7258 39.5417 23.7899 39.3448 23.911L23.0948 33.911C22.8633 34.0537 22.6847 34.268 22.586 34.5215C22.4873 34.7749 22.4739 35.0536 22.548 35.3153C22.622 35.577 22.7794 35.8075 22.9962 35.9716C23.2131 36.1358 23.4775 36.2248 23.7495 36.2251ZM29.9995 36.2251H34.9995V46.2251H29.9995V36.2251ZM42.4995 36.2251V46.2251H37.4995V36.2251H42.4995ZM49.9995 46.2251H44.9995V36.2251H49.9995V46.2251ZM39.9995 26.4422L51.8339 33.7251H28.1651L39.9995 26.4422ZM58.7495 52.4751C58.7495 52.8066 58.6178 53.1245 58.3834 53.3589C58.149 53.5934 57.831 53.7251 57.4995 53.7251H22.4995C22.168 53.7251 21.85 53.5934 21.6156 53.3589C21.3812 53.1245 21.2495 52.8066 21.2495 52.4751C21.2495 52.1435 21.3812 51.8256 21.6156 51.5912C21.85 51.3567 22.168 51.2251 22.4995 51.2251H57.4995C57.831 51.2251 58.149 51.3567 58.3834 51.5912C58.6178 51.8256 58.7495 52.1435 58.7495 52.4751Z" fill="#1680EB" />
                                </svg>

                            </div>
                            <h3 className="text-[17px] font-semibold text-[#141416] mb-4 text-center">
                                Institutional Consolidators
                            </h3>
                            <p className="text-[#5F6578] text-[14px] text-center leading-relaxed">
                                Institutional founders consolidating licensing under one roof
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />


            {/* Schedule a Call Modal */}
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
                        <h2 className="text-[30px] font-bold text-gray-900 mb-2">
                            Schedule a Call
                        </h2>
                        <p className="text-gray-600">
                            Schedule a call with our licensing experts to discuss your requirements
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleBookConsultation} name="book-consultation"
                        method="POST"
                        data-netlify="true"
                        data-netlify-honeypot="bot-field" className="space-y-6">
                        {/* Hidden fields for Netlify */}
                        <input type="hidden" name="form-name" value="book-consultation" />


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
                                        <path d="M10.0002 10C12.3013 10 14.1668 8.13454 14.1668 5.83335C14.1668 3.53217 12.3013 1.66669 10.0002 1.66669C7.69898 1.66669 5.8335 3.53217 5.8335 5.83335C5.8335 8.13454 7.69898 10 10.0002 10Z" stroke="#B1B5C3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M17.1585 18.3333C17.1585 15.1083 13.9501 12.5 10.0001 12.5C6.05013 12.5 2.8418 15.1083 2.8418 18.3333" stroke="#B1B5C3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
                                        <path d="M5.8335 2.79169H14.1665C15.5922 2.79169 16.6488 3.2 17.3491 3.90009C18.0494 4.60037 18.4585 5.65776 18.4585 7.08368V12.9167C18.4585 14.3426 18.0494 15.399 17.3491 16.0993C16.6488 16.7996 15.5924 17.2087 14.1665 17.2087H5.8335C4.40757 17.2087 3.35018 16.7996 2.6499 16.0993C1.94982 15.399 1.5415 14.3424 1.5415 12.9167V7.08368C1.5415 5.65776 1.94962 4.60037 2.6499 3.90009C3.35018 3.19981 4.40757 2.79169 5.8335 2.79169ZM5.8335 3.04169C4.56834 3.04169 3.53105 3.34901 2.81494 4.06512C2.09883 4.78124 1.7915 5.81852 1.7915 7.08368V12.9167C1.7915 14.1818 2.09883 15.2191 2.81494 15.9352C3.53105 16.6512 4.56844 16.9587 5.8335 16.9587H14.1665C15.4317 16.9587 16.4689 16.6514 17.1851 15.9352C17.9012 15.2191 18.2085 14.1818 18.2085 12.9167V7.08368C18.2085 5.81862 17.9011 4.78123 17.1851 4.06512C16.4689 3.34901 15.4317 3.04169 14.1665 3.04169H5.8335Z" fill="#292D32" stroke="#B1B5C3" />
                                        <path d="M14.0898 7.39648C14.144 7.35252 14.2187 7.36795 14.251 7.41016L14.2568 7.41699L14.2617 7.42383C14.2947 7.46449 14.2946 7.51659 14.2744 7.55371L14.248 7.58496L14.2383 7.59277L11.6299 9.67578L11.623 9.68164C11.1935 10.0373 10.6033 10.2246 10 10.2246C9.39754 10.2246 8.80591 10.0372 8.36621 9.67871L8.3623 9.67578L5.75488 7.59375C5.69376 7.54244 5.69622 7.46507 5.72949 7.42383C5.78088 7.36058 5.85976 7.36268 5.90137 7.39648L5.9043 7.39941L8.5127 9.48242C8.93392 9.82013 9.47778 9.97266 9.99609 9.97266C10.5142 9.9726 11.0574 9.81993 11.4785 9.48242L14.0869 7.39941L14.0898 7.39648Z" fill="#292D32" stroke="#B1B5C3" />
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
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 0 focus:border-transparent transition-colors"
                                    required
                                />
                            </div>
                        </div>

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

                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>

                                        <span>Book Consultation</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default Home