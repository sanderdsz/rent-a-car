import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list();

    console.log(specifications);

    return specifications;
  }
}

export { ListSpecificationsUseCase };
