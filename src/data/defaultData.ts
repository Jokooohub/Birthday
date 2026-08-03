import { BirthdayConfig, PhotoItem, ReasonItem, GuestWish, CouponItem } from '../types';
import heroImage from '../assets/images/bday3.jpg';
import Graduation from '../assets/images/graduation.jpg';
import Engineer from '../assets/images/Engineer.jpg';
import Aligue from '../assets/images/aligue.jpg'; 
import Bastie from '../assets/images/bastie.jpg';
import Lasara from '../assets/images/lasara.jpg';
import Samg from '../assets/images/samg.jpg';
import Seans from '../assets/images/seans.jpg';
import Turbo from '../assets/images/turbo.jpg'

export const INITIAL_CONFIG: BirthdayConfig = {
  name: "Mitche",
  age: 25,
  birthdayDate: "2026-08-04T00:00",
  subtitle: "Happiest Birthday, my love.",
  partnerName: "Joko",
  loveLetter: `Happy Birthday, Mitchay, my love! 

Happy birthday sa akong gwapa af nga uyab! hehehe

I want to thank you for everything, love. Thank you for choosing to walk through life with me. From the moment you came into my life, every single day has felt brighter. You mean so much to me, my love.

Thank you for being my greatest happiness. 

I know I'm not perfect, and I know I can't always give you everything you deserve right away. But one thing I can promise is that I'll always do my best to love you wholeheartedly, support your dreams, and create beautiful memories with you. Kuhaon nato atong goals together ha :))  

Here's to 25 and to a lifetime of adventures together!

I love you today, tomorrow, and always, Mitche. Happy Birthday!`,
  heroBannerUrl: heroImage,
  songTitle: "Happy Birthday (Romantic Piano Serenade)",
  songUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=happy-birthday-piano-107737.mp3",
};

export const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: "p1",
    url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
    caption: "Our Very First Trip Together! Coming Soon (?)",
    category: "Trips",
    date: "Puhon, maayong lawas!",
    location: "Our First Travel Destination",
    memoryNote: "We haven't taken our first trip together yet, but our countdown starts now! I can't wait to pack our bags, board our first flight, and explore somewhere brand new with you.",
    likes: 25,
  },
  {
    id: "p2",
    url: Samg,
    caption: "Samgy date hehehe",
    category: "Dates",
    date: "",
    location: "Butuan City",
    memoryNote: "",
    likes: 32,
  },
  {
    id: "p3",
    url: Bastie,
    caption: "Dinner & Coffee sa Bastie",
    category: "Dates",
    date: "",
    location: "Butuan City",
    memoryNote: "",
    likes: 32,
  },
  {
    id: "p4",
    url: Aligue,
    caption: "Seafoods date hehehe",
    category: "Dates",
    date: "",
    location: "Butuan City",
    memoryNote: "",
    likes: 32,
  },
  {
    id: "p5",
    url: Graduation,
    caption: "Graduation nimo, yey!!",
    category: "Milestones",
    date: "June 2024",
    location: "Caraga State University",
    memoryNote: "So incredibly proud of everything you worked so hard to accomplish.",
    likes: 54,
  },
  {
    id: "p6",
    url: Engineer,
    caption: "Licensed Geodetic Engineer na!",
    category: "Milestones",
    date: "October 2024",
    location: "Caraga State University",
    memoryNote: "Congratulations again, my Engineer.",
    likes: 54,
  },
  {
    id: "p7",
    url: Lasara,
    caption: "Lasara dateee",
    category: "Dates",
    date: "",
    location: "Butuan City",
    memoryNote: "",
    likes: 32,
  },
  {
    id: "p8",
    url: Seans,
    caption: "Dinner at Seans",
    category: "Dates",
    date: "",
    location: "Butuan City",
    memoryNote: "",
    likes: 32,
  },
  {
    id: "p9",
    url: Turbo,
    caption: "Turbo Burgers yummm",
    category: "Dates",
    date: "",
    location: "Butuan City",
    memoryNote: "",
    likes: 32,
  },
];
