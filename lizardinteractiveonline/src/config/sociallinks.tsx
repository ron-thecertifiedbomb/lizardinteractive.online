import { FaGithub, FaFacebook, FaGoogle, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

export const socials = [
  {
    label: "Facebook",
    url: "https://facebook.com/yourprofile",
    icon: <FaFacebook className="w-5 h-5 text-white" />,
  },
  {
    label: "GitHub",
    url: "https://github.com/ron-thecertifiedbomb",
    icon: <FaGithub className="w-5 h-5 text-white" />,
  },
  {
    label: "Gmail",
    url: "mailto:your-email@gmail.com",
    icon: <FaGoogle className="w-5 h-5 text-white" />,
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/yourprofile",
    icon: <FaLinkedin className="w-5 h-5 text-white" />,
  },
  {
    label: "X (Twitter)",
    url: "https://twitter.com/yourprofile",
    icon: <FaTwitter className="w-5 h-5 text-white" />,
  },
  {
    label: "YouTube",
    url: "https://youtube.com/yourchannel",
    icon: <FaYoutube className="w-5 h-5 text-white" />,
  },
];
