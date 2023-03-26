import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../button';
import { AuthStatus } from '@/src/hooks/useAuth';
import { User } from '@/src/generated/generated';
import { BiMenuAltRight as MenuIcon } from 'react-icons/bi';
import { AiOutlineClose as XIcon } from 'react-icons/ai';
import { Transition } from '@headlessui/react';
import ProfileMenu from './profileMenu';
import { titleFont } from '@/src/utils/fonts';
import TextAnimation from '../animation/text';
import CharacterAnimation from '../animation/character';

const Navbar: FC<{
  status: AuthStatus;
  user: User | undefined | null;
}> = ({ status, user }) => {
  const links = [
    { label: 'Home', url: '/' },
    { label: 'Pronites', url: '/pronites' },
    { label: 'Events', url: '/events' },
    { label: 'Gallery', url: '/gallery' },
    { label: 'About', url: '/about' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 z-20 w-full bg-white border-b border-gray-200 backdrop-filter backdrop-blur-lg bg-opacity-10">
      <div className="max-w-5xl px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              className="p-1 bg-white rounded-full bg-opacity-30 backdrop-filter backdrop-blur-lg"
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              priority
            />
            <span
              className={`${titleFont.className} text-gray-800 font-bold block lg:hidden`}
            >
              Incridea&apos;23
            </span>
          </Link>

          <div className="hidden space-x-6 text-gray-900 lg:flex">
            {links.map((link) => (
              <Link
                className="transition-colors duration-300 hover:text-primary-500"
                key={link.url}
                href={link.url}
              >
                <CharacterAnimation
                  text={link.label}
                  textStyle="text-lg font-medium"
                />
              </Link>
            ))}
          </div>

          <AuthButtons
            className="hidden lg:flex"
            status={status}
            user={user!}
          />
          <div className="flex items-center space-x-4 lg:hidden">
            {isMenuOpen ? (
              <XIcon className="w-6 h-6 text-gray-900" onClick={toggleMenu} />
            ) : (
              <MenuIcon
                className="w-6 h-6 text-gray-900"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>

        <Transition
          show={isMenuOpen}
          enter="transition-all ease-in-out duration-500 delay-[200ms]"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="lg:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="block px-4 py-2 text-sm hover:bg-primary-100"
            >
              {link.label}
            </Link>
          ))}
          <AuthButtons className="mb-2" status={status} user={user!} />
        </Transition>
      </div>
    </nav>
  );
};

const AuthButtons: FC<{
  status: AuthStatus;
  user: User;
  className?: string;
}> = ({ status, user, className }) => {
  return (
    <div className={`flex space-x-2 px-3 lg:px-0 ${className}`}>
      {status === 'authenticated' && (
        <ProfileMenu user={user} status={status} />
      )}
      {status === 'unauthenticated' && (
        <>
          <Link href="/auth/login">
            <Button intent={'ghost'}>Login</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Sign up</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
