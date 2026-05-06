import image1 from "../image/Mascara.webp"
import image2 from "../image/cheek tinit.webp"
import image3 from "../image/cream.webp"
import image4 from "../image/facial oil.webp"
import image5 from "../image/glam box.webp"
import image6 from "../image/minilipsticks.webp"
import image7 from "../image/nail paint.webp"
import image8 from "../image/powder.webp"
import image9 from "../image/highlighter.webp"
import image10 from "../image/thousand.webp"
import image11 from "../image/travel touch.webp"
import image12 from "../image/matte lipstick.webp"
import image101 from "../image/grazia.avif"
import image102 from "../image/Vogue.avif"
import image103 from "../image/Forbes.avif"
import image104 from "../image/cnbc.webp"
import image105 from "../image/ET.webp"


export const categories = [
  {
    sub: '💕New launches💕',
    posts: [
      {
        id: 1,
        imgsrc: image1,
        title: 'Serum-infused volume boost Mascara....',
        Highlight: 'instant volume | waterproof | 24 Hours stay',
        Price: 'MRP ₹499.00',
        path: '/'
      },
      {
        id: 2,
        imgsrc: image3,
        title: 'Lumi-glow strobe cream with lotus and ...',
        Highlight: 'Barbie pink glow | 18 Hours stay | moisturiser',
        Price: 'MRP ₹495.00',
        path: '/'
      },
      {
        id: 3,
        imgsrc: image9,
        title: 'Lumi-glow Pressed Highlighter wi...',
        Highlight: '3 Highly Luminous shades | 18 hours stay | Non-patchy',
        Price: 'MRP ₹425.00',
        path: '/'
      },
      {
        id: 4,
        imgsrc: image8,
        title: 'Nourishing powder blush with bee...',
        Highlight: 'highly pigmented | silky matte finish | noursihing',
        Price: 'MRP ₹395.00',
        path: '/'
      },

    ],
  },
  {
    sub: 'Best sellers',
    posts: [
      {
        id: 1,
        imgsrc: image6,
        title: 'herb enriched ayurvedic lipstick....',
        Highlight: 'Nurtures & Repairs | Moisturises',
        Price: 'MRP ₹575.00',
        path: '/'
      },
      {
        id: 2,
        imgsrc: image2,
        title: 'nourishing lip and cheek tint.',
        Highlight: 'Creamy-matte | Suitable For Pigmented Lips',
        Price: 'MRP ₹695.00',
        path: '/'
      },
      {
        id: 3,
        imgsrc: image4,
        title: 'Kimsukadi tail- glow boosting f....',
        Highlight: 'Soothes Skin | Nourishes Skin | Imparts Natural Glow',
        Price: 'MRP ₹995.00',
        path: '/'
      },
      {
        id: 4,
        imgsrc: image12,
        title: 'Herb enriched matte liquid lipst....',
        Highlight: 'Weightless-matte | Hydrating & Long-lasting',
        Price: 'MRP ₹745.00',
        path: '/'
      },
    ],
  },
  {
    sub: 'Gifting',
    posts: [
      {
        id: 1,
        imgsrc: image10,
        title: 'A thousand kisses.',
        Highlight: 'Highly Pigmented | Long-Lasting | Perfect Valentine Gift',
        Price: 'MRP ₹909.00',
        path: '/'
      },
      {
        id: 2,
        imgsrc: image5,
        title: 'Makeup essentials giam box',
        Highlight: 'nsta-ready Makeup | Travel-friendly | Perfect For Gifting',
        Price: 'MRP ₹1523.00',
        path: '/'
      },
      {
        id: 3,
        imgsrc: image11,
        title: 'travel touch up kit',
        Highlight: 'Lightweight | Touch-up Essentials | Travel-friendly',
        Price: 'MRP ₹1033.00',
        path: '/'
      },
      {
        id: 4,
        imgsrc: image7,
        title: 'party ready nail paint set',
        Highlight: 'High-Shine Gloss Finish | No Chipping',
        Price: 'MRP ₹452.00',
        path: '/'
      },
    ],
  },
]

export const theme = [
  {
    sub: image101,
    posts: [
      {
        id: 1,
        title: '"Makeup that doubles as skincare? Plus it\'s cruelty-free and available in a variety of shades? Can we have some more please?"',
      },
    ],
  },
  {
    sub: image102,
    posts: [
      {
        id: 1,
        title: '"Just Herbs meticulously details how organic or natural each line is"',
      },
    ],
  },
  {
    sub: image103,
    posts: [
      {
        id: 1,
        title: '"A fresh approach to beauty."',
      },
    ],
  },
  {
    sub: image104,
    posts: [
      {
        id: 1,
        title: '"Made in India, India-Proud"',
      },
    ],
  },
  {
    sub: image105,
    posts: [
      {
        id: 1,
        title: '"India\'s first beauty brand to \'crowd-source\' its products; they involve customer feedback in product creation right from the idea stage"',
      },
    ],
  },
]
export const list = [
  {
    id: 1,
    imgsrc: image1,
    title: 'Serum-infused volume boost Mascara',
    Highlight: 'instant volume | waterproof | 24 Hours stay',
    Price: 'MRP ₹499.00',
    path: '/',
    rating: 4.8,
    reviews: [
      { name: 'Riya K.', rating: 5, comment: 'Best mascara I have used, lasts all day!' },
      { name: 'Sneha M.', rating: 4, comment: 'Great volume' }
    ],
    categories: 'Makeup',
    finish: 'Matte',
    skintype: 'Normal',
    relatedIds: [2, 3, 5]
  },
  {
    id: 2,
    imgsrc: image3,
    title: 'Lumi-glow strobe cream with lotus',
    Highlight: 'Barbie pink glow | 18 Hours stay | moisturiser',
    Price: 'MRP ₹495.00',
    path: '/',
    rating: 4.5,
    reviews: [
      { name: 'Ayesha T.', rating: 5, comment: 'Gives such a natural beautiful glow!' },
      { name: 'Megha S.', rating: 4, comment: 'A bit pricey but totally worth it.' }
    ],
    categories: 'Skincare',
    finish: 'Luminous',
    skintype: 'Dry',
    relatedIds: [3, 4, 7]
  },
  {
    id: 3,
    imgsrc: image9,
    title: 'Lumi-glow Pressed Highlighter',
    Highlight: '3 Highly Luminous shades | 18 hours stay | Non-patchy',
    Price: 'MRP ₹425.00',
    path: '/',
    rating: 4.7,
    reviews: [
      { name: 'Priya R.', rating: 5, comment: 'Blinds everyone! Super pigmented.' }
    ],
    categories: 'Makeup',
    finish: 'Luminous',
    skintype: 'Normal',
    relatedIds: [2, 4, 6]
  },
  {
    id: 4,
    imgsrc: image8,
    title: 'Nourishing powder blush with bee propolis',
    Highlight: 'highly pigmented | silky matte finish | nourishing',
    Price: 'MRP ₹395.00',
    path: '/',
    rating: 4.6,
    reviews: [
      { name: 'Tanya B.', rating: 4, comment: 'Beautiful shade, blends like a dream.' },
      { name: 'Ankita P.', rating: 5, comment: 'Very pigmented, use with a light hand.' }
    ],
    categories: 'Makeup',
    finish: 'Matte',
    skintype: 'Normal',
    relatedIds: [3, 5, 6]
  },
  {
    id: 5,
    imgsrc: image6,
    title: 'Herb enriched ayurvedic lipstick',
    Highlight: 'Nurtures & Repairs | Moisturises',
    Price: 'MRP ₹575.00',
    path: '/',
    rating: 4.9,
    reviews: [
      {
        name: 'Kritika D.', rating: 5, comment: 'Doesn\'t dry out my lips at all.'
      },
      { name: 'Simran K.', rating: 5, comment: 'Perfect nude shade for Indian skin tones.' }
    ],
    categories: 'Makeup',
    finish: 'Matte',
    skintype: 'Normal',
    relatedIds: [4, 6, 8]
  },
  {
    id: 6,
    imgsrc: image2,
    title: 'Nourishing lip and cheek tint',
    Highlight: 'Creamy-matte | Suitable For Pigmented Lips',
    Price: 'MRP ₹695.00',
    path: '/',
    rating: 4.4,
    reviews: [
      { name: 'Pallavi V.', rating: 4, comment: 'Great for everyday office wear.' },
      { name: 'Nisha C.', rating: 5, comment: 'Saves so much time in the morning.' }
    ],
    categories: 'Makeup',
    finish: 'Natural',
    skintype: 'Normal',
    relatedIds: [4, 5, 8]
  },
  {
    id: 7,
    imgsrc: image4,
    title: 'Kimsukadi tail- glow boosting facial oil',
    Highlight: 'Soothes Skin | Nourishes Skin | Imparts Natural Glow',
    Price: 'MRP ₹995.00',
    path: '/',
    rating: 4.8,
    reviews: [
      { name: 'Sonia H.', rating: 5, comment: 'Changed my skincare game!' },
      { name: 'Neha G.', rating: 4, comment: 'A bit heavy for summer, but great for winter.' }
    ],
    categories: 'Skincare',
    finish: 'Luminous',
    skintype: 'Dry',
    relatedIds: [2, 3, 5]
  },
  {
    id: 8,
    imgsrc: image12,
    title: 'Herb enriched matte liquid lipstick',
    Highlight: 'Weightless-matte | Hydrating & Long-lasting',
    Price: 'MRP ₹745.00',
    path: '/',
    rating: 4.7,
    reviews: [
      { name: 'Aditi M.', rating: 5, comment: 'Literally feels like nothing on the lips.' },
      { name: 'Ritu J.', rating: 4, comment: 'Stays through coffee but not an oily meal.' }
    ],
    categories: 'Makeup',
    finish: 'Matte',
    skintype: 'Normal',
    relatedIds: [5, 6, 4]
  },
  {
    id: 9,
    imgsrc: image1,
    title: 'Silksplash Neem-Orange Rehydrant Face Wash',
    Highlight: 'SLS-free | Deep Cleansing | pH Balanced',
    Price: 'MRP ₹495.00',
    path: '/',
    rating: 4.6,
    reviews: [
      { name: 'Shreya', rating: 5, comment: 'Refreshing and gentle.' }
    ],
    categories: 'Skincare',
    finish: 'Natural',
    skintype: 'Oily',
    relatedIds: [7, 2, 6]
  },
  {
    id: 10,
    imgsrc: image7,
    title: 'Jav Kusum Hair Oil',
    Highlight: 'Anti-Hairfall | Ayurvedic Formula | Cold-pressed',
    Price: 'MRP ₹795.00',
    path: '/',
    rating: 4.9,
    reviews: [
      { name: 'Anita', rating: 5, comment: 'Reduced my hairfall significantly.' }
    ],
    categories: 'Haircare',
    finish: 'Natural',
    skintype: 'Normal',
    relatedIds: [2, 4, 7]
  }
]