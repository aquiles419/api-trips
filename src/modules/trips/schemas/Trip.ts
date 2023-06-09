import {
  Severity,
  modelOptions,
  prop,
  setGlobalOptions,
} from "@typegoose/typegoose";
import { IUserTripDTO } from "../../users/dtos/IUsersDTO";
import IExpensesDTO from "../../expenses/dtos/IExpensesDTO";

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } });

@modelOptions({
  schemaOptions: {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id.toString();

        delete ret._id;
        delete ret.__v;
      },
    },
    autoCreate: true,
  },
})
export class Trip {
  @prop()
  public _id: string;

  @prop()
  public name: string;

  @prop()
  public description: string;

  @prop()
  public travelers: IUserTripDTO[];

  @prop()
  public expenses: IExpensesDTO[];

  @prop()
  public start_trip: Date;

  @prop()
  public lat: Date;

  @prop()
  public long: Date;

  @prop()
  public created_at: Date;

  @prop()
  public end_trip: Date;

  @prop()
  public updated_at: Date;
}
