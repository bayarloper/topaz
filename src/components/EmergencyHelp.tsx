// components/EmergencyHelp.js
const EmergencyHelp = () => {
  return (
    <section id="emergencyContainer" className="w-full py-12 bg-gray-50">
      <div>
        <div className="flex justify-center">
          <div className="w-full">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center md:text-left">
              <h6 className="text-lg font-medium text-gray-600">
                Танд яаралтай тусламж хэрэгтэй юу?
              </h6>
              <h1 className="text-xl font-bold text-gray-800 mt-2">
                +976 7000 0532
              </h1>
              <a
                href="tel:+97670000532"
                className="mt-4 inline-block bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Залгах
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyHelp;
