'use client';
import style from './topbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect } from 'react';
import AnimationComponent from '@/components/Animations/AnimatePresenceComponent';
import { AnimatePresence, motion } from 'framer-motion';

type LinkType = {
	href: string;
	label: string;
};

type PillDimensions = {
	width: number;
	position: number;
};

type LinkRefs = {
	[key: string]: HTMLLIElement | null;
};

export default function TopBar() {
	const links = useMemo(
		() => [
			{ href: '/home/home', label: 'Home' },
			{ href: '/home/bot-management', label: 'Bot Management' },
			{ href: '/home/settings', label: 'Settings' },
		],
		[]
	);

	const pathname = usePathname();
	const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
	const [pillDimensions, setPillDimensions] = useState<PillDimensions>({ width: 0, position: 0 });
	const linkRefs = useRef<LinkRefs>({});
	const profileRef = useRef(null);

	// Determine the current link based on the pathname
	const currentLink: LinkType = useMemo(() => {
		return links.find((link) => pathname.includes(link.href)) || links[0];
	}, [links, pathname]);

	// useLayoutEffect is used to measure and update the pill's size and position
	// immediately after the DOM updates but before the browser has painted. This
	// helps prevent any visual discrepancies. It runs only once per relevant change,
	// because it depends on `currentLink`, which is memoized and changes less frequently.
	useLayoutEffect(() => {
		const el = linkRefs.current[currentLink.href];
		if (el) {
			const newWidth = el.offsetWidth;
			const newPosition = el.offsetLeft - (el.parentElement ? el.parentElement.offsetLeft : 0);
			setPillDimensions({ width: newWidth, position: newPosition });
		}
	}, [currentLink]);

	const toggleProfileDropdown = () => {
		setProfileDropdownOpen(!isProfileDropdownOpen);
	};

	const handleOutsideClick = (event) => {
		if (profileRef.current && !profileRef.current.contains(event.target)) {
			setProfileDropdownOpen(false);
		}
	};

	// This function is called when the profile icon is clicked
	const handleProfileClick = (event) => {
		// If the dropdown is not open, we set up a listener for outside clicks
		if (!isProfileDropdownOpen) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			// If the dropdown is open, we remove the listener
			document.removeEventListener('mousedown', handleOutsideClick);
		}

		toggleProfileDropdown();
	};

	return (
		<>
			<div className={style.topBar}>
				<div className="flex max-w-[100rem] justify-between items-center m-auto h-full">
					{/* Left Section: Title */}
					<div className="flex items-center">
						<h1 className={style.topbarShadow}>BAYVIEW</h1>
					</div>

					{/* Middle Section: Links */}
					<div className="flex flex-grow justify-center items-center text-base relative">
						<div className="items-start">
							<ul className="flex justify-center items-center gap-10 mt-[1.6rem]">
								{links.map((link) => (
									<li key={link.href} ref={(el) => (el ? (linkRefs.current[link.href] = el) : null)}>
										<Link href={link.href}>
											<h6 className={style.topbarShadow}>
												{link.label == currentLink.label ? (
													<span className="font-bold transition-all">{link.label}</span>
												) : (
													<span className="font-medium">{link.label}</span>
												)}
											</h6>
										</Link>
									</li>
								))}
							</ul>
							{/* Pill indicator below the links */}
							<motion.div
								className="relative h-1 mt-[1.4rem] rounded bg-red-500"
								initial={{ left: pillDimensions.position, width: pillDimensions.width, opacity: 0 }}
								animate={{
									left: pillDimensions.position,
									width: pillDimensions.width,
									opacity: 1,
									boxShadow: '0 0 4px 2px rgba(239, 68, 68, 0.2)',
								}}
								transition={{ type: 'spring', stiffness: 300, damping: 20 }}
							/>
						</div>
					</div>

					{/* Right Section: Profile */}
					<div className="flex items-center cursor-pointer relative" onClick={handleProfileClick} ref={profileRef}>
						<span className={`${style.topbarShadow} text-base mr-3`}>Username</span>
						<div className="flex-shrink-0">
							<div className="flex rounded-full w-9 h-9 bg-red-500 text-center justify-center items-center">
								<p className={`${style.topbarShadow} w-100 font-bold text-white`}>U</p>
							</div>
							{/* <Image src={null} width="100" height="50" alt="Profile Image" className="w-8 h-8 rounded-full" /> */}
						</div>

						{/* Dropdown */}
						<AnimatePresence>{isProfileDropdownOpen && <ProfileDropdown />}</AnimatePresence>
					</div>
				</div>
			</div>
		</>
	);
}

function ProfileDropdown() {
	const links = [{ href: '/auth/logout', label: 'Logout' }];

	return (
		<AnimationComponent>
			<div className="absolute top-full overflow-hidden right-0 mt-6 w-56 p-2 rounded-xl shadow-lg bg-white border dark:bg-zinc-700 dark:border-zinc-600">
				<ul className="w-full">
					{links.map((link) => (
						<li key={link.href}>
							<Link href={link.href}>
								<p className="px-4 py-2 w-full cursor-pointer font-medium hover:dark:bg-zinc-600 hover:bg-zinc-100 rounded-xl">
									{link.label}
								</p>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</AnimationComponent>
	);
}
