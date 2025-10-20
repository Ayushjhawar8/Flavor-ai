import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const socialLinks = [
    {
      href: "https://github.com/Ayushjhawar8/Flavor-ai",
      icon: FaGithub,
      label: "GitHub",
      glow: "drop-shadow(0 0 6px rgba(255,255,255,0.6))",
    },
    {
      href: "https://linkedin.com/in/ayushjhawar",
      icon: FaLinkedin,
      label: "LinkedIn",
      glow: "drop-shadow(0 0 6px rgba(10,102,194,0.6))",
    },
    {
  href: "https://x.com/itsAyushJ",
  icon: FaXTwitter,
  label: "X (Twitter)",
  glow: "drop-shadow(0 0 6px rgba(29,155,240,0.6))",
}];

const SocialLinks = ({currentTheme}) => {
  const iconBg = currentTheme === 'dark' ? 'bg-base-200' : 'bg-base-200';
  const iconHoverBg = currentTheme === 'dark' ? 'hover:bg-base-300' : 'hover:bg-base-300';
  const iconColor = currentTheme === 'dark' ? 'text-base-content' : 'text-base-content';

  return (
    <div className='flex justify-center gap-2 items-center'>
      {socialLinks.map(({ href, icon: Icon, label, glow }, index) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative ${iconBg} ${iconHoverBg} ${iconColor} p-3 rounded-lg transition-all duration-300 hover:transform hover:scale-110 hover:-translate-y-1`}
                  title={label}
                  aria-label={label}
                >
                  <Icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
    </div>
  )
}

export default SocialLinks