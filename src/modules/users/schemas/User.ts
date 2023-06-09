import {
  Severity,
  modelOptions,
  prop,
  setGlobalOptions,
} from "@typegoose/typegoose";
import { ITrips } from "../dtos/IUsersDTO";

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
export class User {
  @prop()
  public _id: string;

  @prop()
  public name: string;

  @prop()
  public email: string;

  @prop()
  public password: string;

  @prop()
  public pix_key: string;

  @prop()
  public trips: ITrips[];

  @prop()
  public user_photo: string;

  @prop()
  public created_at: Date;

  @prop()
  public updated_at: Date;
}
