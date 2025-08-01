import React from "react";
import "./Abought.css";
import { Link } from "react-router-dom";

const Abought = () => {
  return (
    <div className="about-container">
      <h1>🎲 Dice War — O‘yin haqida</h1>

      <section>
        <h2>1. O‘yin mazmuni</h2>
        <p>
          Dice War — bu zarlar orqali jang qilinadigan strategik o‘yin. Har bir
          o‘yinchi o‘z qahramonini tanlaydi va kuch, himoya, yashas kabi
          ko‘rsatkichlarni oshirib, dushmanlarnini yengishga harakat qiladi.
        </p>
        {/* <img src="/images/gameplay.png" alt="Game overview" /> */}
      </section>

      <section>
        <h2>2. Nimalar qilish mumkin?</h2>
        <ul>
          <li>Qahramonni tanlash va uni rivojlantirish</li>
          <li>Skil (ko‘nikma) larni ochish va ishlatish</li>
          <li>Ajdar bilan jang!</li>
        </ul>
        {/* <img src="/images/skills.png" alt="Skills preview" /> */}
      </section>

      <section>
        <h2>3. Shop & Inventory tizimi</h2>
        <p>
          Shop Tizi orqali O`yinda kerakli artifaktlarni sotib olish! 
          Sotib olingan artifaktlarni inentor orali ishlatish va statuslarni oshirish!
        </p>
        {/* <img src="/images/shop.png" alt="Shop screenshot" /> */}
      </section>

      <section>
        <h2>4. Finalda nimalar bo‘ladi?</h2>
        <li>
          Fnal - Player 99-katakga yetib borishi bilan - final qisimga utadi !
        </li>
        <li>
          Final qismda uyinchi va ajdarho statuslari solishtirlib g`olib aniqlanadi !
        </li>
        {/* <img src="/images/boss.png" alt="Final boss" /> */}
      </section>

      <section>
        <h2>5. Rank ma’lumotlarini qanday Saqlash va Yanglash?</h2>
        <p>
          Player- Uynda g`alaba qozonsa yani ajdarni yengsa uz statuslarnini saqlashi lozim ! 
        </p>
        <li>
          Statusni Saqlashda Player-ism va parol quyishi lozim va saqlash tugmasi orqali malumotlarni saqlaydi !
        </li>
        <li>
          Statusni yangilash orqali oldingi statuslaringizni yuqori darajaga olib utasiz 
        </li>
        {/* <img src="/images/rank_data.png" alt="Rank data" /> */}
      </section>

      <section>
        <h2>6. Rank qanday ishlaydi?</h2>
        <p>
          Rank - Hujum , Himoya , Hayot statuslari jamlanib POWER-ga aylantiriladi !
        </p>
        <li>
          Power darajasi yuqori 10 ta payer asosiy sahifada kursatiladi !
        </li>
        <li>
          Yoki siz 10 talikda bulmasangiz qidiruv orqali us darajangizni bilib olasiz!
        </li>
        {/* <img src="/images/rank_progression.png" alt="Rank stages" /> */}
      </section>

      <section>
        <h2>7. Eslatmalar</h2>
        <ul>
          <li>shopdan 1 turdagi artifactdan 2 ta sotib olmang ❗❗❗</li>
          <p>avval sotib olinganni ishlating so`ng yana sotib oling 🎁</p>
          <li>Zar natijalari tasodifiy hisoblanadi (randomize)</li>
          <li>Skil va itemlar balanslangan holda ishlab chiqilgan</li>
          <li>Tuzalish Artifactini sotib olgandan sung ishlatmang ! (artifact (inventorda turgan vaqti) har yurganda +10 hp beradi .Ammo-uni ishlatish  +40 hp beradi !)</li>
        </ul>
        {/* <img src="/images/tips.png" alt="Tips" /> */}
      </section>

      <section>
      <h2>❗❗❗ Muuhum Eslatma ❗❗❗ </h2>
      <p>
        Shop orqali sotib olingan bir turdagi narsalar ni ishlatish bittasining statuslarini beradi !
      </p>
      <h2>
        Bu xato emas bu yangilik --- Misol uchun:
      </h2>
      <li>
        3 ta qilich stib olindi
      </li>
      <li>inventor orqali qaysibirini faollashtirilishini tanlanadi !</li>
      <li>
        Bunda barcha qilichlar belgilanda(avto) va faollashtirish bosiladi
      </li>
      <li>
        Falollashtirilgandan so`ng 3ta qilich uyinchiga 10+10+10=30 statu bermaydi 
      </li>
      <li>faqat bittasiing satuslari qushiladi (+10), qolgan 2 ta qilich esa avto ishlatilgan deb topilib inventordan uchadi ! </li>
      <h2>Bu usul Player hushyorligini oshirish va ketma-ketlik ni buzmaslik uchun uylab topilgan ❗❗❗</h2>
      </section>

      <section>
        <h2>8. Keyingi yangilanishlar</h2>
        <p>
          Kelajakdagi yangilanishlar: yangi qahramonlar, yangi skilllar, PvP
          ligasi va hodisalar (events).
        </p>
        <li>
          2 player rejimi 📲📲
        </li>
        <li>
          Multiplayer Rejimi 🌏🌎🌍
        </li>
        <li>
          Turli darajadati AJDARLAR !
        </li>
        <li>
          Rank-da yangi tizim !
        </li>
        <h2>Ushbu yangilanishlar 2026(yil) - 09(oy) - 01(kun) qushiladi !</h2>
        {/* <img src="/images/update_roadmap.png" alt="Updates" /> */}
      </section>
      <section>
        <h2>9. Ajdar Statuslari❗</h2>
        <li>Jon-200</li>
        <li>Hujum-350</li>
        <li>Himoya-250</li>
      </section>

      <section>
        <h2>10. Omad tilaymiz!</h2>
        <p>O‘yinda omad yor bo‘lsin! Dice War olamiga hush kelibsiz!</p>
        {/* <img src="/images/goodluck.png" alt="Good luck" /> */}
      </section>

      <Link className="back-home" to="/">🏠 Bosh sahifaga qaytish</Link>
    </div>
  );
};

export default Abought;
