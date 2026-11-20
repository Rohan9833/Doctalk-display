import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Play,
  Menu,
  X,
  VideoOff,
  Camera,
  Globe2,
  ShieldCheck,
  Monitor,
  QrCode,
  MessageCircle,
  Share2,
  Mail,
  Printer,
  Smartphone,
  ChartNoAxesColumnIncreasing,
  UserRound,
  Check,
  ChevronRight,
  ClipboardCheck,
  Send,
  ExternalLink,
} from "lucide-react";
import { products } from "./content";

const asset = "/images/";
function Brand({ small = false }) {
  return (
    <a
      href="#top"
      aria-label="DocTalk home"
      className="inline-flex items-center"
    >
      <img
        className={small ? "w-[120px]" : "w-[143px] sm:w-[164px]"}
        src={asset + "doctalk_by_digilateral.png"}
        alt="DocTalk logo"
      />
    </a>
  );
}
function ScrollCTA({ children = "Request Demo", className = "" }) {
  return (
    <a className={"btn-primary " + className} href="#demo">
      {children}
      {/* <ArrowRight size={18} /> */}
    </a>
  );
}
function Heading({ eyebrow, children, center = false, lead = "" }) {
  return (
    <div className={center ? "text-center" : ""}>
      <div className={"eyebrow mb-5 " + (center ? "justify-center" : "")}>
        {eyebrow}
      </div>
      <h2 className="section-title">{children}</h2>
      {lead && (
        <p
          className={
            "mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-muted " +
            (center ? "mx-auto" : "")
          }
        >
          {lead}
        </p>
      )}
    </div>
  );
}

function HeroCarousel({ openVideo }) {
  const slides = [
    {
      src: asset + "video_03.mp4",
      title: "DocTalk Show example",
      product: products[2],
    },
    {
      src: asset + "video_02.mp4",
      title: "DocTalk Quiz example",
      product: products[1],
    },

    {
      src: asset + "video_01.mp4",
      title: "DocTalk example",
      product: products[0],
    },
  ];
  const [index, setIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [paused, setPaused] = useState(false);
  const startX = useRef(null);
  const videoRefs = useRef([]);

  // useEffect(() => {
  //   videoRefs.current.forEach((video, videoIndex) => {
  //     if (!video) return;

  //     if (videoIndex === index) {
  //       video.currentTime = 0;
  //       video.play().catch(() => {});
  //     } else {
  //       video.pause();
  //       video.currentTime = 0;
  //     }
  //   });
  // }, [index]);
  useEffect(() => {
    videoRefs.current.forEach((video, videoIndex) => {
      if (!video) return;

      if (videoIndex === index) {
        video.currentTime = 0;

        const playVideo = () => {
          video.play().catch((error) => {
            console.error("Video playback failed:", error);
          });
        };

        if (video.readyState >= 2) {
          playVideo();
        } else {
          video.addEventListener("canplay", playVideo, { once: true });
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [index]);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => i + 1);
    }, 3500);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const go = (dir) =>
    setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <div
      className="relative overflow-hidden rounded-[28px] border-[5px] border-gold bg-[#E9EAF0] p-[5px] shadow-soft"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        startX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (startX.current === null) return;
        const dx = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        startX.current = null;
      }}
    >
      {/* <div className="relative overflow-hidden rounded-[23px]">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, slideIndex) => (
            <div key={s.src} className="relative w-full shrink-0">
              <video
                ref={(video) => {
                  videoRefs.current[slideIndex] = video;
                }}
                className="aspect-[1.52] w-full object-fill"
                src={s.src}
                muted
                playsInline
                preload="metadata"
              />

              <h3 className="absolute bottom-3 left-3 rounded-md bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                AI-Generated
              </h3>
            </div>
          ))}
        </div>
      </div> */}
      <div className="relative overflow-hidden rounded-[23px]">
        <div
          className={`flex ${
            transitionEnabled
              ? "transition-transform duration-700 ease-in-out"
              : ""
          }`}
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTransitionEnd={() => {
            if (index === slides.length) {
              setTransitionEnabled(false);
              setIndex(0);

              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  setTransitionEnabled(true);
                });
              });
            }
          }}
        >
          {/* {[...slides, slides[0]].map((s, slideIndex) => (
      <div key={slideIndex} className="w-full shrink-0">
        <video
          className="aspect-[1.52] w-full object-fill"
          src={s.src}
          muted
          playsInline
          preload="metadata"
        />
      </div>
    ))} */}
          {[...slides, slides[0]].map((s, slideIndex) => (
            <div key={slideIndex} className="w-full shrink-0">
              <video
                ref={(video) => {
                  videoRefs.current[slideIndex] = video;
                }}
                className="aspect-[1.52] w-full object-fill"
                src={s.src}
                muted
                playsInline
                preload="auto"
              />
            </div>
          ))}
        </div>

        <h3 className="absolute bottom-3 left-3 z-10 rounded-md bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          AI-Generated
        </h3>
      </div>
      {/* <div className="mt-5 flex items-center justify-center gap-8 sm:gap-12">
        {[
          {
            src: "/images/doctalk_show.jpg",
            alt: "DocTalk Show",
          },
          {
            src: "/images/doctalk_quiz.jpg",
            alt: "DocTalk Quiz",
          },
          {
            src: "/images/doctalk-logo.webp",
            alt: "DocTalk",
          },
        ].map((logo, logoIndex) => (
          <div
            key={logo.src}
            className={`flex h-12 w-24 items-center justify-center transition-all duration-500 sm:h-14 sm:w-28 ${
              index % slides.length === logoIndex
                ? "scale-110 opacity-100"
                : "scale-90 opacity-50"
            }`}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className={`max-h-full max-w-full object-contain ${
                logoIndex === 2 ? "scale-125" : ""
              }`}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
}

function VideoCard({ src, title, onClick, hero = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={"Preview " + title}
      className={
        "group relative block w-full overflow-hidden bg-[#E9EAF0] text-left " +
        (hero
          ? "rounded-[28px] border-[5px] border-gold p-[5px] shadow-soft"
          : "rounded-[20px]")
      }
    >
      <div className="relative overflow-hidden rounded-[inherit]">
        <img
          className={
            "w-full object-cover transition duration-500 group-hover:scale-[1.025] " +
            (hero ? "aspect-[1.52]" : "aspect-[1.7]")
          }
          src={src}
          alt={title}
        />
        <span className="play-btn">
          <Play size={23} fill="currentColor" />
        </span>
        {/* {hero && (
          <span className="absolute bottom-4 left-3 rounded-full bg-navy/90 px-3 py-1.5 text-[11px] font-bold text-white sm:left-5 sm:text-sm">
            Demo video · AI-generated doctors
          </span>
        )} */}
      </div>
    </button>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);
  return (
    <header className="sticky top-0 z-40 border-b border-[#E5EAF3] bg-white/95 backdrop-blur">
      <div className="container-site flex h-[76px] items-center justify-between gap-5">
        <Brand />
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          <a className="nav-link" href="#top">
            Overview
          </a>
          <a className="nav-link" href="#doctalk">
            DocTalk
          </a>
          <a className="nav-link" href="#quiz">
            DocTalk Quiz
          </a>
          <a className="nav-link" href="#show">
            DocTalk Show
          </a>
          <a className="nav-link" href="#how-it-works">
            How it Works
          </a>
        </nav>
        <div className="hidden sm:block">
          <ScrollCTA />
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-xl border border-[#DDE3EF] p-2 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="container-site flex flex-col gap-0 border-t border-[#EDF0F5] pb-4 lg:hidden"
        >
          {[
            ["Overview", "#top"],
            ["DocTalk", "#doctalk"],
            ["DocTalk Quiz", "#quiz"],
            ["DocTalk Show", "#show"],
            ["How it Works", "#how-it-works"],
            ["Request Demo", "#demo"],
          ].map(([name, url]) => (
            <a
              key={url}
              onClick={() => setOpen(false)}
              href={url}
              className="border-b border-[#EFF2F6] py-3 text-sm font-semibold"
            >
              {name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
function Hero({ openVideo }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-10 sm:pt-16 lg:pt-20"
    >
      <div className="pointer-events-none absolute right-5 top-8 h-28 w-28 opacity-80 lg:right-[10%]" />
      <div className="container-site relative z-10 grid items-center gap-6 lg:grid-cols-[.95fr_1.05fr] lg:gap-x-14 lg:gap-y-7">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          {/* <div className="eyebrow mb-5">For Pharma Brand Teams</div> */}
          <h1 className="ml-[10px] mt-[-20px] mb-[10px] text-[20px] font-black leading-[1.03] tracking-[-.065em] sm:text-[66px] lg:ml-0 lg:mt-0 lg:text-[clamp(42px,4.2vw,64px)]">
            Realistic AI, Engaging Videos
            <br />
            <span className="text-[#E38228]">
              Real Doctors, Verified Consent
            </span>
          </h1>
          {/* <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Turn a doctor's photo into a lifelike educational video. No shoot.
            Simple. Scalable.
          </p> */}
        </div>

        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <HeroCarousel openVideo={openVideo} />
        </div>

        <div className="mt-1 flex justify-evenly gap-2 lg:col-start-1 lg:row-start-2 lg:justify-start lg:gap-3">
          <ScrollCTA />
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-full border border-[#CAD3E2] bg-[#E8A414] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-gold"
          >
            Explore Formats
          </a>
        </div>
      </div>
      <div className="container-site mt-4 lg:mt-14">
        <div className="grid gap-0 overflow-hidden rounded-[28px] bg-navy text-white sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              ShieldCheck,
              "Doctor’s Consent",
              "The doctor agrees before we start",
            ],
            [Globe2, "Any Language", "English, Hindi or a regional language"],
            [Camera, "One Photo", "We need just one photo"],
            [VideoOff, "No Shoot", "The doctor never faces a camera"],
          ].map(([Icon, title, sub], i) => (
            <div
              key={title}
              className={
                "flex items-center gap-3 px-5 py-4 sm:px-6 " +
                (i ? "border-t border-white/15 sm:border-t-0 lg:border-l" : "")
              }
            >
              <div className="feature-ico">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-extrabold">{title}</h3>
                <p className="mt-1 text-xs leading-snug text-white/75">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function ProductSection({ openVideo }) {
  return (
    <section id="products" className="py-20 sm:py-24 mt-[-60px]">
      <div className="container-site">
        <Heading
          center
          eyebrow="Three Ways to Engage"
          lead="Choose a format that fits your campaign — from short educational videos to interactive experiences and expert conversations."
        >
          The DocTalk <span className="text-gold">Family</span>
        </Heading>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {products.map((p, i) => (
            <article
              key={p.id}
              id={p.id}
              className={
                "surface scroll-mt-28 overflow-hidden transition hover:-translate-y-1 hover:shadow-lift " +
                (i === 1 ? "border-2 border-gold" : "")
              }
            >
              <div className="relative p-3 pb-0">
                <span className="absolute left-3 top-3 z-10 rounded-br-[22px] rounded-tl-[16px] bg-navy px-4 py-2 text-2xl font-black text-gold">
                  {p.number}
                </span>
                {/* <video
                  className="aspect-[1.7] w-full rounded-[20px] object-cover"
                  src={p.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                /> */}
                <img
                  className="aspect-[1.7] w-full rounded-[20px] object-cover"
                  src={p.image}
                  alt={p.name}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-[23px] font-black tracking-tight">
                    {p.name}
                  </h3>
                  {/* <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    className="h-8 w-8 object-contain"
                  /> */}
                </div>
                <p className="mt-1 text-sm font-bold text-amber">{p.tagline}</p>
                <p className="mt-4 min-h-[79px] text-[15px] font-semibold leading-relaxed">
                  {p.description}
                </p>
                <div className="mt-4 flex gap-2 border-t border-[#E7EAF1] pt-4 text-sm leading-relaxed text-muted">
                  <Check size={17} className="mt-0.5 shrink-0 text-amber" />
                  <span>
                    <b>Ideal for:</b> {p.use}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Sharing() {
  const channels = [
    [Monitor, "Waiting-room TV"],
    [QrCode, "Clinic QR poster"],
    [MessageCircle, "WhatsApp"],
    [Share2, "Social media"],
    [Mail, "Email"],
    [Printer, "Printed leaflets"],
  ];
  return (
    <section className="bg-pale py-3 sm:py-3 mt-[-75px]">
      <div className="container-site grid w-full grid-cols-1 items-stretch gap-6">
        <div className="rounded-[32px] bg-navy p-8 text-white sm:p-10">
          <div className="eyebrow">Sharing</div>
          <h2 className="mt-5 text-[33px] font-black leading-tight tracking-tight sm:text-[41px]">
            Where do patients <span className="text-gold">watch it?</span>
          </h2>
          <p className="mt-4 max-w-md text-white/75">
            Each participating doctor can receive a unique link and QR code,
            making videos easy to share across touchpoints.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-x-3 gap-y-8">
            {channels.map(([Icon, name]) => (
              <div key={name} className="text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-gold bg-white text-navy sm:h-16 sm:w-16">
                  <Icon size={24} />
                </span>
                <p className="mt-3 text-xs font-semibold leading-snug sm:text-sm">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="surface flex flex-col justify-center p-8 sm:p-10">
          <div className="eyebrow">What You Get</div>
          <h2 className="mt-5 text-[33px] font-black tracking-tight sm:text-[41px]">
            Something for <span className="text-gold">everyone.</span>
          </h2>
          <div className="mt-8 space-y-6">
            {[
              [
                UserRound,
                "The Doctor",
                "An educational video, a clinic poster, and engagement reporting.",
              ],
              [
                Smartphone,
                "The Medical Rep",
                "A mobile-friendly workflow for adding doctors and sharing consent requests.",
              ],
              [
                ChartNoAxesColumnIncreasing,
                "The Brand Team",
                "A dashboard for monitoring scans, views and completed experiences.",
              ],
            ].map(([Icon, title, body]) => (
              <div
                key={title}
                className="flex gap-4 border-b border-[#E4E9F1] pb-6 last:border-0 last:pb-0"
              >
                <span className="feature-ico bg-navy">
                  <Icon size={24} />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wide text-amber">
                    {title}
                  </h3>
                  <p className="mt-1 font-semibold leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
function Workflow() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-4 sm:py-4">
      <div className="container-site">
        <Heading eyebrow="How It Works">
          From Photo <span className="text-gold">to Video</span>
        </Heading>
        <div className="mt-7 grid gap-4 lg:grid-cols-[1.05fr_.95fr]">
          <div className="surface flex items-center justify-around gap-3 p-5 sm:p-7">
            <div className="min-w-0 flex-1">
              <img
                src={asset + "doctor.png"}
                alt="Sample doctor photo"
                className="h-[7rem] w-[84%] rounded-[18px] border-2 border-gold object-cover object-top sm:h-52"
              />
              <p className="mx-auto mt-2 w-fit rounded-full bg-navy px-4 py-1 text-center text-xs font-bold text-white">
                1 Photo
              </p>
            </div>
            <ArrowRight size={28} className="shrink-0 text-gold" />
            <div className="min-w-0 flex-[1.4]">
              <img
                src={asset + "doctor_video.png"}
                alt="AI-assisted educational video example"
                className="h-[6.9rem] w-[96%] rounded-[18px] border-2 border-gold object-cover sm:h-52"
              />
              <p className="mx-auto mt-2 w-fit rounded-full bg-gold px-4 py-1 text-center text-xs font-bold text-navy">
                Lifelike Video
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5 rounded-[28px] bg-pale p-6 sm:p-8">
            {[
              ["1", "Share the doctor’s photo and approved script."],
              ["2", "The doctor reviews and provides consent online."],
              ["3", "The video is produced and checked before delivery."],
            ].map(([n, v]) => (
              <div key={n} className="flex items-start gap-4">
                <span className="number">{n}</span>
                <p className=" text-base font-bold leading-[1.3]">
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Consent() {
  return (
    <section id="consent" className="bg-navy py-4 text-white sm:py-4">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="eyebrow">Doctor Consent</div>
          <h2 className="mt-5 text-[37px] font-black leading-[1.12] tracking-tight sm:text-[48px]">
            The doctor says <span className="text-gold">yes first.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-white/75">
            Doctor participation is voluntary. Consent is obtained before using
            a doctor's image to create an AI-assisted video.
          </p>
          {/* <p className="mt-4 text-sm text-white/60">
            Consent records and usage permissions should be reviewed against
            your organization's policies and applicable requirements.
          </p> */}
        </div>
        <div className="rounded-[27px] border border-[#D8EEDF] bg-white p-6 text-navy shadow-[0_12px_35px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-5 grid h-24 w-24 place-items-center rounded-full bg-[#159B59] text-white shadow-[0_8px_22px_rgba(21,155,89,0.22)] sm:h-28 sm:w-28">
              <Check size={58} strokeWidth={4} />
              <span className="absolute -right-3 top-1 h-2 w-2 rounded-full bg-[#F3B43F]" />
              <span className="absolute -left-4 top-8 h-2 w-2 rounded-full bg-[#36B978]" />
              <span className="absolute -right-2 bottom-2 h-2 w-2 rounded-full bg-[#F3B43F]" />
              <span className="absolute -left-2 -bottom-1 h-1.5 w-1.5 rounded-full bg-[#36B978]" />
            </div>
            <h3 className="text-2xl font-black leading-tight text-[#10275B] sm:text-[27px]">
              Consent Confirmed Successfully!
            </h3>
            <p className="mt-3 text-lg font-semibold text-[#18366F]">
              Thank you, Dr. Ananya Sharma.
            </p>
          </div>

          <div className="mt-6 space-y-4 rounded-xl border border-[#D5EEDF] bg-[#F2FAF5] p-5 sm:p-6">
            {[
              "Your consent has been confirmed.",
              "You will now receive activity updates and reports.",
              "Thank you for being a part of the DocTalk activity.",
            ].map((message) => (
              <div key={message} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#218F54] text-white">
                  <Check size={15} strokeWidth={3} />
                </span>
                <p className="text-sm font-semibold leading-relaxed text-[#26344D] sm:text-base">
                  {message}
                </p>
              </div>
            ))}
          </div>

          {/* <a
            href="#top"
            className="mt-7 flex min-h-[58px] items-center justify-center rounded-xl border-2 border-[#8BAEF8] bg-white px-5 text-lg font-bold text-[#1755C7] transition hover:bg-[#F4F7FF] focus:outline-none focus:ring-4 focus:ring-[#8BAEF8]/25"
          >
            Go to Dashboard
          </a> */}
        </div>
      </div>
    </section>
  );
}
function LeadForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "All three formats",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  useEffect(() => {
    let p = sessionStorage.getItem("doctalk-product");
    if (p) setValues((v) => ({ ...v, product: p }));
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const base = (
        import.meta.env.VITE_API_URL || "http://localhost:5000"
      ).replace(/\/$/, "");
      const res = await fetch(base + "/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Unable to submit.");
      setStatus("success");
      setValues({
        name: "",
        email: "",
        phone: "",
        company: "",
        product: "All three formats",
        message: "",
        website: "",
      });
    } catch (err) {
      setStatus("error");
      setError(err.message || "Connection issue. Please try again.");
    }
  };
  return (
    <section id="demo" className="scroll-mt-24 bg-[#F4F6FB] py-4 sm:py-4">
      <div className="container-site grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
        <div className="flex flex-col justify-center">
          <div className="eyebrow">Let’s Talk</div>
          <h2 className="mt-5 text-[39px] font-black leading-[1.12] tracking-tight sm:text-[53px]">
            Ready to see it <span className="text-gold">in action?</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
            Tell us about your brand or campaign. We’ll help you explore the
            DocTalk format that fits your communication needs.
          </p>
        </div>
        <div className="surface p-6 sm:p-9">
          <h3 className="text-2xl font-black">Request Demo</h3>
          <p className="mt-2 text-sm text-muted">
            Fields marked * are required.
          </p>
          {status === "success" ? (
            <div
              role="status"
              className="mt-7 rounded-2xl border border-[#C0E4CB] bg-[#EFFAF3] p-6"
            >
              <Check size={28} className="text-[#218349]" />
              <p className="mt-3 font-bold">
                Thank you. Your enquiry has been received.
              </p>
              <button
                className="mt-4 font-bold text-amber underline"
                onClick={() => setStatus("idle")}
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={submit}>
              <input
                className="hidden"
                aria-hidden="true"
                tabIndex="-1"
                autoComplete="off"
                value={values.website}
                onChange={(e) =>
                  setValues((v) => ({ ...v, website: e.target.value }))
                }
              />
              {[
                ["name", "Full name *", "text"],
                ["email", "Work email *", "email"],
                ["phone", "Phone number", "tel"],
                ["company", "Company / Brand *", "text"],
              ].map(([key, label, type]) => (
                <label key={key} className="block text-sm font-bold">
                  {label}
                  <input
                    className="field mt-2"
                    type={type}
                    required={["name", "email", "company"].includes(key)}
                    maxLength={key === "email" ? 254 : 120}
                    value={values[key]}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [key]: e.target.value }))
                    }
                  />
                </label>
              ))}
              <label className="text-sm font-bold sm:col-span-2">
                Interested in
                <select
                  className="field mt-2"
                  value={values.product}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, product: e.target.value }))
                  }
                >
                  {[
                    "All three formats",
                    "DocTalk",
                    "DocTalk Quiz",
                    "DocTalk Show",
                  ].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-bold sm:col-span-2">
                Your requirement
                <textarea
                  className="field mt-2 min-h-[100px]"
                  maxLength="2000"
                  placeholder="Tell us about your campaign (optional)"
                  value={values.message}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, message: e.target.value }))
                  }
                />
              </label>
              {status === "error" && (
                <p
                  role="alert"
                  className="text-sm font-semibold text-red-700 sm:col-span-2"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary sm:col-span-2 disabled:opacity-60"
              >
                {status === "sending" ? "Submitting..." : "Send Demo Request"}
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
function PreviewModal({ product, onClose }) {
  useEffect(() => {
    if (!product) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = old;
    };
  }, [product, onClose]);
  if (!product) return null;
  return (
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 grid place-items-center bg-deep/85 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={product.name + " sample preview"}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-[24px] bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-5 px-5 py-4">
          <h2 className="text-xl font-black">{product.name} · Video Sample</h2>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close preview"
            className="rounded-full p-2 hover:bg-pale"
          >
            <X size={22} />
          </button>
        </div>
        {product.video ? (
          <video
            className="aspect-video w-full bg-black"
            src={product.video}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <div className="relative">
            <img
              className="aspect-video w-full object-cover"
              src={product.image}
              alt={product.name + " sample still"}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-navy/45">
              <div className="max-w-md rounded-xl bg-white/95 p-5 text-center shadow-lg">
                <VideoOff className="mx-auto text-amber" size={27} />
                <h3 className="mt-2 font-black">
                  Sample video not yet connected
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  The original screenshots contain still previews. Add your
                  licensed MP4 URL in <code>client/src/content.js</code> to
                  enable playback.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <p className="text-sm text-muted">{product.tagline}</p>
          <a href="#demo" onClick={onClose} className="font-bold text-amber">
            Request this demo <ArrowRight className="inline" size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
function Disclaimer() {
  return (
    <section aria-labelledby="disclaimer-title" className="bg-[#E9EAF0] py-8 sm:py-10">
      <div className="container-site">
        <div className="flex items-start gap-4 rounded-[24px] bg-[#142957] px-5 py-6 text-white sm:gap-5 sm:px-7 sm:py-8 md:rounded-[28px]">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[#E8A414]"
            size={30}
          />
          <div className="min-w-0">
            <h2 id="disclaimer-title" className="text-sm font-extrabold tracking-[0.12em]">
              DISCLAIMER
            </h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-white/90 sm:text-base sm:leading-7">
              The doctors, names, clinics and people shown here are AI-generated for illustration. Any figures shown are sample data. The health content in the samples is not medically verified and is not medical advice. Please consult a qualified doctor for any health concern. This website is an advertisement for digiLATERAL’s DocTalk services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1B3D] py-8 text-white">
      <div className="container-site flex flex-col items-center gap-6 text-center">
        <div className="text-sm font-medium text-white/75">
          DocTalk · DocTalk Quiz · DocTalk Show
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-semibold"
        >
          <a className="transition hover:text-[#E8A414]" href="#products">
            Products
          </a>
          <a
            className="transition hover:text-[#E8A414]"
            href="#how-it-works"
          >
            How it Works
          </a>
          <a className="transition hover:text-[#E8A414]" href="#demo">
            Request Demo
          </a>
          <a
            className="transition hover:text-[#E8A414]"
            href="https://digilateral.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </nav>

        <div className="text-sm text-white/60">
          © {year} DocTalk. A digiLATERAL offering.
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [preview, setPreview] = useState(null);
  return (
    <>
      <Header />
      <main>
        <Hero openVideo={setPreview} />
        <ProductSection openVideo={setPreview} />
        <Sharing />
        <Workflow />
        <Consent />
        <LeadForm />
      </main>
      <Disclaimer />
      <Footer />
      <PreviewModal product={preview} onClose={() => setPreview(null)} />
    </>
  );
}
