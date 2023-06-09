import { getModelForClass, ReturnModelType } from "@typegoose/typegoose";

import { Trip } from "../schemas/Trip";
import { ITripsRepository } from "./ITripsRepository";
import {
  ICreateTripsDTO,
  IListTripsFilters,
  IUpdateTripsDTO,
} from "../dtos/ITripsDTO";

export class MongoTripsRepository implements ITripsRepository {
  private ormRepository: ReturnModelType<typeof Trip>;

  constructor() {
    this.ormRepository = getModelForClass(Trip);
  }
  public async findByIdAndPopulate(id: string): Promise<any> {
    const trip = await this.ormRepository.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "users",
          let: { travelers: "$travelers" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$travelers"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
              },
            },
          ],
          as: "travelers",
        },
      },
    ]);
    return trip;
  }

  public async create(data: ICreateTripsDTO): Promise<Trip> {
    return this.ormRepository.create(data);
  }

  public async findById(id: string): Promise<Trip | null> {
    return this.ormRepository.findOne({ _id: id });
  }

  public async findAll(): Promise<Trip[]> {
    return this.ormRepository.find();
  }

  public async save(trips: IUpdateTripsDTO): Promise<Trip | null> {
    return this.ormRepository.findOneAndUpdate({ _id: trips._id }, trips, {
      new: true,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.deleteOne({ _id: id });
  }

  public async findAllWithFilters(filters: IListTripsFilters): Promise<Trip[]> {
    const skip = (filters.page - 1) * filters.per;

    return this.ormRepository.find().skip(skip).limit(filters.per);
  }

  public async findTripByIdAndPopulateExpenses(id: string): Promise<any> {
    const trip = await this.ormRepository.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "expenses",
          let: { expenses: "$expenses" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$expenses"],
                },
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "payer",
                foreignField: "_id",
                as: "payer",
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "debtors",
                foreignField: "_id",
                as: "debtors",
              },
            },
            {
              $project: {
                _id: 1,
                description: 1,
                value: 1,
                payer: {
                  name: 1,
                  email: 1,
                },
                debtors: {
                  name: 1,
                  email: 1,
                },
                category_id: 1,
                created_at: 1,
                updated_at: 1,
              },
            },
          ],
          as: "expenses",
        },
      },
      {
        $project: {
          expenses: 1,
        },
      },
    ]);

    return trip;
  }
}
