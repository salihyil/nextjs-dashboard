/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { InView, useInView } from 'react-intersection-observer';

const sections: Array<keyof MenuWidths> = [
  'Issues',
  'Cycles',
  'Roadmaps',
  'Workflows',
];

type MenuWidths = {
  Issues: { open: string; closed: string };
  Cycles: { open: string; closed: string };
  Roadmaps: { open: string; closed: string };
  Workflows: { open: string; closed: string };
};

const menuWidths: MenuWidths = {
  Issues: {
    open: '124px',
    closed: '65px',
  },
  Cycles: {
    open: '128px',
    closed: '65px',
  },
  Roadmaps: {
    open: '178px',
    closed: '94px',
  },
  Workflows: {
    open: '176px',
    closed: '92px',
  },
};

function LandingPage() {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const [visibleSection, setVisibleSection] = useState(sections[0]);

  const setInView = (inView: any, entry: any) => {
    if (inView) {
      console.log(entry);
      setVisibleSection(entry.target.getAttribute('id'));
    }
  };

  return (
    <div className="container flex flex-col bg-gray-950 pb-12">
      <header className="border-t-[rgba(255,255,255,0.10;border-right:0px)_solid_rgba(255,255,255,0.10;] border-l-[0px)] border-l-[rgba(255,255,255,0.10;] border-t-[0px)] sticky top-0 z-30 flex h-12 w-[100%] items-center justify-center scroll-smooth border-b border-solid border-b-[rgba(255,255,255,0.10);] px-60 backdrop-blur-[30px] max-md:max-w-full max-md:px-5">
        <div className="flex items-center gap-0 max-md:max-w-full max-md:flex-wrap">
          <span className="my-auto flex items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b523ea246df006b256ac3b17a1412ca552cc8d59abf527fa71f205b8d3eabc8?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="my-auto aspect-[4] w-[72px] max-w-full shrink-0 self-center overflow-hidden object-contain object-center"
              alt=""
            />
            <span className="flex items-stretch justify-between gap-0.5 self-stretch">
              <Link
                href="#"
                className="grow whitespace-nowrap text-sm font-semibold leading-6 text-white"
              >
                Features
              </Link>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ae9c14df945b40f7753fc5da87d24731981a59935230f28f03594f20464c75b?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
                className="my-auto aspect-square w-3.5 max-w-full shrink-0 self-center overflow-hidden object-contain object-center"
                alt=""
              />
            </span>
            <div className="self-stretch text-sm font-semibold leading-6 text-white">
              Method
            </div>
            <div className="self-stretch text-sm font-semibold leading-6 text-white">
              Customers
            </div>
            <div className="self-stretch text-sm font-semibold leading-6 text-white">
              Changelog
            </div>
            <div className="self-stretch text-sm font-semibold leading-6 text-white">
              Pricing
            </div>
            <span className="flex items-stretch justify-between gap-0.5 self-stretch">
              <Link
                href="#"
                className="grow whitespace-nowrap text-sm font-semibold leading-6 text-white"
              >
                Company
              </Link>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ae9c14df945b40f7753fc5da87d24731981a59935230f28f03594f20464c75b?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
                className="my-auto aspect-square w-3.5 max-w-full shrink-0 self-center overflow-hidden object-contain object-center"
                alt=""
              />
            </span>
            <div className="grow self-stretch whitespace-nowrap text-sm font-semibold leading-6 text-white">
              Contact
            </div>
          </span>
          <span className="flex items-center justify-between gap-5 self-stretch pl-20 max-md:max-w-full max-md:flex-wrap max-md:pl-5">
            <div className="my-auto grow whitespace-nowrap text-sm font-semibold leading-6 text-white">
              Login
            </div>
            <button className="aspect-[2.21875] items-stretch justify-center self-stretch whitespace-nowrap rounded-3xl bg-indigo-500 px-2.5 text-sm font-medium leading-8 text-white">
              Sign up
            </button>
          </span>
        </div>
      </header>
      <nav
        className={`duration-[320ms] sticky left-0 right-0 top-12 z-20 flex list-none bg-white/5 px-60 text-white transition-all ${
          inView
            ? 'translate-y-0 opacity-100 backdrop-blur-[12px]'
            : 'translate-y-[-100%] opacity-0 backdrop-blur-none'
        }`}
      >
        <div className="flex h-12 items-center justify-center gap-4 text-sm">
          {sections.map((section) => (
            <div
              key={section}
              className={`flex overflow-hidden rounded-full border border-white/5 bg-white/5 px-3 py-0.5 backdrop-blur-none transition-all duration-300`}
              style={{
                width:
                  visibleSection === section
                    ? menuWidths[section].open
                    : menuWidths[section].closed,
              }}
            >
              <span
                className={`-ml-2 mr-2 px-2 ${
                  visibleSection === section
                    ? `rounded-full border-indigo-50 bg-indigo-500/70`
                    : ``
                }`}
              >
                {section}
              </span>
              <span>{section}</span>
            </div>
          ))}
        </div>
      </nav>
      <div className="flex w-[1260px] max-w-full flex-col items-center self-center px-16 pt-12 max-md:px-5">
        <div className="mt-16 flex w-[822px] max-w-full flex-col">
          <div className="animate-slidein flex items-stretch justify-center gap-1 self-center rounded-3xl border border-solid border-white border-opacity-10 bg-white bg-opacity-10 px-2.5 opacity-0 backdrop-blur-[6px] [--slidein-delay:300ms]">
            <div className="grow whitespace-nowrap text-sm font-medium leading-7 text-stone-50">
              Introducing Linear Asks
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1fc2c7947a597ca073fab420e3a014f375e35ceb9709896e0b7952bdcf7eb16?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="my-auto aspect-square w-4 max-w-full shrink-0 self-center overflow-hidden object-contain object-center"
              alt=""
            />
          </div>
          <h1 className="animate-slidein mt-4 self-stretch text-center text-7xl font-medium leading-[80px] text-white opacity-0 [--slidein-delay:300ms] max-md:max-w-full max-md:text-4xl max-md:leading-10">
            Linear is a better way <br /> to build products
          </h1>
          <p className="animate-slidein mt-7 max-w-[612px] self-center text-center text-2xl leading-7 text-slate-300 opacity-0 [--slidein-delay:500ms] max-md:max-w-full">
            Meet the new standard for modern software development. <br />{' '}
            Streamline issues, sprints, and product roadmaps.
          </p>
          <div className="animate-slidein mt-12 flex items-stretch justify-center gap-0.5 self-center rounded-3xl bg-indigo-500 py-2.5 pl-5 pr-3 opacity-0 [--slidein-delay:700ms] max-md:mt-10">
            <div className="grow whitespace-nowrap text-base font-medium leading-8 text-white">
              Get started
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb4b6ebd2492ccf447648fd994e00d5c552deb38e4b1d3359193e8de49adbe74?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="my-auto aspect-square w-[18px] max-w-full shrink-0 self-center overflow-hidden object-contain object-center"
              alt=""
            />
          </div>
        </div>
      </div>
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
        className="mt-32 aspect-[1.76] w-[1200px] max-w-full self-center overflow-hidden object-contain object-center max-md:mt-10"
        alt=""
      />
      <div className="mb-60 mt-64 flex w-[1260px] max-w-full flex-col items-center self-center px-8 max-md:my-10 max-md:px-5">
        <div className="max-w-[528px] justify-center text-center text-2xl leading-7 text-stone-50 max-md:max-w-full">
          Powering the world’s best product teams. <br />{' '}
          <span className="text-stone-50">
            From next-gen startups to established enterprises.
          </span>
        </div>
        <div className="mt-14 flex flex-wrap content-start items-start justify-between gap-5 self-stretch pr-5 max-md:mt-10 max-md:max-w-full">
          <div className="mt-3.5 flex grow basis-[0%] flex-col items-center self-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1bacbf83ffedb4e26d2ba5abad38780b06ba4dd47203c22ef1c1e985f36063c?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[3.88] w-[93px] max-w-full overflow-hidden fill-stone-50 object-contain object-center"
              alt=""
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f64a28dbead741430b6d9ed67f6edb30d1d1aaf6d3920df160870af54a9c6a5?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="mt-11 aspect-[3.2] w-40 overflow-hidden object-contain object-center max-md:mt-10"
              alt=""
            />
          </div>
          <div className="mt-3.5 flex grow basis-[0%] flex-col items-center self-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7763731d1ccf9780ff2e99a0f5c45b21eefcd34aae241020f7e2b96a2063d60c?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[2.63] w-[63px] max-w-full overflow-hidden fill-stone-50 object-contain object-center"
              alt=""
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/19e7ab4376e23017b1751f394c15ae860bd9d1781fe97cae40a2ccf23d05ae9a?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="mt-11 aspect-[3.2] w-40 overflow-hidden object-contain object-center max-md:mt-10"
              alt=""
            />
          </div>
          <div className="flex grow basis-[0%] flex-col items-center self-stretch">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6ef456f2a883f8737f4a102d428672eb1801bbe3df929bebb249a05c6679ac8?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[3.33] w-40 overflow-hidden object-contain object-center"
              alt=""
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/62c82ef8c553f237bcb127aa272b5d1192c7e66f963eb4ae1ba759cc66473f32?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="mt-8 aspect-[3.2] w-40 overflow-hidden object-contain object-center"
              alt=""
            />
          </div>
          <div className="flex grow basis-[0%] flex-col items-center self-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/629e9a4eac75a2bb5391f94f7213a653125033f02c0bcedf1610d09325339df7?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[3.2] w-40 overflow-hidden object-contain object-center"
              alt=""
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e42ae2bfe4cbc948937db9ae7c3aebc0d845796dfd5a9c6165d27533e2c5a08c?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="mt-11 aspect-[3.2] w-20 max-w-full overflow-hidden fill-stone-50 object-contain object-center max-md:mt-10"
              alt=""
            />
          </div>
          <div className="mt-3 flex grow basis-[0%] flex-col items-center self-start">
            <div className="flex items-stretch gap-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8bfa3cd2f0f5b3fe546af866188f742d995798d454fa5f037c8ff923b630fd5?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
                className="aspect-square w-[25px] max-w-full shrink-0 overflow-hidden fill-stone-50 object-contain object-center"
                alt=""
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1636a976790c509e676f0fccdd49d0c3a3c0f7feb0e66d209ca07af0dfdebd8?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
                className="my-auto aspect-[4.88] w-[78px] max-w-full shrink-0 self-center overflow-hidden fill-stone-50 object-contain object-center"
                alt=""
              />
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d513ca4856e226eeae86f880971f3c32c8e8e9ed4e8b32001ff8e237323d8fb?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="mt-11 aspect-[3.2] w-40 overflow-hidden object-contain object-center max-md:mt-10"
              alt=""
            />
          </div>
          <div className="mt-2 flex grow basis-[0%] flex-col items-center self-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/150e5e25a17c9cc8b196f672a7ab454d836a9576ffb698fb0106a258531d378e?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[1.19] w-[43px] max-w-full overflow-hidden fill-stone-50 object-contain object-center"
              alt=""
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a43e27b081fc898156f904c26370f7635bc89a6d7305e2097b401e2da3d1af6?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="mt-10 aspect-[3.2] w-40 overflow-hidden object-contain object-center"
              alt=""
            />
          </div>
        </div>
      </div>
      <div id="section-wrapper" ref={ref}>
        {sections.map((section) => (
          <InView onChange={setInView} threshold={0.8} key={section}>
            {({ ref, inView }) => {
              return (
                <div
                  id={section}
                  ref={ref}
                  className={`item flex items-center justify-center py-[300px] text-5xl text-white ${inView ? 'fade-in' : ''}`}
                >
                  {section}
                </div>
              );
            }}
          </InView>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
