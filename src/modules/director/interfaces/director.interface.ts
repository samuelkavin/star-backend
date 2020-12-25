import {Document} from 'mongoose';
import {RaceEnum} from 'src/utils/enums/race.enum';

export interface IDirector {
  name: string;
  nric: string;
  gender: string;
  race: RaceEnum;
  designation: string;
  mobile?: string;
  email?: string;
  companyId: string;
}

export interface IDirectorDocument extends IDirector, Document {}
