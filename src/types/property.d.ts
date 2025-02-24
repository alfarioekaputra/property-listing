type Property = {
  id: string;
  slug: string;
  title: string;
  price: string;
  image: string;
  location: string;
  description: string;
  features: Features;
  additionalImages: string[];
};

type Features = {
  bedrooms: number;
  bathrooms: number;
  area: string;
  garage: string;
};
