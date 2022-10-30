import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1667093814329 implements MigrationInterface {
  name = 'migration1667093814329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fileName" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "update_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" bigint NOT NULL, "status" character varying NOT NULL, "imported_t" character varying NOT NULL, "url" character varying NOT NULL, "creator" character varying NOT NULL, "created_t" integer NOT NULL, "last_modified_t" integer NOT NULL, "product_name" character varying NOT NULL, "quantity" character varying NOT NULL, "brands" character varying NOT NULL, "categories" character varying NOT NULL, "labels" character varying NOT NULL, "cities" character varying NOT NULL, "purchase_places" character varying NOT NULL, "stores" character varying NOT NULL, "ingredients_text" text NOT NULL, "traces" character varying NOT NULL, "serving_size" character varying NOT NULL, "serving_quantity" integer NOT NULL, "nutriscore_score" integer NOT NULL, "nutriscore_grade" character varying NOT NULL, "main_category" character varying NOT NULL, "image_url" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "files"`);
  }
}
