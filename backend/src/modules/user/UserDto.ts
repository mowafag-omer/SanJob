import { MinLength, MaxLength, IsString, IsDefined, IsEmail, IsIn } from 'class-validator'
import { AbstractDto } from '../../helpers/abstractDto'

interface IRequestCreateUserDto {
  email: string;
  password: string;
  type: string
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

  @IsDefined({ message: 'Account Type is required !'})
  @IsIn(['company', 'applicant'])
  public type: string

  constructor(props: IRequestCreateUserDto) {
    super()
    this.email = props.email
    this.password = props.password
    this.type = props.type
  }
}