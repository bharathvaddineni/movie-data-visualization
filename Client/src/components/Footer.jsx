/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-stone-800 border-t border-white py-4">
      <div className="container mx-auto text-center flex flex-row justify-around text-white">
        {/* Contact Section */}
        <section >
          <h2 className="text-lg font-semibold text-cyan-500">Contact Us</h2>
          <p className="mb-2  hidden md:block">123 Street Name, City, Country</p>
          <p className="mb-2  block md:hidden">123 Street Name</p>
          <p className="mb-2  block md:hidden">City, Country</p>
          <p className="mb-2">info@example.com</p>
          <p>123-456-7890</p>
        </section>
        
        {/* Quick Links */}
        <section >
          <h2 className="text-lg font-semibold mb-2 text-cyan-500">Quick Links</h2>
          <ul className="text-sm">
            <li className="mb-1"><Link className='font-bold hover:text-slate-300' to={'/'}>Home</Link></li>
            <li className="mb-1"><Link className='font-bold hover:text-slate-300' to={'/movies'}>Movies</Link></li>
            <li className="mb-1"><Link className='font-bold hover:text-slate-300' to={'/contact'}>Contact</Link></li>
            {/* Add more quick links as needed */}
          </ul>
        </section>
        
        {/* Social Media Links */}
        <section>
          <h2 className="text-lg font-semibold mb-2 text-cyan-500">Follow Us</h2>
          <div className="flex md:flex-row md:space-x-8 md:space-y-0 md:justify-around flex-col space-y-2 items-start">
            <Link className='hover:text-slate-300'><FaTwitterSquare className='inline text-3xl'/> <span className='font-bold md:text-base text-sm'>Twitter</span></Link>
            <Link className='hover:text-slate-300'><FaFacebookSquare className='inline text-3xl'/> <span className='font-bold md:text-base text-sm'>Facebook</span></Link>
            <Link className='hover:text-slate-300'><FaInstagramSquare className='inline text-3xl'/> <span className='font-bold md:text-base text-sm'>Instagram</span></Link>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
