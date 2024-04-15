import React from "react";

const Footer = () =>{
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 md:gap-y-0">
            <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-semibold">About Us</h2>
                <p>About our company</p>
                <p>Our team</p>
                <p>Our mission</p>
            </div>
            
            <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-semibold">Services</h2>
                <p>Service 1</p>
                <p>Service 2</p>
                <p>Service 3</p>
            </div>
            
            <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-semibold">Contact Us</h2>
                <p>Email: info@example.com</p>
                <p>Phone: +123456789</p>
                <p>Address: 123 Main St, City</p>
            </div>
            
            <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-semibold">Follow Us</h2>
                <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
            </div>
            <div className="mt-6 border-t border-gray-700 pt-4 text-center">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </div>
        </footer>
    )


}
export default Footer;