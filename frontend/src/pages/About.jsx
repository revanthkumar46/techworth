import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
	FaUsers,
	FaBullseye, FaEye, FaTrophy,
	FaUserTie, FaEnvelope, FaHeartbeat, FaLightbulb,
	FaHandsHelping, FaBalanceScale, FaSmile, FaMedal
} from 'react-icons/fa';
import aboutHero1 from '../assets/about-hero1.jpg';
import aboutHero2 from '../assets/about-hero2.jpg';
import missionImg from '../assets/our-mision.png';
import visionImg from '../assets/our-vision.png';
import passionTechImg from '../assets/Passion for Technology.jpg';
import innovationDrivenImg from '../assets/innovation-Driven.jpg';
import collaborativeEnvImg from '../assets/Collaborative Environment.jpg';
import workLifeBalanceImg from '../assets/Work-Life Balance.jpg';
import excellenceImg from '../assets/Excellence in Everything.jpg';
import funImg from '../assets/hands-lifting-trophy.jpg';
import passionTechPng from '../assets/Passion for Technology1.png';
import innovationDrivenPng from '../assets/innovation-Driven1.png';
import collaborativeEnvPng from '../assets/Collaborative Environment1.png';
import workLifeBalancePng from '../assets/Work-Life Balance1.png';
import excellencePng from '../assets/Excellence in Everything1.png';
import funPng from '../assets/Fun & Recreation1.png';
import targetClientsGif from '../assets/target-clients.gif';
import countriesServedGif from '../assets/countries-served.gif';
import teamMembersGif from '../assets/Team-members.gif';
import projectsGif from '../assets/Projects.gif';
import experienceGif from '../assets/experience.gif';
import supportGif from '../assets/support.gif';
import logoOnly from '../assets/techworth-logo-only.png';
import aboutSectionImage from '../assets/about-us-section2.png';

const heroImages = [aboutHero1, aboutHero2];

const rightPngs = [
  passionTechPng,
  innovationDrivenPng,
  collaborativeEnvPng,
  workLifeBalancePng,
  excellencePng,
  funPng
];

const liftShadow = {
	initial: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
	hover:   { y: -6, boxShadow: '0 12px 28px rgba(0,0,0,0.12)' },
	tap:     { y: -2, boxShadow: '0 6px 14px rgba(0,0,0,0.12)' }
};

export default function About() {
	// Add carousel state
	const [heroIdx, setHeroIdx] = useState(0);
	useEffect(() => {
		const timer = setInterval(() => {
			setHeroIdx((idx) => (idx === heroImages.length - 1 ? 0 : idx + 1));
		}, 10000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="">
			{/* Hero Carousel */}
			<section
				className="d-flex align-items-center justify-content-start position-relative"
				style={{
					minHeight: '340px',
					paddingTop: 0, paddingBottom: 0,
					width: '100%',
					overflow: 'hidden',
					// Remove old background
				}}
			>
				{/* Background carousel images */}
				{heroImages.map((img, i) => (
					<motion.div
						key={img}
						initial={{ opacity: i === heroIdx ? 1 : 0, scale: 1 }}
						animate={{ opacity: i === heroIdx ? 1 : 0, scale: i === heroIdx ? 1 : 0.98 }}
						transition={{ duration: 1.2, ease: 'easeInOut' }}
						className="position-absolute top-0 start-0 w-100 h-100"
						aria-hidden={i !== heroIdx}
						style={{
							zIndex: 1,
							background: `url(${img}) center/cover no-repeat`,
							width: '100%',
							height: '100%',
						}}
					>
						{/* blue overlay */}
						<div style={{
							position: 'absolute',
							inset: 0,
							background: 'linear-gradient(90deg, rgba(18,32,59,0.85) 60%, rgba(18,32,59,0.45) 100%)',
							zIndex: 2,
						}}></div>
					</motion.div>
				))}
				{/* Hero Content left-aligned */}
				<div style={{
					position: 'relative',
					zIndex: 3,
					minHeight: '340px',
					minWidth: 0,
					width: '100%',
					maxWidth: 1100,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
				}}
					className="container px-4 d-flex align-items-center"// ensures correct centering
				>
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-white text-lg-start"
						style={{ maxWidth: 560 }}
					>
						<div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
							<img src={logoOnly} alt="Techworth logo" style={{ margin: '0 0 8px 0', display: 'block', maxWidth: '140px', width: '100%', height: 'auto', objectFit: 'contain' }} />
							<h1 className="fw-bold mb-3" style={{ letterSpacing: '2px', fontSize: '2.6rem', color: '#fff', textShadow: '0 2px 12px rgba(10,10,40,.21)' }}>ABOUT US</h1>
						</div>
						<div className="d-none d-md-block">
							<p style={{ opacity: 0.84, fontSize: '1.02rem', fontWeight: 400 }}>Techworth Private Limited</p>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Our Story */}
			<section className="py-5">
				<div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="mb-4 text-center"
					>
						<h6 className="text-tech-primary fw-bold mb-2" style={{ letterSpacing: '1px' }}>OUR STORY</h6>
						<h2 className="text-dark" style={{ fontSize: '1.3rem' }}>Driven by Innovation, Built on Trust</h2>
					</motion.div>
					<div className="row g-4 align-items-center">
						<div className="col-lg-7">
							<motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
								<p className="text-muted mb-3" style={{ fontSize: '0.95rem', textAlign: 'justify' }}>
									Techworth Private Limited began as a small team of passionate technology enthusiasts with a shared vision to empower businesses through digital innovation. Over the years, we’ve grown into a trusted technology partner for organizations seeking scalable, secure, and intelligent IT solutions.
								</p>
								<p className="text-muted mb-0" style={{ fontSize: '0.95rem', textAlign: 'justify' }}>
									Our mission is to help businesses embrace digital transformation, streamline operations, and achieve measurable success through cutting-edge technology. At Techworth, we combine technical expertise with creativity and strategy to deliver solutions that make a lasting impact.
								</p>
							</motion.div>
						</div>
						<div className="col-lg-5">
							<motion.img
								src={aboutSectionImage}
								alt="Techworth story"
								className="img-fluid w-100"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
								style={{
									display: 'block',
									background: 'transparent',
									border: 0,
									borderRadius: 0,
									objectFit: 'contain'
								}}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Mission & Vision */}
			<section className="py-4 bg-light">
				<div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
					<div className="row g-4">
						{/* Mission Card: heading top, small paragraph, small image right */}
						<div className="col-md-6">
							<motion.div
								className="h-100 overflow-hidden position-relative p-0 bg-white border d-flex flex-column"
								variants={liftShadow}
								initial="initial"
								whileHover="hover"
								whileTap="tap"
								style={{ borderRadius: '12px', border: '1px solid #e9ecef', minHeight: 220 }}
							>
								{/* Heading */}
								<div className="d-flex align-items-center gap-2 px-4 pt-3 pb-2" style={{ minHeight: 50 }}>
									<div className="text-tech-primary" style={{ fontSize: '1.13rem' }}><FaBullseye /></div>
									<h3 className="fw-bold mb-0" style={{ fontSize: '1.05rem' }}>Our Mission</h3>
								</div>
								<div className="d-flex flex-column flex-md-row flex-grow-1 align-items-center" style={{minHeight:0}}>
									<div className="px-4 pb-3 pt-0 d-flex flex-column justify-content-center" style={{ flex: 1, minWidth: 0 }}>
										<p className="text-muted mb-0" style={{ fontSize: '0.93rem', textAlign: 'justify', lineHeight: 1.6 }}>
											We empower businesses to grow through reliable, innovative technology. Our focus is secure, scalable IT solutions and measurable results.
										</p>
									</div>
									<motion.div
										initial={{ scale: 1 }}
										whileHover={{ scale: 1.06 }}
										transition={{ duration: 0.5 }}
										className="d-flex align-items-center justify-content-center px-2 py-2 w-100 w-md-45"
										style={{ flex: '0 0 36%', minWidth: 0, maxWidth: 130 }}
									>
										<img src={missionImg} alt="Mission" style={{ width: '110px', height: '110px', objectFit: 'contain', opacity: 1.0 }} />
									</motion.div>
								</div>
							</motion.div>
						</div>
						{/* Vision Card: heading top, small paragraph, small image left */}
						<div className="col-md-6">
							<motion.div
								className="h-100 overflow-hidden position-relative p-0 bg-white border d-flex flex-column"
								variants={liftShadow}
								initial="initial"
								whileHover="hover"
								whileTap="tap"
								style={{ borderRadius: '12px', border: '1px solid #e9ecef', minHeight: 220 }}
							>
								{/* Heading */}
								<div className="d-flex align-items-center gap-2 px-4 pt-3 pb-2" style={{ minHeight: 50 }}>
									<div className="text-tech-primary" style={{ fontSize: '1.13rem' }}><FaEye /></div>
									<h3 className="fw-bold mb-0" style={{ fontSize: '1.05rem' }}>Our Vision</h3>
								</div>
								<div className="d-flex flex-column flex-md-row flex-grow-1 align-items-center" style={{minHeight:0}}>
									<motion.div
										initial={{ scale: 1 }}
										whileHover={{ scale: 1.06 }}
										transition={{ duration: 0.5 }}
										className="d-flex align-items-center justify-content-center px-2 py-2 w-100 w-md-45"
										style={{ flex: '0 0 36%', minWidth: 0, maxWidth: 130 }}
									>
										<img src={visionImg} alt="Vision" style={{ width: '110px', height: '110px', objectFit: 'contain', opacity: 1.0 }} />
									</motion.div>
									<div className="px-4 pb-3 pt-0 d-flex flex-column justify-content-center" style={{ flex: 1, minWidth: 0 }}>
										<p className="text-muted mb-0" style={{ fontSize: '0.93rem', textAlign: 'justify', lineHeight: 1.6 }}>
											Our vision is to set new benchmarks in technology and client success. We aim to drive sustainable growth for every partner through innovation.
										</p>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>
			<motion.div initial={{width:0}} whileInView={{width:'100%'}} transition={{duration:0.9}} className="mx-auto my-4" style={{height:'3px',background:'#2E4374',borderRadius:'3px',maxWidth:'1100px'}}/>

			{/* Achievements */}
			<section className="py-5">
				<div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-4">
						<h6 className="text-tech-primary fw-bold mb-2" style={{ letterSpacing: '1px' }}>OUR ACHIEVEMENTS</h6>
						<h2 className="text-dark" style={{ fontSize: '1.3rem' }}>Delivering Impact at Scale</h2>
					</motion.div>
					<div className="row g-4 justify-content-center align-items-stretch">
						{[
							{ gif: projectsGif, value: '150+', label: 'Projects Successfully Delivered' },
							{ gif: experienceGif, value: '10+', label: 'Years of Industry Experience' },
							{ gif: supportGif, value: '24/7', label: 'Ongoing Technical & Client Support' }
						].map((item, idx) => (
							<div key={item.label} className="col-12 col-md-4 d-flex flex-column align-items-center justify-content-center">
								<img src={item.gif} alt={item.label} style={{ width: 56, height: 56, marginBottom: '.65rem', display: 'block', background: 'transparent', border: 0, borderRadius: 0, boxShadow: 'none', outline: 'none', filter: 'none' }} />
								<div className="fw-bold mb-1" style={{ fontSize: '1.06rem', color: '#2E4374', letterSpacing: '.04em', textAlign: 'center' }}>{item.value}</div>
								<div className="text-muted mb-0" style={{ fontSize: '0.95rem', color: '#2E4374', opacity: .84, textAlign: 'center' }}>{item.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<motion.div initial={{width:0}} whileInView={{width:'100%'}} transition={{duration:0.9}} className="mx-auto my-4" style={{height:'3px',background:'#2E4374',borderRadius:'3px',maxWidth:'1100px'}}/>

			{/* Meet The Team */}
			<section className="py-5 bg-light">
				<div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-4">
						<h6 className="text-tech-primary fw-bold mb-2" style={{ letterSpacing: '1px' }}>MEET THE TEAM</h6>
						<h2 className="text-dark" style={{ fontSize: '1.3rem' }}>Leadership</h2>
						<p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>Our strength lies in our people — a diverse team of professionals who bring passion, expertise, and creativity to every project.</p>
					</motion.div>
					<div className="row g-4">
						{[
							{ name: 'Rohit Sharma', role: 'Managing Director', email: 'managingdirector@techworth.co.in', icon: <FaUserTie /> },
							{ name: 'Priya Mehta', role: 'Technical Director', email: 'director@techworth.co.in', icon: <FaTrophy /> },
							{ name: 'Arjun Verma', role: 'HR & Marketing Manager', email: 'hr@techworth.co.in', icon: <FaUsers /> },
						].map((p) => (
							<div key={p.name} className="col-md-4">
								<motion.div variants={liftShadow} initial="initial" whileHover="hover" whileTap="tap" className="h-100 p-4 text-center" style={{ borderRadius: '12px', backgroundColor: '#ffffff', border: '1px solid #e9ecef' }}>
									<div className="text-tech-primary mb-2" style={{ fontSize: '2rem' }}>{p.icon}</div>
									<h5 className="fw-bold mb-1" style={{ fontSize: '1rem' }}>{p.name}</h5>
									<div className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>{p.role}</div>
									<div className="d-inline-flex align-items-center gap-2 text-decoration-none" style={{ fontSize: '0.85rem' }}>
										<FaEnvelope className="text-tech-primary" /> <span>{p.email}</span>
									</div>
								</motion.div>
							</div>
						))}
					</div>
				</div>
			</section>
			<motion.div initial={{width:0}} whileInView={{width:'100%'}} transition={{duration:0.9}} className="mx-auto my-4" style={{height:'3px',background:'#2E4374',borderRadius:'3px',maxWidth:'1100px'}}/>

			{/* Our Culture */}
			<section className="py-5">
				<div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-4">
						<h6 className="text-tech-primary fw-bold mb-2" style={{ letterSpacing: '1px' }}>OUR CULTURE</h6>
						<h2 className="text-dark" style={{ fontSize: '1.3rem' }}>A workplace where innovation, collaboration, and excellence come together.</h2>
					</motion.div>
					<div className="position-relative" style={{ marginLeft: '32px' }}>
						{/* Timeline line */}
						<div className="d-none d-md-block position-absolute" style={{
							left: '12px',
							top: 0,
							bottom: 0,
							width: '4px',
							background: '#e9ecef',
							borderRadius: '2px',
							zIndex: 0
						}}></div>
						<div className="d-flex flex-column gap-4">
							{[
								{
									image: passionTechImg,
									icon: FaHeartbeat,
									title: 'Passion for Technology',
									desc: `We have a deep, genuine enthusiasm for all things tech. Our curiosity drives us to discover and use new tools, frameworks, and workflows, always aiming to bring our clients next-level results. This passion ensures we never settle for the ordinary—Techworth stays ahead to offer the most advanced solutions for every business.`
								},
								{
									image: innovationDrivenImg,
									icon: FaLightbulb,
									title: 'Innovation-Driven',
									desc: `Innovation is woven into the core of our business. We constantly brainstorm and experiment, developing ideas that help us and our customers rise above industry challenges. Our willingness to embrace bold new concepts makes us agile, creative, and ready for the future.`
								},
								{
									image: collaborativeEnvImg,
									icon: FaHandsHelping,
									title: 'Collaborative Environment',
									desc: `Great achievements come from working together. We foster a supportive, open culture where everyone’s voice contributes to progress. Collaboration ensures every solution is crafted with both collective expertise and fresh, diverse insights.`
								},
								{
									image: workLifeBalanceImg,
									icon: FaBalanceScale,
									title: 'Work-Life Balance',
									desc: `Balance is essential for high performance and well-being. Our flexible schedules and remote options help our team recharge, stay healthy, and reach their best both professionally and personally. We believe harmony fuels success.`
								},
								{
									image: excellenceImg,
									icon: FaMedal,
									title: 'Excellence in Everything',
									desc: `We apply uncompromising standards to every project. Excellence means careful attention to detail, pride in our craft, and a commitment to constant improvement—ensuring every client experience is both seamless and exceptional.`
								},
								{
									image: funImg,
									icon: FaSmile,
									title: 'Fun & Recreation',
									desc: `Teamwork is about enjoying the journey, not just reaching the finish line. Through engaging events, celebrations, and group activities, we build strong bonds that spark happiness, creativity, and long-term business growth.`
								}
							].map((item, idx) => {
								const IconComp = item.icon;
  return (
									<motion.div
										key={item.title}
										variants={liftShadow}
										initial="initial"
										whileHover={{
											y: -6,
											boxShadow: '0 10px 25px rgba(0,0,0,0.16)',
											backgroundColor: '#1B2436',
											color: '#fff',
											transition: { duration: 0.25 },
										}}
										transition={{ duration: 0.25 }}
										className="d-flex flex-row align-items-stretch p-0"
										style={{
											borderRadius: '14px',
											background: '#f8f9fa',
											border: '1px solid #e9ecef',
											position: 'relative',
											minHeight: '168px',
											zIndex: 1,
											overflow: 'hidden'
										}}
									>
										{/* Timeline dot, vertically center between image & content */}
										<div className="d-none d-md-block position-absolute" style={{
											left: '-28px',
											top: '50%',
											transform: 'translateY(-50%)',
											width: '22px',
											height: '22px',
											background: '#fff',
											border: '3px solid #2E4374',
											borderRadius: '50%',
											zIndex: 2,
										}}></div>
										{/* Image: left-aligned, touches top, left, bottom edge */}
										<div style={{ minWidth: 0 }} className="flex-grow-1 d-flex flex-column justify-content-center h-100 p-3 ps-md-4">
											<div className="d-flex align-items-center gap-2 mb-2">
												<IconComp className="culture-icon" style={{ fontSize: '1.23rem', transition: 'color .2s' }} />
												<span className="fw-semibold" style={{ fontSize: '1.06rem', whiteSpace: 'nowrap', color: 'inherit' }}>{item.title}</span>
											</div>
											<p className="mb-0" style={{ fontSize: '0.97rem', color: 'inherit', textAlign: 'justify', lineHeight: '1.65', maxWidth: 580 }}>{item.desc}</p>
										</div>
										{/* Image: right-aligned, touches top, right, bottom edge; hide on xs screens */}
										<div style={{ width: 140, height: '100%', flexShrink: 0, background: 'transparent' }} className="d-none d-md-flex align-items-stretch">
											<img src={rightPngs[idx]} alt={item.title + ' icon'} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0, background: 'transparent', display: 'block', border: 'none' }} />
										</div>
									</motion.div>
								);
							})}
						</div>
					</div>
					<style>{`
						.culture-icon { color: var(--tw-prose-links, #2E4374); }
						.d-flex:hover .culture-icon { color: #fff !important; }
					`}</style>
				</div>
			</section>
			<motion.div initial={{width:0}} whileInView={{width:'100%'}} transition={{duration:0.9}} className="mx-auto my-4" style={{height:'3px',background:'#2E4374',borderRadius:'3px',maxWidth:'1100px'}}/>

			{/* Looking Forward */}
			<section className="py-5 bg-white" style={{ background: '#fff' }}>
				<div className="container mx-auto px-4" style={{ maxWidth: '1100px' }}>
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-4">
						<h6 className="text-tech-primary fw-bold mb-2" style={{ letterSpacing: '1px' }}>LOOKING FORWARD</h6>
						<h2 className="text-dark" style={{ fontSize: '1.3rem' }}>Focused on Innovation, Customer Success, and Sustainable Growth</h2>
						<p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>Our future is shaped by our commitment to delivering next‑generation technology solutions and creating value for clients across industries.</p>
					</motion.div>
					<div className="row g-4 justify-content-center align-items-stretch">
						{[
							{ gif: targetClientsGif, value: '100+', label: 'Target Clients' },
							{ gif: countriesServedGif, value: '15+', label: 'Countries Served' },
							{ gif: teamMembersGif, value: '120+', label: 'Dedicated Team Members' }
						].map((item, idx) => (
							<div key={item.label} className="col-12 col-md-4 d-flex flex-column align-items-center justify-content-center">
								<img src={item.gif} alt={item.label} style={{ width: 56, height: 56, marginBottom: '.65rem', display: 'block', background: 'transparent', border: 0, borderRadius: 0, boxShadow: 'none', outline: 'none', filter: 'none' }} />
								<div className="fw-bold mb-1" style={{ fontSize: '1.06rem', color: '#2E4374', letterSpacing: '.04em', textAlign: 'center' }}>{item.value}</div>
								<div className="text-muted mb-0" style={{ fontSize: '0.95rem', color: '#2E4374', opacity: .84, textAlign: 'center' }}>{item.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<motion.div initial={{width:0}} whileInView={{width:'100%'}} transition={{duration:0.9}} className="mx-auto my-4" style={{height:'3px',background:'#2E4374',borderRadius:'3px',maxWidth:'1100px'}}/>
    </div>
  );
}







