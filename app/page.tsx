import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/background.png"
            alt="Netflix Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        <div className="relative z-10">
          {/* Header / Navigation */}
          <header className="flex items-center justify-between px-6 md:px-10 lg:px-14 py-5">
            <Image
              src="/assets/logo.png"
              alt="Netflix Logo"
              width={150}
              height={41}
              className="w-24 md:w-36 lg:w-40"
              priority
            />
            <div className="flex items-center gap-3">
              <select className="bg-black/60 border border-[#808080] text-white text-sm px-3 py-1 rounded appearance-none cursor-pointer hover:bg-black/80 transition hidden sm:block">
                <option>English</option>
                <option>Hindi</option>
              </select>
              <Link
                href="/sign-in"
                className="bg-[#E50914] hover:bg-[#F40612] text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            </div>
          </header>

          {/* Hero Content */}
          <main className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 max-w-[950px] mx-auto">
            <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-extrabold text-white leading-[1.1] tracking-tight max-w-[800px]">
              Unlimited movies, TV shows and more
            </h1>
            <p className="text-lg md:text-xl text-white/90 mt-4 font-normal">
              Starts at ₹149. Cancel at any time.
            </p>
            <p className="text-[#d2d2d2] mt-5 text-base md:text-lg">
              Ready to watch? Enter your email to create or restart your membership.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-2 w-full max-w-[660px]">
              <div className="relative flex-1">
                <input
                  type="email"
                  id="email-input"
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 bg-black/70 border border-[#808080] rounded text-white text-base focus:outline-none focus:border-white transition-colors"
                />
                <label
                  htmlFor="email-input"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#808080] text-base transition-all pointer-events-none
                             peer-focus:top-3 peer-focus:text-xs peer-focus:text-[#b3b3b3]
                             peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-xs"
                >
                  Email address
                </label>
              </div>
              <Link
                href="/sign-up"
                className="bg-[#E50914] hover:bg-[#F40612] text-white px-6 py-3 md:px-8 md:py-4 rounded text-lg md:text-xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap group"
              >
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* Separator */}
      <div className="h-2 bg-[#232323]" />

      {/* Feature Section 1 - Enjoy on your TV */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-black">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl text-[#b3b3b3] mt-5 leading-relaxed">
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.
            </p>
          </div>
          <div className="relative flex justify-center">
            <div className="relative z-10 w-[90%]">
              <Image
                src="/assets/devices.png"
                alt="TV"
                width={530}
                height={400}
                className="w-full relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="h-2 bg-[#232323]" />

      {/* Feature Section 2 - Download */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-black">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12">
          <div className="order-2 md:order-1 relative flex justify-center">
            <div className="relative w-[70%]">
              <Image
                src="/assets/download.png"
                alt="Download shows"
                width={400}
                height={480}
                className="w-full relative z-10"
              />
              {/* Download card animation */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-black border border-[#333] rounded-xl flex items-center gap-3 px-4 py-2.5 w-[70%] min-w-[220px] shadow-2xl">
                <div className="w-10 h-14 bg-[#E50914] rounded-sm flex items-center justify-center text-white text-xs font-bold shrink-0">N</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">Stranger Things</p>
                  <p className="text-[#0071EB] text-xs font-medium">Downloading...</p>
                </div>
                <div className="w-9 h-9 border-2 border-[#b3b3b3] border-t-transparent rounded-full animate-spin shrink-0" />
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl text-[#b3b3b3] mt-5 leading-relaxed">
              Save your favourites easily and always have something to watch.
            </p>
          </div>
        </div>
      </section>

      <div className="h-2 bg-[#232323]" />

      {/* Feature Section 3 - Watch everywhere */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-black">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl text-[#b3b3b3] mt-5 leading-relaxed">
              Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.
            </p>
          </div>
          <div className="relative flex justify-center">
            <div className="relative w-[90%]">
              <Image
                src="/assets/devices.png"
                alt="Watch everywhere"
                width={530}
                height={400}
                className="w-full relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="h-2 bg-[#232323]" />

      {/* Feature Section 4 - Create profiles for kids */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-black">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12">
          <div className="order-2 md:order-1 relative flex justify-center">
            <div className="relative w-[80%]">
              <Image
                src="/assets/contract.png"
                alt="Profiles for kids"
                width={400}
                height={400}
                className="w-full"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Create profiles for kids
            </h2>
            <p className="text-lg md:text-xl text-[#b3b3b3] mt-5 leading-relaxed">
              Send children on adventures with their favourite characters in a space made just for them — free with your membership.
            </p>
          </div>
        </div>
      </section>

      <div className="h-2 bg-[#232323]" />

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-black text-center">
        <div className="max-w-[815px] mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2 text-left mb-12">
            {[
              { q: "What is Netflix?", a: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices." },
              { q: "How much does Netflix cost?", a: "Watch Netflix on your smartphone, tablet, Smart TV, laptop or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts." },
              { q: "Where can I watch?", a: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device." },
              { q: "How do I cancel?", a: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account at any time." },
              { q: "What can I watch on Netflix?", a: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, any time you want." },
            ].map((faq) => (
              <details key={faq.q} className="group bg-[#2D2D2D] hover:bg-[#414141] transition-colors">
                <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none text-lg md:text-xl lg:text-2xl text-white font-normal">
                  {faq.q}
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" className="shrink-0 ml-4 transition-transform group-open:rotate-45">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <div className="border-t border-black">
                  <p className="p-5 md:p-6 text-lg md:text-xl text-white/90 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

          <p className="text-[#d2d2d2] text-lg mb-5">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-[660px] mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-3.5 bg-black/70 border border-[#808080] rounded text-white focus:outline-none focus:border-white transition-colors"
            />
            <Link
              href="/sign-up"
              className="bg-[#E50914] hover:bg-[#F40612] text-white px-8 py-3.5 rounded text-xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <div className="h-2 bg-[#232323]" />

      {/* Footer */}
      <footer className="py-14 px-6 md:px-16 bg-black">
        <div className="max-w-[980px] mx-auto">
          <p className="text-[#808080] text-base mb-7">
            Questions? Call{" "}
            <a href="#" className="hover:underline">
              000-800-919-1694
            </a>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 text-[13px] text-[#808080] mb-8">
            <a href="#" className="hover:underline">FAQ</a>
            <a href="#" className="hover:underline">Help Centre</a>
            <a href="#" className="hover:underline">Account</a>
            <a href="#" className="hover:underline">Media Centre</a>
            <a href="#" className="hover:underline">Investor Relations</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Ways to Watch</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Cookie Preferences</a>
            <a href="#" className="hover:underline">Corporate Information</a>
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">Speed Test</a>
            <a href="#" className="hover:underline">Legal Notices</a>
            <a href="#" className="hover:underline">Only on Netflix</a>
          </div>
          <select className="bg-transparent border border-[#808080] text-[#808080] text-sm px-3 py-2 rounded mb-5">
            <option>English</option>
            <option>Hindi</option>
          </select>
          <p className="text-[#808080] text-[13px]">Netflix India</p>
        </div>
      </footer>
    </div>
  )
}