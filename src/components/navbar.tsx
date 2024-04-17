import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Нүүр хуудас", href: "/", current: false },
  { name: "Бидний тухай", href: "/about", current: false },
  { name: "Үйлчилгээ", href: "/uilchilgee", current: false },
  { name: "Бүтэц", href: "/workItem", current: false },
  { name: "Ил тод байдал", href: "/vision", current: false },
  { name: "Холбоо барих", href: "/contact", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [weather, setWeather] = useState<any>(null);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    // Fetch weather data
    fetchWeatherData();

    // Fetch current time
    fetchCurrentTime();

    // Update time every second
    const intervalId = setInterval(fetchCurrentTime, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        "https://api.weatherapi.com/v1/current.json?key=6bc800955eab4f1887a74159241704&q=Mongolia"
      );
      if (response.ok) {
        const data = await response.json();
        setWeather(data.current);
      } else {
        throw new Error("Failed to fetch weather data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrentTime = () => {
    // You can use JavaScript's built-in Date object to get the current time
    const currentTime: Date = new Date();
    setTime(
      currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Ulaanbaatar",
      })
    );
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Мэню</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="/logo.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                {/* Display weather and time information */}
                {weather && (
                  <div className="text-sm text-white flex items-center space-x-2">
                    <div className="flex items-center">
                      <img
                        src={`https:${weather.condition.icon}`}
                        alt={weather.condition.text}
                        className="w-6 h-6 mr-1"
                      />
                    </div>
                    <div className="flex items-center">
                      <p>{weather.temp_c}°C</p>
                      <span className="mx-1">|</span>
                      <p>{time}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
