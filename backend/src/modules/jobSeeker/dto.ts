import { MinLength, MaxLength, IsString, IsDefined, IsEmail, IsUrl, IsIn, IsPhoneNumber, IsDate, IsDateString } from 'class-validator'
import { AbstractDto } from '../../helpers/abstractDto'

interface IRequestCreateProfileDto {
  img_url: string | null
  gender: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  birthdate: Date | null;
  location: string | null;
  profile_title: string | null;
  sector: string | null;
  linkedin: string | null
  website: string | null
  github: string | null
  CV: string
  user: number
}

export class RequestCreateProfileDto extends AbstractDto implements IRequestCreateProfileDto {
  public img_url: string | null
  public gender: string | null

  @IsDefined({ message: 'First name is required !'})
  public first_name: string

  // @IsDefined({ message: 'Last name is required !'})
  public last_name: string

  @IsEmail()
  @IsDefined({ message: 'Email is required !'})
  public email: string

  public phone: string | null

  // @IsDateString()
  public birthdate: Date | null

  public location: string | null;
  public profile_title: string | null;
  public sector: string | null;
  public linkedin: string | null
  public website: string | null
  public github: string | null
  public CV: string
  @IsDefined({ message: 'User is required !'})
  public user: number

  
  constructor(props: IRequestCreateProfileDto) {
    super()
    this.gender = props.gender || null
    this.first_name = props.first_name
    this.last_name = props.last_name
    this.email = props.email
    this.phone = props.phone || null
    this.birthdate = props.birthdate || null
    this.location = props.location || null
    this.profile_title = props.profile_title || null
    this.sector = props.sector || null
    this.linkedin = props.linkedin || null
    this.website = props.website || null
    this.github = props.github || null
    this.CV = props.CV
    this.user = props.user
  }
}