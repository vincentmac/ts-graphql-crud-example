import {Field, Int, ObjectType} from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType() // graphql
@Entity()
export class Movie extends BaseEntity {
	@Field(() => Int) // Graphql type
	@PrimaryGeneratedColumn() // typeorm database type
	id: number;

	@Field()
	@Column()
	title: string;

	@Field(() => Int)
	@Column("int", { default: 60 })
	minutes: number;
}
