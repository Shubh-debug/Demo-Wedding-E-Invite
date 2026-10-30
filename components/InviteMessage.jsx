"use client";

import Reveal from "./Reveal";
import { Flourish, LotusMark } from "./ornaments/Motifs";

export default function InviteMessage() {
  return (
    <section
      className="section relative py-10 sm:py-20"
      id="message"
      aria-labelledby="message-heading"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <Reveal>
          <article className="paper gold-frame relative flex w-full flex-col overflow-hidden rounded-xl px-4 py-8 text-center shadow-[0_16px_40px_rgba(0,0,0,0.65)] sm:px-12 sm:py-12">
            
            {/* Top Sacred Motif */}
            <LotusMark className="mx-auto w-10 text-gold drop-shadow-[0_2px_4px_rgba(197,160,89,0.3)] sm:w-12" />

            {/* Headline */}
            <h2
              id="message-heading"
              className="mx-auto mt-4 w-full text-center font-normal tracking-wide text-[#121D38]"
              style={{
                fontFamily: "'Yatra One', 'Rozha One', serif",
                fontSize: "clamp(15px, 3.5vw, 21px)",
                lineHeight: "1.75",
                textWrap: "balance",
              }}
            >
              <span className="inline-block">
                मंगल परिणयोत्सव की मांगलिक बेला पर सपरिवार पधार कर
              </span>
              <br />
              <span className="mt-0.5 inline-block">
                वर-वधू को स्नेहाशीर्वाद प्रदान कर हमें अनुगृहीत करें।
              </span>
            </h2>

            {/* Proportional Flourish Divider */}
            <Flourish className="mx-auto my-5 w-36 text-gold/85 sm:w-52" />

            {/* Three Balanced Family Wings */}
            <div className="relative mt-2 grid w-full grid-cols-1 items-start gap-7 text-center sm:grid-cols-3 sm:gap-4">
              
              {/* Column 1: स्वागतोत्सुक */}
              <div className="flex flex-col items-center">
                <h3 className="font-serif text-sm font-bold tracking-widest text-[#8C6D37] sm:text-base">
                  ✦ स्वागतोत्सुक ✦
                </h3>
                <div className="mt-2.5 space-y-1 font-serif text-[13px] font-semibold leading-relaxed tracking-wide text-[#121D38] sm:text-[13.5px]">
                  <p>Ajayshree - Manoj Gulgulia</p>
                  <p>Kiran - Sunil Gulgulia</p>
                  <p>Chitra - Rahul Parakh</p>
                </div>
              </div>

              {/* Column 2: ननिहाल पक्ष */}
              <div className="flex flex-col items-center">
                <h3 className="font-serif text-sm font-bold tracking-widest text-[#8C6D37] sm:text-base">
                  ✦ ननिहाल पक्ष ✦
                </h3>
                <div className="mt-2.5 space-y-1 font-serif text-[13px] font-semibold leading-relaxed tracking-wide text-[#121D38] sm:text-[13.5px]">
                  <p>Nanuram Ji Indrachand Ji</p>
                  <p>Lalwanhi</p>
                  <p className="text-xs font-normal text-[#8C6D37]/90 italic">
                    Baikunthpur (Chattisgarh)
                  </p>
                </div>
              </div>

              {/* Column 3: विनीत */}
              <div className="flex flex-col items-center">
                <h3 className="font-serif text-sm font-bold tracking-widest text-[#8C6D37] sm:text-base">
                  ✦ विनीत ✦
                </h3>
                <div className="mt-2.5 space-y-1 font-serif text-[13px] font-semibold leading-relaxed tracking-wide text-[#121D38] sm:text-[13.5px]">
                  <p>Dungar mal, Surendra, Kamal,</p>
                  <p>Hitesh Minny</p>
                  <p className="text-xs font-medium text-[#8C6D37]">
                    Evam Samasth Minny Parivaar
                  </p>
                </div>
              </div>

            </div>

            {/* ── Children's Bal Aagrah (Refined Calligraphy & Layout) ── */}
            <div className="mx-auto my-6 w-full max-w-lg border-t border-[#C5A059]/35 pt-5 text-center">
              <p
                className="text-[14px] leading-relaxed tracking-wide text-[#8C6D37] sm:text-[15.5px]"
                style={{
                  fontFamily: "'Yatra One', 'Rozha One', serif",
                }}
              >
                हमारे चाचा / मामा की शादी मस्ती बेहिसाब,
                <br className="sm:hidden" />
                {" "}आप आयेंगे तभी तो बनेंगे लाजवाब
              </p>
              
              <p className="mt-2 font-serif text-xs font-semibold tracking-wider text-[#121D38] sm:text-[13px]">
                Vidit, Mudit, Taniska, Hardik, Parnit, Garv
              </p>
            </div>

            {/* ── Gilded Contact Strip ── */}
            <div className="mt-2 border-t border-[#C5A059]/30 pt-5 text-center">
              <span className="font-serif text-[10px] font-bold uppercase tracking-[0.25em] text-[#8C6D37] sm:text-[11px]">
                CONTACT US
              </span>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs font-serif sm:gap-5">
                <a
                  href="tel:+918420028988"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A059]/50 bg-[#FBF7EE] px-3.5 py-1.5 text-[12px] font-semibold text-[#121D38] shadow-xs transition-all hover:border-[#C5A059] hover:bg-[#F7F0E3]"
                >
                  <span className="text-[#8C6D37]">📞</span>
                  <span>+91 84200 28988</span>
                </a>

                <a
                  href="tel:+919916887474"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A059]/50 bg-[#FBF7EE] px-3.5 py-1.5 text-[12px] font-semibold text-[#121D38] shadow-xs transition-all hover:border-[#C5A059] hover:bg-[#F7F0E3]"
                >
                  <span className="text-[#8C6D37]">📞</span>
                  <span>+91 98318 30402</span>
                </a>
              </div>
            </div>

          </article>
        </Reveal>
      </div>
    </section>
  );
}