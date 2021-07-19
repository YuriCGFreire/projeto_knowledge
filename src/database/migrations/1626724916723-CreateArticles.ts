import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateArticles1626724916723 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "articles",
            columns:[
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "image_url",
                    type: "varchar"
                },
                {
                    name: "content",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "user_id",
                    type: "uuid"
                },
                {
                    name: "category_id",
                    type: "uuid"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    name: "FKCategory",
                    referencedTableName:"categories",
                    referencedColumnNames: ["id"], 
                    columnNames: ["category_id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                },
                {
                    name: "FKUser",
                    referencedTableName:"users",
                    referencedColumnNames: ["id"], 
                    columnNames: ["user_id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("articles")
    }

}
