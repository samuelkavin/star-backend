import {GenderEnum} from 'src/utils/enums/gender.enum';
import {RaceEnum} from 'src/utils/enums/race.enum';
import {ReligionEnum} from 'src/utils/enums/religion.enum';
import {Document} from 'mongoose';

export interface IParent {
  firstname: string;
  lastname: string;
  relationship: string;
  nric: string;
  race: RaceEnum;
  religion: ReligionEnum;
  gender: GenderEnum;
  phone: string;
  mobile: string;
  email: string;
  studentId: string;
}

export interface IParentDocument extends IParent, Document {}
