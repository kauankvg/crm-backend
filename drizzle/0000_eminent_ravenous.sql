CREATE TABLE "clientes" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(100) NOT NULL,
	"cpfCnpj" varchar(18) NOT NULL,
	"email" varchar(255),
	"telefone" varchar(20),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "clientes_cpfCnpj_unique" UNIQUE("cpfCnpj")
);
