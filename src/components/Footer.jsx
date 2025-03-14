"use client";

export default function Footer() {
  return (
    <footer className="bg-amber-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Restaurant Name and Tagline */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2">Savory Delights</h3>
            <p className="text-amber-200">Where Every Flavor Tells a Story</p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="mb-1">123 Culinary Avenue, Foodie District</p>
            <p className="mb-1">Phone: (555) 123-4567</p>
            <p>Email: info@savorydelights.com</p>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Hours</h3>
            <p className="mb-1">Monday - Friday: 11am - 10pm</p>
            <p>Saturday - Sunday: 10am - 11pm</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-amber-700 mt-6 pt-6 text-center text-sm text-amber-200">
          © {new Date().getFullYear()} Savory Delights. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
