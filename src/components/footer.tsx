import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-slate-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 md:gap-y-0">
          <div className="flex flex-col space-y-2">
            <h2 className="text-md font-semibold">Бидний тухай</h2>
            <p className="text-xs opacity-75">Түүхэн товчоо</p>
            <p className="text-xs opacity-75">Алсын хараа </p>
            <p className="text-xs opacity-75">Гадаад харилцаа</p>
            <p className="text-xs opacity-75">Мэдээ, мэдээлэл</p>
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="text-md font-semibold">Тусламж үйлчилгээ</h2>
            <p className="text-xs opacity-75">Төлбөртэй үйлчилгээний тариф</p>
            <p className="text-xs opacity-75">Урьдчилан сэргийлэх үзлэг </p>
            <p className="text-xs opacity-75">Амбулатори</p>
            <p className="text-xs opacity-75">Оношилгоо, шинжилгээ</p>
            <p className="text-xs opacity-75">Түгээмэл асуулт хариулт</p>
            <p className="text-xs opacity-75">
              Хэвтэн эмчлүүлэгч – Хувийн бэлтгэл
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="text-md font-semibold">Холбоо барих</h2>
            <p className="text-xs opacity-75">Утас: 7000 0532</p>
            <p className="text-xs opacity-75">
              Хаяг: БГД 10-р хороолол Сувилахуйн сургуулийн зүүн талд ТОПАЗ
              эмнэлэг
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="text-md font-semibold">Бусад холбоос</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-md mt-6 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            &copy; 2024 МОНГОЛ УЛСЫН МЭС ЗАСЛЫН ХУВИЙН ХЭВШЛИЙН ЖИШИГ ЭМНЭЛЭГ.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
