import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { MapView } from "@/components/Map";
import { FundingThermometer } from "@/components/FundingThermometer";
import { trackClick, trackFormInteraction } from "@/lib/analytics";
import { usePageView, useScrollTracking, useTimeTracking, useSectionTracking } from "@/hooks/useAnalytics";

export default function Home() {
  // Analytics tracking
  usePageView('Home');
  useScrollTracking();
  useTimeTracking();
  
  // Section visibility tracking
  const visualProofRef = useSectionTracking('Visual Proof');
  const pictureThisRef = useSectionTracking('Picture This Moment');
  const whyServiceRef = useSectionTracking('Why Service Cant Exist');
  const foundingOpportunitiesRef = useSectionTracking('Founding Opportunities');
  const questionsRef = useSectionTracking('Questions');
  const foundingStatusRef = useSectionTracking('Founding Partner Status');
  const meetPilotRef = useSectionTracking('Meet Your Pilot');
  const decisionPointRef = useSectionTracking('Decision Point');
  
  // Set to true to show sponsor logos section
  const showSponsors = false;
  
  const [communityEmail, setCommunityEmail] = useState("");
  const [sponsorEmail, setSponsorEmail] = useState("");
  const [foundingForm, setFoundingForm] = useState({
    sponsorshipInterest: "",
    businessName: "",
    yourName: "",
    email: "",
    phone: "",
    questions: ""
  });
  const [foundingFormStarted, setFoundingFormStarted] = useState(false);
  
  // Track when user starts filling the founding partner form
  const handleFoundingFormChange = (field: string, value: string) => {
    if (!foundingFormStarted) {
      setFoundingFormStarted(true);
      trackFormInteraction('founding-partner', 'start');
    }
    setFoundingForm({...foundingForm, [field]: value});
  };

  const scrollToSection = (sectionId: string) => {
    trackClick(`CTA: Scroll to ${sectionId}`);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCommunityEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!communityEmail) {
      toast.error("Please enter your email address");
      trackFormInteraction('community-email', 'error', { reason: 'empty_email' });
      return;
    }
    
    const form = e.target as HTMLFormElement;
    try {
      trackFormInteraction('community-email', 'submit');
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form) as any).toString(),
      });
      toast.success("✓ Thank you! We'll notify you when we launch.");
      setCommunityEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      trackFormInteraction('community-email', 'error', { reason: 'network_error' });
    }
  };

  const handleSponsorEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!sponsorEmail) {
      toast.error("Please enter your email address");
      trackFormInteraction('sponsor-email', 'error', { reason: 'empty_email' });
      return;
    }
    
    const form = e.target as HTMLFormElement;
    try {
      trackFormInteraction('sponsor-email', 'submit');
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form) as any).toString(),
      });
      toast.success("✓ Thank you! We'll send you sponsor updates.");
      setSponsorEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      trackFormInteraction('sponsor-email', 'error', { reason: 'network_error' });
    }
  };

  const handleFoundingFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!foundingForm.email) {
      toast.error("Please enter your email address");
      trackFormInteraction('founding-partner', 'error', { reason: 'empty_email' });
      return;
    }
    
    const form = e.target as HTMLFormElement;
    try {
      trackFormInteraction('founding-partner', 'submit', {
        sponsorshipInterest: foundingForm.sponsorshipInterest,
        hasBusinessName: !!foundingForm.businessName,
        hasPhone: !!foundingForm.phone,
        hasQuestions: !!foundingForm.questions,
      });
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form) as any).toString(),
      });
      toast.success("✓ Got it! We'll reach out within 24 hours. Check your email for confirmation—and thank you for considering becoming a founding sponsor.");
      setFoundingForm({ sponsorshipInterest: "", businessName: "", yourName: "", email: "", phone: "", questions: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      trackFormInteraction('founding-partner', 'error', { reason: 'network_error' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Section 1: Hero */}
      <section 
        className="relative flex items-center justify-center bg-cover"
        style={{ 
          backgroundImage: "url('/hero-background.jpg')",
          backgroundPosition: "center",
          minHeight: "90vh"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 container max-w-5xl text-center text-white px-6 py-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight">
            Get Professional Videos at 50% Off
          </h1>
          <p className="text-xl md:text-2xl mb-10 leading-relaxed max-w-4xl mx-auto">
            Help fund the thermal equipment that brings home lost pets in the North Okanagan and Shuswap
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-[#FF6200] hover:bg-[#FF6200]/90 text-white text-lg px-8 py-6"
              onClick={() => scrollToSection("video-packages")}
            >
              See Video Packages
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2: Visual Proof - Normal vs Thermal Vision */}
      <section id="visual-proof" className="py-16 bg-black" ref={visualProofRef as any}>
        <div className="container max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
            Why Thermal Works
          </h2>
          <img 
            src="/post-3-dog-thermal-wide.png" 
            alt="Normal vision vs thermal vision comparison - same forest location showing dog invisible in normal vision but clearly visible in thermal"
            className="w-full h-auto rounded-lg mb-6"
          />
          <p className="text-center text-white text-xl mb-6">
            Your eyes see nothing. Thermal imaging sees exactly where they're hiding. And from the air, we can search 100+ acres in the time it takes to walk 5. This is what your video purchase makes possible.
          </p>
          <img 
            src="/search-scale-comparison.jpg" 
            alt="5 acres per hour on foot vs 100+ acres with thermal drone"
            className="w-full h-auto rounded-lg mb-4"
          />
          <p className="text-sm text-center text-gray-400 italic">
            *Graphical representation
          </p>
        </div>
      </section>

      {/* Section 4: Why This Service Can't Exist Without Community Support */}
      <section className="py-20 bg-gray-50" ref={whyServiceRef as any}>
        <div className="container max-w-5xl">
          <h2 className="text-4xl md:text-5xl mb-10 text-center text-[#0B2D59]">
            Why This Service Can't Exist Without Community Support
          </h2>

          <div className="text-lg leading-relaxed space-y-6 text-gray-800">
            <p className="text-xl mb-6 text-center"><span className="font-semibold">Here's the reality:</span> Drones can cost over <span className="font-bold">$12,000!</span></p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-bold mb-4">WITHOUT Community Support:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-3 text-xl">❌</span>
                    <span>$600-1,200 per search</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-xl">❌</span>
                    <span>Out of reach for most families</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-xl">❌</span>
                    <span>Service doesn't exist locally</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">WITH Community Support:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-3 text-xl">✅</span>
                    <span>$299 standard search</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-xl">✅</span>
                    <span>Accessible to all families</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-xl">✅</span>
                    <span>Available in our community</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <p className="mt-8">
              Lost pet emergencies are rare for any single family—but devastating when they happen. Your video purchase ensures thermal search exists for those critical moments, while your business gains marketing content and community positioning that compounds for years.
            </p>
            
            <p className="mt-8">
              To fund this equipment, I'm offering professional video production at 50% off my normal rates through December 2025. Local businesses get marketing content that moves their business forward, I get to fund the thermal equipment, and our community gets a service that helps families find their lost pets.
            </p>
          </div>
        </div>
      </section>

      {/* Here's How This Works Section */}
      <section id="video-packages" className="py-20 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl text-[#0B2D59] mb-10 text-center">
            Here's How This Works
          </h2>
          
          <div className="flex justify-center mb-8">
            <img 
              src="/mike-rhythm-productions.jpg" 
              alt="Mike from Rhythm Productions with drone controller and camera"
              className="rounded-lg shadow-lg max-w-md w-full"
            />
          </div>
          
          <div className="text-lg leading-relaxed space-y-6 text-gray-800">
            <p>
              I'm Mike, North Okanagan resident, Transport Canada Advanced RPAS certified pilot and professional video strategist with over a decade of experience. I've been creating video content through Rhythm Productions for years—working with organizations like <strong>Vernon Winter Carnival, United Way, BC Winter Games, and Community Futures</strong>.
            </p>
            
            <p className="font-semibold mt-8">
              Through December, I'm discounting two video packages by half! Real marketing assets you can use immediately.
            </p>
            
            <p>
              These aren't stock templates—each video is custom-produced by Rhythm Productions to tell your unique story and showcase why your business champions community service.
            </p>
            
            <p className="font-semibold">
              Promotion only available for those who make their first payment in December 2025
            </p>
            
            <p>
              Once you make your first payment through one of the links below, I will reach out and we will start the process! The second and final payment is made once your video is done, before it's delivered.
            </p>
            
            <p>
              Video production begins January 2026—fresh marketing content for the new year while competitors are still in holiday mode.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <h3 className="text-2xl font-bold text-[#0B2D59] mb-2">Business Card Video - 2 payments of $199 ($398 total)</h3>
              <p className="text-gray-600 mb-4">Regular rate: $800</p>
              <div className="aspect-video mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ejFbnmNCDow"
                  title="Video Business Card Sample"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                ></iframe>
              </div>
              <p className="mb-4">Perfect for your website homepage, social media, and email signatures. A professional introduction that sets you apart from competitors.</p>
              <Button 
                asChild
                className="w-full bg-[#FF6200] hover:bg-[#E55800] text-white font-bold py-3"
              >
                <a href="https://buy.stripe.com/7sY3cwcTu1nma923Mq0sU04" target="_blank" rel="noopener noreferrer">
                  Make first $199 payment to secure this deal
                </a>
              </Button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-[#0B2D59] mb-2">Brand Story Video - 2 payments of $399 ($798 total)</h3>
              <p className="text-gray-600 mb-4">Regular rate: $1,600</p>
              <div className="aspect-video mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/cg8mMjxSrss"
                  title="Brand Message Video Sample"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                ></iframe>
              </div>
              <p className="mb-4">Comprehensive business storytelling that showcases your values, services, and community commitment. Premium content for your website and marketing campaigns.</p>
              <Button 
                asChild
                className="w-full bg-[#FF6200] hover:bg-[#E55800] text-white font-bold py-3"
              >
                <a href="https://buy.stripe.com/9B628s9Hic20bd6dn00sU03" target="_blank" rel="noopener noreferrer">
                  Make first $399 payment to secure this deal
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Founding Sponsor Opportunities */}
      <section id="founding-opportunities" className="py-20 bg-gray-50" ref={foundingOpportunitiesRef as any}>
        <div className="container max-w-6xl">

          {/* Founding Partner Form - Moved here */}
          <div className="mt-16 max-w-2xl mx-auto bg-gray-50 rounded-lg p-8">
            <h3 className="text-3xl mb-6 text-center">Request More Information</h3>
            <form name="founding-sponsor-inquiry" method="POST" data-netlify="true" onSubmit={handleFoundingFormSubmit} className="space-y-6">
              <input type="hidden" name="form-name" value="founding-sponsor-inquiry" />
              <div>
                <label className="block text-sm font-semibold mb-2">Sponsorship Interest</label>
                <input type="hidden" name="sponsorshipInterest" value={foundingForm.sponsorshipInterest} />
                <Select value={foundingForm.sponsorshipInterest} onValueChange={(value) => handleFoundingFormChange('sponsorshipInterest', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title Sponsor ($3,500 +GST) - EXCLUSIVE</SelectItem>
                    <SelectItem value="signature">Signature Founding Partner ($798 +GST)</SelectItem>
                    <SelectItem value="partner">Founding Partner ($398 +GST)</SelectItem>
                    <SelectItem value="info">Just gathering information</SelectItem>
                    <SelectItem value="help">Not sure yet—help me decide</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Business or Individual Name</label>
                <Input
                  type="text"
                  name="businessName"
                  value={foundingForm.businessName}
                  onChange={(e) => handleFoundingFormChange('businessName', e.target.value)}
                  placeholder="Your business or personal name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Your Name</label>
                <Input
                  type="text"
                  name="yourName"
                  value={foundingForm.yourName}
                  onChange={(e) => handleFoundingFormChange('yourName', e.target.value)}
                  placeholder="Contact person name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <Input
                  type="email"
                  name="email"
                  value={foundingForm.email}
                  onChange={(e) => handleFoundingFormChange('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone (optional)</label>
                <Input
                  type="tel"
                  name="phone"
                  value={foundingForm.phone}
                  onChange={(e) => handleFoundingFormChange('phone', e.target.value)}
                  placeholder="(250) 555-1234"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Questions or What You're Thinking (optional)</label>
                <Textarea
                  name="questions"
                  value={foundingForm.questions}
                  onChange={(e) => handleFoundingFormChange('questions', e.target.value)}
                  placeholder="Any questions or thoughts you'd like to share..."
                  rows={4}
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-[#FF6200] hover:bg-[#FF6200]/90 text-lg">
                Request Information
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Your information is secure and will only be used to contact you about founding sponsorship opportunities.
            </p>
          </div>

        </div>
      </section>


      {/* Sponsor Logos Section - Hidden by default until first sponsor */}
      {showSponsors && (
        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl">
            <h2 className="text-3xl md:text-4xl text-[#0B2D59] mb-4 text-center font-bold">
              Our Founding Partners
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              These community leaders made thermal pet search accessible in the North Okanagan and Shuswap.
            </p>
            
            {/* Title Sponsor - Full width, prominent */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-center text-yellow-600 mb-6">Title Sponsor</h3>
              <div className="flex justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 border-4 border-yellow-500 max-w-md w-full">
                  <div className="aspect-[3/1] flex items-center justify-center bg-gray-100 rounded">
                    <span className="text-4xl font-bold text-gray-400">LOGO</span>
                  </div>
                  <p className="text-center mt-4 text-sm text-gray-600 italic">"Searches powered by [Business Name]"</p>
                </div>
              </div>
            </div>
            
            {/* Signature Founding Partners - 2 columns */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-center text-[#FF6200] mb-6">Signature Founding Partners</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 border-2 border-[#FF6200]">
                  <div className="aspect-[3/1] flex items-center justify-center bg-gray-100 rounded">
                    <span className="text-2xl font-bold text-gray-400">LOGO</span>
                  </div>
                  <p className="text-center mt-3 text-sm font-medium text-gray-700">Business Name</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 border-2 border-[#FF6200]">
                  <div className="aspect-[3/1] flex items-center justify-center bg-gray-100 rounded">
                    <span className="text-2xl font-bold text-gray-400">LOGO</span>
                  </div>
                  <p className="text-center mt-3 text-sm font-medium text-gray-700">Business Name</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 border-2 border-[#FF6200]">
                  <div className="aspect-[3/1] flex items-center justify-center bg-gray-100 rounded">
                    <span className="text-2xl font-bold text-gray-400">LOGO</span>
                  </div>
                  <p className="text-center mt-3 text-sm font-medium text-gray-700">Business Name</p>
                </div>
              </div>
            </div>
            
            {/* Founding Partners - 3-4 columns */}
            <div>
              <h3 className="text-xl font-semibold text-center text-[#0B2D59] mb-6">Founding Partners</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
                  <div className="aspect-[3/1] flex items-center justify-center bg-gray-100 rounded">
                    <span className="text-lg font-bold text-gray-400">LOGO</span>
                  </div>
                  <p className="text-center mt-2 text-xs font-medium text-gray-700">Business Name</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
                  <div className="aspect-[3/1] flex items-center justify-center bg-gray-100 rounded">
                    <span className="text-lg font-bold text-gray-400">LOGO</span>
                  </div>
                  <p className="text-center mt-2 text-xs font-medium text-gray-700">Business Name</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
                  <div className="aspect-[3/1] flex items-center justify-center bg-gray-100 rounded">
                    <span className="text-lg font-bold text-gray-400">LOGO</span>
                  </div>
                  <p className="text-center mt-2 text-xs font-medium text-gray-700">Business Name</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
                  <div className="aspect-[3/1] flex items-center justify-center bg-gray-100 rounded">
                    <span className="text-lg font-bold text-gray-400">LOGO</span>
                  </div>
                  <p className="text-center mt-2 text-xs font-medium text-gray-700">Business Name</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 10: Funding Tracker */}
      <section className="py-20 bg-white" ref={foundingStatusRef as any}>
        <div className="container max-w-4xl">
          <h2 className="text-4xl text-[#0B2D59] mb-10 text-center">
            Funding Tracker
          </h2>
          
          <div className="text-center text-lg leading-relaxed space-y-6 max-w-2xl mx-auto text-gray-800">
            <p>
              Track our progress toward purchasing the thermal equipment needed to launch DroneSearch.ca.
            </p>
            
            <div className="my-8">
              <FundingThermometer />
            </div>
            
            <div className="space-y-2">
              <p className="font-semibold text-[#0B2D59]">
                Goal: $12,000 - Purchase thermal equipment
              </p>
              <p className="font-semibold text-[#FF6200]">
                Stretch Goal: $15,000 - Add backup battery system and extended warranty
              </p>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              Video packages close once equipment is purchased or December 31st, 2025 - whichever comes first.
            </p>
          </div>
        </div>
      </section>

      {/* Section 13: Final CTA */}
      <section className="py-20 bg-white" ref={decisionPointRef as any}>
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl mb-8 text-[#0B2D59]">
            Your Decision Point
          </h2>
          <div className="text-xl leading-relaxed space-y-6 mb-10 text-gray-800">
            <p>
              You've seen the technology works. You understand the model. Now it's just about whether professional video content makes sense for your business right now.
            </p>
            <p className="font-semibold">
              If it does, lock in 50% off before this closes December 31st.
            </p>
          </div>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-[#0B2D59] hover:bg-[#0B2D59]/90 text-white text-lg px-10 py-6"
              onClick={() => scrollToSection("founding-opportunities")}
            >
              See Video Packages →
            </Button>
          </div>
        </div>
      </section>

      {/* Section 14: Footer */}
      <footer className="bg-[#1E1E1E] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">DroneSearch.ca</h3>
              <p className="mb-2">Bringing thermal pet search to the North Okanagan and the Shuswap</p>
              <p className="text-gray-400">Serving Vernon • Salmon Arm • Armstrong • Lake Country • Enderby • Lumby • Cherryville • Falkland • Chase • Sicamous • and all rural communities throughout the North Okanagan & Shuswap</p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">CONTACT</h4>
              <p>
                Email: <a href="mailto:info@dronesearch.ca" className="text-[#00FFC2] hover:underline">info@dronesearch.ca</a>
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">CONNECT</h4>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/DroneSearchCA/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC2] transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="https://www.instagram.com/DroneSearchCA/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC2] transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="https://www.linkedin.com/company/dronesearchca" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC2] transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="https://x.com/DroneSearchCA" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC2] transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="https://www.youtube.com/@DroneSearchCA" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC2] transition-colors">
                  <Youtube size={24} />
                </a>
                <a href="https://www.tiktok.com/@dronesearchca" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC2] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mb-8 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <MapView
              onMapReady={(map) => {
                // Center on Armstrong, BC
                const armstrong = { lat: 50.4489, lng: -119.1961 };
                map.setCenter(armstrong);
                map.setZoom(8);

                // Add marker for Armstrong
                new window.google.maps.Marker({
                  position: armstrong,
                  map: map,
                  title: "Armstrong, BC - Service Area Center"
                });

                // Add circle for 2-hour driving radius (approximately 150km)
                new window.google.maps.Circle({
                  strokeColor: "#00FFC2",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#00FFC2",
                  fillOpacity: 0.15,
                  map: map,
                  center: armstrong,
                  radius: 150000, // 150km in meters
                });
              }}
            />
          </div>

          {/* Email Capture */}
          <div className="border-t border-gray-700 pt-8 pb-8">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg mb-4">Stay Updated: Join our email list for DroneSearch news and community updates</p>
              <form name="community-launch-updates" method="POST" data-netlify="true" onSubmit={handleCommunityEmailSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
                <input type="hidden" name="form-name" value="community-launch-updates" />
                <Input
                  type="email"
                  placeholder="Your email address"
                  name="email"
                  value={communityEmail}
                  onChange={(e) => setCommunityEmail(e.target.value)}
                  className="flex-1 max-w-md bg-white text-gray-900"
                  required
                />
                <Button type="submit" className="bg-[#FF6200] hover:bg-[#FF6200]/90">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 DroneSearch.ca | Privacy Policy | Terms of Service | <a href="/admin/login" className="text-gray-500 hover:text-gray-300 transition-colors">Admin</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
