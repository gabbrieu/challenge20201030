import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1666986298403 implements MigrationInterface {
  name = 'migration1666986298403';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("code" integer NOT NULL, "status" character varying NOT NULL, "imported_t" character varying NOT NULL, "url" character varying NOT NULL, "creator" character varying NOT NULL, "created_t" integer NOT NULL, "last_modified_t" integer NOT NULL, "product_name" character varying NOT NULL, "quantity" character varying NOT NULL, "brands" character varying NOT NULL, "categories" character varying NOT NULL, "labels" character varying NOT NULL, "cities" character varying NOT NULL, "purchase_places" character varying NOT NULL, "stores" character varying NOT NULL, "ingredients_text" text NOT NULL, "traces" character varying NOT NULL, "serving_size" character varying NOT NULL, "serving_quantity" integer NOT NULL, "nutriscore_score" integer NOT NULL, "nutriscore_grade" character varying NOT NULL, "main_category" character varying NOT NULL, "image_url" character varying NOT NULL, CONSTRAINT "PK_7cfc24d6c24f0ec91294003d6b8" PRIMARY KEY ("code"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
