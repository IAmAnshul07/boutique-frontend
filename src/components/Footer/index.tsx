import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa6";
const Footer: React.FC<{}> = () => {
  return (
    <footer className="bg-base-200 text-base-content px-4 md:px-0">
      <div className="container mx-auto py-10 flex flex-col md:flex-row md:justify-between">
        <div className="mb-8 md:mb-0">
          <h2 className="uppercase mb-5 text-lg font-bold">Fashion</h2>
          <ul className="flex space-x-4">
            <li>
              <FaWhatsapp className="h-5 w-5" />
            </li>
            <li>
              <FaFacebook className="h-5 w-5" />
            </li>
            <li>
              <FaInstagram className="h-5 w-5" />
            </li>
            <li>
              <FaTwitter className="h-5 w-5" />
            </li>
          </ul>
        </div>
        <div className="mb-8 md:mb-0">
          <div className="uppercase mb-5 text-lg font-bold">Services</div>
          <ul className="space-y-2">
            <li>Sample Development</li>
            <li>Apparel Production</li>
            <li>Label Tags Packaging</li>
            <li>Global Shipping</li>
            <li>Photography</li>
            <li>Products</li>
          </ul>
        </div>
        <div className="mb-8 md:mb-0">
          <div className="uppercase mb-5 text-lg font-bold">How does it work</div>
          <ul className="space-y-2">
            <li>Portfolio</li>
            <li>Customer Reviews</li>
            <li>About us</li>
            <li>Blog</li>
            <li>FAQ</li>
            <li>Handbag Manufacture</li>
          </ul>
        </div>
        <div className="mb-8 md:mb-0">
          <div className="uppercase mb-5 text-lg font-bold">Contact us</div>
          <ul className="space-y-2">
            <li>+0123456789</li>
            <li>Hello@fashion.com</li>
            <li>India</li>
          </ul>
        </div>
      </div>
      <hr className="w-4/5 mx-auto border-body" />
      <div className="text-center py-2">Copyright © 2024 Fashion All Rights Reserved </div>
    </footer>
  );
};

export default Footer;
