
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="border-t bg-muted/40 text-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                  <Image src="/img/logo.png" width={48} height={48} alt="Jalaram Home Service Logo" />
              <span>Jalaram Home Service</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your reliable partner for home services in Kutchh. Quick, verified, and professional services at your doorstep.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/request-service" className="text-muted-foreground hover:text-primary">Request a Service</Link></li>
               <li><Link href="/poster-generator" className="text-muted-foreground hover:text-primary">Make a Poster</Link></li>
              <li><Link href="/login" className="text-muted-foreground hover:text-primary">Login</Link></li>
              <li><Link href="/register" className="text-muted-foreground hover:text-primary">Register</Link></li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">9106433706, 9687354521</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">contact@jalaramhomeservice.in</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span className="text-muted-foreground">Bhuj, Kutchh, Gujarat</span>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Follow Us</h4>
            <div className="flex gap-4">
                <Link href="https://www.instagram.com/jalaram_home_service?igsh=MXdnemh2eTVob2VuYw==" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </Button>
                </Link>
            </div>
            <p className="text-muted-foreground text-sm mt-4">Stay updated with our latest offers and news.</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jalaram Home Service. All rights reserved.</p>
          <p className="mt-2">
            Made with ♥ by <a href="http://codinghunters.in/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">CodingHunters</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
