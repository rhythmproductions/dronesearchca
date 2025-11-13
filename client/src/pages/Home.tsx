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
    if (!foundingForm.email) {
      toast.error("Please enter your email address");
      return;
    }
    console.log("Founding form submission:", { ...foundingForm, timestamp: new Date().toISOString(), source: "founding-form" });
    toast.success("✓ Got it! We'll reach out within 24 hours. Check your email for confirmation—and thank you for considering becoming a founding sponsor.");
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
            The SPCA Estimates Over 1 Million Pets Go Missing Each Year in Canada
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
              alt="Comparison of daylight view vs thermal imaging view showing hidden animals"
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
          <p className="text-lg leading-relaxed mb-10">
            DroneSearch.ca will bring this capability to Vernon, Armstrong, Salmon Arm, and surrounding communities—with an affordable $149 call-out fee thanks to community sponsorship.
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

      {/* Section 4: The Accessibility Challenge */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-4xl md:text-5xl text-[#0B2D59] mb-10 text-center">
            Why This Service Can't Exist Without Community Leaders
          </h2>
          <div className="text-lg leading-relaxed space-y-6">
            <p className="font-semibold">Here's the reality:</p>
            <div className="bg-gray-50 rounded-lg p-8 my-8">
              <p className="text-xl mb-2">Professional thermal imaging equipment: <span className="font-bold">$12,000</span></p>
              <p className="text-xl mb-2">Cost per search without community support: <span className="font-bold">$600-1,200</span></p>
              <p className="text-xl">With founding sponsor support: <span className="font-bold text-[#FF6200]">$149 call-out fee</span></p>
            </div>
            <p>
              The families who need this service most—whose senior dog wandered off, whose indoor cat escaped during a move, whose family pet is lost in unfamiliar terrain—can afford $149. They cannot afford $600.
            </p>
            <p className="font-semibold text-xl">This is where founding sponsors change the equation.</p>
            <p>
              Your contribution doesn't fund "Mike's new drone." It funds accessible hope for every pet owner in the North Okanagan.
            </p>
            <p>
              Without community support, thermal search exists but remains out of reach. With founding sponsors, it becomes accessible to families regardless of their financial situation.
            </p>
            <p className="font-bold text-xl">That's not charity. That's community infrastructure.</p>
            <p className="text-xl italic">
              You become one of the leaders who looked at a gap and said: "Not on my watch. This is happening, and everyone gets access."
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Email Capture (Community) */}
      <section className="py-16 bg-gray-100">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl text-[#0B2D59] mb-6">
            Want Updates as We Launch?
          </h2>
          <p className="text-lg mb-8">
            Join our email list to be notified when DroneSearch.ca goes live and learn how to access thermal pet search in your community.
          </p>
          <form onSubmit={handleCommunityEmailSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Your email address"
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

      {/* Section 6: Founding Sponsor Opportunities */}
      <section id="founding-opportunities" className="py-20 bg-white">
        <div className="container max-w-6xl">
          <h2 className="text-4xl md:text-5xl text-[#0B2D59] mb-6 text-center">
            Founding Sponsor Opportunities
          </h2>
          <p className="text-xl text-center mb-4 max-w-4xl mx-auto">
            Two ways to secure permanent recognition as a community leader who made this possible. Limited spots available—your support launches this service.
          </p>
          <p className="text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            Founding Sponsorships are one-time investments with permanent recognition. You'll be remembered as someone who made thermal pet rescue accessible in our region.
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
              <p className="text-4xl font-bold text-[#0B2D59] mb-4">$2,000 one-time</p>
              <p className="text-gray-600 mb-6 italic">
                For: The business leader who doesn't just support—they LEAD. You want your brand synonymous with pet rescue in the North Okanagan.
              </p>
              <p className="text-sm font-semibold text-gray-700 mb-4">Title Sponsor Benefits (Different from Founding Partners):</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Exclusive drone naming rights - "Searches powered by [Business]" for 1 year (until new drone in 2027)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Largest logo on drone (physical branding)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Homepage hero placement on website</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Premium video package included (90-120 sec)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Tagged in any posts made involving the drone</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Featured in all media coverage - "Made possible by..."</span>
                </div>
              </div>
              <p className="text-sm italic text-gray-600">
                Most businesses spend $2,000 on a single trade show forgotten in 60 days. This is permanent positioning as the company that brought hope to pet owners.
              </p>
            </div>

            {/* Tier 2: Founding Partner */}
            <div className="border-l-4 border-[#FF6200] bg-white shadow-lg rounded-lg p-8">
              <div className="mb-4">
                <span className="inline-block bg-[#FF6200] text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">
                  MAXIMUM 10 SPOTS
                </span>
              </div>
              <h3 className="text-3xl mb-3">Founding Partner</h3>
              <p className="text-4xl font-bold text-[#0B2D59] mb-4">$500 one-time</p>
              <p className="text-gray-600 mb-6 italic">
                For: Business owners who understand community goodwill is built, not bought. You want lasting recognition without dominating the spotlight.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Permanent engraved metal plaque on equipment case (transfers to all future equipment)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Logo on sandwich board displayed at all drone search locations</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Tagged in social posts weekly (52 times Year 1)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Professional 60-second hero video for your business</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Logo in "Founding Partners" section on website</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Individual launch announcement post</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-[#00FFC2] mr-3 mt-1 flex-shrink-0" />
                  <span>Permanent "Founding Partner" title if you join any monthly plan after Year 1</span>
                </div>
              </div>
              <p className="text-sm italic text-gray-600">
                $500 is less than one month of outdoor advertising. This is permanent, cumulative recognition.
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
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl mb-12 text-center">
            Picture This Moment
          </h2>
          <div className="text-lg leading-relaxed space-y-4 text-center mb-12">
            <p>It's 11 PM. October. Cold. Dark.</p>
            <p>
              A family's 14-year-old Lab wandered off during an evening walk. She's deaf, nearly blind, disoriented. Somewhere in the forest behind their property.
            </p>
            <p>They've been searching for hours. Flashlights. Calling her name. Nothing.</p>
            <p className="font-semibold">Terror is setting in.</p>
            <p>They call DroneSearch.ca.</p>
            <p>
              Within 45 minutes, thermal imaging reveals a bright heat signature 400 meters into the trees. Motionless under a deadfall.
            </p>
            <p>The family reaches her in 8 minutes.</p>
            <p className="font-semibold">She's cold. She's scared. But she's alive.</p>
            <p>They carry her home.</p>
          </div>
          
          <div className="border-t-2 border-[#00FFC2] my-12" />
          
          <div className="text-xl leading-relaxed space-y-6 text-center font-semibold">
            <p>That moment only exists if founding sponsors make it real.</p>
            <p>Without you, that family searches until they give up. With you, that dog comes home.</p>
            <p>You're not funding equipment. You're funding every version of that moment.</p>
          </div>
        </div>
      </section>

      {/* Section 8: Founding Form */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl text-[#0B2D59] mb-6 text-center">
            Secure Your Founding Spot
          </h2>
          <p className="text-center mb-10 text-gray-600">
            This form doesn't commit you to payment—it starts a conversation. We'll contact you within 24 hours to discuss details and answer questions.
          </p>
          
          <form onSubmit={handleFoundingFormSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Sponsorship Interest</label>
              <Select value={foundingForm.sponsorshipInterest} onValueChange={(value) => setFoundingForm({...foundingForm, sponsorshipInterest: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title Sponsor ($5,000)</SelectItem>
                  <SelectItem value="partner">Founding Partner ($2,000)</SelectItem>
                  <SelectItem value="supporter">Founding Supporter ($500)</SelectItem>
                  <SelectItem value="info">Just gathering information</SelectItem>
                  <SelectItem value="help">Not sure yet—help me decide</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Business or Individual Name</label>
              <Input
                type="text"
                value={foundingForm.businessName}
                onChange={(e) => setFoundingForm({...foundingForm, businessName: e.target.value})}
                placeholder="Your business or personal name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Your Name</label>
              <Input
                type="text"
                value={foundingForm.yourName}
                onChange={(e) => setFoundingForm({...foundingForm, yourName: e.target.value})}
                placeholder="Contact person name"
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
              <label className="block text-sm font-semibold mb-2">Phone (optional)</label>
              <Input
                type="tel"
                value={foundingForm.phone}
                onChange={(e) => setFoundingForm({...foundingForm, phone: e.target.value})}
                placeholder="(250) 555-1234"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Questions or What You're Thinking (optional)</label>
              <Textarea
                value={foundingForm.questions}
                onChange={(e) => setFoundingForm({...foundingForm, questions: e.target.value})}
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
      </section>

      {/* Section 9: Questions */}
      <section className="py-20 bg-gray-100">
        <div className="container max-w-5xl">
          <h2 className="text-4xl text-[#0B2D59] mb-12 text-center">
            Questions Founding Sponsors Ask
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: What happens if you don't reach the $7,000 goal?</h3>
              <p className="text-lg leading-relaxed">
                A: This is going to happen—the need is too real. But out of respect for your trust: no equipment will be purchased until $7,000 is secured. If there's any delay, you'll be contacted directly before any action is taken. Your contribution is held in trust until launch.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: What if equipment breaks or needs upgrading?</h3>
              <p className="text-lg leading-relaxed">
                A: Your recognition isn't tied to one piece of hardware—it's tied to the SERVICE. Founding Partner plaques transfer to all future equipment. Title Sponsor naming rights are for 1 year until the new drone in 2027. The tool might change. The legacy doesn't.
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
                Sponsors make it possible to offer searches at $149—a price families can actually afford in crisis. That's the difference between "elite service for a few" and "community resource for everyone."
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: Can individuals (not businesses) be founding sponsors?</h3>
              <p className="text-lg leading-relaxed">
                A: Absolutely. Individual sponsors are welcome in the Founding Partner tier. No business required—just a desire to make this real.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-[#0B2D59]">Q: Is this tax-deductible?</h3>
              <p className="text-lg leading-relaxed">
                A: DroneSearch.ca operates as a regular business, not a registered charity, so sponsorships are not tax-deductible donations. However, they are legitimate marketing expenses for businesses (consult your accountant).
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
              <span className="text-lg font-semibold">$0 raised</span>
              <span className="text-lg font-semibold">$7,000 goal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div 
                className="bg-[#FF6200] h-full rounded-full transition-all duration-500"
                style={{ width: '0%' }}
              />
            </div>
          </div>

          <div className="text-center text-lg leading-relaxed space-y-4 max-w-2xl mx-auto">
            <p>Every founding sponsor closes the gap between "good idea" and "actual rescue service."</p>
            <p>Once the equipment is purchased, founding sponsorship opportunities permanently close.</p>
            <p className="font-bold text-xl">You're either part of the origin story or you're not.</p>
          </div>
        </div>
      </section>

      {/* Section 11: About */}
      <section className="py-20 bg-white border-t">
        <div className="container max-w-6xl">
          <h2 className="text-4xl text-[#0B2D59] mb-12 text-center">
            Meet Your Pilot
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/pilot-with-drone.jpg" 
                alt="Mike, DroneSearch.ca pilot with thermal imaging drone"
                className="rounded-lg shadow-lg w-full"
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
                  That's where founding sponsors come in. You make it possible to offer this at $149—a price that works for real families in crisis, not just wealthy pet owners.
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
            Want to stay informed but not ready to commit? Join our sponsor update list.
          </p>
          <form onSubmit={handleSponsorEmailSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Your email address"
              value={sponsorEmail}
              onChange={(e) => setSponsorEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" className="bg-[#FF6200] hover:bg-[#FF6200]/90">
              Send Me Sponsor Updates
            </Button>
          </form>
        </div>
      </section>

      {/* Section 13: Final CTA */}
      <section className="py-20 bg-[#FF6200] text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl mb-8">
            Ready to Step In?
          </h2>
          <div className="text-xl leading-relaxed space-y-6 mb-10">
            <p>
              You now understand why thermal search matters, why it requires community support, and what you become as a founding sponsor.
            </p>
            <p className="font-semibold">There's only one question left:</p>
            <p>
              Will you be part of the story where North Okanagan became the first region in BC with accessible thermal pet rescue?
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-[#0B2D59] hover:bg-[#0B2D59]/90 text-white text-lg px-10 py-6"
            onClick={() => scrollToSection("founding-opportunities")}
          >
            Request Founding Sponsor Information →
          </Button>
        </div>
      </section>

      {/* Section 14: Footer */}
      <footer className="bg-[#1E1E1E] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">DroneSearch.ca</h3>
              <p className="mb-2">Bringing thermal pet search to the North Okanagan</p>
              <p className="text-gray-400">Serving Vernon, Armstrong, Salmon Arm & surrounding communities</p>
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
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC2] transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC2] transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC2] transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC2] transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC2] transition-colors">
                  <Youtube size={24} />
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
            <p className="mb-2">© 2025 DroneSearch.ca | Privacy Policy | Terms of Service</p>
            <p>Monthly ongoing partnership opportunities available after launch—inquire for details.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
