import brownies from "/images/Brownies.jpeg";
import cookies from "/images/Cookies.jpeg";
import cakes from "/images/Cakes.jpeg";
import savory from "/images/Savory.jpeg";

export const links = [
  {
    id: 1,
    instagram: "https://www.instagram.com/cravefudge_?igsh=MTV5MXh1YTJxZHc3eg%3D%3D&utm_source=qr"
  },
  {
    id: 2,
    tiktok: "https://www.tiktok.com/@cravefudge_?_t=ZS-8yo5jjUpR0z&_r=1"
  }
]

export const menu_list = [
  {
    menu_name: "Brownies",
    menu_image: brownies,
  },
  {
    menu_name: "Cookies",
    menu_image: cookies,
  },
  {
    menu_name: "Cakes",
    menu_image: cakes,
  },
  {
    menu_name: "Savory",
    menu_image: savory,
  },
];

export const NavbarMenu = [
  {
    id: 1,
    title: "Brownies",
  },
  {
    id: 2,
    title: "Cookies",
  },
  {
    id: 3,
    title: "Cakes",
  },
  {
    id: 4,
    title: "Savory",
  },
];

export const description = {
  cookies: "Explore all our range of crunchy, chewy cookies. There’s a perfect bite for every craving!",
  brownies: "Discover our selection of deliciously unique brownies. We have a flavor for every mood!",
  cakes: "Indulge in our range of moist and decadent cakes. There’s one for every celebration!",
  savory: "Explore our variety of flavorful savory treats. Perfect for any time of the day!",
}

export const products = [
  {
    title: "Fudgy Brownie",
    slug: "fudgy-brownie",
    desc: "Deeply rich and gooey, with a crackly top and melt-in-your-mouth texture.",
    descDetail:
      "Sink your teeth into the ultimate chocolate lover’s dream—our Fudgy Brownie is intensely rich, irresistibly gooey, and decadently smooth with every bite. Made from premium cocoa and real chocolate, it boasts a deep, bittersweet flavor that lingers perfectly on the palate.\n\nThe top is beautifully crackly, adding a satisfying texture contrast to the moist and dense interior that practically melts in your mouth. Whether enjoyed warm on its own or paired with a scoop of vanilla ice cream, this brownie is the perfect treat to satisfy any craving for something bold, comforting, and utterly indulgent. One bite, and you’ll understand why we call it fudgy perfection.",
    prices: [
      { size: "10x10", price: 32500 },
      { size: "20x20", price: 132000 },
    ],
    img: "/images/Brownies.jpeg",
    thumbnail1: "/images/tnFudge1.jpeg",
    thumbnail2: "/images/tnFudge2.jpeg",
    thumbnail3: "/images/tnFudge3.jpeg",
    video: "/videos/Brownies.mp4",
    type: "Crowd Favorite",
    category: "brownies",
  },
  {
    title: "Brookies Brownie",
    slug: "brookie-brownie",
    desc: "Chocolate brownie with a classic cookies topping.",
    descDetail:
      "Sink your teeth into the ultimate chocolate lover’s dream—our Fudgy Brownie is intensely rich, irresistibly gooey, and decadently smooth with every bite. Made from premium cocoa and real chocolate, it boasts a deep, bittersweet flavor that lingers perfectly on the palate.\n\nThe top is beautifully crackly, adding a satisfying texture contrast to the moist and dense interior that practically melts in your mouth. Whether enjoyed warm on its own or paired with a scoop of vanilla ice cream, this brownie is the perfect treat to satisfy any craving for something bold, comforting, and utterly indulgent. One bite, and you’ll understand why we call it fudgy perfection.",
    prices: [
      { size: "10x10", price: 42500 },
      { size: "20x20", price: 164000 },
    ],
    img: "/images/brookies.jpeg",
    thumbnail1: "/images/tnBrookies1.jpeg",
    thumbnail2: "/images/tnBrookies2.jpeg",
    // thumbnail3: "/src/assets/tnBrookies3.jpeg",
    video: "/videos/brookies.mp4",
    category: "brownies",
  },
  {
    title: "Cheezy Fudgy Brownie",
    slug: "cheezy-brownie",
    desc: "Chocolate brownie with a creamy cheese topping.",
    descDetail:
      "Indulge in the perfect harmony of rich chocolate and luscious creaminess with our Cheezy Brownie. This decadent treat starts with a moist and fudgy chocolate brownie base, made from premium cocoa for a deep, satisfying flavor.\n\nOn top, we add a smooth, creamy layer of cheese that melts into every bite, creating a delightful contrast between sweet and slightly tangy. The combination of gooey chocolate and soft, cheesy topping delivers an unforgettable experience that’s both comforting and unique. Whether you're a fan of brownies, cheesecake, or both—this irresistible fusion offers the best of both worlds in one mouthwatering dessert.",
    prices: [
      { size: "10x10", price: 48000 },
      { size: "20x20", price: 174500 },
    ],
    img: "/images/cheezy.jpeg",
    thumbnail1: "/images/tnCheezy1.jpeg",
    thumbnail2: "/images/tnCheezy2.jpeg",
    thumbnail3: "/images/tnCheezy3.jpeg",
    video: "/videos/cheezy.mp4",
    type: "Solid Pick",
    category: "brownies",
  },
  {
    title: "Classic Cookie",
    slug: "classic-cookies",
    desc: "Thick, chewy, and loaded with melty chocolate chunks. A bite of pure comfort in every cookie.",
    descDetail:
      "Indulge in the timeless goodness of our Classic Cookie—thick, soft, and perfectly chewy with a golden, slightly crisp edge.\n\nEach bite is packed with generous chunks of rich, melty chocolate that melt in your mouth and warm the soul. Baked fresh to bring out the comforting aroma of buttery dough and gooey chocolate, this cookie is the definition of simple pleasures done right.\n\nWhether you're craving a sweet treat with your coffee, a cozy afternoon snack, or just a little pick-me-up, the Classic Cookie delivers pure satisfaction every time. Sometimes, all you need is a classic.",
    prices: [{ size: "1 pc", price: 20000 }],
    img: "/images/classicCookie.jpeg",
    thumbnail1: "/images/tnClassic1.jpeg",
    thumbnail2: "/images/tnClassic2.jpeg",
    thumbnail3: "/images/tnClassic3.jpeg",
    video: "/videos/classicCookie.mp4",
    type: "Classic Hit",
    category: "cookies",
  },
  {
    title: "Strawberry Cheese Cookie",
    slug: "straw-cookies",
    desc: "Made with real strawberries, cream cheese, white chocolate and vanilla dough.",
    descDetail:
      "A delightful fusion of fruity and creamy flavors, our Strawberry Cheese Cookie is crafted with real strawberries, smooth cream cheese, and sweet white chocolate chunks—blended into a soft, buttery vanilla dough.\n\nEach bite delivers a burst of tangy-sweet strawberry goodness, balanced perfectly with the richness of cream cheese and the mellow sweetness of white chocolate. Baked to a golden finish, this cookie offers a tender texture on the inside with just the right touch of crispness on the outside.\n\nWhether you're a fan of fruity desserts or just looking for something unique and indulgent, this cookie promises a comforting yet refreshing twist on the classic cookie experience.",
    prices: [{ size: "1 pc", price: 20000 }],
    img: "/images/strawberry.jpeg",
    thumbnail1: "/images/tnStraw1.jpeg",
    thumbnail2: "/images/tnStraw2.jpeg",
    thumbnail3: "/images/tnStraw3.jpeg",
    video: "/videos/strawberry.mp4",
    type: "Most Loved",
    category: "cookies",
  },
  {
    title: "Smore's Cookie",
    slug: "smores-cookies",
    desc: "Made with cookie dough base, semi-sweet chocolate chip, marshmallow, and biscuits.",
    descDetail:
      "Experience the ultimate campfire treat in every bite of our S’mores Cookie—thick, soft, and irresistibly chewy, with a delicate golden edge that gives way to a warm, gooey center.\n\nEach cookie is generously studded with semi-sweet chocolate chunks, fluffy marshmallows that melt into pockets of sweetness, and buttery biscuit crumbs for that nostalgic s’mores crunch.\n\nBaked fresh to capture the magic of toasted marshmallows and rich chocolate, this cookie is perfect for cozy evenings, sweet celebrations, or simply indulging in a moment of pure comfort. One bite, and you’ll be transported to a fireside under the stars.",
    prices: [{ size: "1 pc", price: 20000 }],
    img: "/images/smores.jpeg",
    thumbnail1: "/images/tnSmores1.jpeg",
    thumbnail2: "/images/tnSmores2.jpeg",
    video: "/videos/smores.mp4",
    category: "cookies",
  },
  {
    title: "Matilda Cake",
    slug: "matilda",
    desc: "Rich, ultra-moist chocolate cake layered with decadent fudge frosting.",
    descDetail:
      "Dive into the indulgence of our Matilda Cake—an ultra-moist, rich chocolate masterpiece inspired by the iconic dessert from the beloved film. Each layer is baked to perfection, delivering an intense cocoa flavor and a tender, melt-in-your-mouth crumb.\n\nGenerously coated in silky, glossy fudge frosting that oozes with chocolatey goodness, this cake is a celebration of pure decadence. Perfect for birthdays, celebrations, or simply satisfying your deepest chocolate cravings.\n\nOne slice is never enough—this is the kind of cake that demands seconds.",
    prices: [{ size: "d20cm", price: 385000 }],
    img: "/images/matilda.jpeg",
    thumbnail1: "/images/tnMatilda1.jpeg",
    thumbnail2: "/images/tnMatilda2.jpeg",
    thumbnail3: "/images/tnMatilda3.jpeg",
    video: "/videos/matilda.mp4",
    category: "cakes",
  },
  {
    title: "Bolu Ketan Hitam",
    slug: "bolu-ketan",
    desc: "Soft black glutinous rice cake with a rich, gooey cheese melt center.",
    descDetail:
      "Savor the perfect harmony of tradition and indulgence with our Bolu Ketan Hitam Cheese Melt—soft, moist black glutinous rice cake made from premium black rice flour for its signature earthy aroma and deep flavor.\n\nAt the heart of every slice is a luscious, gooey cheese filling that melts beautifully, adding a creamy, savory contrast to the cake’s natural sweetness. Every bite offers a delightful combination of fluffy texture, rich cheese, and fragrant ketan hitam.\n\nPerfect for pairing with coffee or tea, this cake is a comfort treat that bridges classic flavors with a modern twist.",
    prices: [{ size: "d20cm", price: 85000 }],
    img: "/images/ketanhitam.jpeg",
    thumbnail1: "/images/tnKetan1.jpeg",
    thumbnail2: "/images/tnKetan2.jpeg",
    thumbnail3: "/images/tnKetan3.jpeg",
    video: "/videos/ketanhitam.mp4",
    category: "cakes",
  },
  {
    title: "Classic Tiramisu",
    slug: "tiramisu",
    desc: "Layers of espresso-soaked ladyfingers with rich mascarpone cream and cocoa.",
    descDetail:
      "Indulge in the timeless elegance of our Classic Tiramisu—delicate layers of espresso-soaked ladyfingers intertwined with luxuriously smooth mascarpone cream.\n\nEach bite delivers the perfect balance of bold coffee aroma, light sweetness, and a dusting of rich cocoa powder for that signature finish. Crafted with premium ingredients, this Italian dessert is light yet decadent, making it the perfect end to any meal.\n\nWhether enjoyed as a special treat or to impress guests, our Classic Tiramisu brings a touch of la dolce vita to every occasion.",
    prices: [{ size: "1 box", price: 40000 }],
    img: "/images/tiramisu.jpeg",
    thumbnail1: "/images/tnTiramisu1.jpeg",
    thumbnail2: "/images/tnTiramisu2.jpeg",
    thumbnail3: "/images/tnTiramisu3.jpeg",
    video: "/videos/tiramisu.mp4",
    category: "cakes",
  },
  {
    title: "Garlic Roll Bun",
    slug: "garlic",
    desc: "Soft garlic butter bun filled with savory meat, sausage, cheddar, and mozzarella.",
    descDetail:
      "Delight in the savory goodness of our Garlic Roll Bun—fluffy, golden-baked bread brushed with our signature aromatic garlic butter glaze.\n\nInside, you’ll find a hearty filling of tender, seasoned meat, juicy sausage, sharp cheddar, and gooey mozzarella that stretches with every bite. The perfect balance of creamy, cheesy richness and garlicky aroma makes this bun irresistibly satisfying.\n\nBest enjoyed warm, this bun is a comforting snack or light meal that’s bursting with flavor in every layer.",
    prices: [
      { size: "3 pcs", price: 35000 },
      { size: "6 pcs", price: 70000 },
    ],
    img: "/images/garlic.jpeg",
    thumbnail1: "/images/tnGarlic1.jpeg",
    thumbnail2: "/images/tnGarlic2.jpeg",
    video: "/videos/garlic.mp4",
    category: "savory",
  },
];

export const best_seller = [
  {
    title: "Fudgy Brownie",
    slug: "fudgy-brownie",
    desc: "Deeply rich and gooey, with a crackly top and melt-in-your-mouth texture.",
    descDetail:
      "Sink your teeth into the ultimate chocolate lover’s dream—our Fudgy Brownie is intensely rich, irresistibly gooey, and decadently smooth with every bite. Made from premium cocoa and real chocolate, it boasts a deep, bittersweet flavor that lingers perfectly on the palate.\n\nThe top is beautifully crackly, adding a satisfying texture contrast to the moist and dense interior that practically melts in your mouth. Whether enjoyed warm on its own or paired with a scoop of vanilla ice cream, this brownie is the perfect treat to satisfy any craving for something bold, comforting, and utterly indulgent. One bite, and you’ll understand why we call it fudgy perfection.",
    prices: [
      { size: "10x10", price: 32500 },
      { size: "20x20", price: 132000 },
    ],
    img: "/images/Brownies.jpeg",
    thumbnail1: "/images/tnFudge1.jpeg",
    thumbnail2: "/images/tnFudge2.jpeg",
    thumbnail3: "/images/tnFudge3.jpeg",
    video: "/videos/Brownies.mp4",
    type: "Crowd Favorite",
  },
  {
    title: "Cheezy Fudgy Brownie",
    slug: "cheezy-brownie",
    desc: "Chocolate brownie with a creamy cheese topping.",
    descDetail:
      "Indulge in the perfect harmony of rich chocolate and luscious creaminess with our Cheezy Brownie. This decadent treat starts with a moist and fudgy chocolate brownie base, made from premium cocoa for a deep, satisfying flavor.\n\nOn top, we add a smooth, creamy layer of cheese that melts into every bite, creating a delightful contrast between sweet and slightly tangy. The combination of gooey chocolate and soft, cheesy topping delivers an unforgettable experience that’s both comforting and unique. Whether you're a fan of brownies, cheesecake, or both—this irresistible fusion offers the best of both worlds in one mouthwatering dessert.",
    prices: [
      { size: "10x10", price: 48000 },
      { size: "20x20", price: 174500 },
    ],
    img: "/images/cheezy.jpeg",
    thumbnail1: "/images/tnCheezy1.jpeg",
    thumbnail2: "/images/tnCheezy2.jpeg",
    thumbnail3: "/images/tnCheezy3.jpeg",
    video: "/videos/cheezy.mp4",
    type: "Solid Pick",
  },
  {
    title: "Classic Cookie",
    slug: "classic-cookies",
    desc: "Thick, chewy, and loaded with melty chocolate chunks. A bite of pure comfort in every cookie.",
    descDetail:
      "Indulge in the timeless goodness of our Classic Cookie—thick, soft, and perfectly chewy with a golden, slightly crisp edge.\n\nEach bite is packed with generous chunks of rich, melty chocolate that melt in your mouth and warm the soul. Baked fresh to bring out the comforting aroma of buttery dough and gooey chocolate, this cookie is the definition of simple pleasures done right.\n\nWhether you're craving a sweet treat with your coffee, a cozy afternoon snack, or just a little pick-me-up, the Classic Cookie delivers pure satisfaction every time. Sometimes, all you need is a classic.",
    prices: [{ size: "1 pc", price: 20000 }],
    img: "/images/classicCookie.jpeg",
    thumbnail1: "/images/tnClassic1.jpeg",
    thumbnail2: "/images/tnClassic2.jpeg",
    thumbnail3: "/images/tnClassic3.jpeg",
    video: "/videos/classicCookie.mp4",
    type: "Classic Hit",
  },
  {
    title: "Strawberry Cheese Cookie",
    slug: "straw-cookies",
    desc: "Made with real strawberries, cream cheese, white chocolate and vanilla dough.",
    descDetail:
      "A delightful fusion of fruity and creamy flavors, our Strawberry Cheese Cookie is crafted with real strawberries, smooth cream cheese, and sweet white chocolate chunks—blended into a soft, buttery vanilla dough.\n\nEach bite delivers a burst of tangy-sweet strawberry goodness, balanced perfectly with the richness of cream cheese and the mellow sweetness of white chocolate. Baked to a golden finish, this cookie offers a tender texture on the inside with just the right touch of crispness on the outside.\n\nWhether you're a fan of fruity desserts or just looking for something unique and indulgent, this cookie promises a comforting yet refreshing twist on the classic cookie experience.",
    prices: [{ size: "1 pc", price: 20000 }],
    img: "/images/strawberry.jpeg",
    thumbnail1: "/images/tnStraw1.jpeg",
    thumbnail2: "/images/tnStraw2.jpeg",
    thumbnail3: "/images/tnStraw3.jpeg",
    video: "/videos/strawberry.mp4",
    type: "Most Loved",
  },
];
