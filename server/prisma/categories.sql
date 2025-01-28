-- Women
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women', 'Women', NULL);
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-clothing', 'Clothing', (SELECT id FROM public."Category" WHERE slug = 'women'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-tops', 'Tops', (SELECT id FROM public."Category" WHERE slug = 'women-clothing'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-dresses', 'Dresses', (SELECT id FROM public."Category" WHERE slug = 'women-clothing'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-bottoms', 'Bottoms', (SELECT id FROM public."Category" WHERE slug = 'women-clothing'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-outerwear', 'Outerwear', (SELECT id FROM public."Category" WHERE slug = 'women-clothing'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-activewear', 'Activewear', (SELECT id FROM public."Category" WHERE slug = 'women-clothing'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-sleepwear', 'Sleepwear', (SELECT id FROM public."Category" WHERE slug = 'women-clothing'));

INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-footwear', 'Footwear', (SELECT id FROM public."Category" WHERE slug = 'women'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-sneakers', 'Sneakers', (SELECT id FROM public."Category" WHERE slug = 'women-footwear'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-heels', 'Heels', (SELECT id FROM public."Category" WHERE slug = 'women-footwear'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-flats', 'Flats', (SELECT id FROM public."Category" WHERE slug = 'women-footwear'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-boots', 'Boots', (SELECT id FROM public."Category" WHERE slug = 'women-footwear'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-sandals', 'Sandals', (SELECT id FROM public."Category" WHERE slug = 'women-footwear'));

INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-accessories', 'Accessories', (SELECT id FROM public."Category" WHERE slug = 'women'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-bags', 'Bags', (SELECT id FROM public."Category" WHERE slug = 'women-accessories'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-jewelry', 'Jewelry', (SELECT id FROM public."Category" WHERE slug = 'women-accessories'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-scarves-wraps', 'Scarves & Wraps', (SELECT id FROM public."Category" WHERE slug = 'women-accessories'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-belts', 'Belts', (SELECT id FROM public."Category" WHERE slug = 'women-accessories'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-sunglasses', 'Sunglasses', (SELECT id FROM public."Category" WHERE slug = 'women-accessories'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('women-socks', 'Socks', (SELECT id FROM public."Category" WHERE slug = 'women-accessories'));

-- Men
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men', 'Men', NULL);
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-clothing', 'Clothing', (SELECT id FROM public."Category" WHERE slug = 'men'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-tops', 'Tops', (SELECT id FROM public."Category" WHERE slug = 'men-clothing'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-bottoms', 'Bottoms', (SELECT id FROM public."Category" WHERE slug = 'men-clothing'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-outerwear', 'Outerwear', (SELECT id FROM public."Category" WHERE slug = 'men-clothing'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-activewear', 'Activewear', (SELECT id FROM public."Category" WHERE slug = 'men-clothing'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-sleepwear', 'Sleepwear', (SELECT id FROM public."Category" WHERE slug = 'men-clothing'));

INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-footwear', 'Footwear', (SELECT id FROM public."Category" WHERE slug = 'men'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-sneakers', 'Sneakers', (SELECT id FROM public."Category" WHERE slug = 'men-footwear'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-dress-shoes', 'Dress Shoes', (SELECT id FROM public."Category" WHERE slug = 'men-footwear'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-boots', 'Boots', (SELECT id FROM public."Category" WHERE slug = 'men-footwear'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-sandals-flip-flops', 'Sandals & Flip-Flops', (SELECT id FROM public."Category" WHERE slug = 'men-footwear'));

INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-accessories', 'Accessories', (SELECT id FROM public."Category" WHERE slug = 'men'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-bags', 'Bags', (SELECT id FROM public."Category" WHERE slug = 'men-accessories'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-watches', 'Watches', (SELECT id FROM public."Category" WHERE slug = 'men-accessories'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-belts', 'Belts', (SELECT id FROM public."Category" WHERE slug = 'men-accessories'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-hats', 'Hats', (SELECT id FROM public."Category" WHERE slug = 'men-accessories'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-sunglasses', 'Sunglasses', (SELECT id FROM public."Category" WHERE slug = 'men-accessories'));
INSERT INTO public."Category" (slug, name, "parentCategoryId") VALUES ('men-socks', 'Socks', (SELECT id FROM public."Category" WHERE slug = 'men-accessories'));
