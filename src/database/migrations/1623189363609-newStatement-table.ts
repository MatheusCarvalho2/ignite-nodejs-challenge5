import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class newStatementTable1623189363609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'newStatements',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                },
                {
                    name: 'sender_id',
                    type: "uuid",
                    isNullable: true
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'amount',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                },
                {
                    name: 'type',
                    type: 'enum',
                    enum: ['deposit', 'withdraw', 'transfer']
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: 'statements',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: "FKSenderUserStatement",
                    columnNames: ["sender_id"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('newStatements');
    }

}
