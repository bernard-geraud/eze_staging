'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';
import { useState } from 'react';

// import AnimateClick from '../../animate-click/AnimateClick';
import LocaleIcon from '../../../../../../public/icons/global.svg';
import DownIcon from '../../../../../../public/icons/downIcon.svg';
import Image from 'next/image';
// import { useClickOutside } from '@/app/hooks/useClickOutside';

export default function LocaleSwitcher() {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathName = usePathname();
  let arrayOfLinks = pathName?.split('/');
  let selectedLang = arrayOfLinks && arrayOfLinks[1];
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  // let domNode = useClickOutside(() => {
  //   setToggle(false);
  // });

  return (
    <div  className="w-full mt-2">
      <>
        <div
          className="flex items-center space-x-2 justify-center"
          onClick={() => setToggle((prev) => !prev)}
        >
          <Image src={LocaleIcon} alt="Locale icon" className="w-5" />
          <h1 className="font-bold flex items-center justify-center pt-1">
            {selectedLang?.toUpperCase()}
          </h1>
          <Image src={DownIcon} alt="Arrow down icon" className="w-4" />
        </div>
      </>
      {toggle && (
        <ul className="flex absolute top-12 space-y-2 bg-white shadow-xl flex-col  p-4 rounded-lg  justify-between   w-auto">
          {/* {pathName?.split('/')[1] === 'en' && }
          <Link
            href={redirectedPathName(locale)}
            className="text-slate-900"
          ></Link> */}

          {i18n.locales.map((locale , index) => (
            <>
              {locale === 'en' ? (
                <div key={index}
                  onClick={() => setToggle(false)}
                  className="flex items-center hover:text-primaryColor w-full"
                >
                  <div
                    className={`${
                      pathName?.split('/')[1] === 'en'
                        ? ' font-bold  hidden'
                        : 'flex'
                    }`}
                  >
                    <span>
                      <a href={redirectedPathName(locale)}>EN</a>
                    </span>
                  </div>
                </div>
              ) : (
                <div
                
                  onClick={() => setToggle(false)}
                  className="flex w-full hover:text-primaryColor"
                >
                  <div
                    className={`${
                      pathName?.split('/')[1] === 'fr'
                        ? ' font-bold hidden'
                        : 'flex  '
                    }`}
                  >
                    <span>
                      <a href={redirectedPathName(locale)}>FR</a>
                    </span>
                  </div>
                </div>
              )}
            </>
          ))}
        </ul>
      )}
    </div>
  );
}


