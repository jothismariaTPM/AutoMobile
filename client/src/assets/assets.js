import logo from "./logo.svg";
import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import cart_icon from "./cart_icon.svg";
import nav_cart_icon from "./nav_cart_icon.svg";
import add_icon from "./add_icon.svg";
import refresh_icon from "./refresh_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.svg";
import delivery_truck_icon from "./delivery_truck_icon.svg";
import leaf_icon from "./leaf_icon.svg";
import coin_icon from "./coin_icon.svg";
import box_icon from "./box_icon.svg";
import parcel_icon from "./parcel_icon.svg";
import trust_icon from "./trust_icon.svg";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";
import main_banner_bg_sm from "./main_banner_bg_sm.png";
import bottom_banner_image from "./banner.png";
import bottom_banner_image_sm from "./bottom_banner_image_sm.png";
import add_address_iamge from "./add_address_image.svg";
import pullman_logo from './pullman_logo.jpg'
import parts from './car-body-parts-preview.png'
import tools from './car-repair-tools-preview.png'
import engine from './engine-preview.png'
import lights from './lights-preview.png'
import tyre from './tyre-preview.png'
import shocker from './shocker-preview.png'
import car_main from './car-main.webp'
import car1 from './car-banner2.jpg'
import car3 from './car-banner4.jpeg'
import car4 from './car-banner2-preview.png'
import car6 from './car-banner4-preview.png'
import shopping from './shopping-preview.png'
import shopping15 from './shopping15-preview.png'
import shopping16 from './shopping16-preview.png'
import shopping17 from './shopping17-preview.png'
import shopping18 from './shopping18-preview.png'
import shopping22 from './shopping22-preview.png'
import shopping23 from './shopping23-preview.png'
import shopping33 from './shopping33-preview.png'
import shopping36 from './shopping36-preview.png'
import shopping37 from './shopping37-preview.png'
import shopping46 from './shopping46-preview.png'
import shopping47 from './shopping47-preview.png'
import underconstruction from './underconstruction.png'

export const assets = {
  logo,
  pullman_logo,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  star_icon,
  star_dull_icon,
  cart_icon,
  nav_cart_icon,
  add_icon,
  refresh_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  delivery_truck_icon,
  leaf_icon,
  coin_icon,
  trust_icon,
  black_arrow_icon,
  white_arrow_icon,
  main_banner_bg_sm,
  bottom_banner_image,
  bottom_banner_image_sm,
  add_address_iamge,
  box_icon,
  parcel_icon,
  underconstruction,
  car_main,
  car1,
  car3,
  car4,
  car6,
  shopping,  shopping15, shopping16, shopping17, shopping18, 
  shopping22, shopping23, shopping33,  shopping36, shopping37, shopping46, shopping47,
};

export const categories = [
  
  {
    text: "Body Parts",
    path: "Body Parts",
    image: parts,
    bgColor: "#FEE0E0",
  },
  {
    text: "Shocker",
    path: "Shocker",
    image: shocker,
    bgColor: "#F0F5DE",
  },
  {
    text: "Tools",
    path: "Tools",
    image: tools,
    bgColor: "#E1F5EC",
  },
  {
    text: "Engine",
    path: "Engine",
    image: engine,
    bgColor: "#FEE6CD",
  },
  {
    text: "Lights",
    path: "Lights",
    image: lights,
    bgColor: "#E0F6FE",
  },
  {
    text: "Tyres",
    path: "Tyres",
    image: tyre,
    bgColor: "#F1E3F9",
  },
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "#" },
      { text: "Best Sellers", url: "/products" },
      //{ text: "Offers & Deals", url: "#" },
      { text: "Contact Us", url: "#" }
    ],
  },
  {
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "#" },
      { text: "Track your Order", url: "/my-orders" },
      { text: "Privacy Policy", url: "/privacy-policy" },
      { text: "Terms & Conditions", url: "/terms-conditions" }
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "https://www.instagram.com/pullmaneurocarspare/" },
      //{ text: "Twitter", url: "#" },
      { text: "Facebook", url: "https://www.facebook.com/profile.php?id=61583701505050" },
      { text: "YouTube", url: "#" },
    ],
  },
];

export const features = [
  {
    icon: delivery_truck_icon,
    title: "Fast & Reliable Shipping",
    description: "Essential automobile parts delivered right to your doorstep.",
  },
  {
    icon: leaf_icon,
    title: "Quality Guaranteed",
    description: "Genuine spare parts from trusted manufacturers.",
  },
  {
    icon: coin_icon,
    title: "Affordable Prices",
    description: "Premium vehicle components at unbeatable prices.",
  },
  {
    icon: trust_icon,
    title: "Trusted by Thousands",
    description: "Loved by 1000+ satisfied automobile customers.",
  },
];



export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Virat",
    lastName: "Kohli",
    email: "user.greatstack@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
  
];


