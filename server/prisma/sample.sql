--
-- PostgreSQL database dump
--
-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: -
--
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (102, 'plants', 'Plants', NULL);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (103, 'care', 'Care', NULL);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (104, 'indoor', 'Indoor', 102);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (105, 'outdoor', 'Outdoor', 102);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (106, 'succulents', 'Succulents', 104);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (107, 'foliage', 'Foliage', 104);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (108, 'flowering', 'Flowering', 104);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (109, 'air-purifying', 'Air-purifying', 104);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (110, 'trees-shrubs', 'Trees and Shrubs', 105);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (111, 'perennials', 'Perennials', 105);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (112, 'annuals', 'Annuals', 105);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (113, 'vines-climbers', 'Vines and Climbers', 105);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (114, 'edible', 'Edible', 102);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (115, 'herbs', 'Herbs', 114);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (116, 'vegetables', 'Vegetables', 114);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (117, 'fruits', 'Fruits', 114);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (118, 'microgreens', 'Microgreens', 114);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (
    119,
    'soil-fertilizers',
    'Soil and Fertilizers',
    103
  );
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (120, 'potting-soil', 'Potting Soil', 119);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (121, 'fertilizers', 'Fertilizers', 119);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (122, 'compost-mulch', 'Compost and Mulch', 119);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (123, 'pots-planters', 'Pots and Planters', 103);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (124, 'indoor-pots', 'Indoor Pots', 123);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (125, 'outdoor-planters', 'Outdoor Planters', 123);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (
    126,
    'decorative-planters',
    'Decorative Planters',
    123
  );
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (
    127,
    'tools-accessories',
    'Tools and Accessories',
    103
  );
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (128, 'gardening-tools', 'Gardening Tools', 127);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (129, 'plant-supports', 'Plant Supports', 127);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (
    130,
    'plant-care-accessories',
    'Plant Care Accessories',
    127
  );
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (131, 'holiday', 'Holiday', 102);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (132, 'decorative', 'Decorative', 104);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (133, 'low-light', 'Low-light', 104);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (134, 'christmas', 'Christmas', 131);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (135, 'halloween', 'Halloween', 131);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (136, 'valentine', 'Valentine', 131);
INSERT INTO public."Category" (id, slug, name, "parentCategoryId")
VALUES (137, 'lunar-new-year', 'Lunar New Year', 131);
--
-- Data for Name: File; Type: TABLE DATA; Schema: public; Owner: -
--
INSERT INTO public."File" (id, url)
VALUES (
    'products/18175c7c-65a1-4c8e-a76e-14152a9764e2-_0b293f0e-9a45-4273-8d8e-5860c17fe1ad.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/18175c7c-65a1-4c8e-a76e-14152a9764e2-_0b293f0e-9a45-4273-8d8e-5860c17fe1ad.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/656c17ae-015f-4b9c-b414-b6fb1451c68d-_7ecbcc82-bc96-4d78-9ddd-67706c3fb42c.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/656c17ae-015f-4b9c-b414-b6fb1451c68d-_7ecbcc82-bc96-4d78-9ddd-67706c3fb42c.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/048fa62a-bbc4-4f1b-9a45-60f0bab3315b-_833072db-0792-4f46-a356-115be3505367.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/048fa62a-bbc4-4f1b-9a45-60f0bab3315b-_833072db-0792-4f46-a356-115be3505367.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/ba7f5e30-cb1a-4c45-8610-2ddd35cfa88f-_c03fdb01-4566-4f7b-853c-2045a54789d5.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/ba7f5e30-cb1a-4c45-8610-2ddd35cfa88f-_c03fdb01-4566-4f7b-853c-2045a54789d5.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/f6e5329c-96fc-4a79-b19c-3a4a13e1f96e-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/f6e5329c-96fc-4a79-b19c-3a4a13e1f96e-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/2045d1ea-cc5c-496c-9713-e9cd7df570b6-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/2045d1ea-cc5c-496c-9713-e9cd7df570b6-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/35591b6e-20a6-4e21-8bd3-52f4e510e3bc-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/35591b6e-20a6-4e21-8bd3-52f4e510e3bc-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/a5ddd0e9-2827-4bce-b841-f29d4b7d9255-pic-4.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/a5ddd0e9-2827-4bce-b841-f29d4b7d9255-pic-4.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/0ce49a5d-e8b4-435b-920b-e9d2f0b7138e-_1a6fafad-2847-4a65-9a19-4f09ce596c89.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/0ce49a5d-e8b4-435b-920b-e9d2f0b7138e-_1a6fafad-2847-4a65-9a19-4f09ce596c89.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/f6b973e8-4bae-47a0-a93f-c5c401274cb3-_a8f5cc00-7bdf-4d4f-b55a-f4f65e293091.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/f6b973e8-4bae-47a0-a93f-c5c401274cb3-_a8f5cc00-7bdf-4d4f-b55a-f4f65e293091.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/24c23359-571a-43f0-b56a-5d81f123ebe2-_c2b02563-3885-4229-8b8f-d03e049409b3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/24c23359-571a-43f0-b56a-5d81f123ebe2-_c2b02563-3885-4229-8b8f-d03e049409b3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/2e12f589-8885-43c8-9964-e42d4e62e650-_e16725dc-48b4-42b3-b9dc-fb3d71a4ed52.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/2e12f589-8885-43c8-9964-e42d4e62e650-_e16725dc-48b4-42b3-b9dc-fb3d71a4ed52.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/e8015795-e22f-4c92-a16a-2d969ed04b45-_4b1535fa-24a2-4200-8cf3-1ce0ddf1b114.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/e8015795-e22f-4c92-a16a-2d969ed04b45-_4b1535fa-24a2-4200-8cf3-1ce0ddf1b114.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/9b77fe3e-b923-4da6-bc7a-2497d62370c6-_71accbcf-f4de-452d-ad27-2ba3b1800ca6.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/9b77fe3e-b923-4da6-bc7a-2497d62370c6-_71accbcf-f4de-452d-ad27-2ba3b1800ca6.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/bb0cb68f-f08a-42b9-88e6-7f27ddfddf2a-_b57bcfe9-49b6-4c24-ab8a-d1219ca5c2a0.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/bb0cb68f-f08a-42b9-88e6-7f27ddfddf2a-_b57bcfe9-49b6-4c24-ab8a-d1219ca5c2a0.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/4dec7372-7de1-4c88-9e15-955cf3b97974-_c87c9a2c-2f57-447a-8209-01a1eca65157.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/4dec7372-7de1-4c88-9e15-955cf3b97974-_c87c9a2c-2f57-447a-8209-01a1eca65157.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/e1042ce5-86a1-478f-b5af-669561a60042-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/e1042ce5-86a1-478f-b5af-669561a60042-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/21e630f0-9982-4a3e-9e31-21fef945da5f-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/21e630f0-9982-4a3e-9e31-21fef945da5f-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/3c49d08e-ac40-4d04-a927-903fdbce6cc3-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/3c49d08e-ac40-4d04-a927-903fdbce6cc3-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/5cef8379-c886-4d1f-9629-64d571e9b0a1-pic-4.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/5cef8379-c886-4d1f-9629-64d571e9b0a1-pic-4.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/3dcce0d5-6d59-4644-a92b-62719d99a6e5-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/3dcce0d5-6d59-4644-a92b-62719d99a6e5-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/9b88bd4a-b9df-496a-b694-f09ba08cb800-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/9b88bd4a-b9df-496a-b694-f09ba08cb800-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/d769a50d-9373-4780-b5f4-22d5695334da-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/d769a50d-9373-4780-b5f4-22d5695334da-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/ebab26b9-7b8a-4f43-a960-c7c6917c47f0-pic-4.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/ebab26b9-7b8a-4f43-a960-c7c6917c47f0-pic-4.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/cebd2fa6-b069-464d-9bf9-29f2c13341bd-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/cebd2fa6-b069-464d-9bf9-29f2c13341bd-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/37aff175-7238-4aef-9e89-7f7ba40c9cb5-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/37aff175-7238-4aef-9e89-7f7ba40c9cb5-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/c9f8319e-2827-4173-84b5-09ab3ab8f7a7-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/c9f8319e-2827-4173-84b5-09ab3ab8f7a7-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/be2f830b-4aaf-4f34-830c-77173e61bb22-pic-4.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/be2f830b-4aaf-4f34-830c-77173e61bb22-pic-4.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/3ee6b354-39b1-4597-8b6b-bdf7b0f3fe15-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/3ee6b354-39b1-4597-8b6b-bdf7b0f3fe15-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/9505697d-2774-4e74-9c68-3beb651f118b-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/9505697d-2774-4e74-9c68-3beb651f118b-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/20233952-81e9-4eb0-a6ca-94366407cb72-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/20233952-81e9-4eb0-a6ca-94366407cb72-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/84014e93-2f58-406a-b463-afbc4c7c01ed-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/84014e93-2f58-406a-b463-afbc4c7c01ed-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/3b08aa29-a415-4d14-bbd0-e749febc7555-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/3b08aa29-a415-4d14-bbd0-e749febc7555-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/4c735e74-9128-4365-a830-f3578c378580-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/4c735e74-9128-4365-a830-f3578c378580-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/121ff285-f4d3-47ca-b623-3000dc1e7132-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/121ff285-f4d3-47ca-b623-3000dc1e7132-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/43064169-1d49-481d-b9fc-d6dd020113a5-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/43064169-1d49-481d-b9fc-d6dd020113a5-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/b1c933c3-6737-4e93-8f35-cf8797e43b3d-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/b1c933c3-6737-4e93-8f35-cf8797e43b3d-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/1c2ce3f2-30a5-4036-a8e7-2c49eaafea19-pic-4.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/1c2ce3f2-30a5-4036-a8e7-2c49eaafea19-pic-4.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/53e5b799-c91a-4b0f-b184-4074caca842e-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/53e5b799-c91a-4b0f-b184-4074caca842e-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/20bf8e1a-a656-4b6f-845c-6d896bfaedd5-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/20bf8e1a-a656-4b6f-845c-6d896bfaedd5-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/c5abadf7-8bd0-45b7-9d70-cab8703c1162-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/c5abadf7-8bd0-45b7-9d70-cab8703c1162-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/a229f6cb-d402-47d2-a3c2-a62fa676109f-pic-4.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/a229f6cb-d402-47d2-a3c2-a62fa676109f-pic-4.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/89b713e9-b8d9-480a-b652-79c18edfab97-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/89b713e9-b8d9-480a-b652-79c18edfab97-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/734ff023-c322-4cdb-861d-ddd25f7d16cc-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/734ff023-c322-4cdb-861d-ddd25f7d16cc-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/a13e3ca8-8385-4c2d-a151-68dd01a4d7bc-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/a13e3ca8-8385-4c2d-a151-68dd01a4d7bc-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/567ce5e1-1d67-4f8c-b75c-1330b3957ca6-pic-4.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/567ce5e1-1d67-4f8c-b75c-1330b3957ca6-pic-4.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/26c901cf-aedd-4b23-8bfd-215962272312-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/26c901cf-aedd-4b23-8bfd-215962272312-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/91ebe967-c48d-4811-a6c5-83155d75409f-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/91ebe967-c48d-4811-a6c5-83155d75409f-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/1c0dde5d-53e9-4c8b-b2e1-d1ff42bf4443-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/1c0dde5d-53e9-4c8b-b2e1-d1ff42bf4443-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/baf2048a-6623-480d-9f10-418cc6e9e5bb-pic-4.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/baf2048a-6623-480d-9f10-418cc6e9e5bb-pic-4.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/32154c4e-7ed0-4e16-8100-f4f371705f5c-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/32154c4e-7ed0-4e16-8100-f4f371705f5c-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/fa9a9e9b-33bb-4429-b2f2-8c8e167ead3a-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/fa9a9e9b-33bb-4429-b2f2-8c8e167ead3a-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/e32fec62-d19d-4709-9a78-25b65926756e-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/e32fec62-d19d-4709-9a78-25b65926756e-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/09b3a099-f106-47d9-a20d-5f62b0db2dcb-pic-4.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/09b3a099-f106-47d9-a20d-5f62b0db2dcb-pic-4.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/a45a03f2-9ad3-4bdc-a6b5-e9373b4ca3b4-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/a45a03f2-9ad3-4bdc-a6b5-e9373b4ca3b4-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/3fafc493-be24-4535-98dd-c92f1b5dd830-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/3fafc493-be24-4535-98dd-c92f1b5dd830-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/6b5228a1-d3d2-4a69-85ba-52eb0198d137-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/6b5228a1-d3d2-4a69-85ba-52eb0198d137-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/fa977a5e-77d8-475a-b419-1a2c75468b27-pic-4.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/fa977a5e-77d8-475a-b419-1a2c75468b27-pic-4.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/ea24cf93-5e18-42dc-9a15-109001db3418-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/ea24cf93-5e18-42dc-9a15-109001db3418-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/31fb3094-de93-49d2-8f01-1cb522e54641-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/31fb3094-de93-49d2-8f01-1cb522e54641-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/c876ec2d-c620-47d1-97d1-46460fe5a26e-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/c876ec2d-c620-47d1-97d1-46460fe5a26e-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/05b21607-ea58-45ad-b517-29aaa23c3e72-pic-4.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/05b21607-ea58-45ad-b517-29aaa23c3e72-pic-4.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/b7e322a3-e13c-481d-a3d7-afe1ad8d1a49-pic-1.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/b7e322a3-e13c-481d-a3d7-afe1ad8d1a49-pic-1.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/03b7423e-7996-4f92-abf5-78e608448115-pic-2.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/03b7423e-7996-4f92-abf5-78e608448115-pic-2.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/91e712ef-a074-49e9-b1d7-b3e6b2e9da96-pic-3.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/91e712ef-a074-49e9-b1d7-b3e6b2e9da96-pic-3.jpg'
  );
INSERT INTO public."File" (id, url)
VALUES (
    'products/b5cb68a9-c258-4767-8841-35b96caded18-pic-4.jpg',
    'https://varve.s3.us-east-1.amazonaws.com/products/b5cb68a9-c258-4767-8841-35b96caded18-pic-4.jpg'
  );
--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: -
--
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    109,
    'Snake Plant (Sansevieria Trifasciata)',
    'snake-plant',
    'The Elegant Snake Plant, also known as Sansevieria Trifasciata or Mother-in-Law''s Tongue, is a versatile and low-maintenance houseplant perfect for any indoor space. Known for its air-purifying qualities, this plant helps to filter indoor air, removing toxins and improving air quality. With its striking upright leaves and attractive green and yellow variegation, the Elegant Snake Plant adds a touch of natural elegance to your home or office decor.

•  Light Requirements: Thrives in bright, indirect light but can tolerate low light conditions.
•  Watering: Water sparingly; allow the soil to dry between waterings. Overwatering can lead to root rot.
•  Size: Approximately 12-18 inches tall.
•  Pot Included: Comes in a modern, white ceramic pot with drainage holes.

Care Instructions:
•  Light: Place in a well-lit area, away from direct sunlight.
•  Water: Water once every 2-3 weeks, ensuring the soil is dry before watering again.
•  Temperature: Prefers temperatures between 60-85°F (15-29°C).
•  Fertilizer: Feed with a balanced houseplant fertilizer every 2-3 months during the growing season.

Additional Information:
•  Botanical Name: Sansevieria Trifasciata
•  Common Names: Snake Plant, Mother-in-Law''s Tongue
•  Origin: Native to West Africa
•  Toxicity: Toxic to pets if ingested; keep out of reach of cats and dogs.',
    29.99,
    3,
    '2024-05-18 06:42:00.226',
    '2024-05-18 07:02:22.824',
    'Active'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    111,
    'Peace Lily (Spathiphyllum)',
    'peace-lily',
    'The Peace Lily, or Spathiphyllum, is a stunning indoor plant known for its glossy green leaves and elegant white flowers. Renowned for its ability to thrive in low-light conditions and purify the air, the Peace Lily is a perfect addition to any home or office. Its beautiful blooms and easy-care nature make it a favorite among plant enthusiasts.

•  Light Requirements: Thrives in low to bright indirect light.
•  Watering: Keep the soil consistently moist but not waterlogged.
•  Size: Approximately 18-24 inches tall.
•  Pot Included: Comes in a classic, white ceramic pot with drainage holes.

Care Instructions:
•  Light: Place in a well-lit area, avoiding direct sunlight.
•  Water: Water regularly to keep the soil moist but not soggy.
•  Temperature: Prefers temperatures between 65-80°F (18-27°C).
•  Fertilizer: Feed with a balanced houseplant fertilizer every 2-3 months.

Additional Information:
•  Botanical Name: Spathiphyllum
•  Common Names: Peace Lily, White Sail Plant
•  Origin: Native to Central and South America
•  Toxicity: Toxic to pets if ingested; keep out of reach of cats and dogs.',
    34.99,
    2,
    '2024-05-18 06:51:52.59',
    '2024-05-18 07:02:47.654',
    'Archived'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    112,
    'ZZ Plant (Zamioculcas Zamiifolia)',
    'zz-plant',
    'The ZZ Plant, scientifically known as Zamioculcas Zamiifolia, is a popular indoor plant cherished for its striking, glossy green leaves and exceptional resilience. This low-maintenance plant is perfect for both novice and experienced plant parents, thriving in a variety of indoor conditions. Known for its air-purifying abilities, the ZZ Plant helps to create a healthier indoor environment.

•  Light Requirements: Can tolerate low light but prefers bright, indirect light.
•  Watering: Allow the soil to dry out completely between waterings.
•  Size: Approximately 12-24 inches tall.
•  Pot Included: Comes in a sleek, gray plastic pot with drainage holes.

Care Instructions:
•  Light: Place in a location with low to bright indirect light.
•  Water: Water once every 2-3 weeks, ensuring the soil is dry before watering again.
•  Temperature: Thrives in temperatures between 60-75°F (15-24°C).
•  Fertilizer: Feed with a balanced houseplant fertilizer every 3-4 months during the growing season.

Additional Information:
•  Botanical Name: Zamioculcas Zamiifolia
•  Common Names: ZZ Plant, Zanzibar Gem
•  Origin: Native to Eastern Africa
•  Toxicity: Toxic to pets if ingested; keep out of reach of cats and dogs.',
    32.99,
    0,
    '2024-05-18 06:53:40.543',
    '2024-05-18 07:05:19.308',
    'Archived'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    113,
    'Anthurium (Anthurium Andraeanum)',
    'anthurium',
    'The Anthurium, also known as Anthurium Andraeanum or Flamingo Flower, is a stunning indoor plant celebrated for its vibrant, heart-shaped flowers and glossy, dark green leaves. This tropical plant is perfect for adding a touch of color and elegance to any indoor space. With proper care, the Anthurium can bloom year-round, making it a delightful addition to your home or office.

•  Light Requirements: Prefers bright, indirect light but can tolerate lower light conditions.
•  Watering: Keep the soil consistently moist but not waterlogged. Allow the top inch of soil to dry out between waterings.
•  Size: Approximately 18-24 inches tall.
•  Pot Included: Comes in a chic, red ceramic pot with drainage holes.

Care Instructions:
•  Light: Place in a well-lit area with indirect sunlight.
•  Water: Water regularly to keep the soil moist but not soggy.
•  Temperature: Thrives in temperatures between 65-80°F (18-27°C).
•  Fertilizer: Feed with a balanced houseplant fertilizer every 6-8 weeks during the growing season.

Additional Information:
•  Botanical Name: Anthurium Andraeanum
•  Common Names: Flamingo Flower, Laceleaf
•  Origin: Native to Central and South America
•  Toxicity: Toxic to pets if ingested; keep out of reach of cats and dogs.',
    39.99,
    1,
    '2024-05-18 07:13:47.128',
    '2024-05-18 07:13:47.128',
    'Active'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    114,
    'Bromeliad (Bromeliaceae)',
    'bromeliad',
    'The Bromeliad, belonging to the Bromeliaceae family, is a striking indoor plant known for its vibrant, long-lasting flowers and rosette of sturdy leaves. This tropical plant brings a burst of color to any indoor space and is relatively easy to care for. Bromeliads are also known for their unique water-holding capacity in the central cup formed by their leaves, making them fascinating and functional decor pieces.

•  Light Requirements: Prefers bright, indirect light.
•  Watering: Keep the central cup filled with water and mist the leaves regularly. Water the soil sparingly.
•  Size: Approximately 12-18 inches tall.
•  Pot Included: Comes in a modern, black plastic pot with drainage holes.

Care Instructions:
•  Light: Place in a well-lit area with indirect sunlight.
•  Water: Keep the central cup filled with water and mist the leaves regularly.
•  Temperature: Prefers temperatures between 60-80°F (15-27°C).
•  Fertilizer: Feed with a diluted balanced fertilizer every 2-4 weeks during the growing season.

Additional Information:
•  Botanical Name: Bromeliaceae
•  Common Names: Bromeliad
•  Origin: Native to tropical Americas
•  Toxicity: Non-toxic to pets.',
    29.99,
    4,
    '2024-05-18 07:17:50.572',
    '2024-05-18 07:17:50.572',
    'Archived'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    115,
    'Orchid (Orchidaceae)',
    'orchid',
    'The Orchid, part of the Orchidaceae family, is an elegant and exotic indoor plant admired for its stunning blooms and delicate beauty. Orchids are perfect for adding a touch of sophistication to any room and can thrive with proper care. Available in a variety of colors and patterns, orchids are a favorite among plant enthusiasts and make for a lovely gift.

•  Light Requirements: Prefers bright, indirect light.
•  Watering: Water thoroughly when the potting medium is almost dry. Ensure proper drainage.
•  Size: Approximately 18-24 inches tall.
•  Pot Included: Comes in an elegant, white ceramic pot with drainage holes.

Care Instructions:
•  Light: Place in a well-lit area with indirect sunlight.
•  Water: Water thoroughly when the potting medium is almost dry. Ensure proper drainage.
•  Temperature: Thrives in temperatures between 60-75°F (15-24°C).
•  Fertilizer: Feed with an orchid-specific fertilizer every 2-4 weeks during the growing season.

Additional Information:
•  Botanical Name: Orchidaceae
•  Common Names: Orchid
•  Origin: Found worldwide, especially in tropical regions
•  Toxicity: Non-toxic to pets.',
    49.99,
    9,
    '2024-05-18 07:23:33.073',
    '2024-05-18 07:23:33.073',
    'Active'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    116,
    'Cherry Tomato Plant (Solanum Lycopersicum)',
    'cherry-tomato-plant',
    'The Cherry Tomato Plant, scientifically known as Solanum Lycopersicum, is a delightful addition to any vegetable garden or patio container. This compact and prolific plant produces an abundance of sweet and juicy cherry tomatoes throughout the growing season. Perfect for salads, snacking, or adding a burst of flavor to your favorite dishes, the Cherry Tomato Plant is easy to grow and rewarding to harvest.

•  Light Requirements: Requires full sun; place in a location with at least 6-8 hours of sunlight per day.
•  Watering: Keep the soil consistently moist, especially during hot weather.
•  Size: Grows to approximately 18-24 inches tall.
•  Container Included: Comes in a sturdy, plastic container with drainage holes.

Care Instructions:
•  Light: Requires full sun; place in a sunny spot with at least 6-8 hours of sunlight per day.
•  Water: Keep the soil consistently moist, but avoid overwatering to prevent root rot.
•  Temperature: Thrives in temperatures between 65-85°F (18-29°C).
•  Fertilizer: Feed with a balanced vegetable fertilizer every 3-4 weeks during the growing season.

Additional Information:
•  Botanical Name: Solanum Lycopersicum
•  Common Names: Cherry Tomato, Grape Tomato
•  Origin: Native to South America
•  Harvest Time: Expect to harvest ripe tomatoes within 60-80 days after planting.',
    12.99,
    3,
    '2024-05-18 07:30:55.139',
    '2024-05-18 07:30:55.139',
    'Active'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    117,
    'All-Purpose Potting Soil',
    'all-purpose-potting-soil',
    'Our All-Purpose Potting Soil is a premium blend designed to provide the perfect growing medium for a wide variety of indoor and outdoor plants. Formulated with high-quality ingredients, including peat moss, perlite, and composted bark, this soil promotes healthy root development and optimal plant growth. Ideal for potting, repotting, and transplanting, our all-purpose soil is suitable for use with houseplants, vegetables, flowers, and more.

•  Composition: Peat moss, perlite, composted bark, and other organic materials.
•  Usage: Suitable for indoor and outdoor plants in containers, raised beds, and garden beds.
•  Package Size: 1 cubic foot bag (approximately 7.5 gallons).
•  Packaging: Comes in a sturdy, resealable plastic bag for easy storage and use.

Directions for Use:
•  Potting: Fill pots or containers with All-Purpose Potting Soil, leaving space for plant roots.
•  Planting: Plant seeds or transplants according to specific plant instructions.
•  Watering: Water thoroughly after planting and as needed to keep the soil evenly moist.
•  Fertilizing: Use a balanced fertilizer as needed to provide additional nutrients.

Additional Information:
•  Suitable for: Indoor and outdoor plants, including houseplants, vegetables, herbs, flowers, and more.
•  Organic: Contains organic materials for improved soil structure and nutrient retention.
•  pH Balanced: Neutral pH level suitable for a wide range of plant types.',
    9.99,
    4,
    '2024-05-18 07:36:32.893',
    '2024-05-18 07:36:32.893',
    'Active'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    118,
    'Hanging Air Plant Terrarium Kit',
    'hanging-air-plant-terrarium-kit',
    'Create your own miniature garden with our Hanging Air Plant Terrarium Kit. This DIY kit includes everything you need to assemble a stunning terrarium featuring easy-care air plants suspended in a glass globe. Perfect for adding a touch of greenery to any room, this terrarium kit is a great gift for plant lovers and a fun project for all ages.

•  Kit Includes: Glass globe terrarium, assorted air plants, decorative rocks, preserved moss, and hanging materials.
•  Assembly: Easy-to-follow instructions for assembling and caring for your terrarium.
•  Size: Terrarium measures approximately 4 inches in diameter.
•  Maintenance: Air plants require occasional misting and indirect light to thrive.

Contents:
•  Glass Globe Terrarium: Clear glass globe with an opening for placing plants and decorative elements.
•  Assorted Air Plants: Selection of small air plants in various shapes and sizes.
•  Decorative Rocks: Natural stones to add texture and visual interest to your terrarium.
•  Preserved Moss: Soft moss for creating a natural base and enhancing the terrarium''s aesthetics.
•  Hanging Materials: Nylon cord or metal chain for suspending the terrarium from a hook or ceiling.

Additional Information:
•  Care: Mist air plants with water every 1-2 weeks and provide indirect sunlight.
•  Ideal for: Home decor, office desks, and gift-giving for plant enthusiasts.
•  Customization: Add your own personal touch with additional decorations such as shells, crystals, or miniature figurines.',
    29.99,
    2,
    '2024-05-18 07:46:12.43',
    '2024-05-18 07:46:12.43',
    'Active'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    119,
    'Herb Garden Kit (Assorted Herbs)',
    'herb-garden-kit',
    'The Herb Garden Kit is perfect for those looking to grow their own fresh herbs at home. This kit includes everything you need to cultivate a variety of aromatic and flavorful herbs, ideal for enhancing your culinary creations. Each kit contains seeds for basil, parsley, cilantro, and thyme, along with biodegradable pots and soil discs.

•  Light Requirements: Prefers bright, indirect light.
•  Watering: Keep the soil consistently moist but not waterlogged.
•  Size: Each pot is approximately 4 inches in diameter.
•  Kit Includes: Biodegradable pots, soil discs, herb seeds (basil, parsley, cilantro, thyme), and detailed growing instructions.

Care Instructions:
•  Light: Place in a well-lit area with indirect sunlight.
•  Water: Water regularly to keep the soil moist but not soggy.
•  Temperature: Thrives in temperatures between 65-75°F (18-24°C).
•  Fertilizer: Not necessary; the soil discs are enriched with essential nutrients.

Additional Information:
•  Botanical Names: Ocimum basilicum (Basil), Petroselinum crispum (Parsley), Coriandrum sativum (Cilantro), Thymus vulgaris (Thyme)
•  Common Names: Herb Garden Kit
•  Origin: Various regions
•  Toxicity: Non-toxic to pets.',
    19.99,
    2,
    '2024-05-18 07:52:39.939',
    '2024-05-18 07:52:39.939',
    'Draft'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    120,
    'Japanese Maple (Acer Palmatum)',
    'japanese-maple',
    'The Japanese Maple, or Acer Palmatum, is a stunning deciduous tree known for its delicate, deeply lobed leaves and vibrant fall colors. This tree is a favorite in landscapes and gardens for its elegant form and striking foliage. Perfect for adding a touch of serenity and beauty to your outdoor space, the Japanese Maple is relatively easy to care for and can be a focal point in any garden.

•  Light Requirements: Prefers partial shade to full sun.
•  Watering: Keep the soil consistently moist but well-drained.
•  Size: Can grow up to 10-25 feet tall and wide.

Care Instructions:
•  Light: Plant in an area with partial shade to full sun.
•  Water: Water regularly to keep the soil moist but not waterlogged.
•  Temperature: Thrives in USDA hardiness zones 5-8.
•  Fertilizer: Feed with a balanced fertilizer in spring.

Additional Information:
•  Botanical Name: Acer Palmatum
•  Common Names: Japanese Maple
•  Origin: Native to Japan, Korea, and China
•  Toxicity: Non-toxic to pets.',
    59.99,
    5,
    '2024-05-19 03:53:30.872',
    '2024-05-19 03:53:30.872',
    'Active'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    110,
    'Golden Pothos (Epipremnum Aureum)',
    'golden-pothos',
    'Product Description:
The Golden Pothos, also known as Epipremnum Aureum, is a popular and resilient houseplant known for its trailing vines and vibrant green leaves with golden-yellow variegation. This easy-to-care-for plant is perfect for beginners and can thrive in a variety of indoor conditions, making it a versatile addition to any home or office. The Golden Pothos is also known for its air-purifying properties, helping to remove toxins from the air.

•  Light Requirements: Prefers bright, indirect light but can tolerate low light conditions.
•  Watering: Water when the top inch of soil feels dry. Avoid overwatering.
•  Size: Vines can grow up to 6-10 feet long.
•  Pot Included: Comes in a stylish, black plastic pot with drainage holes.

Care Instructions:
•  Light: Place in a well-lit area with indirect sunlight.
•  Water: Water once a week or when the top inch of soil is dry.
•  Temperature: Thrives in temperatures between 60-80°F (15-27°C).
•  Fertilizer: Feed with a balanced houseplant fertilizer every 4-6 weeks during the growing season.

Additional Information:
•  Botanical Name: Epipremnum Aureum
•  Common Names: Golden Pothos, Devil''s Ivy
•  Origin: Native to Southeast Asia
•  Toxicity: Toxic to pets if ingested; keep out of reach of cats and dogs.',
    24.99,
    0,
    '2024-05-18 06:47:13.476',
    '2024-05-19 13:36:58.209',
    'Active'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    121,
    'Black-Eyed Susan (Rudbeckia Hirta)',
    'black-eyed-susan',
    'The Black-Eyed Susan, scientifically known as Rudbeckia Hirta, is a cheerful perennial that brings bright yellow flowers with dark centers to your garden. These hardy and drought-tolerant plants are perfect for adding color to borders, flower beds, and wildflower gardens. Blooming from summer to fall, Black-Eyed Susans attract butterflies and pollinators, enhancing the ecological health of your garden.

•  Light Requirements: Prefers full sun.
•  Watering: Water regularly until established, then water occasionally.
•  Size: Grows 2-3 feet tall and 1-2 feet wide.
•  Pot Included: Comes in a biodegradable nursery pot ready for planting.

Care Instructions:
•  Light: Plant in an area with full sun exposure.
•  Water: Water regularly until established, then water occasionally.
•  Temperature: Thrives in USDA hardiness zones 3-9.
•  Fertilizer: Feed with a balanced fertilizer in spring.

Additional Information:
•  Botanical Name: Rudbeckia Hirta
•  Common Names: Black-Eyed Susan
•  Origin: Native to North America
•  Toxicity: Non-toxic to pets.',
    19.99,
    0,
    '2024-05-21 14:06:48.983',
    '2024-05-21 14:06:48.983',
    'Active'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    122,
    'Sweet Potato Vine (Ipomoea Batatas)',
    'sweet-potato-vine',
    'The Sweet Potato Vine, or Ipomoea Batatas, is a fast-growing and versatile vine known for its vibrant foliage and vigorous growth. Available in a variety of colors, including chartreuse and deep purple, this plant is perfect for adding dramatic visual interest to containers, hanging baskets, and garden beds. The Sweet Potato Vine is easy to grow and maintain, making it a popular choice for gardeners of all levels.

•  Light Requirements: Thrives in full sun to partial shade.
•  Watering: Keep the soil consistently moist but well-drained.
•  Size: Can grow up to 10 feet long.
•  Pot Included: Comes in a nursery pot ready for planting.

Care Instructions:
•  Light: Plant in an area with full sun to partial shade.
•  Water: Keep the soil consistently moist but not waterlogged.
•  Temperature: Thrives in USDA hardiness zones 8-11.
•  Fertilizer: Feed with a balanced fertilizer every 4-6 weeks during the growing season.

Additional Information:
•  Botanical Name: Ipomoea Batatas
•  Common Names: Sweet Potato Vine
•  Origin: Native to Central and South America
•  Toxicity: Non-toxic to pets.',
    14.99,
    2,
    '2024-05-21 14:17:24.035',
    '2024-05-21 14:17:24.035',
    'Active'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    123,
    'Meyer Lemon Tree (Citrus × meyeri)',
    'meyer-lemon-tree',
    'The Meyer Lemon Tree, scientifically known as Citrus × meyeri, is a compact and prolific fruit-bearing tree perfect for growing indoors or on patios. This tree produces sweet and tangy lemons that are slightly less acidic than regular lemons, making them ideal for culinary use. With its fragrant white flowers and glossy green leaves, the Meyer Lemon Tree is both beautiful and functional, providing fresh lemons year-round.

•  Light Requirements: Requires full sun (at least 6-8 hours of direct sunlight daily).
Watering: Water thoroughly when the top inch of soil feels dry. Ensure proper drainage to prevent root rot.
•  Size: Approximately 2-3 feet tall.
•  Pot Included: Comes in a decorative, terracotta pot with drainage holes.

Care Instructions:
•  Light: Place in a sunny location with direct sunlight.
•  Water: Water thoroughly when the top inch of soil feels dry.
•  Temperature: Prefers temperatures between 50-85°F (10-29°C). Protect from frost.
•  Fertilizer: Feed with a citrus-specific fertilizer every 4-6 weeks during the growing season.

Additional Information:
•  Botanical Name: Citrus × meyeri
•  Common Names: Meyer Lemon Tree
•  Origin: Native to China
•  Toxicity: Non-toxic to pets.',
    59.99,
    1,
    '2024-05-21 14:19:50.098',
    '2024-05-21 14:19:50.098',
    'Active'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    124,
    'Dwarf Banana Plant (Musa acuminata)',
    'dwarf-banana-plant',
    'The Dwarf Banana Plant, known scientifically as Musa acuminata, is a compact and attractive plant that can be grown indoors or in containers. This plant produces small, sweet bananas that are perfect for snacking and smoothies. With its broad, tropical leaves and ability to bear fruit, the Dwarf Banana Plant adds a tropical touch to your home while providing delicious and nutritious bananas.

Light Requirements: Prefers bright, indirect light but can tolerate some direct sunlight.
Watering: Keep the soil consistently moist but not waterlogged. Water when the top inch of soil feels dry.
Size: Approximately 3-4 feet tall.
Pot Included: Comes in a rustic, clay pot with drainage holes.

Care Instructions:
•  Light: Place in a bright location with indirect sunlight.
•  Water: Water regularly to keep the soil moist but not soggy.
•  Temperature: Thrives in temperatures between 60-85°F (15-29°C). Protect from cold drafts.
•  Fertilizer: Feed with a balanced, slow-release fertilizer every 2-3 months during the growing season.

Additional Information:
•  Botanical Name: Musa acuminata
•  Common Names: Dwarf Banana Plant
•  Origin: Native to Southeast Asia
•  Toxicity: Non-toxic to pets.',
    49.99,
    3,
    '2024-05-21 14:38:23.593',
    '2024-05-21 14:38:23.593',
    'Active'
  );
INSERT INTO public."Product" (
    id,
    name,
    slug,
    "desc",
    price,
    "inStock",
    "createdAt",
    "updatedAt",
    status
  )
VALUES (
    125,
    'Fig Tree (Ficus carica)',
    'fig-tree',
    'The Fig Tree, or Ficus carica, is a versatile and easy-to-grow fruit tree that can thrive indoors or on patios. This tree produces delicious, sweet figs that are perfect for fresh eating, baking, and preserves. With its large, lobed leaves and attractive form, the Fig Tree adds beauty to any space while providing a bountiful harvest of figs.

•  Light Requirements: Requires full sun (at least 6-8 hours of direct sunlight daily).
•  Watering: Water when the top inch of soil feels dry. Ensure proper drainage to prevent waterlogging.
•  Size: Approximately 3-4 feet tall.
•  Pot Included: Comes in a stylish, white ceramic pot with drainage holes.

Care Instructions:
•  Light: Place in a sunny location with direct sunlight.
•  Water: Water when the top inch of soil feels dry.
•  Temperature: Prefers temperatures between 60-85°F (15-29°C). Can tolerate cooler temperatures but protect from frost.
•  Fertilizer: Feed with a balanced fertilizer every 4-6 weeks during the growing season.

Additional Information:
•  Botanical Name: Ficus carica
•  Common Names: Fig Tree
•  Origin: Native to the Middle East and Western Asia
•  Toxicity: Non-toxic to pets.',
    54.99,
    0,
    '2024-05-21 14:45:06.484',
    '2024-05-21 14:46:21.373',
    'Active'
  );
--
-- Data for Name: Image; Type: TABLE DATA; Schema: public; Owner: -
--
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/18175c7c-65a1-4c8e-a76e-14152a9764e2-_0b293f0e-9a45-4273-8d8e-5860c17fe1ad.jpg',
    109
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/656c17ae-015f-4b9c-b414-b6fb1451c68d-_7ecbcc82-bc96-4d78-9ddd-67706c3fb42c.jpg',
    109
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/048fa62a-bbc4-4f1b-9a45-60f0bab3315b-_833072db-0792-4f46-a356-115be3505367.jpg',
    109
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/ba7f5e30-cb1a-4c45-8610-2ddd35cfa88f-_c03fdb01-4566-4f7b-853c-2045a54789d5.jpg',
    109
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/f6e5329c-96fc-4a79-b19c-3a4a13e1f96e-pic-1.jpg',
    110
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/2045d1ea-cc5c-496c-9713-e9cd7df570b6-pic-2.jpg',
    110
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/35591b6e-20a6-4e21-8bd3-52f4e510e3bc-pic-3.jpg',
    110
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/a5ddd0e9-2827-4bce-b841-f29d4b7d9255-pic-4.jpg',
    110
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/0ce49a5d-e8b4-435b-920b-e9d2f0b7138e-_1a6fafad-2847-4a65-9a19-4f09ce596c89.jpg',
    111
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/f6b973e8-4bae-47a0-a93f-c5c401274cb3-_a8f5cc00-7bdf-4d4f-b55a-f4f65e293091.jpg',
    111
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/24c23359-571a-43f0-b56a-5d81f123ebe2-_c2b02563-3885-4229-8b8f-d03e049409b3.jpg',
    111
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/2e12f589-8885-43c8-9964-e42d4e62e650-_e16725dc-48b4-42b3-b9dc-fb3d71a4ed52.jpg',
    111
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/e8015795-e22f-4c92-a16a-2d969ed04b45-_4b1535fa-24a2-4200-8cf3-1ce0ddf1b114.jpg',
    112
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/9b77fe3e-b923-4da6-bc7a-2497d62370c6-_71accbcf-f4de-452d-ad27-2ba3b1800ca6.jpg',
    112
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/bb0cb68f-f08a-42b9-88e6-7f27ddfddf2a-_b57bcfe9-49b6-4c24-ab8a-d1219ca5c2a0.jpg',
    112
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/4dec7372-7de1-4c88-9e15-955cf3b97974-_c87c9a2c-2f57-447a-8209-01a1eca65157.jpg',
    112
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/e1042ce5-86a1-478f-b5af-669561a60042-pic-1.jpg',
    113
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/21e630f0-9982-4a3e-9e31-21fef945da5f-pic-2.jpg',
    113
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/3c49d08e-ac40-4d04-a927-903fdbce6cc3-pic-3.jpg',
    113
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/5cef8379-c886-4d1f-9629-64d571e9b0a1-pic-4.jpg',
    113
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/3dcce0d5-6d59-4644-a92b-62719d99a6e5-pic-1.jpg',
    114
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/9b88bd4a-b9df-496a-b694-f09ba08cb800-pic-2.jpg',
    114
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/d769a50d-9373-4780-b5f4-22d5695334da-pic-3.jpg',
    114
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/ebab26b9-7b8a-4f43-a960-c7c6917c47f0-pic-4.jpg',
    114
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/cebd2fa6-b069-464d-9bf9-29f2c13341bd-pic-1.jpg',
    115
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/37aff175-7238-4aef-9e89-7f7ba40c9cb5-pic-2.jpg',
    115
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/c9f8319e-2827-4173-84b5-09ab3ab8f7a7-pic-3.jpg',
    115
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/be2f830b-4aaf-4f34-830c-77173e61bb22-pic-4.jpg',
    115
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/3ee6b354-39b1-4597-8b6b-bdf7b0f3fe15-pic-1.jpg',
    116
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/9505697d-2774-4e74-9c68-3beb651f118b-pic-2.jpg',
    116
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/20233952-81e9-4eb0-a6ca-94366407cb72-pic-3.jpg',
    116
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/84014e93-2f58-406a-b463-afbc4c7c01ed-pic-1.jpg',
    117
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/3b08aa29-a415-4d14-bbd0-e749febc7555-pic-2.jpg',
    117
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/4c735e74-9128-4365-a830-f3578c378580-pic-3.jpg',
    117
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/121ff285-f4d3-47ca-b623-3000dc1e7132-pic-1.jpg',
    118
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/43064169-1d49-481d-b9fc-d6dd020113a5-pic-2.jpg',
    118
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/b1c933c3-6737-4e93-8f35-cf8797e43b3d-pic-3.jpg',
    118
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/1c2ce3f2-30a5-4036-a8e7-2c49eaafea19-pic-4.jpg',
    118
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/53e5b799-c91a-4b0f-b184-4074caca842e-pic-1.jpg',
    119
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/20bf8e1a-a656-4b6f-845c-6d896bfaedd5-pic-2.jpg',
    119
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/c5abadf7-8bd0-45b7-9d70-cab8703c1162-pic-3.jpg',
    119
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/a229f6cb-d402-47d2-a3c2-a62fa676109f-pic-4.jpg',
    119
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/89b713e9-b8d9-480a-b652-79c18edfab97-pic-1.jpg',
    120
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/734ff023-c322-4cdb-861d-ddd25f7d16cc-pic-2.jpg',
    120
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/a13e3ca8-8385-4c2d-a151-68dd01a4d7bc-pic-3.jpg',
    120
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/567ce5e1-1d67-4f8c-b75c-1330b3957ca6-pic-4.jpg',
    120
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/26c901cf-aedd-4b23-8bfd-215962272312-pic-1.jpg',
    121
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/91ebe967-c48d-4811-a6c5-83155d75409f-pic-2.jpg',
    121
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/1c0dde5d-53e9-4c8b-b2e1-d1ff42bf4443-pic-3.jpg',
    121
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/baf2048a-6623-480d-9f10-418cc6e9e5bb-pic-4.jpg',
    121
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/32154c4e-7ed0-4e16-8100-f4f371705f5c-pic-1.jpg',
    122
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/fa9a9e9b-33bb-4429-b2f2-8c8e167ead3a-pic-2.jpg',
    122
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/e32fec62-d19d-4709-9a78-25b65926756e-pic-3.jpg',
    122
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/09b3a099-f106-47d9-a20d-5f62b0db2dcb-pic-4.jpg',
    122
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/a45a03f2-9ad3-4bdc-a6b5-e9373b4ca3b4-pic-1.jpg',
    123
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/3fafc493-be24-4535-98dd-c92f1b5dd830-pic-2.jpg',
    123
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/6b5228a1-d3d2-4a69-85ba-52eb0198d137-pic-3.jpg',
    123
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/fa977a5e-77d8-475a-b419-1a2c75468b27-pic-4.jpg',
    123
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/ea24cf93-5e18-42dc-9a15-109001db3418-pic-1.jpg',
    124
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/31fb3094-de93-49d2-8f01-1cb522e54641-pic-2.jpg',
    124
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/c876ec2d-c620-47d1-97d1-46460fe5a26e-pic-3.jpg',
    124
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/05b21607-ea58-45ad-b517-29aaa23c3e72-pic-4.jpg',
    124
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/b7e322a3-e13c-481d-a3d7-afe1ad8d1a49-pic-1.jpg',
    125
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/03b7423e-7996-4f92-abf5-78e608448115-pic-2.jpg',
    125
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/91e712ef-a074-49e9-b1d7-b3e6b2e9da96-pic-3.jpg',
    125
  );
INSERT INTO public."Image" ("fileId", "productId")
VALUES (
    'products/b5cb68a9-c258-4767-8841-35b96caded18-pic-4.jpg',
    125
  );
--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: -
--
INSERT INTO public."Order" (
    id,
    customer,
    email,
    phone,
    line1,
    line2,
    state,
    city,
    "postalCode",
    country,
    total,
    "shippingCost",
    "createdAt",
    "deliveredAt",
    tax
  )
VALUES (
    '3PIRNsLSaS4OxJUp1Xfmmq9d',
    'Tim Foo',
    'tim@foo.com',
    '+12015554444',
    '27 Fredrick Ave',
    NULL,
    'OR',
    'Brother',
    '97712',
    'US',
    102,
    0,
    '2024-05-20 08:15:46.896',
    NULL,
    0
  );
INSERT INTO public."Order" (
    id,
    customer,
    email,
    phone,
    line1,
    line2,
    state,
    city,
    "postalCode",
    country,
    total,
    "shippingCost",
    "createdAt",
    "deliveredAt",
    tax
  )
VALUES (
    '3PIRTQLSaS4OxJUp1crbKjfj',
    'Mark Suck My Butt',
    'mark@suckmybutt.com',
    '+12012345678',
    '1 Fucker Way',
    NULL,
    'OR',
    'Silicon Valley',
    '94301',
    'US',
    204,
    15,
    '2024-04-14 06:56:10.822',
    NULL,
    0
  );
INSERT INTO public."Order" (
    id,
    customer,
    email,
    phone,
    line1,
    line2,
    state,
    city,
    "postalCode",
    country,
    total,
    "shippingCost",
    "createdAt",
    "deliveredAt",
    tax
  )
VALUES (
    '3PIkuVLSaS4OxJUp12fADLy2',
    'Shiba',
    'shiba@fukuda.com',
    '+819012345678',
    '東京都港区麻布台1丁目9番地12号',
    NULL,
    '東京都',
    NULL,
    '1000000',
    'JP',
    172,
    0,
    '2024-05-21 05:06:45.415',
    '2024-05-21 13:21:51.6',
    0
  );
INSERT INTO public."Order" (
    id,
    customer,
    email,
    phone,
    line1,
    line2,
    state,
    city,
    "postalCode",
    country,
    total,
    "shippingCost",
    "createdAt",
    "deliveredAt",
    tax
  )
VALUES (
    '3PIXjILSaS4OxJUp0RyLpCmP',
    'Galo Acacia',
    'galo@acacia.com',
    '+84912345678',
    '1 Ha Tay',
    NULL,
    'Hà Nội',
    'Ha Tay',
    '100000',
    'VN',
    270,
    15,
    '2023-05-20 15:02:18.089',
    '2024-05-21 13:44:26.83',
    0
  );
INSERT INTO public."Order" (
    id,
    customer,
    email,
    phone,
    line1,
    line2,
    state,
    city,
    "postalCode",
    country,
    total,
    "shippingCost",
    "createdAt",
    "deliveredAt",
    tax
  )
VALUES (
    '3PIuEuLSaS4OxJUp1KeyL6XY',
    'TT Anh',
    'anhtt@galo.com',
    '+84914234567',
    '34 Nguyen Hue',
    NULL,
    'Thành phố Hồ Chí Minh',
    'Thu Duc',
    '721400',
    'VN',
    199,
    0,
    '2024-03-12 05:04:33.852',
    NULL,
    0
  );
--
-- Data for Name: OrdersOnProducts; Type: TABLE DATA; Schema: public; Owner: -
--
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (115, '3PIRNsLSaS4OxJUp1Xfmmq9d', 1);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (113, '3PIRNsLSaS4OxJUp1Xfmmq9d', 1);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (116, '3PIRNsLSaS4OxJUp1Xfmmq9d', 1);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (109, '3PIRTQLSaS4OxJUp1crbKjfj', 3);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (115, '3PIRTQLSaS4OxJUp1crbKjfj', 2);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (109, '3PIXjILSaS4OxJUp0RyLpCmP', 3);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (115, '3PIXjILSaS4OxJUp0RyLpCmP', 2);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (116, '3PIXjILSaS4OxJUp0RyLpCmP', 2);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (113, '3PIXjILSaS4OxJUp0RyLpCmP', 1);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (118, '3PIkuVLSaS4OxJUp12fADLy2', 2);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (113, '3PIkuVLSaS4OxJUp12fADLy2', 1);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (116, '3PIkuVLSaS4OxJUp12fADLy2', 1);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (109, '3PIkuVLSaS4OxJUp12fADLy2', 2);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (124, '3PIuEuLSaS4OxJUp1KeyL6XY', 2);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (123, '3PIuEuLSaS4OxJUp1KeyL6XY', 1);
INSERT INTO public."OrdersOnProducts" ("productId", "orderId", qty)
VALUES (113, '3PIuEuLSaS4OxJUp1KeyL6XY', 1);
--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--
INSERT INTO public."User" (
    id,
    "firstName",
    "lastName",
    email,
    password,
    "createdAt",
    "updatedAt",
    roles
  )
VALUES (
    1,
    'Tim',
    'Foo',
    'tim@foo.com',
    '$argon2id$v=19$m=65536,t=3,p=4$rEvJVfFpaokgOcsiPC2lVw$PnHEoikY3A+MCYXh+N03EqKD/BHWxEWmVv22y+0Nrx0',
    '2024-05-13 01:49:51.015',
    '2024-05-13 01:50:17.404',
    '{User,Admin}'
  );
--
-- Data for Name: _CategoryToProduct; Type: TABLE DATA; Schema: public; Owner: -
--
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 109);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (104, 109);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (109, 109);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 110);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (104, 110);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (107, 110);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 111);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (104, 111);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (108, 111);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 112);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (104, 112);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (109, 112);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (133, 112);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 113);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (104, 113);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (108, 113);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 114);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (104, 114);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (108, 114);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 115);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (104, 115);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (108, 115);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 116);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (114, 116);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (116, 116);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (103, 117);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (119, 117);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (120, 117);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (103, 118);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (127, 118);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (130, 118);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 119);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (114, 119);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (115, 119);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 120);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (105, 120);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (110, 120);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 121);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (105, 121);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (111, 121);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 122);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (105, 122);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (113, 122);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 123);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (114, 123);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (117, 123);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 124);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (114, 124);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (117, 124);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (102, 125);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (114, 125);
INSERT INTO public."_CategoryToProduct" ("A", "B")
VALUES (117, 125);
--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--
INSERT INTO public._prisma_migrations (
    id,
    checksum,
    finished_at,
    migration_name,
    logs,
    rolled_back_at,
    started_at,
    applied_steps_count
  )
VALUES (
    '2dfaa19d-8473-45c5-a08c-c373d4ccb93a',
    '849bb26afd43f6cec77810bff771ecff44ec13e86394cd56e08991c823800a52',
    '2024-05-20 08:47:58.444118+00',
    '20240512044804_update_schema_v2',
    NULL,
    NULL,
    '2024-05-20 08:47:58.282333+00',
    1
  );
INSERT INTO public._prisma_migrations (
    id,
    checksum,
    finished_at,
    migration_name,
    logs,
    rolled_back_at,
    started_at,
    applied_steps_count
  )
VALUES (
    'ce9549b8-07b7-496b-b406-c047c85247e6',
    'd1d373452e9f33140c15844ca2a1b717c0bc3202cc0034dc599db1a381e86dfc',
    '2024-05-20 08:47:58.472343+00',
    '20240516051204_update_order_schema',
    NULL,
    NULL,
    '2024-05-20 08:47:58.450669+00',
    1
  );
INSERT INTO public._prisma_migrations (
    id,
    checksum,
    finished_at,
    migration_name,
    logs,
    rolled_back_at,
    started_at,
    applied_steps_count
  )
VALUES (
    'fa859d7f-3f6b-4e7e-a687-0681baef7b0e',
    'a1ad5dde2222d6f5ec9050a562c2506163c996b20373a36395733c9216e73e1d',
    '2024-05-20 08:47:59.6552+00',
    '20240520084759_remove_card_fields_on_orders',
    NULL,
    NULL,
    '2024-05-20 08:47:59.633493+00',
    1
  );
INSERT INTO public._prisma_migrations (
    id,
    checksum,
    finished_at,
    migration_name,
    logs,
    rolled_back_at,
    started_at,
    applied_steps_count
  )
VALUES (
    '5135ccc2-75c9-4d1e-9f1f-9c103dba5eeb',
    '849bb26afd43f6cec77810bff771ecff44ec13e86394cd56e08991c823800a52',
    '2024-05-12 04:48:05.050539+00',
    '20240512044804_update_schema_v2',
    NULL,
    NULL,
    '2024-05-12 04:48:04.943868+00',
    1
  );
INSERT INTO public._prisma_migrations (
    id,
    checksum,
    finished_at,
    migration_name,
    logs,
    rolled_back_at,
    started_at,
    applied_steps_count
  )
VALUES (
    '44789378-3e74-4e1c-999c-d51951166102',
    'd1d373452e9f33140c15844ca2a1b717c0bc3202cc0034dc599db1a381e86dfc',
    '2024-05-16 05:12:04.160009+00',
    '20240516051204_update_order_schema',
    NULL,
    NULL,
    '2024-05-16 05:12:04.140944+00',
    1
  );
--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public."Category_id_seq"', 137, true);
--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public."Product_id_seq"', 125, true);
--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public."User_id_seq"', 1, true);
--
-- PostgreSQL database dump complete
- -