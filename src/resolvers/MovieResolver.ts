import { Movie } from "../entity/Movie";
import {
	Arg,
	Field,
	InputType,
	Int,
	Mutation,
	Query,
	Resolver
} from "type-graphql";

@InputType()
class MovieInput {
	@Field()
	title: string;
	@Field(() => Int) // graphql cannont infer Int from number
	minutes: number;
}

@InputType()
class MovieUpdateInput {
	@Field(() => String, { nullable: true })
	title?: string;
	@Field(() => Int, { nullable: true }) // graphql cannont infer Int from number
	minutes?: number;
}

@Resolver()
export class MovieResolver {
	@Mutation(() => Movie)
	async createMovie(
		// @Arg("title") title: string,
		// @Arg("minutes", () => Int) minutes: number
		@Arg("options", () => MovieInput) options: MovieInput
	) {
		console.log("options", options);
		// await Movie.insert({title,minutes });
		// await Movie.insert(options);
		const movie = await Movie.create(options).save();
		return movie;
	}

	@Mutation(() => Boolean)
	async updateMovie(
		@Arg("id", () => Int) id: number,
		@Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
	) {
		await Movie.update({ id }, input);
		return true;
	}

	@Mutation(() => Boolean)
	async deleteMovie(@Arg("id", () => Int) id: number) {
		await Movie.delete({ id });
		return true;
	}

	@Query(() => [Movie])
	movies() {
		return Movie.find();
	}
}
