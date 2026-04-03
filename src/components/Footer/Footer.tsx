import FacebookIcon from "@/assets/icon_facebook.svg";
import InstagramIcon from "@/assets/icon_instagram.svg";
import XIcon from "@/assets/icon_X.svg";
import YoutubeIcon from "@/assets/icon_youtube.svg";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-100 py-8 px-12">
      <div className="max-w-300 mx-auto grid grid-cols-3 items-center">
        <p className="text-sm text-gray-400">© 2024 Roami</p>

        <div className="flex justify-center gap-5 text-sm text-gray-400">
          <a href="/privacy" className="hover:text-gray-700 transition-colors">
            Privacy Policy
          </a>
          <a href="/faq" className="hover:text-gray-700 transition-colors">
            FAQ
          </a>
        </div>

        <div className="flex justify-self-end gap-3 items-center">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <FacebookIcon width={18} height={18} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <InstagramIcon width={18} height={18} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Youtube"
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <YoutubeIcon width={18} height={18} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <XIcon width={18} height={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};
