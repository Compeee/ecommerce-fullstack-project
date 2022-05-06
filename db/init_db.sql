CREATE TABLE IF NOT EXISTS public.users
  (
    id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(60) COLLATE pg_catalog."default" NOT NULL,
    role character varying(50) COLLATE pg_catalog."default" NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS public.items
  (
    id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    description character varying(500) COLLATE pg_catalog."default" NOT NULL,
    image character varying(200) COLLATE pg_catalog."default" NOT NULL,
    price character varying(100) COLLATE pg_catalog."default" NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT items_pkey PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS public.reviews
  (
    id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    review character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    item character varying(50) COLLATE pg_catalog."default" NOT NULL,
    creator character varying(36) COLLATE pg_catalog."default" NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT reviews_pkey PRIMARY KEY (id)
  );