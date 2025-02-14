import {
  Facebook,
  Instagram,
  Twitter,
  Headphones,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const links = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Products",
    link: "/products?category=All&filter=All",
  },
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <a href="/" className="flex items-center mb-4">
              <Headphones className="h-8 w-8 mr-2 text-white" />
              <span className="text-2xl font-bold">Prod</span>
            </a>
            <p className="text-sm text-gray-300">
              Discover the perfect sound with our premium headphones. Immerse
              yourself in crystal-clear audio and unparalleled comfort.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick as</h3>
            <ul className="space-y-2">
              {links.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`${item.link}`}
                    className="hover:underline hover:underline-offset-4 hover:text-gray-300 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a
                  href="mailto:info@audiophile.com"
                  className="hover:text-gray-300 transition-colors"
                >
                  info@audiophile.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-gray-300 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Audio Street, Sound City, 90210</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
          <div className="text-sm text-gray-400">
            <p>&copy; 2025 Prod. All rights reserved.</p>
            <p className="mt-1">
              Built by{" "}
              <a
                href={"https://www.hectorcodes.dev"}
                target="_blank"
                className="hover:underline hover:underline-offset-4"
              >
                <span className="font-medium text-zinc-300">
                  Hector Oropesa
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
