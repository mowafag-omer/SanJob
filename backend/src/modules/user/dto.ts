import { MinLength, MaxLength, IsString, IsDefined, IsEmail, IsIn } from 'class-validator'
import { AbstractDto } from '../../helpers/abstractDto'

interface IRequestCreateUserDto {
  email: string;
  password: string;
  role: string
  hasProfile: boolean | null
}

export class RequestCreateUserDto extends AbstractDto implements IRequestCreateUserDto {
  @IsEmail()
  @IsDefined({ message: 'Email is required !'})
  public email: string

  @IsDefined({ message: 'Password is required !'})
  @IsString()
  @MinLength(4, { message: 'password is too short'})
  @MaxLength(30, { message: 'password is too long' })
  public password: string

  @IsDefined({ message: 'Role is required !'})
  @IsIn(['company', 'jobseeker'])
  public role: string

  public hasProfile: boolean | null;

  constructor(props: IRequestCreateUserDto) {
    super()
    this.email = props.email
    this.password = props.password
    this.role = props.role
  }
}