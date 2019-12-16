export interface ISkill {
  name: string;
  experience: string;
}

export interface IProficiency {
  beginner: string;
  intermediate: string;
  advanced: string;
}

export interface IEmployee {
  name: string;
  email: string;
  skill: ISkill;
  proficiency: IProficiency;
}
