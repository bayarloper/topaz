// "use client";

// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
// import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
// import { useState } from "react";

// const libraries = ["places"];
// const mapContainerStyle = {
//   width: "100%",
//   height: "400px",
// };
// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

// export default function Contact() {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//     libraries,
//   });

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading Maps</div>;

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
//             <form className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Name</label>
//                 <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Message</label>
//                 <textarea className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" rows="4"></textarea>
//               </div>
//               <div>
//                 <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                   Send Message
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
//             <p className="text-lg mb-2">1234 Street Name, City, State, ZIP</p>
//             <p className="text-lg mb-2">Email: contact@example.com</p>
//             <p className="text-lg mb-2">Phone: (123) 456-7890</p>
//             <div className="mt-8">
//               <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
//               <GoogleMap
//                 mapContainerStyle={mapContainerStyle}
//                 zoom={14}
//                 center={center}
//               >
//                 <Marker position={center} />
//               </GoogleMap>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
