"use client";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      {/* Bottom Section */}
      <div className="border-t border-gray-100 bg-cyan-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center items-center">
            {/* Copyright */}
            <div className="text-center">
              <p className="text-sm text-cyan-100">
                تمامی حقوق این سایت برای تگانه محفوظ است © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 