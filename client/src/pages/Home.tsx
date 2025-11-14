import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { MapView } from "@/components/Map";

export default function Home() {
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

  // Funding progress - UPDATE THIS VALUE to change the progress bar
  const fundingPercentage = 0; // Change this number (0-100) to update progress
  const fundingGoal = 12000;
  const fundingRaised = Math.round((fundingGoal * fundingPercentage) / 100);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCommunityEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!communityEmail) {
      toast.error("Please enter your email address");
      return;
    }
    // In production, this would send to info@dronesearch.ca
    console.log("Community email signup:", { email: communityEmail, timestamp: new Date().toISOString(), source: "community" });
    toast.success("✓ Thank you! We'll notify you when we launch.");
    setCommunityEmail("");
  };

  const handleSponsorEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!sponsorEmail) {
      toast.error("Please enter your email address");
      return;
    }
    console.log("Sponsor email signup:", { email: sponsorEmail, timestamp: new Date().toISOString(), source: "sponsor" });
    toast.success("✓ Thank you! We'll send you sponsor updates.");
    setSponsorEmail("");
  };

  const handleFoundingFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!foundingForm.email || !foundingForm.yourName) {
      toast.error("Please fill in required fields");
      return;
    }
    console.log("Founding sponsor inquiry:", { ...foundingForm, timestamp: new Date().toISOString() });
    toast.success("✓ Thank you! We'll be in touch within 24 hours.");
    setFoundingForm({
      sponsorshipInterest: "",
      businessName: "",
      yourName: "",
      email: "",
      phone: "",
      questions: ""
    });
  };

  return (
    <div className="min-h-screen">
      {/* Section 1: Hero */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 container max-w-5xl text-center text-white px-6 py-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight">
            Help Launch North Okanagan's Thermal Drone Pet Search Service
          </h1>
          <p className="text-xl md:text-2xl mb-6 leading-relaxed max-w-4xl mx-auto">
            The problem isn't that people don't search hard enough. It's that they literally can't see what's hiding 10 feet away.
          </p>
          <p className="text-xl md:text-2xl mb-10 leading-relaxed max-w-4xl mx-auto font-semibold">
            North Okanagan is about to change that—but only if the right people step forward.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-[#FF6200] hover:bg-[#FF6200]/90"
            onClick={() => scrollToSection("founding-opportunities")}
          >
            See Founding Opportunities →
          </Button>
          
          {/* Video Banner */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <video 
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
                controls
                poster="/video-thumbnail.jpg"
              >
                <source src="/banner-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Real Problem */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-4xl md:text-5xl text-[#0B2D59] mb-10 text-center">
            The Hidden Truth About Why Lost Pets Stay Lost
          </h2>
          <div className="text-lg leading-relaxed space-y-6 mb-12">
            <p>When your dog or cat goes missing, they don't run away. They hide.</p>
            <p className="font-semibold">Scared. Frozen. Silent.</p>
            <p>
              Your 12-year-old Lab who always comes when called? She won't make a sound. Your indoor cat who's been spotted nearby? He's burrowed under brush where eyes can't reach him.
            </p>
            <p className="font-semibold">You can walk within 10 feet of your lost pet and never know they're there.</p>
            <p>
              Traditional search fails because of a fundamental limitation: you can't see what's invisible. That's not your fault. That's physics.
            </p>
            <p>
              The heat signature of a terrified animal hiding in dense vegetation is completely undetectable to the human eye—day or night.
            </p>
            <p className="font-bold text-xl">That's the REAL problem that's been blocking successful pet recovery this entire time.</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <img 
              src="/thermal-comparison.jpg" 
              alt="Thermal imaging technology for finding lost pets in North Okanagan BC - comparison showing hidden animals"
              className="w-full h-auto"
            />
            <p className="text-center text-sm text-gray-600 py-4 px-6 italic">
              "Same location. Same time. One technology reveals what the other can't see."
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: The Solution */}
      <section className="py-20 bg-[#0B2D59] text-white">
        <div className="container max-w-5xl">
          <h2 className="text-4xl md:text-5xl mb-10 text-center">
            What Changed Everything: Thermal Imaging Technology
          </h2>
          <div className="text-lg leading-relaxed space-y-6 mb-12">
            <p>For the first time in history, finding a hidden pet is no longer a matter of luck.</p>
            <p>
              Professional thermal imaging—the same technology that lets firefighters see through smoke—now makes the invisible visible.
            </p>
            <p className="font-semibold text-xl">Here's what this means for North Okanagan families:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-[#00FFC2]">Heat signatures visible through dense vegetation</h3>
              <p>The brush that hides your pet? Transparent to thermal cameras.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-[#00FFC2]">Works in complete darkness</h3>
              <p>Your pet doesn't have to wait until morning.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-[#00FFC2]">Covers massive areas in minutes</h3>
              <p>What takes days on foot takes 15-30 minutes from the air.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-[#00FFC2]">Detects motionless animals</h3>
              <p>Your pet doesn't need to move or make sound. Their body heat is enough.</p>
            </div>
          </div>

          <p className="text-lg leading-relaxed mb-10">
            This isn't a better way to search. It's physics working FOR families instead of against them.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            DroneSearch.ca will bring this capability to Vernon, Armstrong, Salmon Arm, and surrounding communities—with an affordable call-out fee starting at $299 thanks to community sponsorship.
          </p>
          <p className="text-base leading-relaxed mb-10 italic opacity-90">
            <strong>Important:</strong> DroneSearch.ca is a non-emergency service for lost pet recovery. For life-threatening emergencies or human search and rescue, always contact Vernon Search and Rescue or emergency services immediately.
          </p>

          <div className="bg-[#00FFC2] text-[#1E1E1E] rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">PROFESSIONAL OPERATION</h3>
            <ul className="space-y-2 text-lg">
              <li className="flex items-start">
                <Check className="mr-3 mt-1 flex-shrink-0" />
                <span>Transport Canada Advanced RPAS Certified</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-3 mt-1 flex-shrink-0" />
                <span>10+ years UAV & videography experience</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-3 mt-1 flex-shrink-0" />
                <span>North Okanagan resident</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Email Capture (Community) */}
      <section className="py-16 bg-white">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl text-[#0B2D59] mb-6">
            Want Updates on the Launch?
          </h2>
          <p className="text-lg mb-8">
            Join the community. We'll notify you when thermal pet search goes live in the North Okanagan.
          </p>
          <form onSubmit={handleCommunityEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={communityEmail}
              onChange={(e) => setCommunityEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-[#FF6200] hover:bg-[#FF6200]/90">
              Notify Me
            </Button>
          </form>
        </div>
      </section>

      {/* Section 5: Why This Service Can't Exist Without Community Leaders */}
      <section className="py-20 bg-gray-100">
        <div className="container max-w-5xl">
          <h2 className="text-4xl md:text-5xl text-[#0B2D59] mb-10 text-center">
            Why This Service Can't Exist<br />Without Community Leaders
          </h2>
          <div className="text-lg leading-relaxed space-y-6">
            <p className="font-semibold">Here's the reality:</p>
            <div className="bg-gray-50 rounded-lg p-8 my-8">
              <p className="text-xl mb-2">Professional thermal imaging equipment: <span className="font-bold">$12,000</span></p>
              <p className="text-xl mb-2">Cost per search without community support: <span className="font-bold">$600-1,200</span></p>
              <p className="text-xl">With founding sponsor support: <span className="font-bold text-[#FF6200]">Starting at $299</span></p>
            </div>
            <p>
              The families who need this service most—whose senior dog wandered off, whose indoor cat escaped during a move, whose family pet is lost in unfamiliar terrain—can afford $299. They cannot afford $600.
            </p>
            <p className="font-semibold text-xl">This is where founding sponsors change the equation.</p>
            <p>
              Your contribution doesn't fund "Mike's new drone." It funds accessible hope for every pet owner in the North Okanagan.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Founding Sponsor Opportunities */}
      <section id="founding-opportunities" className="py-20 bg-white">
        <div className="container max-w-6xl">
          <h2 className="text-4xl md:text-5xl text-[#0B2D59] mb-6 text-center">
            Founding Sponsor Opportunities
          </h2>
          <p className="text-xl text-center mb-4 max-w-4xl mx-auto">
            Four ways to secure recognition as a community leader who made this possible. Limited spots available—your support launches this service.
          </p>
          <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            Founding Sponsorships are one-time investments with lasting recognition. You'll be remembered as someone who made thermal pet rescue accessible in our region.
          </p>

          <div className="space-y-8">
            {/* Tier 1: Title Sponsor */}
            <div className="border-l-4 border-[#FF6200] bg-white shadow-lg rounded-lg p-8">
              <div className="mb-4">
                <span className="inline-block bg-[#FF6200] text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                  ONLY 1 SPOT AVAILABLE
                </span>
              </div>
              <h3 className="text-3xl mb-3">Title Sponsor</h3>
              <p className="text-4xl font-bold text-[#0B2D59] mb-4">$4,500 one-time</p>
              <p className="text-gray-600 mb-6 italic">
                For: The business leader who doesn't just support—they LEAD. You want your brand synonymous with pet rescue in the North Okanagan.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Exclusive drone naming rights - "Searches powered by [Business]" for the life of this equipment</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Large logo on drone (physical branding on equipment)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Homepage hero placement on website</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>On-site equipment showcase event at your location - We bring the thermal drone to your business for a customer appreciation event with live demonstrations and photo opportunities</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>3-month video content training program for your staff - Monthly 90-minute sessions teaching your team to create professional social media content (mobile video, editing, strategy)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Featured in all media coverage - "Made possible by..."</span>
                </div>

              </div>
              <p className="text-sm italic text-gray-600">
                You'll be recognized as a founding supporter who made this service possible.
              </p>
            </div>

            {/* Tier 2: Premium Founding Partner */}
            <div className="border-l-4 border-[#FF6200] bg-white shadow-lg rounded-lg p-8">
              <div className="mb-4">
                <span className="inline-block bg-[#FF6200] text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                  MAXIMUM 6 SPOTS
                </span>
              </div>
              <h3 className="text-3xl mb-3">Premium Founding Partner</h3>
              <p className="text-4xl font-bold text-[#0B2D59] mb-4">$997 one-time</p>
              <p className="text-gray-600 mb-6 italic">
                6 spots available - Large logo display<br />
                Video production within 30 days of payment based on our schedules
              </p>
              <p className="text-gray-600 mb-6">
                For: Business owners who understand credibility is built, not bought. You want lasting recognition with premium visibility.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Full promotional video (90-120 seconds) for your business by Rhythm Productions (a $2,000 value)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Name with <strong>large logo</strong> engraved on commemorative metal case plaque (premium placement, listed first)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Large logo</strong> in "Founding Partners" section on website</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Individual launch announcement post</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Featured in social media success stories (organic, story-based throughout the year)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Founding Partner certificate</span>
                </div>
              </div>
              <p className="text-sm italic text-gray-600">
                Premium tier features larger visual presence on all materials.
              </p>
            </div>

            {/* Tier 3: Standard Founding Partner */}
            <div className="border-l-4 border-[#FF6200] bg-white shadow-lg rounded-lg p-8">
              <div className="mb-4">
                <span className="inline-block bg-[#FF6200] text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                  MAXIMUM 15 SPOTS
                </span>
              </div>
              <h3 className="text-3xl mb-3">Standard Founding Partner</h3>
              <p className="text-4xl font-bold text-[#0B2D59] mb-4">$597 one-time</p>
              <p className="text-gray-600 mb-6 italic">
                15 spots available - Medium logo display<br />
                Video production within 30 days of payment based on our schedules
              </p>
              <p className="text-gray-600 mb-6">
                For: Business owners who want to be part of something bigger and support the community.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Professional video business card (30-60 seconds) for your business by Rhythm Productions (a $1,000 value)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Name with <strong>medium logo</strong> engraved on commemorative metal case plaque</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Medium logo</strong> in "Founding Partners" section on website</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Individual launch announcement post</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Featured in social media success stories (organic, story-based throughout the year)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Founding Partner certificate</span>
                </div>
              </div>
              <p className="text-sm italic text-gray-600">
                Same recognition and status as Premium, with medium-sized visual presence.
              </p>
            </div>

            {/* Tier 4: Launch Contributor */}
            <div className="border-l-4 border-[#FF6200] bg-white shadow-lg rounded-lg p-8">
              <div className="mb-4">
                <span className="inline-block bg-[#00FFC2] text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                  UNLIMITED SPOTS
                </span>
              </div>
              <h3 className="text-3xl mb-3">Launch Contributor</h3>
              <p className="text-4xl font-bold text-[#0B2D59] mb-4">$50 one-time</p>
              <p className="text-gray-600 mb-6 italic">
                For: Small businesses, sole proprietors, and individuals who want to be part of the launch story.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Business name hyperlinked in "Launch Contributors" section on website</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Direct backlink to your business website (SEO value)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Included in community supporter acknowledgments</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Part of the launch story forever</span>
                </div>
              </div>
              <p className="text-sm italic text-gray-600">
                Perfect for small businesses, sole proprietors, and individuals.
              </p>
            </div>
          </div>

          <p className="text-center mt-12 text-lg">
            Not sure which tier is right for you? Email <a href="mailto:info@dronesearch.ca" className="text-[#FF6200] hover:underline">info@dronesearch.ca</a> to discuss.
          </p>
        </div>
      </section>

      {/* Section 7: The Moment You're Funding */}
      <section className="py-20 bg-[#0B2D59] text-white">
        <div className="container max-w-5xl">
          <h2 className="text-4xl md:text-5xl mb-10 text-center">
            Picture This Moment
          </h2>
          <div className="text-lg leading-relaxed space-y-6">
            <p>
              It's 7 PM. A family's 14-year-old golden retriever wandered off six hours ago. They've walked every trail, called until their voices gave out, posted on every Facebook group.
            </p>
            <p className="font-semibold">They're losing hope.</p>
            <p>
              Then they remember: DroneSearch.ca exists because people like you stepped forward.
            </p>
            <p>
              One call. Thermal drone in the air within the hour. Heat signature detected 200 meters into dense forest—motionless, hidden, but alive.
            </p>
            <p className="font-bold text-xl">
              That reunion happens because you made the affordable call-out fee possible instead of $1,200.
            </p>
            <p>
              This isn't theoretical. This is the difference founding sponsors make.
            </p>
          </div>
        </div>
      </section>

      {/* Section 8: Founding Form */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl text-[#0B2D59] mb-6 text-center">
            Secure Your Founding Spot
          </h2>
          <p className="text-center mb-10 text-lg">
            Fill out this form and we'll contact you within 24 hours to finalize your founding sponsorship.
          </p>
          
          <form onSubmit={handleFoundingFormSubmit} className="space-y-6 bg-gray-50 p-8 rounded-lg">
            <div>
              <label className="block text-sm font-semibold mb-2">Sponsorship Interest *</label>
              <Select 
                value={foundingForm.sponsorshipInterest}
                onValueChange={(value) => setFoundingForm({...foundingForm, sponsorshipInterest: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title Sponsor - $4,500</SelectItem>
                  <SelectItem value="premium">Premium Founding Partner - $997</SelectItem>
                  <SelectItem value="standard">Standard Founding Partner - $597</SelectItem>
                  <SelectItem value="contributor">Launch Contributor - $50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Business Name (if applicable)</label>
              <Input
                type="text"
                value={foundingForm.businessName}
                onChange={(e) => setFoundingForm({...foundingForm, businessName: e.target.value})}
                placeholder="Your business name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Your Name *</label>
              <Input
                type="text"
                value={foundingForm.yourName}
                onChange={(e) => setFoundingForm({...foundingForm, yourName: e.target.value})}
                placeholder="First and last name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email *</label>
              <Input
                type="email"
                value={foundingForm.email}
                onChange={(e) => setFoundingForm({...foundingForm, email: e.target.value})}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <Input
                type="tel"
                value={foundingForm.phone}
                onChange={(e) => setFoundingForm({...foundingForm, phone: e.target.value})}
                placeholder="(250) 555-0123"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Questions or Comments</label>
              <Textarea
                value={foundingForm.questions}
                onChange={(e) => setFoundingForm({...foundingForm, questions: e.target.value})}
                placeholder="Any questions about your sponsorship?"
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full bg-[#FF6200] hover:bg-[#FF6200]/90 text-lg py-6">
              Submit Sponsorship Inquiry
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Your information is secure and will only be used to contact you about founding sponsorship opportunities.
          </p>
        </div>
      </section>

      {/* Section 9: Questions */}
      <section className="py-20 bg-gray-100">
        <div className="container max-w-5xl">
          <h2 className="text-4xl text-[#0B2D59] mb-12 text-center">
            Questions Founding Sponsors Ask
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: What happens if you don't reach the funding goal?</h3>
              <p className="text-lg leading-relaxed">
                A: This is going to happen—the need is too real. But out of respect for your trust: no equipment will be purchased until funding is secured. If there's any delay, you'll be contacted directly before any action is taken. Your contribution is held in trust until launch.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: What if equipment breaks or needs upgrading?</h3>
              <p className="text-lg leading-relaxed">
                A: Your recognition isn't tied to one piece of hardware—it's tied to the SERVICE. Founding Partner plaques transfer to all future equipment. Title Sponsor naming rights are for the life of this equipment. The tool might change. The legacy doesn't.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: Why not just charge clients more instead of needing sponsors?</h3>
              <p className="text-lg leading-relaxed mb-4">
                A: We could charge $600-1,200 per search and cover costs without sponsors. You know who would use that service? Wealthy pet owners who can afford premium pricing.
              </p>
              <p className="text-lg leading-relaxed">
                Everyone else would keep doing what they've always done: hoping, walking, calling, and usually never finding their pet.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Sponsors make it possible to offer searches starting at $299—a price families can actually afford in crisis. That's the difference between "elite service for a few" and "community resource for everyone."
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: Can individuals (not businesses) be founding sponsors?</h3>
              <p className="text-lg leading-relaxed">
                A: Absolutely. Individual sponsors are welcome in the Launch Contributor tier. No business required—just a desire to make this real.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: Is this tax-deductible?</h3>
              <p className="text-lg leading-relaxed">
                A: DroneSearch.ca operates as a regular business, not a registered charity, so sponsorships are not tax-deductible donations. However, they are legitimate marketing expenses for businesses (consult your accountant).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: Is this an emergency service?</h3>
              <p className="text-lg leading-relaxed">
                A: No. DroneSearch.ca is a non-emergency service for lost pet recovery. For life-threatening emergencies or human search and rescue, always contact Vernon Search and Rescue or emergency services immediately. We focus on helping families find their missing pets in non-emergency situations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Launch Progress */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-4xl text-[#0B2D59] mb-10 text-center">
            Launch Progress
          </h2>
          
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-lg font-semibold">0% funded</span>
              <span className="text-lg font-semibold">100% funded</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div 
                className="bg-[#FF6200] h-full rounded-full transition-all duration-500"
                style={{ width: `${fundingPercentage}%` }}
              />
            </div>
            <p className="text-center mt-2 text-sm text-gray-600">{fundingPercentage}% funded</p>
          </div>

          <div className="text-center text-lg leading-relaxed space-y-4 max-w-2xl mx-auto">
            <p>Every founding sponsor closes the gap between "good idea" and "actual rescue service."</p>
            <p className="font-bold text-xl">Founding sponsorship opportunities close once equipment is purchased—reserve your spot now.</p>
            <p className="italic text-gray-600">You're either part of the origin story or you're not.</p>
          </div>
        </div>
      </section>

      {/* Section 11: About */}
      <section className="py-20 bg-white border-t">
        <div className="container max-w-6xl">
          <h2 className="text-4xl text-[#0B2D59] mb-12 text-center">
            Meet Your Pilot
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <img 
                src="/pilot-with-drone.jpg" 
                alt="Transport Canada certified drone pilot serving North Okanagan pet search - Mike with thermal imaging drone"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <div className="text-lg leading-relaxed space-y-4 mb-8">
                <p>I'm Mike, and I've lived in the North Okanagan long enough to see the pattern:</p>
                <p>
                  Pet goes missing. Family panics. They post everywhere, walk for hours, call until their voice gives out. Sometimes the pet comes home. Most of the time it doesn't.
                </p>
                <p className="font-semibold">I kept thinking: there HAS to be a better way.</p>
                <p>
                  When I learned thermal imaging had reached a point where lost pet detection was not only possible but RELIABLE, I realized this is the solution I'd been looking for.
                </p>
                <p>
                  But I also realized: I can't just buy equipment and charge $600-1,200 per search. That would make this EXIST, but it wouldn't make it ACCESSIBLE.
                </p>
                <p className="font-semibold">So the real question became: How do we make this accessible to everyone?</p>
                <p>
                  That's where founding sponsors come in. You make it possible to offer this starting at $299—a price that works for real families in crisis, not just wealthy pet owners.
                </p>
                <p>
                  This isn't me asking you to fund my business. This is me inviting you to step into a leadership role in making sure North Okanagan families have access to hope when they need it most.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-[#0B2D59]">QUALIFICATIONS</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                    <span>Transport Canada Advanced RPAS Certified</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                    <span>10+ Years UAV & Videography Experience</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                    <span>North Okanagan Resident</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 12: Email Capture (Sponsors) */}
      <section className="py-16 bg-gray-100">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl text-[#0B2D59] mb-6">
            Get Updates on Founding Opportunities
          </h2>
          <p className="text-lg mb-8">
            Spots are filling. Get notified when new sponsorship opportunities open or tiers change.
          </p>
          <form onSubmit={handleSponsorEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={sponsorEmail}
              onChange={(e) => setSponsorEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-[#FF6200] hover:bg-[#FF6200]/90">
              Keep Me Updated
            </Button>
          </form>
        </div>
      </section>

      {/* Section 13: Ready to Step In */}
      <section className="py-20 bg-[#FF6200] text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl mb-8">
            Ready to Step In?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            This is your chance to be remembered as someone who made thermal pet rescue accessible in the North Okanagan. Founding sponsorships close once equipment is purchased.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-white text-[#FF6200] hover:bg-gray-100"
            onClick={() => scrollToSection("founding-opportunities")}
          >
            View Founding Opportunities
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1E1E] text-white py-12">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DroneSearch.ca</h3>
              <p className="text-gray-400 mb-2">
                Thermal Drone Pet Search Service
              </p>
              <p className="text-gray-400 mb-2">
                Serving North Okanagan: Vernon, Armstrong, Salmon Arm & Surrounding Areas
              </p>
              <p className="text-gray-400">
                Email: <a href="mailto:info@dronesearch.ca" className="text-[#FF6200] hover:underline">info@dronesearch.ca</a>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">About</h3>
              <p className="text-gray-400">
                Launching North Okanagan's first thermal imaging pet search service. Founding sponsorship opportunities available for local businesses.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Service Area</h3>
              <div className="h-48 bg-gray-800 rounded-lg overflow-hidden">
                <MapView
                  initialCenter={{ lat: 50.48, lng: -119.28 }}
                  initialZoom={9}
                  onMapReady={(map) => {
                    // Armstrong, BC coordinates
                    const armstrongCenter = { lat: 50.4489, lng: -119.1961 };
                    
                    // Add marker for Armstrong
                    new google.maps.marker.AdvancedMarkerElement({
                      position: armstrongCenter,
                      map: map,
                      title: "Armstrong, BC"
                    });
                    
                    // Add circle showing 2-hour service radius (approximately 150km)
                    new google.maps.Circle({
                      strokeColor: "#FF6200",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#FF6200",
                      fillOpacity: 0.2,
                      map: map,
                      center: armstrongCenter,
                      radius: 150000, // 150km in meters
                    });
                  }}
                />
              </div>
              <p className="text-gray-400 text-sm mt-2">Vernon, Armstrong, Salmon Arm & surrounding areas</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 DroneSearch.ca | Armstrong, British Columbia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
