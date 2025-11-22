import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { MapView } from "@/components/Map";
import { SponsorshipStatus } from "@/components/SponsorshipStatus";
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
            Thermal drone technology can find lost pets in minutes—but $12,000 equipment keeps this out of reach for families in crisis.
          </h1>
          <p className="text-xl md:text-2xl mb-10 leading-relaxed max-w-4xl mx-auto">
            Your founding partnership makes thermal pet search accessible in the North Okanagan and the Shuswap starting at $299. Here's what that means for your business and our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-[#FF6200] hover:bg-[#FF6200]/90 text-white text-lg px-8 py-6"
              onClick={() => scrollToSection("founding-opportunities")}
            >
              Become a Founding Partner →
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              onClick={() => scrollToSection("visual-proof")}
            >
              See How It Works ↓
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2: Visual Proof - Normal vs Thermal Vision */}
      <section id="visual-proof" className="py-16 bg-black" ref={visualProofRef as any}>
        <div className="container max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
            What You're Actually Up Against
          </h2>
          <img 
            src="/post-3-dog-thermal-wide.png" 
            alt="Normal vision vs thermal vision comparison - same forest location showing dog invisible in normal vision but clearly visible in thermal"
            className="w-full h-auto rounded-lg mb-6"
          />
          <p className="text-sm text-center text-gray-400 italic mb-2">
            *Graphical representation
          </p>
          <p className="text-center text-white text-xl mb-6">
            Your eyes see nothing. Thermal imaging sees exactly where they're hiding.
          </p>
          <p className="text-center text-white text-lg mb-4">
            This is what you're helping families access. Here's why that matters for your business and our community.
          </p>
          <p className="text-center text-white text-lg italic">
            This isn't a better way to search. It's physics working FOR families instead of against them.
          </p>
        </div>
      </section>

      {/* Section: Picture This Moment */}
      <section className="py-20 bg-[#0B2D59] text-white" ref={pictureThisRef as any}>
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl mb-12 text-center">
            Picture This Moment
          </h2>
          
          <div className="text-lg leading-relaxed space-y-4 text-center mb-12">
            <p>It's 7 PM. November. Cold. Dark. A family's 14-year-old Lab has been missing for hours—deaf, nearly blind, lost in the forest behind their property.</p>
            <p>They call DroneSearch.ca.</p>
            <p>
              Within 45 minutes, thermal imaging reveals her heat signature 400 meters into the trees. The family reaches her in 8 minutes. She's cold. She's scared. But she's alive.
            </p>
            <p className="font-semibold">That moment only exists if founding sponsors make it real.</p>
          </div>
          
          <img 
            src="/search-scale-comparison.jpg" 
            alt="5 acres per hour on foot vs 100+ acres with thermal drone"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

           {/* Section 4: Why This Service Can't Exist Without Community Support */}
      <section className="py-20 bg-gray-50" ref={whyServiceRef as any}>
        <div className="container max-w-5xl">
          <h2 className="text-4xl md:text-5xl mb-10 text-center text-[#0B2D59]">
            Why This Service Can't Exist Without Community Support
          </h2>

          <div className="text-lg leading-relaxed space-y-6 text-gray-800">
            <p className="font-semibold">Here's the reality:</p>
            
            <p className="text-xl mb-6 text-center">Professional thermal imaging equipment: <span className="font-bold">$12,000+</span></p>
            
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
            
            <p className="text-xl font-bold text-center">
              Your founding partnership bridges this gap.
            </p>
            
            <p className="mt-8">
              Veterinary clinics and pet services confirm what we expected: lost pet emergencies are rare for any single family—but devastating when they happen. Your founding partnership ensures thermal search exists for those critical moments, while your business gains marketing content and community positioning that compounds for years.
            </p>
          </div>
        </div>
      </section>

      {/* Video Samples Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl">
          <h2 className="text-4xl md:text-5xl text-[#0B2D59] mb-6 text-center">
            See What Sponsors Receive
          </h2>
          <p className="text-xl text-center mb-12 max-w-4xl mx-auto text-gray-700">
            Professional video content produced by Rhythm Productions—real marketing assets you can use immediately.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Video Business Card Sample */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ejFbnmNCDow"
                  title="Video Business Card Sample"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#0B2D59] mb-3">
                  Video Business Card (45 seconds)
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Included with:</strong> Founding Partner tier
                </p>
                <p className="text-gray-600">
                  Perfect for your website homepage, social media, and email signatures. A professional introduction that sets you apart from competitors.
                </p>
              </div>
            </div>

            {/* Brand Message Video Sample */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/cg8mMjxSrss"
                  title="Brand Message Video Sample"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#0B2D59] mb-3">
                  Brand Message Video (1.5 minutes)
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Included with:</strong> Signature Founding Partner tier
                </p>
                <p className="text-gray-600">
                  Comprehensive business storytelling that showcases your values, services, and community commitment. Premium content for your website and marketing campaigns.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              These aren't stock templates—each video is custom-produced by Rhythm Productions to tell your unique story and showcase why your business champions community service.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Founding Sponsor Opportunities */}
      <section id="founding-opportunities" className="py-20 bg-white" ref={foundingOpportunitiesRef as any}>
        <div className="container max-w-6xl">
          <h2 className="text-4xl md:text-5xl text-[#0B2D59] mb-6 text-center">
            Founding Sponsor Opportunities
          </h2>
          <p className="text-xl text-center mb-4 max-w-4xl mx-auto">
            Three ways to secure permanent recognition as a community leader who made this possible. Limited spots available—your support launches this service.
          </p>
          <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            Founding Sponsorships are one-time investments with permanent recognition. You'll be remembered as someone who made thermal pet rescue accessible in our region.
          </p>

          {/* Founding Partner Deadline */}
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-2xl font-bold text-[#0B2D59] mb-3">
              🎯 FOUNDING PARTNER DEADLINE
            </p>
            <p className="text-lg text-gray-700 mb-2">
              Founding partnerships close December 15th or when all 21 spots are filled.
            </p>
            <p className="text-gray-600">
              Video production begins January 2026—fresh marketing content for the new year while competitors are still in holiday mode.
            </p>
          </div>

          <div className="space-y-8">
            {/* Tier 0: Title Sponsor - EXCLUSIVE */}
            <div className="border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-white shadow-xl rounded-lg p-8">
              <div className="mb-4">
                <span className="inline-block bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                  1 EXCLUSIVE SPOT
                </span>
              </div>
              <h3 className="text-5xl mb-3 text-[#0B2D59]">Title Sponsor</h3>
              <p className="text-gray-600 mb-6 italic">
                For the ONE regional leader who wants maximum brand association with every successful pet rescue story.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <Check className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Exclusive drone naming rights</strong> - "Searches powered by [Business]"</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Large logo on drone</strong> (physical branding on equipment)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Homepage hero logo placement</strong> on website</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <span><strong>On-site equipment showcase event at your location</strong> - We bring the thermal drone to your business for a customer appreciation event with live demonstrations and photo opportunities</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <span><strong className="text-[#FF6200] text-lg">$5,000 Professional video content package</strong> (Customized to your needs - Video, Marketing content - you choose!)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Permanent association</strong> with the most heartwarming reunion stories in our region</span>
                </div>
              </div>
              <div className="mb-6">
                <div className="text-5xl font-bold text-[#0B2D59] mb-2">$3,500 <span className="text-2xl">+GST</span></div>
                <p className="text-gray-500 text-sm">(one-time investment, permanent positioning)</p>
              </div>
              <p className="text-gray-600 italic mb-6 text-sm">
                "Pet owners = your customers. When someone's dog goes missing and YOUR business helped find them, that's brand loyalty money can't buy. This isn't equipment funding—it's permanent association with community heroism."
              </p>
              <Button 
                size="lg" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold text-lg"
                asChild
              >
                <a href="https://buy.stripe.com/14A4gA5r2ea8a92dn00sU06" target="_blank" rel="noopener noreferrer">
                  Secure the ONLY spot while it lasts
                </a>
              </Button>
            </div>

            {/* Tier 1: Signature Founding Partner */}
            <div className="border-l-4 border-[#FF6200] bg-white shadow-lg rounded-lg p-8">
              <div className="mb-4">
                <span className="inline-block bg-[#FF6200] text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                  8 SPOTS AVAILABLE
                </span>
              </div>
              <h3 className="text-5xl mb-3">Signature Founding Partner</h3>
              <p className="text-gray-600 mb-6 italic">
                For: Established businesses seeking premium brand storytelling and maximum visibility. You want comprehensive, professional marketing content that showcases why your business champions community service.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Professional <span className="text-[#FF6200] font-bold text-lg">1.5-minute brand video produced by Rhythm Productions ($1,500 value)</span> - comprehensive business storytelling for your website, social media, and marketing</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Business logo engraved on commemorative metal drone case plaque - visible at every search and public event</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Prominent logo placement on website homepage with backlink (prime SEO positioning)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Featured in social media posts throughout the year with priority placement</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Signature Founder certificate - premium certificate suitable for framing and display in your business</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Digital supporter badge - graphic file to display on your website</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Enhanced community leadership positioning - permanently recognized as a Signature Founding Partner who made this service possible</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Priority mention in all media coverage and community outreach</span>
                </div>
              </div>
              <p className="text-4xl font-bold text-[#0B2D59] mb-2"><span className="text-5xl">$399</span><span className="text-2xl"> +GST</span> <span className="text-5xl">now</span>, <span className="text-5xl">$399</span><span className="text-2xl"> +GST</span> <span className="text-5xl">on video delivery</span></p>
              <p className="text-lg text-gray-600 mb-4">($798<span className="text-sm"> +GST</span> total)</p>
              <p className="text-sm italic text-gray-600 mb-6">
                A 1.5-minute professional brand video alone is $1,500 value. Combined with premium positioning and permanent recognition, this is exceptional ROI for businesses committed to community leadership.
              </p>
              <div className="mt-6">
                <Button 
                  asChild
                  className="w-full bg-[#FF6200] hover:bg-[#E55800] text-white font-bold py-3"
                >
                  <a href="https://buy.stripe.com/9B628s9Hic20bd6dn00sU03" target="_blank" rel="noopener noreferrer">
                    Secure Your Spot →
                  </a>
                </Button>
              </div>
            </div>

            {/* Tier 2: Founding Partner */}
            <div className="border-l-4 border-[#FF6200] bg-white shadow-lg rounded-lg p-8">
              <div className="mb-4">
                <span className="inline-block bg-[#FF6200] text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                  12 SPOTS AVAILABLE
                </span>
              </div>
              <h3 className="text-5xl mb-3">Founding Partner</h3>
              <p className="text-gray-600 mb-6 italic">
                For: Business owners who want lasting recognition and professional marketing content while making pet rescue technology accessible in the North Okanagan.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Professional <span className="text-[#FF6200] font-bold text-lg">45-second video business card produced by Rhythm Productions ($750 value)</span> - perfect for your website and social media</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Business logo engraved on commemorative metal drone case plaque - visible at every search and public event</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Logo on website with backlink to your site (SEO value)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Featured in social media posts throughout the year</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Founding Partner certificate - professional certificate suitable for framing and display in your business</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Digital supporter badge - graphic file to display on your website</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Community leadership positioning - permanently recognized as a founding partner</span>
                </div>
              </div>
              <p className="text-4xl font-bold text-[#0B2D59] mb-2"><span className="text-5xl">$199</span><span className="text-2xl"> +GST</span> <span className="text-5xl">now</span>, <span className="text-5xl">$199</span><span className="text-2xl"> +GST</span> <span className="text-5xl">on video delivery</span></p>
              <p className="text-lg text-gray-600 mb-4">($398<span className="text-sm"> +GST</span> total)</p>
              <p className="text-sm italic text-gray-600 mb-6">
                A professional video business card alone is worth $750. Add permanent recognition, website presence, and community positioning - this is a marketing investment that pays dividends while serving our community.
              </p>
              <div className="mt-6">
                <Button 
                  asChild
                  className="w-full bg-[#FF6200] hover:bg-[#E55800] text-white font-bold py-3"
                >
                  <a href="https://buy.stripe.com/7sY3cwcTu1nma923Mq0sU04" target="_blank" rel="noopener noreferrer">
                    Secure Your Spot →
                  </a>
                </Button>
              </div>
            </div>

          </div>

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


      {/* Section 9: Questions */}
      <section className="py-20 bg-gray-100" ref={questionsRef as any}>
        <div className="container max-w-5xl">
          <h2 className="text-4xl text-[#0B2D59] mb-12 text-center">
            Questions Founding Sponsors Ask
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: What if equipment breaks or needs upgrading?</h3>
              <p className="text-lg leading-relaxed">
                A: Your recognition isn't tied to one piece of hardware—it's tied to the SERVICE. The commemorative drone case plaque is permanent and transfers to future drone cases. The tool might change but your legacy doesn't.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: Why not just charge clients more instead of needing sponsors?</h3>
              <p className="text-lg leading-relaxed mb-4">
                A: We could charge $1,000+ per search and cover costs without sponsors. You know who would use that service? Wealthy pet owners who can afford premium pricing.
              </p>
              <p className="text-lg leading-relaxed">
                Everyone else would keep doing what they've always done: hoping, walking, calling, and usually never finding their pet.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Sponsors make it possible to offer searches starting at $299—a price families can actually afford in crisis. That's the difference between "elite service for a few" and "community resource for everyone."
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: What exactly does the search service do? Do you retrieve the pet?</h3>
              <p className="text-lg leading-relaxed">
                <strong>Critical clarification:</strong> DroneSearch.ca locates lost pets using advanced drones with thermal capabilities and guides owners to their exact location. We do not physically retrieve or handle animals. Our role is detection and location guidance - the owner (or their designated person) does the actual retrieval. This keeps liability clear, ensures pet safety with familiar handlers, and focuses our expertise on what we do best: thermal aerial search and location tracking.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: Is this tax-deductible?</h3>
              <p className="text-lg leading-relaxed">
                A: DroneSearch.ca operates as a regular business, not a registered charity, so sponsorships are not tax-deductible donations. However, they could be legitimate marketing expenses for businesses (consult your accountant).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: What if I need more time to decide?</h3>
              <p className="text-lg leading-relaxed">
                A: Founding partnerships remain open through December 15th or until all 21 spots are filled. The sooner you commit, the sooner we can schedule your video production and you can begin leveraging your founding partner positioning. Once spots are filled, this opportunity closes permanently.
              </p>
            </div>
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

      {/* Section 10: Founding Partner Status */}
      <section className="py-20 bg-gray-50" ref={foundingStatusRef as any}>
        <div className="container max-w-4xl">
          <h2 className="text-4xl text-[#0B2D59] mb-10 text-center">
            Founding Partner Status
          </h2>
          
          <div className="text-center text-lg leading-relaxed space-y-6 max-w-2xl mx-auto text-gray-800">
            <p>
              We're finalizing founding partnerships to launch thermal pet search service in January 2026.
            </p>
            
            <div className="my-8">
              <SponsorshipStatus />
            </div>
            
            <p>
              Founding partnerships close December 15th or when all 21 spots are filled.
            </p>
            
            <p className="font-semibold text-[#0B2D59]">
              This is a one-time opportunity to be permanently recognized as a community leader who made this service possible.
            </p>
          </div>
        </div>
      </section>

      {/* Section 11: Meet Your Pilot */}
      <section className="py-20 bg-[#0B2D59] text-white" ref={meetPilotRef as any}>
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl text-center mb-12">
            Meet Your Pilot
          </h2>
          
          <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg leading-relaxed mb-6">
                I'm Mike. North Okanagan resident, Transport Canada Advanced RPAS certified, 10+ years UAV and videography experience.
              </p>
              <p className="text-lg leading-relaxed">
                This service exists because I saw too many families searching for pets they'd never find. Founding sponsors make it accessible at $299 instead of $1,000+.
              </p>
          </div>
        </div>
      </section>

      {/* Section 12: Email Capture (Sponsors) */}
      <section className="py-16 bg-gray-100">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl text-[#0B2D59] mb-6">
            Want Updates as We Launch?
          </h2>
          <p className="text-lg mb-8">
            Join our email list to be notified when DroneSearch.ca goes live and learn how to access thermal pet search in your community.
          </p>
          <form name="service-launch-updates" method="POST" data-netlify="true" onSubmit={handleCommunityEmailSubmit} className="flex flex-col sm:flex-row gap-4">
            <input type="hidden" name="form-name" value="service-launch-updates" />
            <Input
              type="email"
              placeholder="Your email address"
              name="email"
              value={communityEmail}
              onChange={(e) => setCommunityEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" className="bg-[#FF6200] hover:bg-[#FF6200]/90">
              Notify Me When We Launch
            </Button>
          </form>
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
              You now understand why thermal search matters, why it requires community support, and what you become as a founding sponsor.
            </p>
            <p className="font-semibold">There's only one question left:</p>
            <p>
              Will you be part of the story where North Okanagan became the first region in BC with accessible thermal pet rescue?
            </p>
          </div>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-[#0B2D59] hover:bg-[#0B2D59]/90 text-white text-lg px-10 py-6"
              onClick={() => scrollToSection("founding-opportunities")}
            >
              See Funding Sponsor Information →
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

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p className="mb-2">© 2025 DroneSearch.ca | Privacy Policy | Terms of Service | <a href="/admin/login" className="text-gray-500 hover:text-gray-300 transition-colors">Admin</a></p>
            <p>Monthly ongoing partnership opportunities available after launch—inquire for details.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
